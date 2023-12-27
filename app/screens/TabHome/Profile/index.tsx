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
    name: 'Đơn mua',
    iconName: 'reader-outline',
    color: R.colors.blue2A3478,
    screenNameMove: ScreenName.Order
  },
  {
    name: 'Trạng thái đơn mua',
    screenNameMove: ScreenName.Order
  },
  {
    name: 'Shop của bạn',
    iconName: 'briefcase-outline',
    color: R.colors.primary,
    screenNameMove: ScreenName.MyShop
  },
  {
    name: 'Đã thích',
    iconName: 'heart-outline',
    color: R.colors.blue027,
    screenNameMove: ScreenName.Shop
  },
  {
    name: 'Đánh giá của tôi',
    iconName: 'star-outline',
    color: R.colors.yellow800,
    screenNameMove: ScreenName.Reviews
  },
  {
    name: 'Ví điện tử',
    iconName: 'wallet-outline',
    color: R.colors.primary,
    screenNameMove: ScreenName.Finance
  },
  {
    name: 'Thiết lập tài khoản',
    iconName: 'person-outline',
    color: R.colors.blue1B,
    screenNameMove: ScreenName.AccountSettings
  }
]

const listStatus = [
  {
    statusName: 'Chờ xác nhận',
    iconName: 'hourglass-outline',
  },
  {
    statusName: 'Chờ lấy hàng',
    iconName: 'file-tray-full-outline',
  },
  {
    statusName: 'Chờ giao hàng',
    iconName: 'bicycle',
  },
  {
    statusName: 'Huỷ đơn',
    iconName: 'archive-outline',
  }
]

const Profile = ({navigation}: any) => {
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
        isFocusInput={true}
        isIconCart={true}
        isIconMessage={true}
        isSearch={false}
      />
      <ItemInfo navigation={navigation} item={userInfo}/>
      <FlatList
        style={{width: '100%'}}
        data={listFunction}
        extraData={listFunction}
        renderItem={({item, index}) => {
          if (item?.iconName) {
            return <ItemFunction item={item} onPress={() => userInfo ? navigation.navigate(item?.screenNameMove, {headerText: item?.name, ...(index === 6 && {onFresh: getDataUser})}) : handleLogin()}/>
          }
          return <ItemOrderStatus onPress={(index: number) => userInfo ? navigation.navigate(item?.screenNameMove, {index: index}) : handleLogin()}/>
        }}
      />
    </View>
  );
}

export default Profile

const ItemOrderStatus = ({onPress}: any) => {
  return (
    <View style={styles.container} >
      {listStatus?.map((item, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => onPress(index)} activeOpacity={0.4} style={{alignItems: 'center'}}>
            <Icon name={item?.iconName} size={25} color={R.colors.black50p}/>
            <Text style={styles.title}>{item?.statusName}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

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