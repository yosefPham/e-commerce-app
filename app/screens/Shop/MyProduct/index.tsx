import React, {useEffect, useState, useRef, useContext} from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform, ToastAndroid } from 'react-native';
import { TabView } from 'react-native-tab-view';

import ButtonText from '../../../components/Button/ButtonText';
import R from '../../../assets/R';
import { Header } from '../../../components/Headers/Header';
import { getFont, notifyMessage, WIDTH } from '../../../configs/functions';
import { ESystemRoles, E_TYPE_BUTTON } from '../../../types/emuns';
// import ItemProducts from './components/ItemListProduct';
import styles from './styles';
import ScreenName from '../../../navigation/screen-name';
import { delProduct, getListProductOwner, getProductsByAdmin } from '../../../apis/functions/product';
import ItemProduct from './components/ItemProduct';
import { List } from '@ui-kitten/components';
import ItemEmpty from '../../../components/Item/ItemEmpty';
import { AuthContext } from '../../../context/AuthContext';

const tabName = [
{ key: "1", title: "Còn hàng" },
{ key: "2", title: "Hết hàng" },
]
const Product = ({ navigation, route }: any) => {
  const { role } = useContext(AuthContext)
  console.log('role', role)
  const headerText = route?.params?.headerText
  const initIndex = 0
  const [loading, setLoading] = useState<boolean>(false)
  const [currentIndex, setIndex] = useState(initIndex)
  const [routes, setRoutes] = useState<any[]>(tabName)
  const [listProduct, setListProduct] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const currentPage = useRef<number>(0)
  useEffect(() => {
    if (role === ESystemRoles.ADMIN) {
      setRoutes([{ key: "1", title: "Sản phẩm có trong hệ thống" }])
    }
    onChangeIndex(initIndex)
    getProduct()
  }, [initIndex])
  useEffect(() => {
  }, [listProduct])

  const getProduct = async () => {
    try {
      setLoading(true)
      let res:any
      if (role === ESystemRoles.ADMIN) {
        res = await getProductsByAdmin(currentPage.current, 7, "id")
      } else {
        res = await getListProductOwner(currentPage.current, 7, "id")
      }
      setListProduct(res?.data?.data.content)
      setTotalPages(res?.data?.data.totalPages)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  const getMoreData = async () => {
    try {
      setLoading(true)
      let res:any
      if (role === ESystemRoles.ADMIN) {
        res = await getProductsByAdmin(currentPage.current, 7, "id")
      } else {
        res = await getListProductOwner(currentPage.current, 7, "id")
      }
      setListProduct([...listProduct, ...res?.data?.data.content])
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  const handleDelProduct = async (id: string) => {
    try {
      setLoading(true)
      const res = await delProduct(id)
      if (res?.status === "OK") {
        notifyMessage(`${res.message}`)
        onRefresh()
      }
    console.log(res)
    } catch (err) {}
    finally {
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
    getProduct()
  }
  const onChangeIndex = (index: number) => {
    if (currentIndex !== index) {
      setIndex(index)
    }
  }
  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case "1":
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <List
              data={listProduct}
              extraData={listProduct}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }: any) => {
                return (
                  <ItemProduct item={item ?? {}} isLocation={true} onDelete={handleDelProduct}/>
                )
              }}
              numColumns={1}
              onEndReachedThreshold={0.1}
              onEndReached={onLoadMore}
              maxToRenderPerBatch={6}
              initialNumToRender={6}
              style={styles.list}
              columnWrapperStyle={undefined}
              refreshing={loading}
              ListFooterComponent={<View style={R.themes.gap} />}
              onRefresh={onRefresh}
              ListEmptyComponent={<ItemEmpty/>}
            />
        </View>)
      case "2":
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Notifycaton Screensssss</Text>
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
        headerText={headerText ?? 'Sản phẩm của tôi'} 
        isBack={true}
        style={{borderColor: R.colors.white}}
        isSearch={false}
      />
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
      {role !== ESystemRoles.ADMIN && (
        <ButtonText
          title="Thêm sản phẩm"
          type={E_TYPE_BUTTON.PRIMARY}
          onPress={() => navigation.navigate(ScreenName.AddNewProduct, {onRefresh: onRefresh})}
          customStyle={styles.buttonText}
          customTitle={{fontSize: getFont(16), fontWeight: '600'}}
        />
      )}
    </View>
  );
}

export default Product
