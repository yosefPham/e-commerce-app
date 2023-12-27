import React, {useEffect, useState} from "react"
import {Image, StyleProp, StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from 'react-native-vector-icons/Ionicons';

import { CheckBox } from "@ui-kitten/components"
// config
// import { translate } from "@i18n"
import R from "./../../../assets/R"
import { formatCurrency, formatTimeVN, getFont, getWidth, HEIGHT, WIDTH } from "./../../../configs/functions"
import Colors from "./../../../assets/colors";
import moment from "moment";
import ButtonText from "./../../../components/Button/ButtonText";
import { E_STATUS_WALLET, E_TYPE_BUTTON } from "./../../../types/emuns";

type Props = {
  item: any
  amountMoney: number
  dateTime: string
  type: string
  iconName?: string
  onConfirm?: any
}

const ItemTransaction = (props: Props) => {
    const { amountMoney, dateTime, type, iconName, item, onConfirm } = props
    return (
    <View 
        style={{
            
            backgroundColor: R.colors.white,
            paddingHorizontal: WIDTH(10),
            marginVertical: HEIGHT(5),
            borderTopWidth: 0.5,
            borderTopColor: R.colors.gray50,
            width: "100%",
        }}
    >
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: "space-between",
                paddingVertical: HEIGHT(20),
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
                    <Text>{formatTimeVN(dateTime)}</Text>
                </View>
            </View>
            <Text 
                style={{
                    color: item?.balanceTemporary ? R.colors.yellow900 : item?.type === "BUY" ? R.colors.red700 :R.colors.green00803D,
                    fontWeight: '500',
                    fontSize: getFont(17)
                }}
            >
                {item?.type === "BUY" ? "-" : "+"} {formatCurrency(amountMoney ?? 0)}
            </Text>
        </View>
        {item?.status === E_STATUS_WALLET.WITHDRAW_CONFIRM && (
            <View style={{alignItems: "flex-end", width: "100%", borderTopColor: R.colors.gray50, borderTopWidth: 0.5, paddingVertical: HEIGHT(5)}}>
                <ButtonText
                    title="Xác nhận"
                    onPress={() => onConfirm && onConfirm()}
                    type={E_TYPE_BUTTON.PRIMARY}
                />
            </View>
        )}
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
