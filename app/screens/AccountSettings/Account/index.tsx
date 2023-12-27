import React, {useEffect, useState, useRef, useContext} from 'react';
import { View, Text, Platform, ToastAndroid, StyleSheet } from 'react-native';
import { List } from '@ui-kitten/components';

import ButtonText from '../../../components/Button/ButtonText';
import R from '../../../assets/R';
import { Header } from '../../../components/Headers/Header';
import { getFont, WIDTH, HEIGHT, getLineHeight, getWidth } from '../../../configs/functions';
import { ESystemRoles, E_TYPE_BUTTON } from '../../../types/emuns';
import ScreenName from '../../../navigation/screen-name';
import ItemEmpty from '../../../components/Item/ItemEmpty';
import { AuthContext } from '../../../context/AuthContext';
import { getAccountByAmdin } from '../../../apis/functions/user';
import ItemShop from '../../../components/Item/ItemShop';

const Account = ({ navigation, route }: any) => {
  const { role } = useContext(AuthContext)
  console.log('role', role)
  const headerText = route?.params?.headerText
  const initIndex = 0
  const [loading, setLoading] = useState<boolean>(false)
  const [currentIndex, setIndex] = useState(initIndex)
  const [listAccount, setListAccount] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const currentPage = useRef<number>(0)
  useEffect(() => {
    getData()
  }, [initIndex])
  useEffect(() => {
  }, [listAccount])

  const getData = async () => {
    try {
      setLoading(true)
      let res:any
      if (role === ESystemRoles.ADMIN) {
        res = await getAccountByAmdin(currentPage.current, 7, "id")
      } else {
        res = await getAccountByAmdin(currentPage.current, 7, "id")
      }
      setListAccount(res?.data?.data.content)
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
        res = await getAccountByAmdin(currentPage.current, 7, "id")
      } else {
        res = await getAccountByAmdin(currentPage.current, 7, "id")
      }
      setListAccount([...listAccount, ...res?.data?.data.content])
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
  return (
    <View style={{ flex: 1, justifyContent: 'center'}}>
      <Header
        headerText={headerText ?? 'Quản lý tài khoản'} 
        isBack={true}
        style={{borderColor: R.colors.white}}
        isSearch={false}
      />
        <List
            data={listAccount}
            extraData={listAccount}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }: any) => {
            return (
                <ItemShop item={item ?? {}} isLocation={true} onPress={() => {}}/>
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
  );
}

export default Account

const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.gray0,
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


