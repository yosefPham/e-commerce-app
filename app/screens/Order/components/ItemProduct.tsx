import React, {useEffect, useState} from "react"
import {Image, StyleProp, StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CheckBox } from "@ui-kitten/components"
import { useNavigation } from "@react-navigation/native";

import ScreenName from "./../../../navigation/screen-name";
import R from "./../../../assets/R"
import { formatCurrency, getFont, getWidth, HEIGHT, WIDTH } from "./../../../configs/functions"
import Colors from "./../../../assets/colors";

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
  isSelected?: boolean
  onSelect?: (id: boolean, item: any) => void
}

const ItemProduct: React.FC<Props> = (props: Props) => {
    const navigation: any = useNavigation()
    const { value, isSelected, onSelect, item, onDelete } = props
    const { product, quantity } = item
    const [inputVal, setInputVal] = useState<string>("");
    useEffect(() => {
        setInputVal(value || "")
    }, [value]);
    return (
    <View style={[styles.container]}>
        <TouchableOpacity 
            style={{
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginTop: HEIGHT(10),
                borderColor: R.colors.border,
                borderBottomWidth: 0.5,
                paddingBottom: HEIGHT(10),
            }}
        >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons name="storefront-outline" size={25} color={R.colors.black75p} />
                <Text style={{fontSize: getFont(15), fontWeight: '500'}}> {(product?.user?.firstName + ` ${product?.user?.lastName}`) ?? "Savislôke.vn"}</Text>
            </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center', width: "100%"}}>
            <View style={{marginRight: WIDTH(10)}}>
                <CheckBox status='danger' checked={isSelected} onChange={(value) => onSelect && onSelect(value, item)} />
            </View>
            <View style={styles.containerProduct}>
                <TouchableOpacity activeOpacity={0.6} style={styles.containerImage} onPress={() => navigation.navigate(ScreenName.Detail, { item: product})}>
                    <Image
                        source={{uri: product?.resources[0]?.imageUrl}}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <View style={{marginHorizontal: WIDTH(10), marginVertical: HEIGHT(5), width: "49%"}}>
                    <Text 
                        style={{fontSize: getFont(14), marginHorizontal: WIDTH(2)}}
                        numberOfLines={2}
                        ellipsizeMode='tail'
                    >
                        {product?.name ?? "Tws Tai Nghe Chụp Tai bluetoothTai Nghe Chụp Tai bluetoothTai Nghe Chụp Tai bluetooth 5.2"}
                    </Text>
                    <View style={styles.footer}>
                        <Text style={{fontSize: getFont(15), color: R.colors.primary}}>{formatCurrency(product?.standardPrice ?? 250000)}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.location}>
                            <Text style={{fontSize: getFont(12), color: R.colors.gray6B}}> Số lượng: {quantity ?? 0}</Text>
                        </View>
                    </View>
                </View>
                {onDelete && 
                <TouchableOpacity 
                    style={{
                        marginHorizontal: WIDTH(10),
                        marginVertical: HEIGHT(5),
                        width: "10%",
                        backgroundColor: R.colors.primary,
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    activeOpacity={0.6}
                    onPress={() => onDelete && onDelete(product?.id)}
                >
                    <Text style={{color: R.colors.white, fontSize: getFont(13)}}>Xoá</Text>
                </TouchableOpacity>}
            </View>
        </View>
    </View>
  )
}

export default ItemProduct

const styles = StyleSheet.create({
    container: {
        height: HEIGHT(150),
        backgroundColor: R.colors.white,
        marginBottom: HEIGHT(10),
        paddingHorizontal: WIDTH(13),
        borderColor: R.colors.border,
        borderBottomWidth: 0.5,
        width: getWidth()
    },
    containerProduct: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: HEIGHT(5),
        height: HEIGHT(80),
    },
    containerImage: {
        marginVertical: HEIGHT(5),
        width: "25%",
        height: "90%",
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
