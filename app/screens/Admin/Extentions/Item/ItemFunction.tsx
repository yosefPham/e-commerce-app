import { getFont, HEIGHT, WIDTH } from './../../../../configs/functions';
import * as React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import R from './../../../../assets/R';
import { Header } from './../../../../components/Headers/Header';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  item: {
    iconName: string
    color: string
    name: string
  },
  onPress(): void
}

const ItemFunction = (props: Props) => {
  const { item, onPress } = props
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => onPress()} style={styles.container}>
      <View style={styles.title}>
        <Icon name={item?.iconName} color={item?.color} size={20}/>
        <Text style={styles.name}>{item?.name}</Text>
      </View>
      <Icon name={'chevron-forward'} color={R.colors.borderC} size={20}/>
    </TouchableOpacity>
  );
}

export default ItemFunction

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: WIDTH(10),
    paddingVertical: HEIGHT(15),
    borderBottomWidth: WIDTH(0.5),
    borderColor: R.colors.borderD,
    // marginRight: WIDTH(50)
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginLeft: WIDTH(10),
  }
})