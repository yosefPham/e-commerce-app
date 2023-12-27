import React, {} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { getFont, HEIGHT, WIDTH } from './../../configs/functions';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import R from './../../assets/R';
import { Header } from './../../components/Headers/Header';

type Props = {
  item: {
    iconName: string
    color: string
    name: string
    logo?: string
    sizeIcon?: number
  }
  onPress(): void,
  customStyles?: ViewStyle
  body?: any
  noNext?: boolean
  disabled?: boolean
}

const ItemFunction = (props: Props) => {
  const { item, onPress, customStyles, body, noNext, disabled} = props
  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.6} onPress={() => onPress()} style={[styles.container, customStyles, disabled && {backgroundColor: R.colors.borderF7F7F9}]}>
      <View style={{width: !noNext ? "90%" : "100%"}}>
        <View style={styles.title}>
          {item?.logo ? <View style={{width: WIDTH(90), height: HEIGHT(25)}}>
            <Image style={{width: '100%', height: "100%"}} source={{uri: item?.logo}}/>
          </View> : 
          <Icon name={item?.iconName} color={item?.color} size={item?.sizeIcon ?? 20}/>
          }
          <Text style={styles.name}>{item?.name}</Text>
        </View>
        {body && 
        <View>{body}</View>}
      </View>
      {!noNext && <Icon name={'chevron-forward'} color={R.colors.borderC} size={20}/>}
      
    </TouchableOpacity>
  );
}

export default ItemFunction

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: WIDTH(10),
    paddingVertical: HEIGHT(15),
    borderBottomWidth: WIDTH(0.5),
    borderColor: R.colors.gray50,
    // marginRight: WIDTH(50)
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginLeft: WIDTH(10),
  }
})