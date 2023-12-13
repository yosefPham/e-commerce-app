import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ItemFunction from "../../../components/Item/ItemFunction";
import ScreenName from "../../../navigation/screen-name";
import { Header } from "../../../components/Headers/Header";
import R from "../../../assets/R";
import { getFont, getHeight, getWidth, HEIGHT, WIDTH } from "../../../configs/functions";
import ButtonText from "../../../components/Button/ButtonText";
import { E_TYPE_BUTTON } from "../../../types/emuns";
import { getDetailWallet } from "../../../apis/functions/Wallet";

const PaymentMethods = ({navigation, route}: any) => {
    const { onPress, totalAmount } = route?.params
    const [balance, setBalance] = useState<number>(0)
    const getDataWallet = async () => {
        const res = await getDetailWallet()
        if (res?.data?.status === "OK") {
            setBalance(res?.data?.data?.balance)
        }
    }
    useEffect(() => {
        getDataWallet()
    }, [])
    useEffect(() => {
    }, [balance])
    return (
        <View style={{width: getWidth(), height: getHeight()}}>
            <Header
                isBack={true}
                isSearch={false}
                headerText={'Phương thức thanh toán'}
            />
            <ItemFunction 
                item={{
                    iconName: 'wallet-outline',
                    name: 'Ví điện tử',
                    color: R.colors.primary
                }}
                onPress={() => {
                    onPress("Ví điện tử")
                    navigation.goBack();
                }}
                disabled={totalAmount < balance}
                customStyles={{backgroundColor: R.colors.white}}
                body={
                    <>
                    {(totalAmount > balance) && (
                        <View style={{marginTop: HEIGHT(10), marginLeft: WIDTH(30)}}>
                            <Text style={{color: R.colors.primary, fontSize: getFont(14)}}>Số dư không đủ </Text>
                            <ButtonText
                                title="Nạp tiền"
                                type={E_TYPE_BUTTON.PRIMARY}
                                onPress={() => navigation.navigate(ScreenName.Finance, {headerText: "Ví điện tử"})}
                            />
                        </View>
                    )}
                    </>
                }
            />
            <ItemFunction 
                item={{
                    iconName: 'cash-outline',
                    name: 'Thanh toán khi nhận hàng',
                    color: R.colors.primary
                }} 
                onPress={() => {
                    onPress("Thanh toán khi nhận hàng")
                    navigation.goBack();
                }}
                customStyles={{backgroundColor: R.colors.white, marginTop: HEIGHT(5)}}
            />
        </View>
    )
}

export default PaymentMethods