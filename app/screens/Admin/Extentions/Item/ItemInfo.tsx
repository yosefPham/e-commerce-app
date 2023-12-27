import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { getFont, HEIGHT, WIDTH } from './../../../../configs/functions';
import R from './../../../../assets/R';
import ButtonText from '../../../../components/Button/ButtonText';
import { E_TYPE_BUTTON } from './../../../../types/emuns';
import ScreenName from '../../../../navigation/screen-name';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAccount } from '../../../../apis/functions/user';

type Props = {
  item?: any,
}
const ItemInfo = ({navigation, item}: any) => {
  const [useInfo, setUserInfo] = useState<any>()
  useEffect(() => {
    setUserInfo(item)
  },[useInfo, item])
  return (
    <View style={[styles.container, !useInfo && { justifyContent: 'space-between', paddingBottom: HEIGHT(10)}]}>
      {useInfo ? (
        <>
          <View style={styles.containerImage} >
            {useInfo?.avatarUrl ? 
            <Image 
              style={styles.image} 
              source={{uri: useInfo?.avatarUrl}}
            /> : 
            <View style={styles.noImage} >
              <Icon name='person' color={R.colors.primary} size={40}/>
            </View>}
            
          </View>
          <View style={styles.info}>
            <Text style={styles.username}>{`${useInfo?.firstName + " " + useInfo?.lastName }` ?? 'mainazir203'}</Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.icon} >
            <Icon name='person' color={R.colors.primary} size={25}/>
          </View>
          <View style={{flexDirection: 'row'}}>
            <ButtonText title='Đăng ký' onPress={() => navigation.navigate(ScreenName.Register)} type={E_TYPE_BUTTON.PRIMARY} icon={''} customStyle={{borderColor: R.colors.white, borderWidth: WIDTH(0.5), marginRight: WIDTH(5)}}/>
            <ButtonText title='Đăng nhập' onPress={() => navigation.navigate(ScreenName.Login)} type={E_TYPE_BUTTON.OUTLINE} icon={''}/>
          </View>
        </>
      )}
    </View>
  );
}

export default ItemInfo

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: R.colors.primary,
    // marginTop: HEIGHT(100),
    paddingHorizontal: WIDTH(20),
    paddingBottom: HEIGHT(6),
    marginBottom: HEIGHT(10)
  },
  containerImage: {
    width: WIDTH(60),
    height: HEIGHT(60),
    borderRadius: WIDTH(30),
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Kiểu co dãn ảnh
  },
  info: {
    marginHorizontal: HEIGHT(10),
  },
  username: {
    color: R.colors.white,
    fontWeight: '600',
    fontSize: getFont(20)
  },
  follow: {
    color: R.colors.white,
    marginRight: WIDTH(10),
  },
  noImage: {
    width: '100%',
    height: '100%',
    borderRadius: WIDTH(100),
    overflow: 'hidden',
    backgroundColor: R.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: WIDTH(30),
    height: HEIGHT(30),
    borderRadius: WIDTH(30),
    overflow: 'hidden',
    backgroundColor: R.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  }
})