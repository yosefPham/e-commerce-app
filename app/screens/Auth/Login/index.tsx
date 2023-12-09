import { Header } from "../../../components/Headers/Header";
import React, { useContext, useRef, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ToastAndroid, Platform } from "react-native";

import InputText from "../../../components/Input/InputText";
import { getFont, HEIGHT, WIDTH } from "../../../configs/functions";
import R from "../../../assets/R";
import ButtonText from "../../../components/Button/ButtonText";
import { E_TYPE_BUTTON } from "../../../types/emuns";
import ScreenName from "../../../navigation/screen-name";
import {AuthContext} from "../../../context/AuthContext"
import { CommonActions } from '@react-navigation/native';

const Login = ({navigation}: any) => {
    const notifyMessage = (msg: string) => {
        if (Platform.OS === 'android') {
          ToastAndroid.show(msg, ToastAndroid.TOP)
        }
    }
    const email = useRef<string>("")
    const password = useRef<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const { handleLogin } = useContext(AuthContext)
    const onChangeValue = (value: string, index: number) => {
        switch (index) {
          case 0: {
            email.current = value
            break
          }
          case 1: {
            password.current = value
            break
          }
          default:
            break
        }
    }
    const onLogin = async() => {
        try {
            if (password.current.trim() === "" || email.current.trim() === "") {
                return notifyMessage('Vui lòng điền đầy đủ thông tin!')
            }
            setLoading(true)
            const res = await handleLogin({email: email.current, password: password.current})
            if (res?.status === 'OK') {
                notifyMessage('Đăng nhập thành công')
                navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: ScreenName.TabMain }],
                    })
                );
            } else {
                notifyMessage(`${res?.email ?? res?.password ?? res?.message}`)
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
                headerText={'Đăng nhập'}
            />
            <View style={{marginHorizontal: WIDTH(20), marginTop: HEIGHT(20), justifyContent: 'center'}}>
                <InputText 
                    placeholder="Email" 
                    nameIcon="person-outline"
                    onChangeValue={(value) => onChangeValue(value, 0)}
                />
                <InputText 
                    placeholder="Mật khẩu" 
                    nameIcon="lock-closed-outline" 
                    isPassword={true}
                    onChangeValue={(value) => onChangeValue(value, 1)}
                />
                <ButtonText 
                    title="Đăng nhập" 
                    onPress={onLogin} type={E_TYPE_BUTTON.PRIMARY} 
                    customStyle={{width: '100%', height: HEIGHT(40), marginTop: HEIGHT(10)}}
                    customTitle={{fontSize: getFont(16)}}
                    isLoading={loading}
                />
            </View>
            <View style={styles.register}>
                <Text style={{marginRight: WIDTH(5)}}>Bạn chưa có tài khoản?</Text>
                <TouchableOpacity onPress={() => navigation.navigate(ScreenName.Register)}>
                    <Text style={{color: R.colors.primary, textDecorationLine: 'underline'}}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        // paddingTop: HEIGHT(100),
        // justifyContent: 'center',
        width: '100%',
        // height: HEIGHT(200),
        backgroundColor: R.colors.white,
        height: '100%',
    },
    register: {
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