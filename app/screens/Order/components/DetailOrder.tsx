import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Header } from "../../../components/Headers/Header";
import Icon from "react-native-vector-icons/Ionicons";
import R from "../../../assets/R";
import { getFont, HEIGHT, WIDTH } from "../../../configs/functions";
import ItemOrder from "./ItemOrder";

const DetailOrder = ({navigation, route}: any) => {
    const { item } = route.params;
    return (
        <View style={{backgroundColor: R.colors.gray0}}>
            <Header
                isBack={true}
                isSearch={false}
                headerText={'Thông tin đơn hàng'}
            />
            <ItemStatus/>
            <ItemTransport/>
            <ItemOrder item={item ?? {}}/>
            <ItemPayment/>
            <View style={[styles.code]}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                    <Text style={[{}, {fontSize: getFont(16), fontWeight: '600', marginBottom: HEIGHT(8)}]}>Mã đơn hàng</Text>
                    <Text style={[{}, {fontSize: getFont(17), fontWeight: '600', marginBottom: HEIGHT(8)}]}>23101MEAHPCTG</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                    <Text style={[{fontSize: getFont(15), color: R.colors.gray5}]}>Thời gian đặt hàng</Text>
                    <Text style={{color: R.colors.gray5, fontSize: getFont(15)}}>17-10-2023 10:44</Text>
                </View>
            </View>
        </View>
    )
}

export default DetailOrder

const ItemStatus = ({}) => {
    const backgroundColor = R.colors.blueBg
    return (
        <View style={[styles.status, {backgroundColor: backgroundColor}]}>
            <View>
                <Text style={[styles.text, {fontSize: getFont(16), fontWeight: '600', marginBottom: HEIGHT(8)}]}>Đơn hàng đã hoàn thành</Text>
                <Text style={styles.text}>Cảm ơn bạn dã mua sắm cùng chúng tôi</Text>
            </View>
            <View>
                <Icon name="receipt-outline" size={50} color={R.colors.white}/>
            </View>
        </View>
    )
}
const ItemTransport = ({item}: any) => {
    return (
        <View style={[styles.statusTransport]}>
            <View style={{marginRight: WIDTH(10)}}>
                <MaterialCommunityIcons name="dump-truck" size={20} color={R.colors.gray50}/>
            </View>
            <View>
                <Text style={[{}, {fontSize: getFont(17), fontWeight: '600', marginBottom: HEIGHT(8)}]}>Thông tin vận chuyển</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="ellipse" size={13} color={R.colors.blueBg}/>
                    <View style={{marginLeft: WIDTH(10), borderColor: R.colors.gray50, borderLeftWidth: 0.5, paddingLeft: HEIGHT(3)}}>
                        <Text style={{color: R.colors.blueBg}}>Đơn hàng đã được giao thành công</Text>
                        <Text style={{color: R.colors.gray50, fontSize: getFont(13)}}>17-10-2023 10:44</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const ItemPayment = ({}) => {
    return (
        <View style={[styles.payment]}>
            <View style={{marginRight: WIDTH(10)}}>
                <Icon name="receipt-outline" size={20} color={R.colors.gray50}/>
            </View>
            <View>
                <Text style={[{}, {fontSize: getFont(17), fontWeight: '600', marginBottom: HEIGHT(8)}]}>Phương thức thanh toán</Text>
                <Text style={{color: R.colors.blueBg}}>Thanh toán qua Ví điện tử</Text>
            </View>
        </View>
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
    }
})