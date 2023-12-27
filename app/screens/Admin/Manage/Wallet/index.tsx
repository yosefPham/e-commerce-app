import { Header } from "../../../../components/Headers/Header";
import React, { useState, useContext, useEffect } from "react";
import { BackHandler, Platform, Text, View } from "react-native";

import ItemFunction from "../../../../components/Item/ItemFunction";
import R from "../../../../assets/R";
import ScreenName from "../../../../navigation/screen-name";
import ButtonText from "../../../../components/Button/ButtonText";
import { getFont, HEIGHT, notifyMessage } from "../../../../configs/functions";
import { ESystemRoles, E_STATUS_WALLET, E_TYPE_BUTTON } from "../../../../types/emuns";
import {AuthContext} from "../../../../context/AuthContext"
import { ToastAndroid } from "react-native";
import { CommonActions } from "@react-navigation/native";
const listFunction = [
  {
    name: 'Yêu cầu nạp tiền',
    iconName: 'card',
    color: R.colors.green00803D,
    status: E_STATUS_WALLET.DEPOSIT_PENDING
  },
  {
    name: 'Yêu cầu rút tiền',
    iconName: 'journal',
    color: R.colors.orange900,
    status: E_STATUS_WALLET.WITHDRAW_REQUEST
  },
  {
    name: 'Quản lý ví người dùng',
    iconName: 'wallet',
    color: R.colors.primary,
    status: E_STATUS_WALLET.NORMAL
  },
]
const WalletManage = ({ navigation, route }: any) => {
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
            headerText={'Quản lý ví'}
            onBack={() => {
            navigation.goBack()
            onFresh && onFresh()
            }}
        />
        {listFunction?.map((route: any) => {
            return (
                <ItemFunction 
                    item={route} 
                    onPress={() => navigation.navigate(ScreenName.TransactionManage, { status: route?.status})} 
                    customStyles={{backgroundColor: R.colors.white}}
                />
            )
        })}
    </View>
  )
}

export default WalletManage