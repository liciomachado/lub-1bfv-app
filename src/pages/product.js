import React from 'react';
import { Text } from "react-native";

export default function Product({ route })  {
    return(
        <Text>{route.params?.product.url}</Text>
    )
}
Product.navigationOptions = ({ route }) => ({
    title: route.params.product.title
});
