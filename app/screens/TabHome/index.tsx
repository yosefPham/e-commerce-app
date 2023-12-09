import React, { useState, useEffect, useRef } from "react"
import { View, TouchableOpacity, FlatList, Text } from "react-native"
import { TabView } from "react-native-tab-view"

import Icon from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import styles from "./styles"
import R from "../../assets/R"
import Home from "./Home"
import Profile from "./Profile"
import { WIDTH } from "../../configs/functions"
const route = [
  { key: "1", title: "Home" },
  { key: "2", title: "Thông báo" },
  { key: "3", title: "Tôi" },
]
const TabMain = (props : any) => {
  const { navigation, route: rot } = props
  const initIndex = rot?.params?.initIndex ?? 0
  const [currentIndex, setIndex] = useState(initIndex)
  const [routes, setRoutes] = useState(route)
  const timeOut = useRef(null)
  const [isDisable, setIsDisable] = useState(false)
//   useEffect(() => {
//     global.isOpened = true
//   }, [])
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
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Home navigation={navigation}/>
      </View>)
      case "2":
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Notifycaton Screensssss</Text>
      </View>)
      case "3":
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Profile navigation={navigation}/>
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
                style={styles.flex}
              >
                {getIcon(item?.key, color)}
                <View style={styles.gap} />
                <Text style={{ color, fontSize: WIDTH(10), margin: 0 }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{
          index: currentIndex,
          routes,
        }}
        renderScene={renderScene}
        swipeEnabled={false}
        tabBarPosition="bottom"
        onIndexChange={(index: number) => setIndex(index)}
      />
    </View>
  )
  // }
}

export default TabMain

const getIcon = (index: any, color: string) => {
  switch (index) {
    case "1":
      return <Icon name={"ios-home-sharp"} size={WIDTH(20)} color={color} />
    case "2":
      return <Icon name={"ios-notifications"} size={WIDTH(20)} color={color} />
    case "3":
      return <Icon name={"person-circle-outline"} size={WIDTH(20)} color={color} />
      default:
      return <Icon name={"file-tray-stacked"} size={WIDTH(20)} color={color} />
  }
}
