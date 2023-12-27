import { Header } from "./../../../components/Headers/Header";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import InputHeader from "./../../../components/Input/InputHeader";
import R from "./../../../assets/R";
import { formatCurrency, getFont, HEIGHT, WIDTH, getHeight, getWidth } from "./../../../configs/functions";
import ButtonText from "./../../../components/Button/ButtonText";
import { E_TYPE_BUTTON } from "./../../../types/emuns";
import ScreenName from "./../../../navigation/screen-name";
import ItemFunction from "./../../../components/Item/ItemFunction";
import { getTrasactionHistoryMy } from "./../../../apis/functions/Wallet";
import { List } from "@ui-kitten/components";
import ItemTransaction from "../components/ItemTransaction";
import ItemEmpty from "./../../../components/Item/ItemEmpty";

const TransactionHistory = ({navigation}: any) => {
    const [listData, setListData] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const getData = async () => {
        setLoading(true)
        const res = await getTrasactionHistoryMy()
        if (res?.data?.status === "OK") {
            setListData(res?.data?.data)
        }
        setLoading(false)
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <View style={{height: getHeight(), alignItems: 'center', width: getWidth()}}>
            <Header
                isBack={true}
                isSearch={false}
                headerText={'Lịch sử giao dịch'}
            />
            <List
                data={listData}
                extraData={listData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }: any) => {
                    console.log('item', item)
                    return (
                        <ItemTransaction
                            item={item}
                            iconName={item?.type !== "BUY" ? "wallet-outline" : "card-outline"}
                            amountMoney={item?.amount}
                            dateTime={item?.createdDate}
                            type={item?.description}
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
        </View>
    )
}

export default TransactionHistory


const styles = StyleSheet.create({
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
})