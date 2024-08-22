import React, {useEffect, useState} from 'react';
import { Image, Text, FlatList, Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, View, TouchableOpacity } from 'react-native';
import {getAllCardProduct} from "../../component/api/CardListApi";

interface CardProductResponse {
    cardProductId: number;
    cardProductName: string;
    cardImg: string;
}

const { width, height } = Dimensions.get('window');

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
        <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('CardInformation',{ id: item.cardProductId, token })}>
            <Image source={{ uri: item.cardImg  }} style={styles.cardImg} />
            <Text style={styles.cardProductName}>{item.cardProductName}</Text>
        </TouchableOpacity>
    );

    const combinedData = [...cardProductList];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.cardText}>카드를 선택해 주세요.</Text>
                </View>
                <FlatList
                    data={combinedData}
                    renderItem={({item}) => renderItem({item})}
                    keyExtractor={(item) =>item.cardProductId.toString()}
                    contentContainerStyle={styles.flatListContainer}
                    numColumns={2} // 2개의 열로 카드 표시
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    innerContainer: {
        flex: 1,
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        justifyContent: 'flex-start',
    },
    nameContainer: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 20
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    flatListContainer: {
        width: '100%',
        alignItems: 'flex-start',
        paddingBottom: 20,
        marginHorizontal: 10
    },
    cardButton: {
        width: width / 2 - 30,
        justifyContent: 'center',
        marginHorizontal: 10
    },
    cardImg: {
        width: '100%',
        height: 260,
        borderRadius: 20,
        overflow:"hidden",
        marginBottom: 5
    },
    cardProductName: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});