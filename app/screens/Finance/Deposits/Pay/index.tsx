import { Header } from "./../../../../components/Headers/Header";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { formatCurrency, getFont, getHeight, HEIGHT, WIDTH } from "./../../../../configs/functions";
import R from "./../../../../assets/R";
import ButtonText from "./../../../../components/Button/ButtonText";
import { E_TYPE_BUTTON } from "./../../../../types/emuns";
import InputText from "./../../../../components/Input/InputText";
import ScreenName from "./../../../../navigation/screen-name";

const Pay = ({navigation, route}: any) => {
    const { amount, data, getPending } = route.params;
    const onChangeValue = (value: string, index: number) => {
    }
    return (
        <View style={{alignItems: 'center', backgroundColor: R.colors.white, height: getHeight()}}>
            <Header
                isBack={true}
                isSearch={false}
                headerText={'Thanh toán'}
            />
            <View style={{width: '100%', alignItems: 'center', marginVertical: HEIGHT(20)}}>
                <Image
                    style={styles.logo}  
                    source={{uri: `https://api.vietqr.io/image/${data?.nganHangId ?? 970422}-${data.soTk ?? "0540103102001"}-hVS6TX5.jpg?amount=${data?.balanceTemporary}&addInfo=${data?.smsFormat}&accountName=${data.tenChuTk}`}}
                />
            </View>
            <ButtonText
                title="Lưu QR"
                type={E_TYPE_BUTTON.PRIMARY}
                onPress={() => {}}
            />
            <InputText
                headerText="Chủ tài khoản:"
                defaultValue="Phạm Quốc Huy"
                customInputStyle={{fontSize: getFont(14), fontWeight: '600'}}
                disabled
            />
            <InputText
                headerText="Số tài khoản:"
                defaultValue="0540103102001"
                customInputStyle={{fontSize: getFont(14), fontWeight: '600'}}
                isCopyText
                disabled
            />
            <InputText
                headerText="Nội dung:"
                defaultValue={data?.smsFormat ?? ""}
                customInputStyle={{fontSize: getFont(14), fontWeight: '600'}}
                disabled
            />
            <InputText
                headerText="Số tiền:"
                defaultValue={formatCurrency(data?.balanceTemporary)}
                isCopyText
                customInputStyle={{fontSize: getFont(14), fontWeight: '600'}}
                disabled
            />
            <View style={styles.footer}>
                <ButtonText
                    title="Xác nhận đã thanh toán"
                    type={E_TYPE_BUTTON.PRIMARY}
                    onPress={() => {
                        navigation.goBack();
                        getPending()
                    }}
                    customStyle={{width: "48%", height: HEIGHT(45), marginRight: WIDTH(5)}}
                />
                <ButtonText
                    title="Huỷ bỏ"
                    type={E_TYPE_BUTTON.OUTLINE}
                    onPress={() => navigation.goBack()}
                    customStyle={{width: "48%", height: HEIGHT(45)}}
                />
            </View>
        </View>
    )
}

export default Pay

const styles = StyleSheet.create({
    logo: {
        width: '70%',
        height: WIDTH(250),
        resizeMode: 'cover',
    },
    footer: {
        flexDirection: 'row', 
        width: '100%', 
        justifyContent: 'center',
        position: 'absolute',
        bottom: -20

    }
})