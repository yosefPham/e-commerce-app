import { List } from '@ui-kitten/components';
import { AuthContext } from '../../../context/AuthContext';
import React, {useEffect, useState, useRef, useContext} from 'react';
import { View, Text, Button, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { getListProductClient } from '../../../apis/functions/product';
import R from '../../../assets/R';
import { Header } from '../../../components/Headers/Header';
import ItemProduct from '../../../components/Item/ItemProduct';
import { formatCurrency, getFont, getWidth, HEIGHT, WIDTH } from '../../../configs/functions';
import ScreenName from '../../../navigation/screen-name';

import styles from './styles';
import ItemEmpty from '../../../components/Item/ItemEmpty';

const data = [1, 2, 1, 1, 1, 1]
const Home = ({ navigation }: any) => {
  const { token } = useContext(AuthContext)
  console.log('token', token)
  const [listProduct, setListProduct] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const currentPage = useRef<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const getNextTimeFrame = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const timeFrames = [2, 11, 14, 17, 20, 24];
    const nextTimeFrame = timeFrames.find(frame => frame > currentHour) || timeFrames[0];
    return nextTimeFrame;
  };
  const [targetHour, setTargetHour] = React.useState(getNextTimeFrame());
  function calculateTimeRemaining() {
    const currentTime: any = new Date();
    const targetTime: any = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), targetHour, 0, 0, 0);
    const timeRemaining = Math.max(0, Math.floor((targetTime - currentTime) / 1000));
    return timeRemaining;
  }
  const [timeRemaining, setTimeRemaining] = React.useState(calculateTimeRemaining());
  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   setTimeRemaining(prevTimeRemaining => {
    //     const newTimeRemaining = Math.max(0, prevTimeRemaining - 1);
    //     if (newTimeRemaining === 0) {
    //       setTargetHour(getNextTimeFrame());
    //       return calculateTimeRemaining();
    //     }
    //     return newTimeRemaining;
    //   });
    // }, 1000);
    // return () => clearInterval(intervalId);
  }, [targetHour]);
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  const getData = async () => {
    try {
      setLoading(true)
      const res = await getListProductClient(currentPage.current, 7, "id")
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
      const res = await getListProductClient(currentPage.current, 7, "id")
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
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingVertical: HEIGHT(50) }}>
      <Header 
        headerText={undefined} 
        isBack={false} 
        isIconCart={true} 
        isIconMessage={true}
        onPressInputSearch={() => navigation.navigate(ScreenName.Search)}
      />
      <View>
        <List
          data={listProduct}
          extraData={listProduct}
          ListHeaderComponent={
            <>
              <TouchableOpacity activeOpacity={0.7} style={styles.gap}>
                <Text style={[styles.title, {fontWeight: '900'}]}>F<Icon name='flash' size={20} style={styles.flashIcon}/>ASH 
                  <Text style={{fontWeight: '500'}}> SALE </Text>{" "}
                  <Text style={styles.countdown}> {hours < 10 ? `0${hours}`: hours} </Text>{" : "}
                  <Text style={styles.countdown}> {minutes < 10 ? `0${minutes}`: minutes} </Text>{" : "}
                  <Text style={styles.countdown}> {seconds < 10 ? `0${seconds}`: seconds} </Text>
                </Text>
                <View style={styles.viewMore}>
                  <Text style={{fontSize: getFont(16), color: R.colors.gray6}}>Xem tất cả</Text>
                  <Icon name='chevron-forward-sharp' size={20} color={R.colors.gray6}/>
                </View>
              </TouchableOpacity>
              <List
                data={data}
                horizontal={true}
                extraData={data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }: any) => {
                  return (
                    <ItemShop item={item ?? {}} isFlashSale={true}/>
                  )
                }}
                ListFooterComponent={
                  <TouchableOpacity style={styles.viewAll}>
                    <Icon name='chevron-forward-circle-outline' size={30} color={R.colors.primary}/>
                    <Text style={{color: R.colors.primary}}>Xem tất cả</Text>
                  </TouchableOpacity>
                }
                onEndReachedThreshold={0.1}
                maxToRenderPerBatch={6}
                initialNumToRender={6}
                style={styles.list}
                showsHorizontalScrollIndicator={false}
              />
              <TouchableOpacity activeOpacity={0.7} style={styles.gap}>
                <Text style={styles.title}>SHOP GẦN BẠN</Text>
                <View style={styles.viewMore}>
                  <Text style={{fontSize: getFont(16), color: R.colors.gray6}}>Xem thêm</Text>
                  <Icon name='chevron-forward-sharp' size={20} color={R.colors.gray6}/>
                </View>
              </TouchableOpacity>
              <FlatList
                data={data}
                horizontal={true}
                extraData={data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }: any) => {
                  return (
                    <ItemShop item={item ?? {}}/>
                  )
                }}
                ListFooterComponent={
                  <TouchableOpacity style={styles.viewAll}>
                    <Icon name='chevron-forward-circle-outline' size={30} color={R.colors.primary}/>
                    <Text style={{color: R.colors.primary}}>Xem thêm</Text>
                  </TouchableOpacity>  
                }
                onEndReachedThreshold={0.1}
                maxToRenderPerBatch={6}
                initialNumToRender={6}
                style={styles.list}
                showsHorizontalScrollIndicator={false}
              />
              <View style={styles.gap}>
                <Text style={styles.title}>GỢI Ý HÔM NAY</Text>
              </View>
            </>
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }: any) => {
            if (listProduct.length === index + 1 && listProduct.length % 2 !== 0) {
              return <View/>
            }
            return (
              <ItemProduct key={index} item={item ?? {}} style={{width: WIDTH(20)}}/>
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
        />
      </View>
    </View>
  );
}

export default Home
type Props = {
  item: any
  isFlashSale?: boolean
}
const ItemShop = ({ item, isFlashSale }: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          source={{uri: !isFlashSale ? "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljrwvuvg4v5g3f" : "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-loe2hc9geb5fe1"}}
          style={styles.image}
        />
      </View>
      {isFlashSale ? (
      <View style={styles.containerFlashSale}>
        <Text style={{color: R.colors.primary, fontSize: getFont(18), fontWeight: '700'}}>{formatCurrency(item?.price ?? 250000) ?? "đ250.000"}</Text>
        <View style={styles.quantitySold}>
          <View style={{flexDirection: 'row', position: 'absolute', top: 0}}>
            <View style={{backgroundColor: R.colors.primary, width: '30%'}}>
              <Text> {" "}</Text>
            </View>
            <View style={{backgroundColor: R.colors.borderC, width: '70%'}}>
              <Text> {" "}</Text>
            </View>
          </View>
          <Text style={{color: R.colors.white, fontSize: getFont(13), fontWeight: '700', lineHeight: HEIGHT(20)}}>ĐÃ BÁN {item?.quatitySold ?? 15}</Text>
        </View>
      </View>
      ) : (
      <View style={{marginHorizontal: WIDTH(0), marginVertical: HEIGHT(10), width: "100%"}}>
        <Text 
          style={{fontSize: getFont(14), marginLeft: WIDTH(5)}}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {item?.shopName ?? "Macco Beauty"}
        </Text>
        <View style={styles.footer}>
          <Text style={{color: R.colors.gray6B, fontSize: getFont(14), marginLeft: WIDTH(5)}}>{item?.address ?? "Hà Nội"}</Text>
          <Text style={{color: R.colors.primary, fontSize: getFont(14), marginRight: WIDTH(5)}}>
            <Icon name='location-outline' size={14}/>{" "}
            {item?.distance ?? 970} m
          </Text>
        </View>
      </View>
      )}
    </TouchableOpacity>
  )
}