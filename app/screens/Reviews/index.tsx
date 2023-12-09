import { Header } from "../../components/Headers/Header";
import React from "react";
import { Text, View } from "react-native";

const Reviews = () => {
    return (
        <View>
            <Header
                isBack={true}
                isSearch={false}
                headerText={'Đánh giá'}
            />
            <Text>Screen Reviews</Text>
        </View>
    )
}

export default Reviews