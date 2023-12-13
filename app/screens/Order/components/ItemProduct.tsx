import React, {useEffect, useState} from "react"
import {Image, StyleProp, StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CheckBox } from "@ui-kitten/components"
// config
// import { translate } from "@i18n"
import R from "./../../../assets/R"
import { formatCurrency, getFont, HEIGHT, WIDTH } from "./../../../configs/functions"
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
  const { value, isSelected, onSelect, item } = props
  const { product, quantity } = item
    const [inputVal, setInputVal] = useState<string>("");
    useEffect(() => {
        setInputVal(value || "")
    }, [value]);
  return (
    <TouchableOpacity activeOpacity={0.5} style={[styles.container]}>
        <View 
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
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginRight: WIDTH(10)}}>
                <CheckBox status='danger' checked={isSelected} onChange={(value) => onSelect && onSelect(value, item)} />
            </View>
            <View style={styles.containerProduct}>
                <View style={styles.containerImage}>
                    <Image
                        source={{uri: product?.resources[0]?.imageUrl}}
                        style={styles.image}
                    />
                </View>
                <View style={{marginHorizontal: WIDTH(10), marginVertical: HEIGHT(5), width: "60%"}}>
                    <Text 
                        style={{fontSize: getFont(14), marginHorizontal: WIDTH(2)}}
                        numberOfLines={2}
                        ellipsizeMode='tail'
                    >
                        {product?.name ?? "Tws Tai Nghe Chụp Tai bluetooth 5.2"}
                    </Text>
                    <View style={styles.footer}>
                        <Text style={{fontSize: getFont(15), color: R.colors.primary}}>{formatCurrency(product?.standardPrice ?? 250000)}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.location}>
                            {/* <Icon name='albums-outline' size={14} color={R.colors.gray6B}/> */}
                            <Text style={{fontSize: getFont(12), color: R.colors.gray6B}}> Số lượng: {quantity ?? 0}</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginHorizontal: WIDTH(10), marginVertical: HEIGHT(5), width: "20%"}}>
                    <Text>Xoá</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
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
    },
    containerProduct: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
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
