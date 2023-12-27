import React, {useContext, useEffect, useRef, useState} from "react"
import { Image, StyleSheet, SafeAreaView, StatusBar, Platform, Linking, View } from "react-native"
import * as Animatable from "react-native-animatable"
import { CommonActions } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import moment from "moment" 
import axios from "axios"
// import messaging from '@react-native-firebase/messaging';

// import { Notifications } from 'expo';
// import * as Permissions from 'expo-permissions';

import { login, logout } from "../../apis/functions/user"
import ScreenName from "../../navigation/screen-name"
import { getFont, getLineHeight, HEIGHT,  WIDTH } from "../../configs/functions"
import { rootServerInstance } from "../../apis/helper"
import LoadingComponent from "../../common/Loading/LoadingComponent";
import R from "../../assets/R"
import { AuthContext } from "../../context/AuthContext"

const key = Platform.OS === "android" ? "PHIEN_BAN_ANDROID" : "PHIEN_BAN_IOS"


const Launching = ({navigation}: any) => {
    const { setRole } = useContext(AuthContext)
    const [loading, setLoading] = useState<boolean>(true)
    // const requestUserPermission = async() => {
    //     const authStatus = await messaging().requestPermission();
    //     console.log('authStatus: ', authStatus)
    //     const enabled =
    //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
    //     if (enabled) {
    //       console.log('Authorization status:', authStatus);
    //     }
    // }
    // const getTokenDevice = async () => {
    //     console.log('Token device:')
    //     const tokenDevice = await messaging().getToken()
    //     console.log('Token device:', tokenDevice)
    // }
    useEffect(() => {
        checkUserData()
        // requestUserPermission()
        // getTokenDevice()
    }, [])
    //   const checkTokenExpired = async () => {
    //     const isExpired = props.route.params?.isExpired
    //     isExpired ? resetAccount() : checkUserData()
    //   }

    //   const resetAccount = async () => {
    //     await logout()
    //     await AsyncStorageUtils.remove(AsyncStorageUtils.KEY.USER_DATA)
    //     await AsyncStorageUtils.remove(AsyncStorageUtils.KEY.PASSWORD)
    //     replace(ScreenName.Launching)
    //   }


    const checkUserData = async () => {
        setLoading(true)
        let screenName = ScreenName.TabMain
        let token = await AsyncStorage.getItem('token');
        // console.log('token: ' + token)
        const user: any = await AsyncStorage.getItem('userInfo')
        const userInfo = JSON.parse(user);
        setRole(userInfo?.role)
        setTimeout(() => {
            if (!token) {
                return navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: ScreenName.TabMain }],
                    })
                );
            }
            if (userInfo) {
                if(userInfo?.role === 'ADMIN') {
                    return navigation.dispatch(
                        CommonActions.reset({
                        index: 0,
                        routes: [{ name: ScreenName.Extentions }],
                        })
                    );
                } else {
                    return navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: ScreenName.TabMain }],
                        })
                    );
                }
            }
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: ScreenName.TabMain }],
                })
            );
            setLoading(false)
        }, 2500)
    }
    return (
        <View style={styles.container}>
            <Animatable.View animation="bounceIn" direction="alternate" duration={3000}>
                <Image
                    resizeMode="contain"
                    style={styles.logo}
                    source={require('app/assets/image/backgroundlogin.png')}
                />
            </Animatable.View>
            <Animatable.Text duration={2000} animation="fadeIn" style={styles.textpromote}>
            </Animatable.Text>
            <LoadingComponent isLoading={loading} style={{marginTop: HEIGHT(40)}} size={28} />
        </View>
    )
}
export default Launching
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: R.colors.white,
        flex: 1,
    },
    logo: {
        height: WIDTH(200),
        marginTop: HEIGHT(250),
        width: WIDTH(200),
    },
    textpromote: {
        color: R.colors.primary,
        fontSize: getFont(20),
        fontWeight: "bold",
        lineHeight: getLineHeight(28),
        marginTop: HEIGHT(27),
    },
})
