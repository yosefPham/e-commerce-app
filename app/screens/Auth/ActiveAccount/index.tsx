import { Header } from "./../../../components/Headers/Header";
import React, { useRef, useState, useContext, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, Platform, ToastAndroid } from "react-native";
import InputText from "./../../../components/Input/InputText";
import { getFont, HEIGHT, notifyMessage, WIDTH } from "../../../configs/functions";
import R from "../../../assets/R";
import ButtonText from "./../../../components/Button/ButtonText";
import { E_TYPE_BUTTON } from "../../../types/emuns";
import {AuthContext} from "../../../context/AuthContext"
import { activeAccount, signup } from "../../../apis/functions/user";
import { useNavigation } from "@react-navigation/native";
import ScreenName from "../../../navigation/screen-name";
import images from "../../../assets/image";
const ActiveAccount = ({navigation, route}: any) => {
    const { params } = route
    const inputRefs = Array.from({ length: 6 }, () => useRef<any>(null));
    const [verificationCode, setVerificationCode] = useState(Array(6).fill(''));
    const [loading, setLoading] = useState<boolean>(false)
    const [countdown, setCountdown] = useState(300); // 300 giây = 5 phút

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCountdown(prevCountdown => {
                const newCountdown = prevCountdown > 0 ? prevCountdown - 1 : 0;
                if (newCountdown === 0) {
                  clearInterval(intervalId);
                }
                return newCountdown;
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, [countdown]);

    const handleRekeyActive = async () => {
        const res = await signup({...params})
        resetCountdown();
    }

    const resetCountdown = () => {
        setCountdown(300)
      };
    
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    const handleInputChange = (index: number, text: string) => {
        const newVerificationCode = [...verificationCode];
        newVerificationCode[index] = text;
        setVerificationCode(newVerificationCode);
        if (text && index < 5) {
            inputRefs[index + 1].current.focus();
        } else if (!text && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };
    const handleActive = async () => {
        try {
            setLoading(true)
            const codes = verificationCode.join('')
            if (codes.length < 6) {
                return notifyMessage(`Vui lòng điền đủ 6 kí tự của mã xác nhận!`)
            }
            const res = await activeAccount({...params}, codes)
            if (res.status === "OK") {
                navigation.navigate(ScreenName.Login)
                notifyMessage(`${res.message}`)
            } else {
                notifyMessage(`${res.message}`)
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
            <View style={{marginHorizontal: WIDTH(20), marginTop: HEIGHT(20), justifyContent: 'flex-start'}}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontWeight: '700', fontSize: getFont(20)}}>XÁC THỰC EMAIL</Text>
                    <Image
                        source={require('app/assets/image/manage-multiple-assests.png')}
                        style={styles.image}
                    />
                    <Text style={{marginTop: HEIGHT(20)}}>Nhập vào mã xác thực được gửi tới email đã đăng ký </Text>
                    <Text>trong <Text style={{color: R.colors.primary}}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text></Text>
                </View>
                <View style={styles.formInput}>
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <TextInput
                        key={index}
                        ref={inputRefs[index]}
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={(text) => handleInputChange(index, text)}
                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === 'Backspace' && index > 0) {
                              inputRefs[index - 1].current.focus();
                            }
                          }}
                        onSubmitEditing={handleActive}
                        />
                    ))}
                </View>
                <ButtonText 
                    title="Gửi" 
                    onPress={handleActive} type={E_TYPE_BUTTON.PRIMARY} 
                    customStyle={{width: '100%', height: HEIGHT(40), marginTop: HEIGHT(10)}}
                    customTitle={{fontSize: getFont(16)}}
                    isLoading={loading}
                />
                <View style={{alignContent:'center', justifyContent: 'center', flexDirection: 'row', marginTop: HEIGHT(10)}}>
                    <Text>Bạn chưa nhận được mã xác thực? </Text>
                    <TouchableOpacity onPress={handleRekeyActive} disabled={countdown !== 0} ><Text style={{color: countdown === 0 ? R.colors.primary : R.colors.gray0}}> Gửi lại</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ActiveAccount

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: R.colors.white,
        height: '100%',
    },
    ActiveAccount: {
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
    input: {
        width: 40,
        height: 40,
        borderWidth: 1,
        margin: 5,
        textAlign: 'center',
        fontSize: 18,
    },
    formInput: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    image: {
        width: '100%',
        height: '43%',
    }

})