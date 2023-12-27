import { useNavigation } from "@react-navigation/native"
import React, {useEffect, useState} from "react"
import {Image, StyleProp, StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import R from "../../assets/R"
import ScreenName from "../../navigation/screen-name"
import { formatCurrency, getFont, HEIGHT, WIDTH } from "../../configs/functions"

type Props = {
  value?: string
  onChangeText?: (arg: string) => void
  placeHolder?: string
  style?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
  rightIcon?: boolean
  nameProduct?: string
  item: any
  isLocation?: boolean
  onPress?: () => void
}

const ItemProduct: React.FC<Props> = (props: Props) => {
    const navigation: any = useNavigation()
    const { value, placeHolder, style, rightIcon, onChangeText, inputStyle, nameProduct, item, isLocation, onPress } = props
    const [inputVal, setInputVal] = useState<string>("");
    useEffect(() => {
        setInputVal(value || "")
    }, [value]);
    // console.log('item', item)
    return (
    <TouchableOpacity 
        activeOpacity={0.5} 
        style={[styles.container, isLocation && { height: HEIGHT(275)}, style, !item && { backgroundColor: R.colors.gray0}]}
        onPress={() => onPress ? onPress() : navigation.push(ScreenName.Detail, { item: item})}
        disabled={!item}
    >
        {item && (
            <>
                <View style={styles.containerImage}>
                    <Image
                        source={item?.resources?.length > 0 ? {uri:  item?.resources[0]?.imageUrl} : require('app/assets/image/upload-error.png')}
                        style={styles.image}
                    />
                </View>
                <View style={{paddingHorizontal: WIDTH(5), marginVertical: HEIGHT(5), alignItems: 'flex-start', width: '100%'}}>
                    <Text 
                        style={{fontSize: getFont(14), marginHorizontal: WIDTH(2), height: HEIGHT(35)}}
                        numberOfLines={2}
                        ellipsizeMode='tail'
                    >
                        {item?.name ?? "Áo Thun Bóng Đá Tay Vasco da Gama"}
                    </Text>
                    <View style={styles.footer}>
                        <Text style={{color: R.colors.primary, fontSize: getFont(18)}}>{formatCurrency(item?.standardPrice ?? 250000) ?? "đ250.000"}</Text>
                        <Text style={{fontSize: getFont(12)}}>Đã bán:{item?.price ?? 0}</Text>
                    </View>
                    {isLocation && (
                    <View style={styles.location}>
                        <Icon name='location-outline' size={14} color={R.colors.gray6B}/>
                        <Text style={{fontSize: getFont(12), color: R.colors.gray6B}}>{item?.location ?? 'Nước ngoài'}</Text>
                    </View>
                    )}
                </View>
            </>
        )}
    </TouchableOpacity>
  )
}

export default ItemProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: WIDTH(3),
        width: WIDTH(100),
        height: HEIGHT(255),
        backgroundColor: R.colors.white,
        marginVertical: HEIGHT(10)
    },
    containerImage: {
        width: "100%",
        height: HEIGHT(190),
        margin: 0,
        padding: 0
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Kiểu co dãn ảnh
    },
    footer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignSelf: 'stretch',
        alignItems: 'center',
    },
    location: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // alignSelf: 'stretch',
        alignItems: 'center',
        marginTop: HEIGHT(5)
    }
})
