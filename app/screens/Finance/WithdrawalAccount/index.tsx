import { Header } from "./../../../components/Headers/Header";
import React from "react";
import { Text, View } from "react-native";

const WithdrawalAccount = () => {
    return (
        <View>
            <Header
                isBack={true}
                isSearch={false}
                headerText={'Tài khoản rút tiền'}
            />
            <Text>Screen WithdrawalAccount</Text>
        </View>
    )
}

export default WithdrawalAccount