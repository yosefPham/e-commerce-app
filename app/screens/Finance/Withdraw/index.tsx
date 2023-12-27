import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Header } from "./../../../components/Headers/Header";
import InputHeader from "./../../../components/Input/InputHeader";
import R from "./../../../assets/R";
import { formatCurrency, getFont, HEIGHT, WIDTH, getHeight, notifyMessage } from "./../../../configs/functions";
import ButtonText from "./../../../components/Button/ButtonText";
import { E_TYPE_BUTTON } from "./../../../types/emuns";
import ScreenName from "./../../../navigation/screen-name";
import ItemFunction from "./../../../components/Item/ItemFunction";
import { postWithDrawRequest } from "./../../../apis/functions/Wallet";

const Withdraw = ({navigation, route}: any) => {
    const { onFresh } = route?.params
    const [value, setValue] = useState<number>(0)
    const [disable, setDisable] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        if (value >= 50000) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [value])
    const handleWithDrawRequest = async () => {
        try {
            setLoading(true)
            const res = await postWithDrawRequest(value)
            if (res.status === "OK") {
                notifyMessage(res?.message)
                onFresh && onFresh()
                navigation.goBack()
            } else {
                alert(res.message)
            }
        } catch (e) {

        } finally {
            setLoading(false)
        }
    }
    return (
        <View style={{height: getHeight(), alignItems: 'center'}}>
            <Header
                isBack={true}
                isSearch={false}
                headerText={'Rút tiền'}
            />
            <InputHeader 
                required
                isNumber
                isMoney      
                headerText="Nhập số tiền muốn rút (đ)" 
                customStyle={{backgroundColor: R.colors.white}}
                customInputStyle={{fontSize: getFont(30), color: R.colors.primary, fontWeight: '600'}}
                onChangeValue={(value) => setValue(value)}
            />
            <View style={{backgroundColor: R.colors.white, paddingVertical: HEIGHT(15), marginTop: HEIGHT(10), width: "100%"}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: WIDTH(10), marginBottom: HEIGHT(10)}}>
                    <Text style={{color: R.colors.primary}}>* Số tiền rút phải lớn hơn {formatCurrency(49999)}</Text>
                    {/* <Text style={{color: R.colors.gray29}}>{formatCurrency(value ?? 0)}</Text> */}
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: WIDTH(10)}}>
                    <Text style={{fontSize: getFont(17), fontWeight: '500'}}>Số tiển rút:</Text>
                    <Text style={{fontSize: getFont(17), color: R.colors.primary, fontWeight: '500'}}>{formatCurrency(value ?? 0)}</Text>
                </View>
            </View>
            <ItemFunction
                customStyles={{backgroundColor: R.colors.white, marginTop: HEIGHT(10)}} 
                item={{
                    iconName: 'wallet',
                    name: "Rút về",
                    color: R.colors.primary
                }} 
                onPress={() => navigation.navigate(ScreenName.WithdrawalAccount)}
                body={
                    <View style={{marginTop: HEIGHT(10)}}>
                        <Text style={{fontWeight: '600'}}>MB [*9144]</Text>
                    </View>
                }
            />
            <ButtonText
              title="Rút về tài khoản ngân hàng"
              type={E_TYPE_BUTTON.PRIMARY}
              onPress={handleWithDrawRequest}
              customStyle={styles.buttonText}
              customTitle={{fontSize: getFont(16), fontWeight: '600'}}
              disabled={disable}
            //   isLoading
            />
        </View>
    )
}

export default Withdraw


const styles = StyleSheet.create({
    buttonText: {
        position: 'absolute',
        width: '95%',
        height: HEIGHT(45),
        marginVertical: HEIGHT(2),
        bottom: -30,
        marginHorizontal: WIDTH(2)
    }
})