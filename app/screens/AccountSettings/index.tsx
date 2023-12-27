import { Header } from "../../components/Headers/Header";
import React, { useState, useContext, useEffect } from "react";
import { BackHandler, Platform, Text, View } from "react-native";

import ItemFunction from "../../components/Item/ItemFunction";
import R from "../../assets/R";
import ScreenName from "../../navigation/screen-name";
import ButtonText from "../../components/Button/ButtonText";
import { getFont, HEIGHT, notifyMessage } from "../../configs/functions";
import { ESystemRoles, E_TYPE_BUTTON } from "../../types/emuns";
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
  {
    name: 'Quản lý tài khoản',
    iconName: '',
    color: R.colors.primary,
    screenNameMove: ScreenName.Shop
  },
  {
    name: 'Tài khoản ngân hàng',
    iconName: '',
    color: R.colors.primary,
    screenNameMove: ScreenName.Account
  },
]
const AccountSettings = ({ navigation, route }: any) => {
  const { role } = useContext(AuthContext)
  const onFresh = route?.params?.onFresh
  const { logoutAccount } = useContext(AuthContext)
  const [loading, setLoading] = useState<boolean>(false)
  const handleLogout = async () => {
    setLoading(true)
    const res = await logoutAccount()
    if (res?.status === "OK") {
      notifyMessage(res.message ?? "Đăng xuất thành công")
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: ScreenName.Launching }],
        })
      );
    } else {
      notifyMessage("Đã có lỗi xảy ra")
    }
    setLoading(false)
  }
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
  return (
    <View style={{alignItems: 'center'}}>
      <Header
        isBack={true}
        isSearch={false}
        headerText={'Thiết lập tài khoản'}
        onBack={() => {
          navigation.goBack()
          onFresh && onFresh()
        }}
      />
      <ItemFunction 
        item={listFunction[0]} 
        onPress={() => navigation.navigate(ScreenName.Profile)} 
        customStyles={{backgroundColor: R.colors.white}}
      />
      {role === ESystemRoles.USER ? 
      <ItemFunction 
        item={listFunction[1]} 
        onPress={() => navigation.navigate(ScreenName.Address)}
        customStyles={{backgroundColor: R.colors.white}}
      /> :
      <ItemFunction 
        item={listFunction[2]} 
        onPress={() => navigation.navigate(ScreenName.Account)}
        customStyles={{backgroundColor: R.colors.white}}
      />
      }
      <ItemFunction 
        item={listFunction[3]} 
        onPress={() => navigation.navigate(ScreenName.WithdrawalAccount)}
        customStyles={{backgroundColor: R.colors.white}}
      />
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