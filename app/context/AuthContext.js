import AsyncStorage from "@react-native-async-storage/async-storage";
import { rootServerInstance } from "../../app/apis/helper";
import axios from "axios";
import React, {createContext, useEffect, useState} from "react";
import { login, logout, signup } from "../../app/apis/functions/user"
import Loading from "../../app/components/Loading/Loading";
import R from "../../app/assets/R";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState()
    const handleLogin = async (formData) => {
        const res = await login(formData)
        if (res?.status === "OK") {
            setIsLoading(false)
            setToken(res?.data?.accessToken)
            rootServerInstance.setHeader("Authorization", `Bearer ${res?.data?.accessToken}`)
            axios.defaults.headers.common.Authorization = `Bearer ${res?.data?.accessToken}`
            AsyncStorage.setItem('token', res?.data?.accessToken)
            AsyncStorage.setItem('userInfo', JSON.stringify(res?.data?.userResponse))
        }
        return res
    }
    const logoutAccount = async () => {
        setToken(null)
        setIsLoading(false)
        const res = await logout()
        if (res.status === 'OK') {
            delete axios.defaults.headers.common['Authorization'];
            AsyncStorage.removeItem('token')
            AsyncStorage.removeItem('userInfo')
        }
        return res
    }   
    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let token = await AsyncStorage.getItem('token');
            if (token) {
                rootServerInstance.setHeader("Authorization", `Bearer ${token}`)
                axios.defaults.headers.common.Authorization = `Bearer ${token}`
            }
            setToken(token);
            setIsLoading(false);
        } catch (err) {
            console.log('Error', err);
        }   
    }

    useEffect(() => {
        console.log('token: ' + token)
        isLoggedIn()
    }, [])
    return (
        <AuthContext.Provider value={{handleLogin, logoutAccount, token}}>
            {isLoading && <Loading color={R.colors.white}/>}
            {children}
        </AuthContext.Provider>
    )
}