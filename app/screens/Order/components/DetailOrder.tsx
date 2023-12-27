import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useEffect } from "react";
import { Alert, Image, Platform, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";

import { Header } from "../../../components/Headers/Header";
import Icon from "react-native-vector-icons/Ionicons";
import R from "../../../assets/R";
import { formatCurrency, formatTimeVN, getFont, getHeight, HEIGHT, notifyMessage, WIDTH } from "../../../configs/functions";
// import ItemOrder from "./ItemOrder";
import { E_ROLE_ORDER, E_TYPE_BUTTON, E_TYPE_ORDER_STATUS, E_TYPE_PAYMENT } from "../../../types/emuns";
import ItemFunction from "../../../components/Item/ItemFunction";
import ButtonText from "../../../components/Button/ButtonText";
import ScreenName from "../../../navigation/screen-name";
import { putStatusCancelOrderByBuy, putStatusDoneOrderByBuy } from "../../../apis/functions/product";

const DetailOrder = ({navigation, route}: any) => {
    const { item, role } = route.params;
    const onChangeStatus = route?.params?.onChangeStatus
    console.log('item', item, role);
    return (
        <View style={{backgroundColor: R.colors.gray0, height: getHeight()}}>
            <Header
                isBack={true}
                isSearch={false}
                headerText={'Thông tin đơn hàng'}
            />
            <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: HEIGHT(30)}}>
                {role !== E_ROLE_ORDER.SELL &&
                <>
                    <ItemStatus statusOrder={item?.orderStatus} />
                    <ItemTransport item={item}/>
                </>}
                <ItemFunction
                    noNext
                    item={{
                        iconName: 'location',
                        name: 'Địa chỉ nhận hàng',
                        color: R.colors.primary
                    }}
                    onPress={() => {}}
                    customStyles={{backgroundColor: R.colors.white, paddingHorizontal: WIDTH(20)}}
                    body={
                        <View style={styles.address}>
                            {item?.destinationInfo ? (
                            <>
                                <Text style={{paddingRight: HEIGHT(5)}}>
                                    {item?.destinationInfo?.recipientName ?? "Phạm Văn Hoàn"} | {item?.destinationInfo?.phone ?? "0395 474 001"}
                                </Text>
                                <Text style={{fontSize: getFont(14), marginBottom: HEIGHT(10)}}>
                                    {`${item?.destinationInfo?.detail ?? ''}\n${item?.destinationInfo?.ward ?? ''} ${item?.destinationInfo?.district ?? ''} ${item?.destinationInfo?.province ?? ''}`}
                                </Text>
                            </>

                            ) : <Text style={{color: R.colors.primary}}>Thiết lập ngay</Text>}
                        </View>
                    }
                />
                <ItemOrder role={role} item={item ?? {}}/>
                <ItemPayment paymentType={item?.paymentType}/>
                <View style={[styles.code]}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                        <Text style={[{}, {fontSize: getFont(16), fontWeight: '600', marginBottom: HEIGHT(8)}]}>Mã đơn hàng</Text>
                        <Text style={[{}, {fontSize: getFont(17), fontWeight: '600', marginBottom: HEIGHT(8)}]}>{item?.id?.toUpperCase() ?? ""}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                        <Text style={[{fontSize: getFont(15), color: R.colors.gray5}]}>Thời gian đặt hàng</Text>
                        <Text style={{color: R.colors.gray5, fontSize: getFont(15)}}>{formatTimeVN(item?.createdDate)}</Text>
                    </View>
                </View>
                {item?.note && (
                <ItemFunction
                    noNext
                    item={{
                        iconName: 'document-text-outline',
                        name: 'Ghi chú:',
                        color: R.colors.yellow800
                    }}
                    onPress={() => {}}
                    customStyles={{backgroundColor: R.colors.white, paddingHorizontal: WIDTH(20), marginTop: HEIGHT(10)}}
                    body={
                        <View style={styles.address}>
                                <Text style={{paddingRight: HEIGHT(5)}}>
                                    {item?.note}
                                </Text>
                        </View>
                    }
                />
                )}
            </ScrollView>
            {role !== E_ROLE_ORDER.SELL && (
            <View style={styles.footer}>
                {(item?.orderStatus === E_TYPE_ORDER_STATUS.DELIVERY ||
                item?.orderStatus === E_TYPE_ORDER_STATUS.PENDING
                ) &&
                <ButtonText
                    title={item?.orderStatus === E_TYPE_ORDER_STATUS.PENDING ? "Huỷ đơn" : "Yêu cầu trả hàng/ Hoàn tiền"}
                    type={item?.orderStatus === E_TYPE_ORDER_STATUS.PENDING ? E_TYPE_BUTTON.OUTLINE : E_TYPE_BUTTON.PRIMARY}
                    onPress={() => onChangeStatus && onChangeStatus(item, 0)}
                    customStyle={styles.buttonText}
                    customTitle={{fontSize: getFont(14)}}
                    disabled={item?.orderStatus === E_TYPE_ORDER_STATUS.DELIVERY}
                />
                }
                {item?.orderStatus === E_TYPE_ORDER_STATUS.DELIVERY &&
                <ButtonText
                    title={item?.orderStatus === E_TYPE_ORDER_STATUS.DELIVERY ? "Đã nhận được hàng" : ""}
                    type={E_TYPE_BUTTON.PRIMARY}
                    onPress={() => onChangeStatus && onChangeStatus(item, 1)}
                    customStyle={styles.buttonText}
                    customTitle={{fontSize: getFont(14)}}
                />
                }
            </View>
            )}
        </View>
    )
}

export default DetailOrder

const ItemStatus = ({statusOrder}: any) => {
    let titleStatus: string = ''
    let colorTitle: string = R.colors.orange400
    switch (statusOrder) {
        case E_TYPE_ORDER_STATUS.PENDING:
            titleStatus = "Đơn hàng đang chờ xử lý"
            break
        case E_TYPE_ORDER_STATUS.CANCEL:
            titleStatus = "Đơn hàng đã huỷ"
            colorTitle = R.colors.red700
            break
        case E_TYPE_ORDER_STATUS.ACCEPTED:
            titleStatus = "Người bán đang chuẩn bị hàng"
            colorTitle = R.colors.blueBg
            break
        case E_TYPE_ORDER_STATUS.DELIVERY:
            titleStatus = "Đơn hàng đang giao đến bạn"
            colorTitle = R.colors.blueBg
            break
        case E_TYPE_ORDER_STATUS.DONE:
            titleStatus = "Đơn hàng đã hoàn thành"
            colorTitle = R.colors.green00803D
            break
        case E_TYPE_ORDER_STATUS.REJECTED:
            titleStatus = "Đơn hàng đã bị từ chối bởi người bán"
            colorTitle = R.colors.red700
            break
        case E_TYPE_ORDER_STATUS.IGNORE:
            titleStatus = "Yêu cầu trả hàng bởi bạn"
            break
        default:
            titleStatus = "Chưa có thông tin thêm"
    }
    const backgroundColor = colorTitle
    return (
        <View style={[styles.status, {backgroundColor: backgroundColor}]}>
            <View>
                <Text style={[styles.text, {fontSize: getFont(16), fontWeight: '600', marginBottom: HEIGHT(8)}]}>{titleStatus}</Text>
                {/* {statusOrder === E_TYPE_ORDER_STATUS.DONE &&} */}
                <Text style={styles.text}>Cảm ơn bạn đã mua sắm cùng chúng tôi</Text>
            </View>
            <View>
                <Icon name="receipt-outline" size={50} color={R.colors.white}/>
            </View>
        </View>
    )
}
const ItemTransport = ({item}: any) => {
    let titleStatus: string = ''
    let colorTitle: string = R.colors.orange400
    switch (item?.orderStatus) {
        case E_TYPE_ORDER_STATUS.ACCEPTED:
            titleStatus = "Người bán đang chuẩn bị hàng"
            break
        case E_TYPE_ORDER_STATUS.DELIVERY:
            titleStatus = "Đơn hàng đang giao đến bạn"
            colorTitle = R.colors.blueBg
            break
        case E_TYPE_ORDER_STATUS.DONE:
            titleStatus = "Đã giao đến bạn bởi người vận chuyển"
            colorTitle = R.colors.green00803D
            break
        default:
            titleStatus = "Chưa có thông tin vận chuyển"
    }
    return (
        <View style={[styles.statusTransport]}>
            <View style={{marginRight: WIDTH(10)}}>
                <MaterialCommunityIcons name="dump-truck" size={20} color={R.colors.gray50}/>
            </View>
            <View>
                <Text style={[{}, {fontSize: getFont(17), fontWeight: '600', marginBottom: HEIGHT(8)}]}>Thông tin vận chuyển</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="ellipse" size={13} color={colorTitle}/>
                    <View style={{marginLeft: WIDTH(10), borderColor: R.colors.gray50, borderLeftWidth: 0.5, paddingLeft: HEIGHT(3)}}>
                        <Text style={{color: colorTitle}}>{titleStatus}</Text>
                        <Text style={{color: R.colors.gray50, fontSize: getFont(13)}}>{formatTimeVN(new Date())}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const ItemPayment = ({paymentType}: any) => {
    return (
        <View style={[styles.payment]}>
            <View style={{marginRight: WIDTH(10)}}>
                <Icon name="receipt-outline" size={20} color={R.colors.gray50}/>
            </View>
            <View>
                <Text style={[{}, {fontSize: getFont(17), fontWeight: '600', marginBottom: HEIGHT(8)}]}>Phương thức thanh toán</Text>
                <Text style={{color: R.colors.blueBg}}>{paymentType === E_TYPE_PAYMENT.WALLET ? "Thanh toán qua Ví điện tử" : "Thanh toán khi nhận hàng"}</Text>
            </View>
        </View>
    )
}

const ItemOrder = (props: any) => {
    const { item, onPress, status, role} = props
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => onPress && onPress(item)} style={[styles.container]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: HEIGHT(10)}}>
                {role !== E_ROLE_ORDER.SELL && (
                    <>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <MaterialCommunityIcons name="storefront-outline" size={25} color={R.colors.black0} />
                            <Text style={{fontSize: getFont(15), fontWeight: '600'}}> {item?.seller?.firstName} {item?.seller?.lastName  ?? "Hau"}</Text>
                        </View>
                        {!status ? <View/> : <Text style={{fontSize: getFont(15), color: R.colors.primary}}>{status ?? "Chờ xác nhận"}</Text>}
                    </>
                )}
            </View>
            <View style={[styles.containerProduct]}>
                <View style={styles.containerImage}>
                    <Image
                        source={{uri: item?.product?.resources[0]?.imageUrl}}
                        style={styles.image}
                    />
                </View>
                <View style={{marginHorizontal: WIDTH(10), marginVertical: HEIGHT(5), width: "80%"}}>
                    <Text 
                        style={{fontSize: getFont(14), marginHorizontal: WIDTH(2)}}
                        numberOfLines={2}
                        ellipsizeMode='tail'
                    >
                        {item?.product?.name ?? "Đang cập nhật"}
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.location}>
                            <Text style={{fontSize: getFont(12), color: R.colors.gray6B}}> Số lượng: {item?.quantity ?? 0}</Text>
                        </View>
                    </View>
                    <View style={styles.footerPrd}>
                        <Text style={{fontSize: getFont(14), color: R.colors.primary}}>{formatCurrency(item?.standardPrice ?? 250000)}</Text>
                    </View>
                </View>
            </View>
            <View 
                style={{
                    flexDirection: 'row', 
                    justifyContent: 'flex-end', 
                    alignItems: 'center', 
                    paddingVertical: HEIGHT(5), 
                    borderColor: R.colors.border,
                    borderBottomWidth: 0.5,
                }}
            >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="receipt-outline" size={25} color={R.colors.primary} />
                    <Text style={{fontSize: getFont(15), color: R.colors.gray48}}> Thành tiền: </Text>
                </View>
                <Text style={{fontSize: getFont(16), color: R.colors.primary}}> {formatCurrency(item?.amount ?? 0)}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        color: R.colors.white
    },
    status: {
        flexDirection: 'row',
        height: HEIGHT(100),
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: WIDTH(20)
    },
    statusTransport: {
        flexDirection: 'row',
        height: HEIGHT(100),
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: WIDTH(20),
        paddingVertical: WIDTH(20),
        paddingBottom: HEIGHT(10),
        backgroundColor: R.colors.white,
        borderBottomWidth: 0.5,
        borderBottomColor: R.colors.gray50
    },
    payment: {
        flexDirection: 'row',
        height: HEIGHT(100),
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: WIDTH(20),
        paddingVertical: WIDTH(20),
        paddingBottom: HEIGHT(10),
        backgroundColor: R.colors.white,
    },
    code: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: WIDTH(20),
        paddingVertical: WIDTH(20),
        paddingBottom: HEIGHT(10),
        marginTop: HEIGHT(10),
        backgroundColor: R.colors.white,
    },
    address: {
        backgroundColor: R.colors.white,
        paddingLeft: WIDTH(30),
        paddingTop: HEIGHT(5),
    },
    buttonText: {
        width: '48%',
        height: HEIGHT(45),
        marginRight: WIDTH(2),
        marginLeft: WIDTH(2),
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        bottom: -30,
        width: '100%',
        backgroundColor: R.colors.white,
        paddingTop: HEIGHT(5)
    },
    container: {
        // height: HEIGHT(164),
        backgroundColor: R.colors.white,
        marginBottom: HEIGHT(10),
        paddingHorizontal: WIDTH(13),
    },
    containerProduct: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        backgroundColor: R.colors.white,
        marginVertical: HEIGHT(5),
        borderColor: R.colors.border,
        borderBottomWidth: 0.5,
        height: HEIGHT(80),
    },
    containerImage: {
        marginVertical: HEIGHT(5),
        width: "20%",
        height: "80%",
        margin: 0,
        padding: 0
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Kiểu co dãn ảnh
    },
    footerPrd: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignSelf: 'stretch',
        alignItems: 'center',
        marginTop: HEIGHT(5),
    },
    location: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // alignSelf: 'stretch',
        alignItems: 'center',
        marginTop: HEIGHT(5),
        marginRight: WIDTH(10),
    }
})