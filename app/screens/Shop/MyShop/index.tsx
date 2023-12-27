import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Header } from "./../../../components/Headers/Header";
import ItemHeader from "../../Shop/Item/ItemHeader";
import { getFont, HEIGHT, WIDTH } from "./../../../configs/functions";
import R from "./../../../assets/R";
import ScreenName from "./../../../navigation/screen-name";
import { getAccount } from "./../../../apis/functions/user";
import { E_ROLE_ORDER } from "./../../../types/emuns";

let route2 = [
    { 
        nameIcon: "cube", 
        title: "Sản phẩm của tôi",
        backgroundColor: R.colors.primary,
        routerName: ScreenName.MyProduct
    },
    { 
        nameIcon: "card", 
        title: "Tài chính",
        backgroundColor: R.colors.yellow700,
        routerName: ScreenName.Finance
    },
    { 
        nameIcon: "help-circle", 
        title: "Trung tâm hỗ trợ",
        backgroundColor: R.colors.blue6FE,
        routerName: ScreenName.MyProduct
    },
]
const MyShop = ({navigation}: any) => {
    const [shopInfo, setShopInfo] = useState<any>()
    let route1 = [
        { value: "0", title: "Duyệt đơn" },
        { value: "2", title: "Chờ lấy hàng" },
        { value: "3", title: "Đơn đang giao" },
        { value: "4", title: "Hoàn thành" },
    ]
    const getShopInfo = async () => {
        const userInfoString: any = await AsyncStorage.getItem('userInfo')
        const userInfoObject = JSON.parse(userInfoString);
        const res = await getAccount(userInfoObject?.id)
        setShopInfo(res?.data?.data)
    }
    useEffect(() => {
        getShopInfo()
    }, [])
    return (
        <View>
            <Header
                isBack={true}
                isSearch={false}
                headerText={'Shop của tôi'}
                noBorder={true}
            />
            <ItemHeader item={shopInfo}/>
            <View  style={styles.container}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
                    onPress={() => navigation.navigate(ScreenName.Order, {index: 0, role: E_ROLE_ORDER.SELL})}
                >
                    <Text style={{fontSize: getFont(16), fontWeight: '600'}}>Đơn mua</Text>
                    <Text style={{fontSize: getFont(12), color: R.colors.black50p}}>Xem lịch sử đơn hàng <Icon name="chevron-forward-outline"/></Text>
                </TouchableOpacity>
                <FlatList
                    data={route1}
                    horizontal={true}
                    extraData={route1}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }: any) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate(ScreenName.Order, {index: index, role: E_ROLE_ORDER.SELL})} activeOpacity={0.6} style={styles.statusPr}>
                            {/* <Text style={{fontSize: getFont(18), paddingTop: HEIGHT(15)}}>{item?.value}</Text> */}
                            <Text style={{fontSize: getFont(13), color: R.colors.black50p}}>{item?.title}</Text>
                        </TouchableOpacity>
                    )
                    }}
                    onEndReachedThreshold={0.1}
                    maxToRenderPerBatch={6}
                    initialNumToRender={6}
                    style={styles.list}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={styles.containerFunc}>
                {route2.map(route => {
                    return (
                        <TouchableOpacity 
                            activeOpacity={0.6} 
                            style={styles.function}
                            onPress={() => navigation.navigate(route?.routerName)}
                        >
                            <View style={[styles.icon, {backgroundColor: route?.backgroundColor ?? R.colors.primary}]}>
                                <Icon name={route.nameIcon} color={R.colors.white} size={35}/>
                            </View>
                            <Text style={{fontSize: getFont(12), color: R.colors.black50p}}>{route?.title}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

export default MyShop

const styles = StyleSheet.create({
    container: {
        marginVertical: HEIGHT(10),
        backgroundColor: R.colors.white,
        paddingHorizontal: WIDTH(10),
        paddingVertical: HEIGHT(10),

    },
    containerFunc: {
        marginVertical: HEIGHT(10),
        backgroundColor: R.colors.white,
        paddingHorizontal: WIDTH(10),
        paddingVertical: HEIGHT(10),
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    list: {
        paddingHorizontal: WIDTH(5),
        paddingVertical: HEIGHT(10)
    },
    statusPr: {
        width: WIDTH(80),
        height: HEIGHT(80),
        marginHorizontal: WIDTH(3),
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: R.colors.gray1,
    },
    icon: {
        width: WIDTH(50),
        height: HEIGHT(50),
        borderRadius: WIDTH(15),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: HEIGHT(5),
    },
    function: {
        width: WIDTH(80),
        height: HEIGHT(80),
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
    }
})