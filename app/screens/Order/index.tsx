import React, {useEffect, useState, useRef} from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform, ToastAndroid, Alert } from 'react-native';
import { TabView } from 'react-native-tab-view';

import ButtonText from '../../components/Button/ButtonText';
import R from '../../assets/R';
import { Header } from '../../components/Headers/Header';
import { getFont, notifyMessage, WIDTH } from '../../configs/functions';
import { E_ROLE_ORDER, E_TYPE_BUTTON, E_TYPE_ORDER_STATUS } from '../../types/emuns';
// import ItemProducts from './components/ItemListProduct';
import styles from './styles';
import ScreenName from '../../navigation/screen-name';
import { delProduct, getListOrder, getListProductOwner, putStatusCancelOrderByBuy, putStatusDoneOrderByBuy, putStatusOrderBySell } from '../../apis/functions/product';
import ItemOrder from './components/ItemOrder';
import { List } from '@ui-kitten/components';
import ItemEmpty from '../../components/Item/ItemEmpty';

const tabName = [
  { key: E_TYPE_ORDER_STATUS.PENDING, title: "Chờ xác nhận" },
  { key: E_TYPE_ORDER_STATUS.DELIVERY, title: "Chờ giao hàng" },
  { key: E_TYPE_ORDER_STATUS.DONE, title: "Đã giao hàng" },
  { key: E_TYPE_ORDER_STATUS.CANCEL, title: "Đã huỷ" },
  { key: E_TYPE_ORDER_STATUS.IGNORE, title: "Trả hàng" },
]
const tabRejected = [
  { key: E_TYPE_ORDER_STATUS.REJECTED, title: "Người bán" },
  { key: E_TYPE_ORDER_STATUS.CANCEL, title: "Người mua" },
]
const Search = ({ navigation, route }: any) => {
  const tabIndex = route?.params?.index
  const role = route?.params?.role ?? E_ROLE_ORDER.BUY
  console.log('role', role)
  const initIndex = tabIndex ?? 0
  const flatListRef: any = useRef(null);
  const [loading, setLoading] = useState<boolean>(false)
  const [currentIndex, setIndex] = useState(initIndex)
  const [routes, setRoutes] = useState(tabName)
  const [listProduct, setListProduct] = useState<any[]>([])
  const [listOrder, setListOrder] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [status, setStatus] = useState<string>(tabName[initIndex]?.key)
  const currentPage = useRef<number>(0)
  const getData = async () => {
    setLoading(true)
    const res = await getListOrder(status, role ?? "BUY")
    console.log("res", res)
    if (res?.data?.status === "OK") {
      setListOrder(res?.data?.data)
    } else {
      setListOrder([])
    }
    setLoading(false)
  }
  useEffect(() => {
    onChangeIndex(initIndex)
  }, [initIndex])
  useEffect(() => {
    const isKeyExists = tabName.some(item => item.key === E_TYPE_ORDER_STATUS.ACCEPTED);
    if (role === E_ROLE_ORDER.SELL && !isKeyExists) {
      tabName.splice(1, 0, { key: E_TYPE_ORDER_STATUS.ACCEPTED, title: "Chờ lấy hàng" });
    } else if (role !== E_ROLE_ORDER.SELL && isKeyExists) {
      tabName.splice(1, 1);
    }
  }, [])
  useEffect(() => {
    getData()
  }, [status])
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
    getData()
  }
  const onChangeIndex = (index: number) => {
    if (currentIndex !== index) {
      setIndex(index)
      setStatus(tabName[index]?.key)
    }
  }
  const onPress = (item: any) => {
    navigation.navigate(ScreenName.DetailOrder, { item: item, role: role, onChangeStatus: handleStatusOrderChangeByBuy })
  }
  const handleStatusOrderChangeBySell = async (id: string, status: string) => {
    Alert.alert(
      'Thông báo!',
      `${status === E_TYPE_ORDER_STATUS.REJECTED ? "Bạn có chắc chắn muốn từ chối đơn hàng không?" :
      status === E_TYPE_ORDER_STATUS.ACCEPTED ? "Bạn có chắc chắn chấp nhận đơn hàng không?" : 
      status === E_TYPE_ORDER_STATUS.DELIVERY ? "Xác nhận nếu bạn đã giao hàng cho bên vận chuyển?":
      "Xác nhận nếu bạn đã giao hàng cho bên vận chuyển?"}`,
      [
        {
          text: 'Huỷ bỏ',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          onPress: async () => {
            let newStatus = status?.toLowerCase()
            if (status === E_TYPE_ORDER_STATUS.ACCEPTED) newStatus = "accept"
            if (status === E_TYPE_ORDER_STATUS.REJECTED) newStatus = "reject"
            const res = await putStatusOrderBySell(id, newStatus)
            console.log(res)
            switch (status) {
              case E_TYPE_ORDER_STATUS.REJECTED:
                onChangeIndex(4)
                notifyMessage(`${res?.message}`)
                break
              case E_TYPE_ORDER_STATUS.ACCEPTED:
                onChangeIndex(1)
                notifyMessage(`${res?.message}` ?? "Đã chấp nhận đơn hàng, vui lòng chuẩn bị hàng!")
                break
              case E_TYPE_ORDER_STATUS.DELIVERY:
                onChangeIndex(2)
                notifyMessage(`${res?.message}`)
                break
              default:
                notifyMessage(`${res?.message}` ?? "Có lỗi xảy ra!")
                break
            }
          },
        },
      ],
      { cancelable: false }
    ); 
  }
  const handleStatusOrderChangeByBuy = async (item: any, type: number) => {
    Alert.alert(
        'Cảnh báo!',
        `${type === 0 ? "Bạn có chắc chắn muốn huỷ đơn hàng không?" :
        "Bạn đã chắc chắn nhận được hàng chưa, nếu xác nhận bạn sẽ không thể thực hiện trả hàng?"}`,
        [
          {
            text: 'Huỷ bỏ',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Xác nhận',
            onPress: async () => {
                if (type === 0) {
                    if (item?.orderStatus === E_TYPE_ORDER_STATUS.PENDING) {
                        const res = await putStatusCancelOrderByBuy(item?.id)
                        console.log('res', res)
                        if (res.status === "OK") {
                          navigation.goBack()
                          onChangeIndex(3)
                          notifyMessage(res?.message)
                        } else {
                          navigation.goBack()
                          onChangeIndex(2)
                          notifyMessage(res?.message)
                        }
                    }
                } else if (type === 1) {
                    if (item?.orderStatus === E_TYPE_ORDER_STATUS.DELIVERY) {
                        const res = await putStatusDoneOrderByBuy(item?.id)
                        if (res.status === "OK") {
                            navigation.navigate(ScreenName.Order, {index: 2})
                            notifyMessage(res?.message)
                        } else {
                            notifyMessage(res?.message)
                        }
                    }
                }
            },
          },
        ],
        { cancelable: false }
    ); 
  }
  const renderScene = ({ route }: any) => {
    if (route.key === status && route.key === E_TYPE_ORDER_STATUS.CANCEL) {
      return (
        <View style={styles.container}>
        <TabView
          renderTabBar={() => {
            return (
              <View style={styles.tabContainer}>
                <FlatList
                  extraData={tabRejected}
                  data={tabRejected}
                  keyExtractor={(item) => `TAB_ORDER_${item?.title}`}
                  horizontal
                  pagingEnabled
                  style={[styles.row]}
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
          }}
          navigationState={{
            index: currentIndex,
            routes,
          }}
          renderScene={({ route }: any) => 
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <List
                data={listOrder}
                extraData={listOrder}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }: any) => {
                  return (
                    <ItemOrder onChangeOrderStatus={handleStatusOrderChangeByBuy} role={role} item={item ?? {}} route={route} key={index} onPress={onPress} status={route?.title}/>
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
            </View>
          }
          swipeEnabled={true}
          tabBarPosition="top"
          onIndexChange={(index: number) => setIndex(index)}
        />
      </View>
      )
    } else if (route.key === status) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <List
            data={listOrder}
            extraData={listOrder}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }: any) => {
              return (
                <ItemOrder onChangeOrderStatus={handleStatusOrderChangeBySell} role={role} item={item ?? {}} route={route} key={index} onPress={onPress} status={route?.title}/>
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
        </View>
      )
    } else {
      return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <List
          data={[]}
          extraData={[]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }: any) => {
            return (
              <ItemOrder item={item ?? {}} route={route} key={index} onPress={onPress} status={route?.title}/>
            )
          }}
          numColumns={1}
          onEndReachedThreshold={0.1}
          maxToRenderPerBatch={6}
          initialNumToRender={6}
          style={styles.list}
          columnWrapperStyle={undefined}
          refreshing={loading}
          onRefresh={onRefresh}
          ListFooterComponent={<View style={R.themes.gap} />}
          ListEmptyComponent={<ItemEmpty/>}
        />
    </View>)
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
