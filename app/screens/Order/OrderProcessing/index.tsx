import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Modal, BackHandler } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { getListAddressUser } from "../../../apis/functions/user";
import ItemFunction from "../../../components/Item/ItemFunction";
import ScreenName from "../../../navigation/screen-name";
import { Header } from "../../../components/Headers/Header";
import R from "../../../assets/R";
import { formatCurrency, getFont, getHeight, getWidth, HEIGHT, WIDTH } from "../../../configs/functions";
import ItemProduct from "../components/ItemProduct";
import InputText from "../../../components/Input/InputText";
import ButtonText from "../../../components/Button/ButtonText";
import { E_TYPE_BUTTON } from "../../../types/emuns";

const OrderProcessing = ({navigation, route}: any) => {
    const { item } = route?.params
    const { product, quantity } = item
    const [address, setAddress] = useState<any>([])
    const [payMentMethods, setPayMentMethods] = useState<string>("Ví điện tử")
    const [loading, setLoading] = useState<boolean>(false)
    const getAddress = async() => {
        const res = await getListAddressUser()
        if (res?.data?.status === "OK") {
            if (res?.data?.data?.lenght !== 0) {
                setAddress(res?.data?.data[0])
            }
        }
    }
    const hanleSelectedAddress = (item: any) => {
        setAddress(item)
    }
    const onChangeValue = (value: string, index: number) => {

    }
    const handlePaymentMethods = (payment: string) => {
        setPayMentMethods(payment)
    }
    const handleSend = async (pay: string) => {
        setLoading(true)
    }
    useEffect(() => {
        getAddress()
    }, [])
    useEffect(() => {
    }, [address, payMentMethods])
    return (
        <View style={{width: getWidth(), height: getHeight()}}>
            <Header
                isBack={true}
                isSearch={false}
                headerText={'Đặt hàng'}
            />
            <ItemFunction 
                item={{
                    iconName: 'location',
                    name: 'Địa chỉ nhận hàng',
                    color: R.colors.primary
                }} 
                onPress={() => navigation.navigate(ScreenName.Address, { onPress: hanleSelectedAddress})}
                customStyles={{backgroundColor: R.colors.white}}
                body={
                    <View style={styles.address}>
                        <Text style={{paddingRight: HEIGHT(5)}}>
                            {address?.recipientName ?? "Phạm Văn Hoàn"} | {address?.phone ?? "0395 474 001"}
                        </Text>
                        <Text style={{fontSize: getFont(14), marginBottom: HEIGHT(10)}}>
                            {`${address?.detail ?? ''}\n${address?.ward ?? ''} ${address?.district ?? ''} ${address?.province ?? ''}`}
                        </Text>
                    </View>
                }
            />
            <TouchableOpacity activeOpacity={0.5} style={[styles.container]}>
                <View 
                    style={{
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        marginTop: HEIGHT(10),
                        borderColor: R.colors.border,
                        borderBottomWidth: 0.5,
                        paddingBottom: HEIGHT(10),
                    }}
                >
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="storefront-outline" size={25} color={R.colors.black75p} />
                        <Text style={{fontSize: getFont(15), fontWeight: '500'}}> {(product?.user?.firstName + ` ${product?.user?.lastName}`) ?? "Savislôke.vn"}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.containerProduct}>
                        <View style={styles.containerImage}>
                            <Image
                                source={{uri: product?.resources[0]?.imageUrl}}
                                style={styles.image}
                            />
                        </View>
                        <View style={{marginHorizontal: WIDTH(10), marginVertical: HEIGHT(5), width: "70%"}}>
                            <Text 
                                style={{fontSize: getFont(16), fontWeight: '500', marginHorizontal: WIDTH(2)}}
                                numberOfLines={2}
                                ellipsizeMode='tail'
                            >
                                {product?.name ?? "Tws Tai Nghe Chụp Tai bluetooth 5.2"}
                            </Text>
                            <View style={styles.price}>
                                <Text style={{fontSize: getFont(15), color: R.colors.gray48}}>{formatCurrency(product?.standardPrice ?? 250000)}</Text>
                                <Text style={{fontSize: getFont(12), color: R.colors.gray48}}> x {quantity ?? 0}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <InputText
                customStyle={{paddingHorizontal: WIDTH(15)}}
                headerText="Tin nhắn:"
                placeholder="Lưu ý cho người bán" 
                onChangeValue={(value) => onChangeValue(value, 0)}
            />
            <InputText
                customStyle={{paddingHorizontal: WIDTH(15)}}
                headerText="Tổng số tiền:"
                onChangeValue={(value) => onChangeValue(value, 0)}
                disabled
                defaultValue={formatCurrency((item?.product?.standardPrice ?? 1) * (item?.quantity ?? 1))}
                customInputStyle={{color: R.colors.primary, fontSize: getFont(16), fontWeight: '600'}}
            />
            <ItemFunction 
                item={{
                    iconName: 'logo-usd',
                    name: 'Phương thức thanh toán',
                    color: R.colors.primary
                }} 
                onPress={() => navigation.navigate(ScreenName.PaymentMethods, { onPress: handlePaymentMethods, totalAmount: (item?.product?.standardPrice ?? 1) * (item?.quantity ?? 1)})}
                customStyles={{backgroundColor: R.colors.white, marginTop: HEIGHT(5)}}
                body={
                    <View style={{marginTop: HEIGHT(10), marginLeft: HEIGHT(30)}}>
                        <Text style={{color: R.colors.primary, opacity: 0.7}}>{payMentMethods}</Text>
                    </View>
                }
            />
            <ItemFunction 
                noNext
                item={{
                    iconName: 'receipt-outline',
                    name: 'Chi tiết thanh toán',
                    color: R.colors.yellow700
                }} 
                onPress={() => {}}
                customStyles={{backgroundColor: R.colors.white, marginTop: HEIGHT(5), width: '100%'}}
                body={
                    <View style={{width: '100%', marginTop: HEIGHT(10)}}>
                        <View style={styles.body}>
                            <Text style={styles.text}>Tổng tiền hàng</Text>
                            <Text style={styles.text}>{formatCurrency((item?.product?.standardPrice ?? 1) * (item?.quantity ?? 1))}</Text>
                        </View>
                        <View style={styles.body}>
                            <Text style={styles.text}>Tổng phí vận chuyển</Text>
                            <Text style={styles.text}>{formatCurrency(15000)}</Text>
                        </View>
                        <View style={styles.body}>
                            <Text style={{fontSize: getFont(18), fontWeight: '600'}}>Tổng thanh toán</Text>
                            <Text style={{fontSize: getFont(18), fontWeight: '600', color: R.colors.primary}}>{formatCurrency(((item?.product?.standardPrice ?? 1) * (item?.quantity ?? 1)) + 15000)}</Text>
                        </View>
                    </View>
                }
            />
            <View style={styles.footer}>
                <View style={{width: "60%", alignItems: 'flex-end'}}>
                    <Text style={{color: R.colors.gray48}}>Tổng thanh toán: <Text style={{fontSize: getFont(18), color: R.colors.primary, fontWeight: '600'}}>{formatCurrency(((item?.product?.standardPrice ?? 1) * (item?.quantity ?? 1)) + 15000)}</Text></Text>
                </View>
                <ButtonText
                    title="Đặt hàng"
                    type={E_TYPE_BUTTON.PRIMARY}
                    onPress={handleSend}
                    customStyle={styles.buttonText}
                    customTitle={{fontSize: getFont(16), fontWeight: '600'}}
                    // disabled={disabled}
                    isLoading={loading}
                />
            </View>
        </View>
    )
}

export default OrderProcessing

const styles = StyleSheet.create({
    address: {
      backgroundColor: R.colors.white,
      paddingLeft: WIDTH(30),
      paddingTop: HEIGHT(5),
    },
    container: {
        height: HEIGHT(150),
        backgroundColor: R.colors.white,
        paddingHorizontal: WIDTH(13),
        borderColor: R.colors.border,
        borderBottomWidth: 0.5,
    },
    containerProduct: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: HEIGHT(5),
        height: HEIGHT(80),
    },
    containerImage: {
        marginVertical: HEIGHT(5),
        width: "25%",
        height: "90%",
        margin: 0,
        padding: 0
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Kiểu co dãn ảnh
    },
    price: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignSelf: 'stretch',
        alignItems: 'center',
        marginTop: HEIGHT(5),
        width: '100%',
    },
    location: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // alignSelf: 'stretch',
        alignItems: 'center',
        marginTop: HEIGHT(5),
        marginRight: WIDTH(10),
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: HEIGHT(3),
    },
    text: {
        color: R.colors.gray48
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        bottom: -34,
        width: '100%',
        borderTopWidth: 0.5,
        borderTopColor: R.colors.gray50,
        backgroundColor: R.colors.white
    },
    buttonText: {
        width: '40%',
        height: HEIGHT(50),
        // marginVertical: HEIGHT(2),
        marginHorizontal: WIDTH(10)
    },
  })