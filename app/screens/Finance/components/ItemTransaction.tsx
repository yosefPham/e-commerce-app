import React, {useEffect, useState} from "react"
import {Image, StyleProp, StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from 'react-native-vector-icons/Ionicons';

import { CheckBox } from "@ui-kitten/components"
// config
// import { translate } from "@i18n"
import R from "./../../../assets/R"
import { formatCurrency, getFont, getWidth, HEIGHT, WIDTH } from "./../../../configs/functions"
import Colors from "./../../../assets/colors";
import moment from "moment";

type Props = {
  item: any
  amountMoney: number
  dateTime: string
  type: string
  iconName?: string
}

const ItemTransaction = (props: Props) => {
    const { amountMoney, dateTime, type, iconName, item } = props
    const utcMoment = moment.utc(dateTime, "YYYY-MM-DDTHH:mm:ss.SS");
    // Chuyển đổi về múi giờ của Việt Nam (+7 giờ)
    const vietnamMoment = utcMoment.utcOffset(7);
    const vietnamTime = vietnamMoment.format("HH:mm DD/MM/YYYY");
    return (
    <View 
        style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: "space-between",
            backgroundColor: R.colors.white,
            paddingVertical: HEIGHT(20),
            paddingHorizontal: WIDTH(10),
            marginVertical: HEIGHT(5),
            borderTopWidth: 0.5,
            borderTopColor: R.colors.gray50,
            borderBottomWidth: 0.5,
            borderBottomColor: R.colors.gray50,
            width: "100%",
        }}
    >
        <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: "space-between"}}>
            <View 
                style={{
                    marginRight: WIDTH(10),
                    padding: WIDTH(5),
                    borderWidth: 0.5,
                    borderColor: R.colors.gray50,
                    borderRadius: WIDTH(30),
                }}
            >
                <Icon name={iconName ?? "wallet-outline"} size={25} color={R.colors.primary}/>
            </View>
            <View>
                <Text style={{fontSize: getFont(16), fontWeight: '500',marginBottom: HEIGHT(10)}}>
                    {type ?? "Nạp tiền vào ví"}
                </Text>
                <Text>{vietnamTime}</Text>
            </View>
        </View>
        <Text 
            style={{
                color: item?.balanceTemporary ? R.colors.yellow900 : R.colors.green00803D,
                fontWeight: '500',
                fontSize: getFont(17)
            }}
        >
            +{formatCurrency(amountMoney ?? 0)}
        </Text>
    </View>
  )
}

export default ItemTransaction

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
