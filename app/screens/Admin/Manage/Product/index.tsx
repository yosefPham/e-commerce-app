import { Header } from "../../../../components/Headers/Header";
import React, { useState, useContext, useEffect } from "react";
import { BackHandler, Platform, Text, View } from "react-native";

import ItemFunction from "../../../../components/Item/ItemFunction";
import R from "../../../../assets/R";
import ScreenName from "../../../../navigation/screen-name";
import ButtonText from "../../../../components/Button/ButtonText";
import { getFont, HEIGHT, notifyMessage } from "../../../../configs/functions";
import { ESystemRoles, E_STATUS_WALLET, E_TYPE_BUTTON } from "../../../../types/emuns";
import {AuthContext} from "../../../../context/AuthContext"
import { ToastAndroid } from "react-native";
import { CommonActions } from "@react-navigation/native";
const listFunction = [
  {
    name: 'Sản phẩm',
    iconName: 'cube',
    color: R.colors.green00803D,
    screenNameMove: ScreenName.MyProduct
  },
  {
    name: 'Ngành hàng',
    iconName: 'list',
    color: R.colors.orange900,
    screenNameMove: ScreenName.MyProduct
  },
]
const ProductManage = ({ navigation, route }: any) => {
  return (
    <View style={{alignItems: 'center'}}>
        <Header
            isBack={true}
            isSearch={false}
            headerText={'Quản lý sản phẩm'}
        />
        {listFunction?.map((route: any) => {
            return (
                <ItemFunction 
                    item={route} 
                    onPress={() => navigation.navigate(route?.screenNameMove, {headerText: route?.name})} 
                    customStyles={{backgroundColor: R.colors.white}}
                />
            )
        })}
    </View>
  )
}

export default ProductManage