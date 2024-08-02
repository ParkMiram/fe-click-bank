import React, {useEffect, useState} from 'react';
import { Image, Text, FlatList, Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, View, TouchableOpacity } from 'react-native';
import MyCardInformation from './CardInformation';
import {getAllCardProduct} from "../../component/api/CardListApi";

interface CardProductResponse {
    cardProductId: number;
    cardProductName: string;
    cardImage: string;
}

export default function AddCardList({ route, navigation }: any) {
    const [cardProductList, setCardProductList] = useState<CardProductResponse[]>([]);
    const token = route.params?.token;

    useEffect(() => {
        getCardProductList();
    }, []);

    const getCardProductList = async () => {
        try {
            const res = await getAllCardProduct();
            console.log(res.data.data.getAllCardProduct);
            setCardProductList(res.data.data.getAllCardProduct);
        } catch (error) {
            console.log(error);
        }
    }

    const renderItem = ({ item }: { item: CardProductResponse }) => (
        <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('CardInformation',{ id: item.cardProductId })}>
            <Image source={{ uri: item.cardImage  }} style={styles.cardImg} />
            <Text>{item.cardProductName}</Text>
        </TouchableOpacity>
    );

    const combinedData = [...cardProductList];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.cardText}>카드 목록</Text>
                </View>
                <FlatList
                    data={combinedData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.flatListContainer}
                    numColumns={2} // 2개의 열로 카드 표시
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatListContainer: {
        width: '100%',
        alignItems: 'flex-start',
        paddingBottom: 20,
    },
    nameContainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'flex-start',
    },
    cardText: {
        fontSize: 30,
        marginLeft: 20,
    },
    // cardContainer: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     margin: 10,
    // },
    cardButton: {
        width: Dimensions.get('window').width / 2 - 60,
        height: 200,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    cardImg: {
        width: Dimensions.get('window').width / 2 - 60,
        height: 190,
        borderRadius: 10,
    },
    plusIcon: {
        width: 50,
        height: 50,
        tintColor: 'grey',
    }
});
