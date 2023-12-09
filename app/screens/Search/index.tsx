import React, {useEffect, useState, useRef} from 'react';
import { View, Text, Button, TouchableOpacity, FlatList } from 'react-native';
import { TabView } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import R from '../../assets/R';

import { Header } from '../../components/Headers/Header';
import { HEIGHT, WIDTH } from '../../configs/functions';
import { E_TYPE_INPUT } from '../../types/emuns';
import ItemProducts from './components/ItemListProduct';
import styles from './styles';

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
          <ItemProducts/>
        </View>)
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
  return (
    <View style={{ flex: 1, justifyContent: 'center'}}>
      <Header
        headerText={undefined} 
        isBack={true}
        isIconFilter={true}
        typeInput={E_TYPE_INPUT.BORDER}
        style={{borderColor: R.colors.white}}
        isFocusInput={true}
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