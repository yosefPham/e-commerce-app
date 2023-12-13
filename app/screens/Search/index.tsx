import React, {useEffect, useState, useRef} from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { TabView } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { List } from '@ui-kitten/components';

import R from '../../assets/R';
import { getListProductClient } from '../../apis/functions/product';
import { Header } from '../../components/Headers/Header';
import { getWidth, HEIGHT, WIDTH } from '../../configs/functions';
import { E_TYPE_INPUT } from '../../types/emuns';
import styles from './styles';
import ItemProduct from '../../components/Item/ItemProduct';
import ItemEmpty from '../../components/Item/ItemEmpty';

const route = [
{ key: "1", title: "Liên quan" },
{ key: "2", title: "Mới nhất" },
{ key: "3", title: "Bán chạy" },
{ key: "4", title: "Giá" },
]
const Search = ({ navigation }: any) => {
  const initIndex = 0
  const [currentIndex, setIndex] = useState(initIndex)
  const [routes, setRoutes] = useState(route)
  const timeOut = useRef(null)
  const [isDisable, setIsDisable] = useState(false)
  const [listProduct, setListProduct] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const currentPage = useRef<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [textSearch, setTextSearch] = useState<string>('')
  const getData = async () => {
    try {
      setLoading(true)
      const res = await getListProductClient(currentPage.current, 6, "id", textSearch)
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
      const res = await getListProductClient(currentPage.current, 6, "id", textSearch)
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
  }, [])
  useEffect(() => {
  }, [listProduct])
  useEffect(() => {
    onChangeIndex(initIndex)
  }, [initIndex])

  const onChangeIndex = (index: number) => {
    if (currentIndex !== index) {
      setIsDisable(true)
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
                if (listProduct.length === index + 1 && listProduct.length % 2 !== 0) {
                  return <View/>
                }
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
          </View>
        )
      case "2":
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Notifycaton Screensssss</Text>
        </View>)
      case "3":
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Notifycaton Screensssss</Text>
        </View>)
      case "4":
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
                {getIcon(item?.key, color)}
                <View style={styles.gap} />
              </TouchableOpacity>
            )
          }}
        />
      </View>
    )
  }
  const handleSearchProduct = () => {
    onRefresh()
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center'}}>
      <Header
        headerText={undefined} 
        isBack={true}
        isIconFilter={true}
        typeInput={E_TYPE_INPUT.BORDER}
        style={{borderColor: R.colors.white}}
        isFocusInput={true}
        onChangeText={(value: string) => setTextSearch(value)}
        onSubmit={onRefresh}
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
    </View>
  );
}

export default Search

const getIcon = (index: any, color: string) => {
  switch (index) {
    case "4":
      return <MaterialCommunityIcons name="chevron-down" size={WIDTH(20)} color={color} />
    default:
      return null
  }
}