import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TabView } from "react-native-tab-view";         
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { List } from "@ui-kitten/components";

import { Header } from "../../components/Headers/Header";
import ItemHeader from "./Item/ItemHeader";
import { getFont, getLineHeight, getWidth, HEIGHT, WIDTH } from "../../configs/functions";
import R from "../../assets/R";
import ItemProducts from "./Item/ItemListProduct";
import ButtonText from "../../components/Button/ButtonText";
import { E_TYPE_BUTTON } from "../../types/emuns";
import ScreenName from "../../navigation/screen-name";
import ItemProduct from "../../components/Item/ItemProduct";
import ItemEmpty from "../../components/Item/ItemEmpty";
import { getListProductInShop } from "../../apis/functions/product";
import { getAccount } from "../../apis/functions/user";

const menu = [
    { key: "1", title: "Liên quan" },
    { key: "2", title: "Mới nhất" },
    { key: "3", title: "Bán chạy" },
    { key: "4", title: "Giá" },
]
const Shop = ({navigation, route}: any) => {
  const id  = route?.params?.userId
  const initIndex = 0
  const [currentIndex, setIndex] = useState(initIndex)
  const [routes, setRoutes] = useState(menu)
  const [listProduct, setListProduct] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const currentPage = useRef<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [textSearch, setTextSearch] = useState<string>('')
  const [userId, setUserId] = useState<string>()
  const [shopInfo, setShopInfo] = useState<any>()
  
  const getShopInfo = async () => {
    const userInfoString: any = await AsyncStorage.getItem('userInfo')
    const userInfoObject = JSON.parse(userInfoString);
    setUserId(userInfoObject?.id)
    const res = await getAccount(id ?? userInfoObject?.id)
    setShopInfo(res?.data?.data)
  }
  const getData = async () => {
    try {
      setLoading(true)
      const res = await getListProductInShop(id ?? userId, currentPage.current, 6)
      if (res?.data?.status === "OK") {
        setListProduct(res?.data?.data.content)
        setTotalPages(res?.data?.data.totalPages)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  const getMoreData = async () => {
    try {
      setLoading(true)
      // currentPage.current = 2
      const res = await getListProductInShop(id ?? userId, currentPage.current, 6)
      setListProduct([...listProduct, ...res?.data?.data.content])
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  const onLoadMore = () => {
    if (currentPage.current < totalPages) {
      currentPage.current = currentPage.current + 1
    }
    getMoreData()
  }
  const onRefresh = () => {
    currentPage.current = 0;
    getData()
  }
  useEffect(() => {
    getData()
    getShopInfo()
  }, [])
  useEffect(() => {
  }, [listProduct, shopInfo])
  useEffect(() => {
    onChangeIndex(initIndex)
  }, [initIndex])

  const onChangeIndex = (index: number) => {
    if (currentIndex !== index) {
      setIndex(index)
    }
  }
  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case "1":
        return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <List
            data={listProduct}
            extraData={listProduct}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }: any) => {
              // if (listProduct.length === index + 1 && listProduct.length % 2 !== 0) {
              //   return <View/>
              // }
              return (
                <ItemProduct key={index} item={item ?? {}} isLocation={true}/>
              )
            }}
            numColumns={getWidth() >= 300 ? 2 : 1}
            onEndReachedThreshold={0.1}
            maxToRenderPerBatch={6}
            initialNumToRender={6}
            style={styles.list}
            columnWrapperStyle={getWidth() >= 300 ? styles.columnWrapperStyle : undefined}
            onRefresh={onRefresh}
            refreshing={loading}
            ListFooterComponent={<View style={R.themes.gap} />}
            onEndReached={onLoadMore}
            ListEmptyComponent={<ItemEmpty/>}
            // ListFooterComponent={loadMore && <LoadMore />}
          />
        </View>)
      case "2":
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ItemProducts/>
        </View>)
      case "3":
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ItemProducts/>
        </View>)
      case "4":
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ItemProducts/>
        </View>)
      default:
        return null
    }
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
                {getIcon(item?.key, color)}
                <View style={styles.gap} />
              </TouchableOpacity>
            )
          }}
        />
      </View>
    )
  }
  return (
      <View style={{ flex: 1, justifyContent: 'center'}}>
          <Header
              isBack={true}
              isIconMessage={true}
              placeHolderInput={'Tìm kiếm trong shop'}
              noBorder={true}
          />
          <ItemHeader item={shopInfo}/>
          <View style={{ flex: 1, justifyContent: 'center'}}>
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
          </View>
          {!id && 
          <ButtonText
            title="Thêm sản phẩm"
            type={E_TYPE_BUTTON.PRIMARY}
            onPress={() => navigation.navigate(ScreenName.AddNewProduct)}
            customStyle={styles.buttonText}
            customTitle={{fontSize: getFont(16), fontWeight: '600'}}
          />}
      </View>
  )
}

export default Shop

const getIcon = (index: any, color: string) => {
    switch (index) {
      case "4":
        return <MaterialCommunityIcons name="chevron-down" size={WIDTH(20)} color={color} />
      default:
        return null
    }
  }


const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  flex: {
    alignItems: "center",
    flex: 1,
    paddingVertical: WIDTH(10),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  gap: {
    height: HEIGHT(5),
    margin: 0
  },
  icon: {
    height: WIDTH(22),
    width: WIDTH(22),
  },
  iconscale1: {
    height: WIDTH(27),
    width: WIDTH(27),
  },
  iconscale2: {
    height: WIDTH(24),
    width: WIDTH(24),
  },
  row: {
    alignItems: "flex-end",
    flex: 1,
    justifyContent: "space-around",
    borderBottomWidth: WIDTH(0.5),
    borderBottomColor: R.colors.borderD,
  },
  tabContainer: {
    backgroundColor: R.colors.white,
    paddingTop: HEIGHT(8),
  },
  text: {
    color: R.colors.gray5,
    fontSize: getFont(12),
    fontWeight: "500",
    lineHeight: getLineHeight(16),
    paddingTop: HEIGHT(5),
  },
  buttonText: {
    width: '100%',
    height: HEIGHT(45),
    marginVertical: HEIGHT(2),
  },
  columnWrapperStyle: { justifyContent: "flex-start"},
  list: {
    width: getWidth(),
    backgroundColor: R.colors.gray1,
    paddingHorizontal: WIDTH(5),
    paddingVertical: HEIGHT(10)
  },
})