import { Header } from "../../components/Headers/Header";
import React, { useState, useContext } from "react";
import { Platform, Text, View } from "react-native";

import ItemFunction from "../TabHome/Profile/Item/ItemFunction";
import R from "../../assets/R";
import ScreenName from "../../navigation/screen-name";
import ButtonText from "../../components/Button/ButtonText";
import { getFont, HEIGHT } from "../../configs/functions";
import { E_TYPE_BUTTON } from "../../types/emuns";
import {AuthContext} from "../../context/AuthContext"
import { ToastAndroid } from "react-native";
import { CommonActions } from "@react-navigation/native";
const listFunction = [
    {
      name: 'Hồ sơ',
      iconName: '',
      color: R.colors.blue2A3478,
      screenNameMove: ScreenName.Order
    },
    {
      name: 'Địa chỉ',
      iconName: '',
      color: R.colors.primary,
      screenNameMove: ScreenName.Shop
    },
  ]
const AccountSettings = ({ navigation }: any) => {
  const { logoutAccount } = useContext(AuthContext)
  const [loading, setLoading] = useState<boolean>(false)
  const notifyMessage = (msg: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.TOP)
    }
}
  const handleLogout = async () => {
    setLoading(true)
    const res = await logoutAccount()
    if (res?.status === "OK") {
      notifyMessage(res.message ?? "Đăng xuất thành công")
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: ScreenName.TabMain }],
        })
      );
    } else {
      notifyMessage("Đã có lỗi xảy ra")
    }
    setLoading(false)
  }
    return (
        <View style={{alignItems: 'center'}}>
            <Header
              isBack={true}
              isSearch={false}
              headerText={'Thiết lập tài khoản'}
            />
            <ItemFunction item={listFunction[0]} onPress={() => navigation.navigate(ScreenName.Profile)}/>
            <ItemFunction item={listFunction[1]} onPress={() => navigation.navigate(ScreenName.Address)}/>
            <ButtonText
              title="Đăng xuất" 
              onPress={handleLogout} 
              type={E_TYPE_BUTTON.OUTLINE} 
              customStyle={{width: '90%', height: HEIGHT(40), marginTop: HEIGHT(10)}}
              customTitle={{fontSize: getFont(16)}}
              isLoading={loading}
              colorLoading={R.colors.black0}
            />
        </View>
    )
}

export default AccountSettings