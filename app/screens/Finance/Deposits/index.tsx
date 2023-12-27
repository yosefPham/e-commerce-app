import { Header } from "./../../../components/Headers/Header";
import React, { useEffect, useState } from "react";
import { Alert, BackHandler, StyleSheet, Text, View } from "react-native";
import InputHeader from "./../../../components/Input/InputHeader";
import R from "./../../../assets/R";
import { formatCurrency, getFont, HEIGHT, WIDTH, getHeight } from "./../../../configs/functions";
import ButtonText from "./../../../components/Button/ButtonText";
import { E_TYPE_BUTTON } from "./../../../types/emuns";
import ScreenName from "./../../../navigation/screen-name";
import { getDepositPending, postDepositMoney } from "./../../../apis/functions/Wallet";

const Deposits = ({navigation, route}: any) => {
    const onFresh = route?.params?.onFresh
    const [value, setValue] = useState<number>(0)
    const [disable, setDisable] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    const [isPending, setPending] = useState<boolean>(false)
    useEffect(() => {
        getPending()
        if (value > 0) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [value])
    useEffect(() => {
        const handleBackPress = () => {
          navigation.goBack()
          onFresh && onFresh()
          return true;
        };
    
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
      }, []);
    const getPending= async () => {
        const res = await getDepositPending()
        if (res?.data?.status === 'OK') {
            if (res?.data?.data.includes("Bạn chưa xác nhận nạp tiền")) {
                setPending(true)
                console.log(res?.data?.data);
            } else {
                setPending(false)
            }
        }
    }
    const showConfirmationAlert = () => {
        if (isPending) {
            Alert.alert(
                'Thông báo!',
                'Bạn có đơn nạp tiền đang chờ xử lý, vui lòng đợi xong giao dịch trước đó!');
        } else {
            handleDepositsMoney()
        }
      };
    const handleDepositsMoney = async () => {
        try {
            if (isPending) {

            }
            setLoading(true)
            const res = await postDepositMoney(value)
            if (res.status === "OK") {
                navigation.navigate(ScreenName.Pay, { amount: value, data: res?.data, getPending: getPending})
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
                headerText={'Nạp tiền'}
                onBack={() => {
                    navigation.goBack()
                    onFresh && onFresh()
                }}
            />
            <InputHeader 
                required
                isNumber
                isMoney
                headerText="Nhập số tiền (đ)" 
                customStyle={{backgroundColor: R.colors.white}}
                customInputStyle={{fontSize: getFont(30), color: R.colors.primary, fontWeight: '600'}}
                onChangeValue={(value) => setValue(value)}
            />
            <View style={{backgroundColor: R.colors.white, paddingVertical: HEIGHT(15), marginTop: HEIGHT(10), width: "100%"}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: WIDTH(10), marginBottom: HEIGHT(10)}}>
                    <Text style={{color: R.colors.gray29}}>Nạp tiền</Text>
                    <Text style={{color: R.colors.gray29}}>{formatCurrency(value ?? 0)}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: WIDTH(10)}}>
                    <Text style={{fontSize: getFont(17), fontWeight: '500'}}>Tổng thanh toán</Text>
                    <Text style={{fontSize: getFont(17), color: R.colors.primary, fontWeight: '500'}}>{formatCurrency(value ?? 0)}</Text>
                </View>
            </View>
            <ButtonText
              title=" Thanh toán ngay"
              type={E_TYPE_BUTTON.PRIMARY}
              onPress={showConfirmationAlert}
              customStyle={styles.buttonText}
              customTitle={{fontSize: getFont(16), fontWeight: '600'}}
              icon="qr-code-outline"
              colorIcon={R.colors.white}
              disabled={disable}
              isLoading={loading}
            />
        </View>
    )
}

export default Deposits

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