import React, {useEffect, useState} from "react"
import {Image, StyleProp, StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
// config
// import { translate } from "@i18n"
import R from "./../../../assets/R"
import { formatCurrency, getFont, HEIGHT, WIDTH } from "./../../../configs/functions"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "./../../../assets/colors";
import ButtonText from "./../../../components/Button/ButtonText"
import { E_ROLE_ORDER, E_TYPE_BUTTON, E_TYPE_ORDER_STATUS } from "./../../../types/emuns"

type Props = {
  item: any
  route?: any
  onPress?: (item: any) => void
  status?: string
  role?: string
  onChangeOrderStatus?: any
}
const SET_WIDTH: ViewStyle = {}
const ItemOrder: React.FC<Props> = (props: Props) => {
  const { item, route, onPress, status, role, onChangeOrderStatus} = props
  useEffect(() => {

  }, [status])
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => onPress && onPress(item)} style={[styles.container, ((route?.key === E_TYPE_ORDER_STATUS.DONE || route?.key === E_TYPE_ORDER_STATUS.CANCEL || route?.key === E_TYPE_ORDER_STATUS.IGNORE) || (role === E_ROLE_ORDER.SELL)) && SET_WIDTH]}>
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
                <View style={styles.footer}>
                    <Text style={{fontSize: getFont(14), color: R.colors.primary}}>{formatCurrency(item?.product?.standardPrice ?? 250000)}</Text>
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
        {((route?.key === E_TYPE_ORDER_STATUS.DONE || route?.key === E_TYPE_ORDER_STATUS.CANCEL || route?.key === E_TYPE_ORDER_STATUS.IGNORE)
        && role !== E_ROLE_ORDER.SELL) &&
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: HEIGHT(10), paddingBottom: HEIGHT(10)}}>
            <ButtonText
                onPress={() => {}} 
                title="Mua lại" 
                type={E_TYPE_BUTTON.PRIMARY}
            />
        </View>}
        {(role === E_ROLE_ORDER.SELL && item?.orderStatus === E_TYPE_ORDER_STATUS.PENDING) &&
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: HEIGHT(10), paddingBottom: HEIGHT(10)}}>
            <ButtonText
                onPress={() => onChangeOrderStatus && onChangeOrderStatus(item?.id, E_TYPE_ORDER_STATUS.REJECTED)}
                title="Từ chối" 
                type={E_TYPE_BUTTON.OUTLINE}
                customStyle={{marginRight: HEIGHT(5)}}
            />
            <ButtonText
                onPress={() => onChangeOrderStatus && onChangeOrderStatus(item?.id, E_TYPE_ORDER_STATUS.ACCEPTED)}
                title="Chấp nhận" 
                type={E_TYPE_BUTTON.PRIMARY}
            />
        </View>}
        {(role === E_ROLE_ORDER.SELL && item?.orderStatus === E_TYPE_ORDER_STATUS.ACCEPTED) &&
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: HEIGHT(10), paddingBottom: HEIGHT(10)}}>
            <ButtonText
                onPress={() => onChangeOrderStatus && onChangeOrderStatus(item?.id, E_TYPE_ORDER_STATUS.DELIVERY)}
                title="Duyệt vận chuyển đã lấy đơn" 
                type={E_TYPE_BUTTON.PRIMARY}
                customStyle={{width: '50%'}}
            />
        </View>}
    </TouchableOpacity>
  )
}

export default ItemOrder

const styles = StyleSheet.create({
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
    footer: {
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
