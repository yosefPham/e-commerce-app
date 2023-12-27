import React, {useContext, useEffect, useState} from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Platform, ToastAndroid } from 'react-native';
import { List } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import R from '../../../assets/R';
import { Header } from '../../../components/Headers/Header';
import ScreenName from '../../../navigation/screen-name';
import { getFont, getWidth, HEIGHT, notifyMessage, WIDTH } from '../../../configs/functions';
import { getAccount, getNotifications, putNoti } from '../../../apis/functions/user';
import ItemEmpty from '../../../components/Item/ItemEmpty';
import ItemFunction from '../../../components/Item/ItemFunction';
import { ESystemRoles, E_ROLE_ORDER, E_STATUS_WALLET, E_TYPE_NOTIFICATION } from '../../../types/emuns';
import { AuthContext } from '../../../context/AuthContext';

const Notification = () => {
    const { role } = useContext(AuthContext)
    const navigation: any = useNavigation()
    const [loading, setLoading] = useState<boolean>(false)
    const [listNoti, setListNoti] = useState<any>()
    const getData = async () => {
        const res = await getNotifications() 
        if (res.status === "OK") {
            setListNoti(res?.data ?? [])
        }
    }
    useEffect(() => {
        getData()
    }, [])
    
    useEffect(() => {},[listNoti])
    const handleScreenMove = async (type: string, id: string) => {
        const res = await putNoti(id)
        switch (type) {
            case E_TYPE_NOTIFICATION.ORDER_CREATED:
                navigation.navigate(ScreenName.Order, {index: 0, role: E_ROLE_ORDER.SELL})
                break;
            case E_TYPE_NOTIFICATION.ORDER_CANCEL:
                navigation.navigate(ScreenName.Order, {index: 4, role: E_ROLE_ORDER.SELL})
                break;
            case E_TYPE_NOTIFICATION.ORDER_DONE:
                navigation.navigate(ScreenName.Order, {index: 3, role: E_ROLE_ORDER.SELL})
                break;
            case E_TYPE_NOTIFICATION.ORDER_ACCEPTED:
                navigation.navigate(ScreenName.Order, {index: 0, role: E_ROLE_ORDER.BUY})
                break;
            case E_TYPE_NOTIFICATION.ORDER_DELIVERY:
                navigation.navigate(ScreenName.Order, {index: 1, role: E_ROLE_ORDER.BUY})
                break;
            case E_TYPE_NOTIFICATION.ORDER_REJECTED:
                navigation.navigate(ScreenName.Order, {index: 0, role: E_ROLE_ORDER.BUY})
                break;
            case E_TYPE_NOTIFICATION.USER_CREATED:
                navigation.navigate(ScreenName.Account)
                break;
            case E_TYPE_NOTIFICATION.WALLET_REQUIRE_DEPOSIT:
                navigation.navigate(ScreenName.TransactionManage, { status: E_STATUS_WALLET.DEPOSIT_PENDING})
                break;
            case E_TYPE_NOTIFICATION.WALLET_REQUIRE_WITHDRAW:
                navigation.navigate(ScreenName.TransactionManage, { status: E_STATUS_WALLET.WITHDRAW_REQUEST})
                break;
            case E_TYPE_NOTIFICATION.WALLET_ACCEPTED_DEPOSIT:
            case E_TYPE_NOTIFICATION.WALLET_ACCEPTED_WITHDRAW:
            case E_TYPE_NOTIFICATION.WALLET_REFUND:
                navigation.navigate(ScreenName.TransactionHistory)
                break;
        }
    }
    return (
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%' }}>
            <Header
                isBack={role === ESystemRoles.ADMIN}
                headerText={"Thông báo"} 
                isSearch={false}
            />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <List
                    data={listNoti}
                    extraData={listNoti}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }: any) => {
                    return (
                        <ItemFunction
                            customStyles={{backgroundColor: R.colors.white, marginVertical: HEIGHT(4)}} 
                            item={{
                                name: item?.title,
                                color: R.colors.primary,
                                iconName: 'ellipse',
                                logo: item?.logo,
                                sizeIcon: 8
                            }} 
                            onPress={() => handleScreenMove(item?.type, item?.id)}
                            body={<View style={{flexDirection: 'row', alignItems: 'center', marginVertical: WIDTH(5), marginLeft: WIDTH(12)}}>
                                <Icon name="megaphone" size={15} color={R.colors.yellow600}/>
                                <Text style={{color: R.colors.gray50, marginLeft: WIDTH(5)}}>{item?.content}</Text>
                            </View>}
                            disabled={item?.seen}
                        />
                    )
                    }}
                    numColumns={1}
                    onEndReachedThreshold={0.1}
                    // onEndReached={onLoadMore}
                    maxToRenderPerBatch={6}
                    initialNumToRender={6}
                    style={styles.list}
                    columnWrapperStyle={undefined}
                    refreshing={loading}
                    ListFooterComponent={<View style={R.themes.gap} />}
                    onRefresh={getData}
                    ListEmptyComponent={<ItemEmpty/>}
                />
            </View>
        </View>
    );
}

export default Notification


const styles = StyleSheet.create({
  list: {
    width: getWidth(),
    backgroundColor: R.colors.gray1,
    paddingHorizontal: WIDTH(5),
    paddingVertical: HEIGHT(10)
  },
})