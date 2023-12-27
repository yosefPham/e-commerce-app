import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { getFont, HEIGHT, WIDTH } from './../../../configs/functions';
import R from './../../../assets/R';
import ButtonText from './../../../components/Button/ButtonText';
import { E_TYPE_BUTTON } from './../../../types/emuns';
import ScreenName from './../../../navigation/screen-name';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAccount } from './../../../apis/functions/user';

type Props = {
  item?: any,
}
const ItemHeader = ({item}: Props) => {
  return (
    <View style={[styles.container, !item && { justifyContent: 'space-between', paddingBottom: HEIGHT(10)}]}>
      {item && (
        <>
          <View style={styles.containerImage} >
            {item?.avatarUrl ? 
            <Image 
              style={styles.image} 
              source={{uri: item?.avatarUrl}}
            /> : 
            <View style={styles.noImage} >
              <Icon name='person' color={R.colors.primary} size={40}/>
            </View>}
            
          </View>
          <View style={styles.info}>
            <Text style={styles.username}>{`${item?.firstName + " " + item?.lastName }` ?? 'mainazir203'}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.follow}><Icon name='star-sharp' color={R.colors.yellow700} size={15}/> {item?.reviews ?? "0.0"}/5.0</Text>
              <Text style={styles.follow}> {item?.followers ?? 0} Người theo dõi</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

export default ItemHeader

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: R.colors.white,
    paddingHorizontal: WIDTH(20),
    borderTopColor: R.colors.white,
    paddingBottom: HEIGHT(5),
    borderTopWidth: 5
  },
  containerImage: {
    width: WIDTH(70),
    height: HEIGHT(70),
    borderRadius: WIDTH(40),
    overflow: 'hidden',
    borderColor: R.colors.gray0,
    borderWidth: 2
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
    // color: R.colors.b,
    fontWeight: '600',
    fontSize: getFont(20)
  },
  follow: {
    // color: R.colors.white,
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