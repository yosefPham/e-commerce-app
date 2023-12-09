import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Header } from "../../../components/Headers/Header";
import ItemFunction from "../../../components/Item/ItemFunction";
import R from "../../../assets/R";
import ScreenName from "../../../navigation/screen-name";
import ButtonText from "../../../components/Button/ButtonText";
import { E_TYPE_BUTTON } from "../../../types/emuns";
import { getFont, getWidth, HEIGHT, WIDTH } from "../../../configs/functions";
import { List } from "@ui-kitten/components";

const listFunction = [
    {
      name: 'Hồ sơ',
      iconName: '',
      color: R.colors.blue2A3478,
      screenNameMove: ScreenName.Order
    },
    {
      name: 'Địa chỉ',
      iconName: '',
      color: R.colors.primary,
      screenNameMove: ScreenName.Shop
    },
  ]
  const list = [0, 1, 2, 3, 4]
const Address = ({navigation}: any) => {
    return (
      <View style={{alignItems: 'center'}}>
        <Header
          isBack={true}
          isSearch={false}
          headerText={'Địa chỉ'}
        />
        <List
          data={list}
          extraData={list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }: any) => {
            return (
              <ItemAddress item={item ?? {}}/>
            )
          }}
          numColumns={1}
          onEndReachedThreshold={0.1}
          maxToRenderPerBatch={6}
          initialNumToRender={6}
          style={styles.list}
          columnWrapperStyle={undefined}
          ListFooterComponent={<View style={R.themes.gap} />}
        />
        <ButtonText
          onPress={() => navigation.navigate(ScreenName.NewAddress)}
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

const ItemAddress = ({item}: any) => {
  return (
    <TouchableOpacity style={styles.address}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: HEIGHT(5)}}>
        <Text style={{fontSize: getFont(16), fontWeight: '500', paddingRight: HEIGHT(5), borderRightWidth: 1, borderRightColor: R.colors.gray30}}>Phạm Văn Hoàn</Text>
        <Text style={{fontSize: getFont(16), color: R.colors.gray8B, paddingLeft: HEIGHT(5)}}> 0395 474 001</Text>
      </View>
      <Text style={{fontSize: getFont(14), color: R.colors.gray8B}}>Chung cư mini Hà Dương, Lô 11, Đường Ngọc Trục 57, Khu Giãn Dân Ngọc trục, Phường Đại Mãi, Quận Nam Từ Liêm, Hà Nội</Text>
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
    paddingHorizontal: WIDTH(10),
    paddingVertical: HEIGHT(20),
    marginBottom: HEIGHT(10),
  }
})