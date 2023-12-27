import { Header } from "./../../../components/Headers/Header";
import React, { useRef, useState, useContext } from "react";
import { View, StyleSheet, ToastAndroid, Platform } from "react-native";

import InputText from "./../../../components/Input/InputText";
import { formatString, getFont, HEIGHT, notifyMessage, WIDTH } from "../../../configs/functions";
import R from "../../../assets/R";
import ButtonText from "./../../../components/Button/ButtonText";
import { E_TYPE_BUTTON } from "../../../types/emuns";
import { signup } from "../../../apis/functions/user";
import ScreenName from "../../../navigation/screen-name";
const Register = ({navigation}: any) => {
    const firstName = useRef<string>("")
    const lastName = useRef<string>("")
    const email = useRef<string>("")
    const password = useRef<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const onChangeValue = (value: string, index: number) => {
        switch (index) {
            case 0: {
                firstName.current = value
              break
            }
            case 1: {
                lastName.current = value
              break
            }
            case 2: {
                email.current = value
              break
            }
            case 3: {
                password.current = value
              break
            }
            default:
              break
        }
    }
    const handleSignup = async () => {
        try {
            setLoading(true)
            if (firstName.current.trim() === "" ||
            lastName.current.trim() === "" || 
            email.current.trim() === "" ||
            password.current.trim() === "") {
                return notifyMessage('Vui lòng điền đầy đủ thông tin!')
            }
            const res = await signup({
                firstName: firstName.current,
                lastName: lastName.current,
                email: email.current,
                password: password.current
            })
            if (res.status === "OK") {
                navigation.navigate(ScreenName.ActiveAccount, {
                    firstName: firstName.current,
                    lastName: lastName.current,
                    email: formatString(email.current),
                    password: password.current
                })
            } else {
                return notifyMessage(res.message)
            }

        } catch (err) {

        } finally {
            setLoading(false)
        }
    }
    return (
        <View style={styles.container}>
            <Header
                isBack={true}
                isSearch={false}
                headerText={'Đăng ký'}
            />
            <View style={{marginHorizontal: WIDTH(20), marginTop: HEIGHT(20), justifyContent: 'center'}}>
                <InputText 
                    placeholder="Họ" 
                    nameIcon="person-outline"
                    onChangeValue={(value) => onChangeValue(value, 0)}
                />
                <InputText 
                    placeholder="Tên" 
                    nameIcon="person-sharp"
                    onChangeValue={(value) => onChangeValue(value, 1)}
                />
                <InputText 
                    placeholder="Email" 
                    nameIcon="mail-outline"
                    onChangeValue={(value) => onChangeValue(value, 2)}
                />
                <InputText 
                    placeholder="Mật khẩu" 
                    nameIcon="lock-closed-outline" 
                    isPassword={true}
                    onChangeValue={(value) => onChangeValue(value, 3)}
                />
                <ButtonText 
                    title="Đăng ký" 
                    onPress={handleSignup} type={E_TYPE_BUTTON.PRIMARY} 
                    customStyle={{width: '100%', height: HEIGHT(40), marginTop: HEIGHT(10)}}
                    customTitle={{fontSize: getFont(16)}}
                    isLoading={loading}
                />
            </View>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        // paddingTop: HEIGHT(100),
        // justifyContent: 'center',
        width: '100%',
        // height: HEIGHT(200),
        backgroundColor: R.colors.white,
        height: '100%',
    },
    Register: {
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        bottom: 0,
        left: 0,
        paddingHorizontal: WIDTH(20),
        paddingVertical: WIDTH(15),
        backgroundColor: R.colors.borderE
      },

})