import { Header } from "../../../components/Headers/Header";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getListProductOwnerOfCart } from "../../../apis/functions/product";
import { List } from "@ui-kitten/components";
import ItemProduct from "../components/ItemProduct";
import { formatCurrency, getFont, getHeight, getWidth, HEIGHT, WIDTH } from "../../../configs/functions";
import R from "../../../assets/R";
import ButtonText from "../../../components/Button/ButtonText";
import { E_TYPE_BUTTON } from "../../../types/emuns";
import ScreenName from "../../../navigation/screen-name";
import ItemEmpty from "../../../components/Item/ItemEmpty";

const Cart = ({navigation}: any) => {
    const [listData, setListData] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<number | null >(null);
    const [itemSelected, setItemSelected] = useState(null)
    const [disabled, setDisabled] = useState<boolean>(true)
    const [totalPayment, setTotalPayment] = useState<number>(0)
    const [item, setItem] = useState<any>()
    const getDataOfCart = async () => {
        setLoading(true)
        const res = await getListProductOwnerOfCart()
        if (res?.data?.status === "OK") {
            setListData(res?.data?.data?.items)
        }
        setLoading(false)
    }
    useEffect(() => {
        getDataOfCart()
    }, [])
    const handleDelProduct = () => {

    }
    const handleSelectedProduct = (item: any, index: number) => {
        setItem(item)
        setTotalPayment((item?.product?.standardPrice ?? 1) * (item?.quantity ?? 1))
        setSelectedItem(index)
        setDisabled(false)
    }
    return (
        <View style={{width: getWidth(), height: getHeight()}}>
            <Header
                isBack={true}
                isSearch={false}
                headerText={'Giỏ hàng'}
            />
            <List
                data={listData}
                extraData={listData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }: any) => {
                    return (
                    <ItemProduct 
                        item={item ?? {}} 
                        onDelete={handleDelProduct}
                        isSelected={selectedItem === index}
                        onSelect={(id, item) => handleSelectedProduct(item, index)}
                    />
                    )
                }}
                numColumns={1}
                onEndReachedThreshold={0.1}
                onEndReached={getDataOfCart}
                maxToRenderPerBatch={6}
                initialNumToRender={6}
                style={styles.list}
                columnWrapperStyle={undefined}
                refreshing={loading}
                ListFooterComponent={<View style={R.themes.gap} />}
                onRefresh={getDataOfCart}
                ListEmptyComponent={<ItemEmpty/>}
            />
            <View style={styles.footer}>
                <View style={{width: "70%", alignItems: 'flex-end'}}>
                    <Text style={{color: R.colors.gray48}}>Tổng thanh toán: <Text style={{fontSize: getFont(18), color: R.colors.primary, fontWeight: '600'}}>{formatCurrency(totalPayment ?? 0)}</Text></Text>
                </View>
                <ButtonText
                    title="Mua hàng"
                    type={E_TYPE_BUTTON.PRIMARY}
                    onPress={() => navigation.navigate(ScreenName.OrderProcessing, {item: item})}
                    customStyle={styles.buttonText}
                    customTitle={{fontSize: getFont(16), fontWeight: '600'}}
                    disabled={disabled}
                />
            </View>
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    list: {
      width: getWidth(),
      backgroundColor: R.colors.gray1,
      paddingHorizontal: WIDTH(5),
      paddingVertical: HEIGHT(10)
    },
    buttonText: {
        width: '30%',
        height: HEIGHT(50),
        marginHorizontal: WIDTH(10)
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        bottom: -33,
        width: '100%',
        borderTopWidth: 0.5,
        borderTopColor: R.colors.gray50,
        backgroundColor: R.colors.white
    }
  })