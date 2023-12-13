import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { TabView } from "react-native-tab-view";

import { Header } from "../../../components/Headers/Header";
import ButtonText from "../../../components/Button/ButtonText";
import R from "../../../assets/R";
import ScreenName from "../../../navigation/screen-name";
import styles from './styles';
import { formatCurrency, getFont, HEIGHT, WIDTH } from "../../../configs/functions";
import { E_TYPE_BUTTON } from "../../../types/emuns";
import { List } from "@ui-kitten/components";
import ItemProduct from "../../../components/Item/ItemProduct";
const route = [
    { key: "1", title: "Chưa thanh toán" },
    { key: "2", title: "Đã thanh toán" },
    ]
const Sales = ({navigation}: any) => {
    const initIndex = 0
    const [loading, setLoading] = useState<boolean>(false)
    const [currentIndex, setIndex] = useState(initIndex)
    const [routes, setRoutes] = useState(route)
    const [listProduct, setListProduct] = useState<any[]>([])
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
            return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <View 
                    style={{
                        height: HEIGHT(100), 
                        backgroundColor: R.colors.white, 
                        width: "100%", 
                        alignItems: 'center', 
                        justifyContent: 'center'
                    }}
                >
                    <Text style={{fontSize: getFont(30), fontWeight: '600', color: R.colors.primary}}>{formatCurrency(250000)}</Text>
                </View>
            </View>)
          case "2":
            return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
              <View 
                    style={{
                        height: HEIGHT(100), 
                        backgroundColor: R.colors.white, 
                        width: "100%", 
                        alignItems: 'center', 
                        justifyContent: 'center'
                    }}
                >
                    <Text style={{fontSize: getFont(30), fontWeight: '600', color: R.colors.primary}}>{formatCurrency(250000)}</Text>
                </View>
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
                isBack={true}
                isSearch={false}
                headerText={'Doanh thu'}
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

export default Sales
