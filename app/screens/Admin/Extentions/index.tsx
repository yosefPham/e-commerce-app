import React, {useEffect, useState} from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Platform, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import R from '../../../assets/R';
import { E_TYPE_INPUT } from '../../../types/emuns';
import { Header } from '../../../components/Headers/Header';
import ScreenName from '../../../navigation/screen-name';
import ItemInfo from './Item/ItemInfo';
import { getFont, HEIGHT, notifyMessage, WIDTH } from '../../../configs/functions';
import ItemFunction from './Item/ItemFunction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAccount } from '../../../apis/functions/user';

const listFunction = [
  {
    name: 'Báo cáo doanh thu',
    iconName: 'newspaper',
    color: R.colors.green600,
    screenNameMove: ScreenName.Order
  },
  {
    name: 'Quản lý đơn hàng',
    iconName: 'reader',
    color: R.colors.blue2A3478,
    screenNameMove: ScreenName.Order
  },
  {
    name: 'Quản lý sản phẩm',
    iconName: 'briefcase',
    color: R.colors.primary,
    screenNameMove: ScreenName.ProductManage
  },
  {
    name: 'Quản lý ví điện tử',
    iconName: 'wallet',
    color: R.colors.primary,
    screenNameMove: ScreenName.WalletManage
  },
  {
    name: 'Quản lý thông báo',
    iconName: 'notifications-circle',
    color: R.colors.yellow800,
    screenNameMove: ScreenName.Notification
  },
  {
    name: 'Quản lý tài khoản',
    iconName: 'person',
    color: R.colors.blue1B,
    screenNameMove: ScreenName.AccountSettings
  }
]

const Extentions = ({navigation}: any) => {
  const [userInfo, setUserInfo] = useState<any>()
  // const getUserInfo = async () => {
  //   const userInfoString: any = await AsyncStorage.getItem('userInfo')
  //   const userInfoObject = JSON.parse(userInfoString);
  //   setUserInfo(userInfoObject)
  // }
  const getDataUser = async() => {
    const user: any = await AsyncStorage.getItem('userInfo')
    const userInfoObject = JSON.parse(user);
    const res = await getAccount(userInfoObject?.id)
    if (res?.data?.status === "OK") {
      setUserInfo(res?.data?.data)
    }
  }
  useEffect(() => {
      getDataUser()
  }, [])
  
  useEffect(() => {
  },[userInfo])

  const handleLogin = () => {
    notifyMessage('Vui lòng đăng nhập!')
    navigation.navigate(ScreenName.Login)
  }
  return (
    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%' }}>
      <Header
        headerText={undefined} 
        style={{borderBottomWidth: WIDTH(0)}}
        isSearch={false}
      />
      <ItemInfo navigation={navigation} item={userInfo}/>
      <FlatList
        style={{width: '100%'}}
        data={listFunction}
        extraData={listFunction}
        renderItem={({item, index}) => {
          return (
            <ItemFunction
              item={item}
              onPress={() => 
                userInfo ? navigation.navigate(item?.screenNameMove, {headerText: item?.name, ...(index === 6 && {onFresh: getDataUser})}) 
                : handleLogin()
              }
            />
          )
        }}
      />
    </View>
  );
}

export default Extentions

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: HEIGHT(80),
    borderBottomWidth: WIDTH(0.5),
    borderColor: R.colors.borderD,
    paddingHorizontal: WIDTH(15),
  },
  title: {
    fontSize: getFont(11),
    marginTop: HEIGHT(10),
    color: R.colors.black50p
  },
  iconStar: {
    width: WIDTH(22),
    height: HEIGHT(22),
    borderColor: R.colors.black50p,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: WIDTH(0.5),
    borderRadius: WIDTH(40),
    marginBottom: HEIGHT(2)
  }
})