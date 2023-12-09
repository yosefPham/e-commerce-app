import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TabView } from "react-native-tab-view";         
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { Header } from "../../components/Headers/Header";
import ItemHeader from "./Item/ItemHeader";
import { getFont, getLineHeight, HEIGHT, WIDTH } from "../../configs/functions";
import R from "../../assets/R";
import ItemProducts from "./Item/ItemListProduct";
import ButtonText from "../../components/Button/ButtonText";
import { E_TYPE_BUTTON } from "../../types/emuns";
import ScreenName from "../../navigation/screen-name";

const route = [
    { key: "1", title: "Liên quan" },
    { key: "2", title: "Mới nhất" },
    { key: "3", title: "Bán chạy" },
    { key: "4", title: "Giá" },
]
const Shop = ({navigation}: any) => {
    const initIndex = 0

  const [currentIndex, setIndex] = useState(initIndex)
  const [routes, setRoutes] = useState(route)
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
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ItemProducts/>
        </View>)
      case "2":
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ItemProducts/>
        </View>)
      case "3":
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ItemProducts/>
        </View>)
      case "4":
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ItemProducts/>
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

    return (
        <View style={{ flex: 1, justifyContent: 'center'}}>
            <Header
                isBack={true}
                isIconMessage={true}
                placeHolderInput={'Tìm kiếm trong shop'}
                noBorder={true}
            />
            <ItemHeader/>
            <View style={{ flex: 1, justifyContent: 'center'}}>
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
            <ButtonText
              title="Thêm sản phẩm"
              type={E_TYPE_BUTTON.PRIMARY}
              onPress={() => navigation.navigate(ScreenName.AddNewProduct)}
              customStyle={styles.buttonText}
              customTitle={{fontSize: getFont(16), fontWeight: '600'}}
            />
        </View>
    )
}

export default Shop

const getIcon = (index: any, color: string) => {
    switch (index) {
      case "4":
        return <MaterialCommunityIcons name="chevron-down" size={WIDTH(20)} color={color} />
      default:
        return null
    }
  }


  const styles = StyleSheet.create({
    container: {
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
    }
  })