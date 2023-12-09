import React from "react"
import { createNativeStackNavigator  } from "@react-navigation/native-stack"

import TabMain from "../screens/TabHome"
import Login from "../screens/Auth/Login"
import Register from "../screens/Auth/Register"
import ActiveAccount from "../screens/Auth/ActiveAccount"

import Search from "../screens/Search"
import AccountSettings from "../screens/AccountSettings"
import Order from "../screens/Order"
import DetailOrder from "../screens/Order/components/DetailOrder"
import Reviews from "../screens/Reviews"
import Shop from "../screens/Shop"
import MyShop from "../screens/Shop/MyShop"
import MyProduct from "../screens/Shop/MyProduct"
import AddNewProduct from "../screens/Shop/AddNewProduct"
import Profile from "../screens/AccountSettings/Profile"
import Address from "../screens/AccountSettings/Address"
import NewAddress from "../screens/AccountSettings/Address/Item/NewAddress"

export type PrimaryParamList = {
    Login: undefined,
    Home: undefined,
    Profile: undefined,
    TabMain: undefined,
    Search: undefined,
    AccountSettings: undefined,
    Order: undefined,
    Reviews: undefined,
    Shop: undefined,
    Register: undefined
    ActiveAccount: undefined
    Address: undefined
    MyShop: undefined
    MyProduct: undefined
    AddNewProduct: undefined
    DetailOrder: undefined
    NewAddress: undefined
}

const Stack = createNativeStackNavigator<PrimaryParamList>()
export function MainNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade'
            }}
            initialRouteName="TabMain"
        >
            {/* Auth */}
            <Stack.Screen name="TabMain" component={TabMain} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ActiveAccount" component={ActiveAccount} />

            {/* Account */}
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Address" component={Address} />

            {/* Shop */}
            <Stack.Screen name="MyProduct" component={MyProduct} />
            <Stack.Screen name="AddNewProduct" component={AddNewProduct} />

            {/* Order */}
            <Stack.Screen name="DetailOrder" component={DetailOrder} />
            <Stack.Screen name="NewAddress" component={NewAddress} />

            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="AccountSettings" component={AccountSettings} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="Reviews" component={Reviews} />
            <Stack.Screen name="Shop" component={Shop} />
            <Stack.Screen name="MyShop" component={MyShop} />
        </Stack.Navigator>
    )
  }
const exitRoutes = ["TabHome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)