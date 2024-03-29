import Loading from 'app/components/Loading/Loading';
import * as React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import R from '../../../assets/R';
import ItemProduct from '../../../components/Item/ItemProduct';
import { getWidth, HEIGHT, WIDTH } from '../../../configs/functions';

const data = [1, 2, 1, 1, 1, 1]
const ItemProducts = () => {
  return (
    <View>
        <FlatList
          data={data}
          extraData={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }: any) => {
            return (
              <ItemProduct item={item ?? {}} isLocation={true}/>
            )
          }}
          numColumns={getWidth() >= 300 ? 2 : 1}
          // ListEmptyComponent={loading && <Loading />}
          // ListFooterComponent={loadMore && <LoadMore />}
          onEndReachedThreshold={0.1}
          // onEndReached={getMoreDataStudent}
          maxToRenderPerBatch={6}
          initialNumToRender={6}
          style={styles.list}
          columnWrapperStyle={getWidth() >= 300 ? styles.columnWrapperStyle : undefined}
          // ListFooterComponent={
          //   <View style={styles.gap}>
          //     <Text style={styles.title}>GỢI Ý HÔM NAY</Text>
          //   </View>
          // }
          // onMomentumScrollBegin={() => {
          //   beginScroll.current = true
          // }}
        />
    </View>
  );
}

export default ItemProducts

const styles = StyleSheet.create({
    columnWrapperStyle: { justifyContent: "flex-start"},
    list: {
      width: getWidth(),
      backgroundColor: R.colors.gray1,
      paddingHorizontal: WIDTH(5),
      paddingVertical: HEIGHT(10)
    },
})