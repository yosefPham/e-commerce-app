import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { formatCurrency, getFont, HEIGHT, notifyMessage, WIDTH } from "../../configs/functions";
import R from "../../assets/R";
import { Header } from "../../components/Headers/Header";
import ScreenName from "../../navigation/screen-name";
import ItemFunction from "../../components/Item/ItemFunction";
import { getDetailWallet, putWithDrawConfirm } from "../../apis/functions/Wallet";
import ItemTransaction from "./components/ItemTransaction";
import ItemEmpty from "../../components/Item/ItemEmpty";
import { E_STATUS_WALLET } from "../../types/emuns";

let route2 = [
    { 
        nameIcon: "receipt", 
        title: "Rút tiền",
        backgroundColor: R.colors.yellow700,
        routerName: ScreenName.Withdraw
    },
    { 
        nameIcon: "card", 
        title: "Nạp tiền",
        backgroundColor: R.colors.primary,
        routerName: ScreenName.Deposits
    },
    { 
        nameIcon: "refresh-circle-sharp", 
        title: "Lịch sử giao dịch",
        backgroundColor: R.colors.blue6FE,
        routerName: ScreenName.TransactionHistory
    },
]
const Finance = ({navigation, route}: any) => {
    const [data, setData] = useState<any>()
    const getDataWallet = async () => {
        const res = await getDetailWallet()
        if (res?.data?.status === "OK") {
            setData(res?.data?.data)
        }
    }
    const handleConfirm = async () => {
        let res = await putWithDrawConfirm()
        if (res?.status === "OK") {
            notifyMessage(res?.message)
            getDataWallet()
        } else {
            notifyMessage(res?.message ?? "Có lỗi xảy ra!")
        }
    }
    useEffect(() => {
        getDataWallet()
    }, [])
    useEffect(() => {
    }, [data])
    return (
        <View>
            <Header
                isBack={true}
                isSearch={false}
                headerText={route.params?.headerText ?? 'Tài chính'}
            />
            <View 
                style={{
                    height: HEIGHT(100), 
                    backgroundColor: R.colors.white, 
                    width: "100%", 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                    borderBottomColor: R.colors.gray50
                }}
            >
                <Text style={{color: R.colors.gray4B}}>Số dư tài khoản</Text>
                <Text style={{fontSize: getFont(30), fontWeight: '600', color: R.colors.primary}}>{formatCurrency(data?.balance ?? 0)}đ</Text>
            </View>
            <View style={styles.containerFunc}>
                {route2.map(route => {
                    return (
                        <TouchableOpacity 
                            activeOpacity={0.6} 
                            style={styles.function}
                            onPress={() => navigation.navigate(route?.routerName, {onFresh: getDataWallet})}
                        >
                            <View style={[styles.icon, {backgroundColor: route?.backgroundColor ?? R.colors.primary}]}>
                                <Icon name={route.nameIcon} color={R.colors.white} size={35}/>
                            </View>
                            <Text style={{fontSize: getFont(12), color: R.colors.black50p}}>{route?.title}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
            {route.params?.headerText !== "Ví điện tử" &&
            <ItemFunction 
                customStyles={{backgroundColor: R.colors.white}} 
                item={{
                    iconName: "wallet",
                    color: R.colors.primary,
                    name: "Doanh thu đơn hàng"
                }} 
                onPress={() => navigation.navigate(ScreenName.Sales)}
            />
            }
            {data?.balanceTemporary !== 0 ? (
            <View style={styles.wait}>
                <Text style={{fontSize: getFont(16), paddingHorizontal: WIDTH(10), fontWeight: '500'}}>
                    Đơn đang chờ xác nhận:
                </Text>
                <ItemTransaction 
                    item={data}
                    iconName={data?.status === E_STATUS_WALLET.WITHDRAW_REQUEST ? "card" : data?.status === E_STATUS_WALLET.DEPOSIT_PENDING ? "wallet-outline" : "checkmark-circle"}
                    amountMoney={data?.balanceTemporary}
                    dateTime={data?.modifiedDate}
                    onConfirm={handleConfirm}
                    type={data?.status === E_STATUS_WALLET.WITHDRAW_REQUEST ? "Rút tiền" : data?.status === E_STATUS_WALLET.DEPOSIT_PENDING ? "Nạp tiền vào ví" : "Xác nhận đã nhận được tiền rút"}
                />
            </View>
            ) : <ItemEmpty/>}
        </View>
    )
}

export default Finance

const styles = StyleSheet.create({
    container: {
        marginVertical: HEIGHT(10),
        backgroundColor: R.colors.white,
        paddingHorizontal: WIDTH(10),
        paddingVertical: HEIGHT(10),

    },
    containerFunc: {
        marginBottom: HEIGHT(10),
        backgroundColor: R.colors.white,
        paddingHorizontal: WIDTH(10),
        paddingVertical: HEIGHT(10),
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 0.5,
        borderBottomColor: R.colors.gray50
    },
    wait: {
        paddingVertical: HEIGHT(8),
    },
    list: {
        paddingHorizontal: WIDTH(5),
        paddingVertical: HEIGHT(10)
    },
    statusPr: {
        width: WIDTH(80),
        height: HEIGHT(80),
        marginHorizontal: WIDTH(3),
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        backgroundColor: R.colors.gray1,
    },
    icon: {
        width: WIDTH(50),
        height: HEIGHT(50),
        borderRadius: WIDTH(15),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: HEIGHT(5),
    },
    function: {
        width: WIDTH(80),
        height: HEIGHT(80),
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
    }
})