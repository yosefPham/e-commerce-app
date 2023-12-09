import React, {useEffect, useState, useRef} from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform, ToastAndroid } from 'react-native';
import { TabView } from 'react-native-tab-view';

import ButtonText from '../../components/Button/ButtonText';
import R from '../../assets/R';
import { Header } from '../../components/Headers/Header';
import { getFont, WIDTH } from '../../configs/functions';
import { E_TYPE_BUTTON } from '../../types/emuns';
// import ItemProducts from './components/ItemListProduct';
import styles from './styles';
import ScreenName from '../../navigation/screen-name';
import { delProduct, getListProductOwner } from '../../apis/functions/product';
import ItemOrder from './components/ItemOrder';
import { List } from '@ui-kitten/components';

const route = [
{ key: "0", title: "Chờ xác nhận" },
{ key: "1", title: "Chờ lấy hàng" },
{ key: "2", title: "Đã giao hàng" },
{ key: "3", title: "Đã huỷ" },
{ key: "4", title: "Trả hàng" },
]
const Search = ({ navigation }: any) => {
  const flatListRef: any = useRef(null);
  const initIndex = 0
  const [loading, setLoading] = useState<boolean>(false)
  const [currentIndex, setIndex] = useState(initIndex)
  const [routes, setRoutes] = useState(route)
  const [listProduct, setListProduct] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const currentPage = useRef<number>(0)
  const notifyMessage = (msg: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.TOP)
    }
  }
  useEffect(() => {
    onChangeIndex(initIndex)
    getProduct()
  }, [initIndex])
  useEffect(() => {
  }, [listProduct])

  const getProduct = async () => {
    try {
      setLoading(true)
      const res = await getListProductOwner(currentPage.current, 7, "id")
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
      // currentPage.current = 2
      const res = await getListProductOwner(currentPage.current, 7, "id")
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
  const onPress = (item: any) => {
    navigation.navigate(ScreenName.DetailOrder, { item: item })
  }
  const renderScene = ({ route }: any) => {
    if (route.key === currentIndex?.toString()) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <List
            data={listProduct}
            extraData={listProduct}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }: any) => {
              return (
                <ItemOrder item={item ?? {}} route={route} key={route?.key} onPress={onPress} status={route?.title}/>
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
          />
        </View>
      )
    } else {
      return (<View/>)
    }
  }
  useEffect(() => {
    const itemWidth = 80;
    const centerIndex = 1;
    const offset = (currentIndex - centerIndex) * itemWidth;
    flatListRef.current.scrollToOffset({ animated: true, offset });
  }, [currentIndex]);

  const renderTabBar = () => {
    return (
      <View style={styles.tabContainer}>
        <FlatList
          ref={flatListRef}
          extraData={routes}
          data={routes}
          keyExtractor={(item) => `TAB_ORDER_${item?.title}`}
          horizontal
          pagingEnabled
          style={styles.row}
          showsHorizontalScrollIndicator={false}
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
        isBack={true}
        isSearch={false}
        headerText={'Đơn mua'}
        style={{ borderColor: R.colors.white}}
      />
      <View style={styles.container}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{
            index: currentIndex,
            routes,
          }}
          renderScene={renderScene}
          swipeEnabled={true}
          tabBarPosition="top"
          onIndexChange={(index: number) => setIndex(index)}
        />
      </View>
    </View>
  );
}

export default Search
