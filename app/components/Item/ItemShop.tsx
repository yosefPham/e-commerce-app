import React, {} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import { getFont, HEIGHT, WIDTH } from './../../configs/functions';
import R from './../../assets/R';
import { Header } from './../../components/Headers/Header';
import ButtonText from '../Button/ButtonText';
import { E_TYPE_BUTTON } from './../../types/emuns';
import ScreenName from './../../navigation/screen-name';

type Props = {
  item: any
  onPress(): void,
  customStyles?: ViewStyle
  body?: any
  noNext?: boolean
  disabled?: boolean
  isLocation?: boolean
}

const ItemShop = (props: Props) => {
  const { item, onPress, customStyles, body, noNext, disabled, isLocation} = props
  const navigation: any = useNavigation()
  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.6} onPress={() => onPress()} style={[styles.container, customStyles, disabled && {backgroundColor: R.colors.borderF7F7F9}]}>
        <View>
            <View style={styles.title}>
                <View style={styles.containerImage}>
                    {item?.avatarUrl ? 
                    <Image
                        style={styles.image} 
                        source={{uri: item?.avatarUrl}}
                    /> : 
                    <View style={styles.noImage} >
                        <Icon name='person' color={R.colors.primary} size={40}/>
                    </View>}
                </View>
                <View>
                    <Text style={styles.name}>{item?.firstName} {item?.lastName}</Text>
                    {isLocation && (
                    <View style={styles.location}>
                        <Icon name='location-outline' size={14} color={R.colors.gray6B}/>
                        <Text style={{fontSize: getFont(12), color: R.colors.gray6B}}>{item?.location ?? 'Quốc tế'}</Text>
                    </View>
                    )}
                </View>
            </View>
            {body && 
            <View>{body}</View>}
        </View>
        <View>
            <ButtonText
                title="Ghé shop" 
                onPress={() => navigation.navigate(ScreenName.Shop, {userId: item?.id})} 
                type={E_TYPE_BUTTON.OUTLINE} 
            />
        </View>
    </TouchableOpacity>
  );
}

export default ItemShop

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
        backgroundColor: R.colors.white
        // marginRight: WIDTH(50)
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        marginLeft: WIDTH(10),
        fontWeight: '500',

    },
    containerImage: {
        width: WIDTH(60),
        height: HEIGHT(60),
        borderRadius: WIDTH(60),
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Kiểu co dãn ảnh
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
    location: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // alignSelf: 'stretch',
        alignItems: 'center',
        marginTop: HEIGHT(5),
        marginLeft: WIDTH(10),
    }
})