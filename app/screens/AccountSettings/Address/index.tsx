import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { List } from "@ui-kitten/components";

import { Header } from "../../../components/Headers/Header";
import ItemFunction from "../../../components/Item/ItemFunction";
import R from "../../../assets/R";
import ScreenName from "../../../navigation/screen-name";
import ButtonText from "../../../components/Button/ButtonText";
import { E_TYPE_BUTTON } from "../../../types/emuns";
import { getFont, getHeight, getWidth, HEIGHT, WIDTH } from "../../../configs/functions";
import { delAddress, getListAddressUser } from "../../../apis/functions/user";
import ItemEmpty from "../../../components/Item/ItemEmpty";
import LoadingComponent from "../../../common/Loading/LoadingComponent";

const Address = ({navigation, route}: any) => {
  const onPress = route?.params?.onPress;
  const [listData, setListData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const notifyMessage = (msg: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.TOP)
    }
  }
  const getData = async() => {
    const res = await getListAddressUser()
    if (res?.data?.status === "OK") {
      setListData(res?.data?.data)
    }
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }
  const handleDel = async(id: string) => {
    const res = await delAddress(id)
    if (res?.status === "OK") {
      notifyMessage(res?.data ?? 'Xoá thành công')
    }
    getData()
  }
  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
  }, [listData])
  if (loading) {
    return (
      <View style={{alignItems: 'center', height: getHeight()}}>
        <Header
          isBack={true}
          isSearch={false}
          headerText={'Địa chỉ'}
        />
        <LoadingComponent isLoading={loading}/>
      </View>
    )
  }
  return (
    <View style={{alignItems: 'center'}}>
      <Header
        isBack={true}
        isSearch={false}
        headerText={'Địa chỉ'}
      />
      <List
        data={listData}
        extraData={listData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }: any) => {
          return (
            <ItemAddress 
              item={item ?? {}} 
              onDel={handleDel} 
              navigation={navigation} 
              getData={getData}
              onPress={onPress && onPress}
            />
          )
        }}
        numColumns={1}
        onEndReachedThreshold={0.1}
        maxToRenderPerBatch={6}
        initialNumToRender={6}
        style={styles.list}
        columnWrapperStyle={undefined}
        ListEmptyComponent={<ItemEmpty/>}
        ListFooterComponent={<View style={R.themes.gap} />}
      />
      <ButtonText
        onPress={() => navigation.navigate(ScreenName.NewAddress, { onRefresh: getData})}
        title="Thêm địa chỉ mới"
        icon="add-circle-outline"
        colorIcon={R.colors.primary}
        type={E_TYPE_BUTTON.OUTLINE}
        customStyle={{width: '98%', height: HEIGHT(45)}}
      />
    </View>
  )
}

export default Address

const ItemAddress = ({item, onDel, navigation, getData, onPress}: any) => {
  return (
    <TouchableOpacity disabled={!onPress} style={styles.address} onPress={() => {
      if(onPress) {
        onPress(item)
        navigation.goBack()
      }
    }}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: HEIGHT(5)}}>
        <Text style={{fontSize: getFont(16), fontWeight: '500', paddingRight: HEIGHT(5), borderRightWidth: 1, borderRightColor: R.colors.gray30}}>{item?.recipientName ?? "Phạm Văn Hoàn"}</Text>
        <Text style={{fontSize: getFont(16), color: R.colors.gray8B, paddingLeft: HEIGHT(5)}}>{item?.phone ?? "0395 474 001"}</Text>
      </View>
      <Text style={{fontSize: getFont(14), color: R.colors.gray8B, marginBottom: HEIGHT(10)}}>{`${item?.detail ?? ''} ${item?.ward ?? ''} ${item?.district ?? ''} ${item?.province ?? ''}`}</Text>
      {item?.default && <Text style={{color: R.colors.primary, fontSize: getFont(13), marginBottom: HEIGHT(10)}}>Mặc định</Text>}
      {!onPress && 
      <View style={{flexDirection: 'row', paddingTop: HEIGHT(5), borderTopWidth: 0.5, borderTopColor: R.colors.gray50, justifyContent: 'flex-end'}}>
        <TouchableOpacity onPress={() => onDel(item?.id)}>
          <Text style={{color: R.colors.red800}}>Xoá</Text>
        </TouchableOpacity>
      </View>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  list: {
    width: getWidth(),
    backgroundColor: R.colors.gray1,
    paddingHorizontal: WIDTH(5),
    paddingVertical: HEIGHT(10)
  },
  address: {
    backgroundColor: R.colors.white,
    paddingHorizontal: WIDTH(15),
    paddingTop: HEIGHT(20),
    paddingBottom: HEIGHT(10),
    marginBottom: HEIGHT(10),
  }
})