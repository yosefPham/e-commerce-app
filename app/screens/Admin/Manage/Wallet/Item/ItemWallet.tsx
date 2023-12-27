import { List } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Header } from "./../../../../../components/Headers/Header";
import R from "./../../../../../assets/R";
import { HEIGHT, WIDTH, getHeight, getWidth, notifyMessage } from "./../../../../../configs/functions";
import { E_STATUS_WALLET, E_TYPE_BUTTON } from "./../../../../../types/emuns";
import { getTrasactionByAdmin, putDepositManual, putWithDrawSubmit } from "./../../../../../apis/functions/Wallet";
import ItemTransaction from "../../../components/ItemTransaction";
import ItemEmpty from "./../../../../../components/Item/ItemEmpty";
import { TabView } from "react-native-tab-view";


const nameTab = [
    { key: E_STATUS_WALLET.WITHDRAW_REQUEST, title: "Yêu cầu rút tiền" },
    { key: E_STATUS_WALLET.WITHDRAW_CONFIRM, title: "Chờ xác nhận đã nhận tiền" },
    ]
const TransactionManage = ({navigation, route}: any) => {
    const initIndex = 0
    const [currentIndex, setIndex] = useState(initIndex)
    const { status: defaultStatus } = route?.params
    const [status, setStatus] = useState<string>(defaultStatus)
    const [listData, setListData] = useState<any[]>([])
    const [routes, setRoutes] = useState(nameTab)
    const [loading, setLoading] = useState<boolean>(false)
    const getData = async () => {
        setLoading(true)
        const res = await getTrasactionByAdmin(status)
        if (res?.data?.status === "OK") {
            setListData(res?.data?.data)
        }
        setLoading(false)
    }

    const handleConfirm = async (id: string) => {
        let res: any
        if (status === E_STATUS_WALLET.DEPOSIT_PENDING) {
            res = await putDepositManual(id)
        } else if (status === E_STATUS_WALLET.WITHDRAW_REQUEST) {
            res = await putWithDrawSubmit(id)
        }
        if (res?.status === "OK") {
            notifyMessage(res?.message)
            getData()
            return true
        } else {
            notifyMessage(res?.message ?? "Có lỗi xảy ra!")
            return false
        }
    }
    useEffect(() => {
        getData()
    }, [status])
    useEffect(() => {
        onChangeIndex(initIndex)
    }, [initIndex])
    
    const onChangeIndex = (index: number) => {
    if (currentIndex !== index) {
        setIndex(index)
        setStatus(nameTab[index]?.key)
    }
    }
    const renderScene = ({ route }: { route: { key: string } }) => {
        return (
            <List
                data={listData}
                extraData={listData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }: any) => {
                    return (
                        <ItemTransaction
                            item={item}
                            iconName={status === E_STATUS_WALLET.WITHDRAW_REQUEST ? "card" : "checkmark-circle"}
                            amountMoney={item?.balanceTemporary}
                            dateTime={item?.createdDate}
                            onConfirm={() => handleConfirm(item?.userId)}
                            type={status === E_STATUS_WALLET.WITHDRAW_REQUEST ? `Đơn rút tiền` : `Chờ người dùng xác nhận`}
                        />
                    )
                }}
                numColumns={1}
                onEndReachedThreshold={0.1}
                maxToRenderPerBatch={6}
                initialNumToRender={6}
                style={styles.list}
                columnWrapperStyle={undefined}
                onRefresh={getData}
                refreshing={loading}
                ListFooterComponent={<View style={R.themes.gap} />}
                ListEmptyComponent={<ItemEmpty/>}
            />
        )
    }
    const renderTabBar = () => {
        return (
          <View style={styles.tabContainer}>
            <FlatList
                extraData={routes}
                data={routes}
                numColumns={5}
                scrollEnabled={false}
                keyExtractor={(item) => `TAB_HOME_${item?.title}`}
                
                columnWrapperStyle={styles.row}
                removeClippedSubviews={true}
                renderItem={({ item, index }) => {
                    const isFocused = currentIndex === index
                    const color = isFocused ? R.colors.primary : R.colors.colorDisable
                    return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        onPress={() => onChangeIndex(index)}
                        style={[
                        styles.flex,
                        isFocused && {
                            borderBottomWidth: WIDTH(2.5),
                            borderBottomColor: R.colors.primary
                        }
                        ]}
                    >
                        <Text style={{ color, fontSize: WIDTH(14)}}>
                        {item.title}
                        </Text>
                        <View style={styles.gap} />
                    </TouchableOpacity>
                    )
                }}
            />
          </View>
        )
    }
    return (
        <View style={{height: getHeight(), alignItems: 'center', width: getWidth()}}>
            <Header
                isBack={true}
                isSearch={false}
                headerText={'Quản lý giao dịch'}
            />
            {(status === E_STATUS_WALLET.WITHDRAW_REQUEST || status === E_STATUS_WALLET.WITHDRAW_CONFIRM) ? (
                <View style={styles.container}>
                    <TabView
                        renderTabBar={renderTabBar}
                        navigationState={{
                            index: currentIndex,
                            routes,
                        }}
                        renderScene={renderScene}
                        swipeEnabled={false}
                        tabBarPosition="top"
                        onIndexChange={(index: number) => setIndex(index)}
                    />
                </View>
            ) : (
            <List
                data={listData}
                extraData={listData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }: any) => {
                    return (
                        <ItemTransaction
                            item={item}
                            iconName={item?.type !== "BUY" ? "wallet-outline" : "card-outline"}
                            amountMoney={(status === E_STATUS_WALLET.DEPOSIT_PENDING || status === E_STATUS_WALLET.WITHDRAW_REQUEST) ? item?.balanceTemporary : item?.balance}
                            dateTime={item?.createdDate}
                            onConfirm={() => handleConfirm(item?.userId)}
                            type={status === E_STATUS_WALLET.DEPOSIT_PENDING ? `Đơn nạp tiền` 
                            : status === E_STATUS_WALLET.WITHDRAW_REQUEST ? `Yêu cầu rút tiền` : `Số dư tài khoản`}
                        />
                    )
                }}
                numColumns={1}
                onEndReachedThreshold={0.1}
                maxToRenderPerBatch={6}
                initialNumToRender={6}
                style={styles.list}
                columnWrapperStyle={undefined}
                onRefresh={getData}
                refreshing={loading}
                ListFooterComponent={<View style={R.themes.gap} />}
                ListEmptyComponent={<ItemEmpty/>}
            />
            )}
        </View>
    )
}

export default TransactionManage


const styles = StyleSheet.create({
    container: {
        backgroundColor: R.colors.gray0,
        width: "100%",
        flex: 1,
    },
    buttonText: {
        position: 'absolute',
        width: '95%',
        height: HEIGHT(45),
        marginVertical: HEIGHT(2),
        bottom: -30,
        marginHorizontal: WIDTH(2)
    },
    list: {
        width: getWidth(),
        backgroundColor: R.colors.gray1,
        paddingHorizontal: WIDTH(5),
        paddingVertical: HEIGHT(10),
        // flexDirection: 'column'
    },
    columnWrapperStyle: { justifyContent: "flex-start"},
    tabContainer: {
        backgroundColor: R.colors.white,
        // paddingBottom: HEIGHT(16),
        paddingTop: HEIGHT(8),
    },
    flex: {
        alignItems: "center",
        flex: 1,
        paddingVertical: WIDTH(10),
        flexDirection: 'row',
        justifyContent: 'center',
    },
    row: {
        alignItems: "flex-end",
        flex: 1,
        justifyContent: "space-around",
        borderBottomWidth: WIDTH(0.5),
        borderBottomColor: R.colors.borderD,
    },
    gap: {
        height: HEIGHT(5),
        margin: 0
    },
})