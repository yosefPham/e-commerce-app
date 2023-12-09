import React, {useEffect, useState} from "react"
import {Image, StyleProp, StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
// config
// import { translate } from "@i18n"
import R from "./../../../../assets/R"
import { formatCurrency, getFont, HEIGHT, WIDTH } from "./../../../../configs/functions"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "./../../../../assets/colors";

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
  onDelete?: (id: string) => void
}

const ItemProduct: React.FC<Props> = (props: Props) => {
  const { value, placeHolder, style, rightIcon, onChangeText, inputStyle, nameProduct, item, isLocation, onDelete } = props
    const [inputVal, setInputVal] = useState<string>("");
    useEffect(() => {
        setInputVal(value || "")
    }, [value]);
  return (
    <TouchableOpacity activeOpacity={0.5} style={[styles.container]}>
        <View style={styles.containerImage}>
            <Image
                source={{uri: item?.resources[0]?.imageUrl}}
                style={styles.image}
            />
        </View>
        <View style={{marginHorizontal: WIDTH(10), marginVertical: HEIGHT(5), width: "80%"}}>
            <Text 
                style={{fontSize: getFont(14), marginHorizontal: WIDTH(2)}}
                numberOfLines={2}
                ellipsizeMode='tail'
            >
                {item?.name ?? "Tws Tai Nghe Chụp Tai bluetooth 5.2"}
            </Text>
            <View style={styles.footer}>
                <Text style={{fontSize: getFont(15)}}>{formatCurrency(item?.standardPrice ?? 250000)}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.location}>
                    <Icon name='albums-outline' size={14} color={R.colors.gray6B}/>
                    <Text style={{fontSize: getFont(12), color: R.colors.gray6B}}> Kho hàng: {item?.remaining ?? 0}</Text>
                </View>
                <View style={styles.location}>
                    <Icon name='logo-buffer' size={14} color={R.colors.gray6B}/>
                    <Text style={{fontSize: getFont(12), color: R.colors.gray6B}}> Đã bán: {item?.location ?? 0}</Text>
                </View>
            </View>
            {!(item?.sold > 0) && <TouchableOpacity onPress={() => onDelete && onDelete(item?.id)} style={{flexDirection: 'row', alignItems: 'center', paddingVertical: HEIGHT(10)}}>
                <View style={styles.location}>
                    <Icon name='trash' size={14} color={R.colors.red600}/>
                    <Text style={{fontSize: getFont(12), color: R.colors.red600}}> Xoá sản phẩm</Text>
                </View>
            </TouchableOpacity>}
        </View>
    </TouchableOpacity>
  )
}

export default ItemProduct

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginHorizontal: WIDTH(3),
        paddingHorizontal: WIDTH(10),
        height: HEIGHT(110),
        backgroundColor: R.colors.white,
        marginVertical: HEIGHT(5)
    },
    containerImage: {
        marginVertical: HEIGHT(5),
        width: "20%",
        height: "80%",
        margin: 0,
        padding: 0
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Kiểu co dãn ảnh
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignSelf: 'stretch',
        alignItems: 'center',
        marginTop: HEIGHT(5),
    },
    location: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // alignSelf: 'stretch',
        alignItems: 'center',
        marginTop: HEIGHT(5),
        marginRight: WIDTH(10),
    }
})
