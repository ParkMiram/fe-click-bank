import React, { useCallback,useEffect, useState } from 'react';
import { Image, Text, FlatList, Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, View, TouchableOpacity } from 'react-native';
import { getAllMyCard } from "../../component/api/CardListApi";
import { useFocusEffect } from '@react-navigation/native';



interface CardResponse {
    cardId: number;
    cardName: string;
    cardProduct: {
        cardImg: string;
    };
}

export default function CardList({ route, navigation }: any) {
    const token = route.params?.token;
    const [cardList, setCardList] = useState<CardResponse[]>([]);

  
    useFocusEffect(
        useCallback(() => {
            if (token) {
                getMyCardList();
            }
        }, [token])
    );

    const getMyCardList = async () => {
        try {
            const res = await getAllMyCard(token);
            if (res.data && res.data.data && res.data.data.getAllMyCard) {
                setCardList(res.data.data.getAllMyCard);
                console.log(res.data.data.getAllMyCard);
            } else {
                console.error("Unexpected response structure", res);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const renderItem = ({ item }: { item: CardResponse }) => (
        <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('MyCard', { id: item.cardId,token })}>
            <Image source={{ uri: item.cardProduct.cardImg }} style={styles.cardImg} />
            <Text>{item.cardName}</Text>
        </TouchableOpacity>
        
    );

    const renderAddCardButton = () => (
        <TouchableOpacity style={styles.cardAddButton} onPress={() => navigation.navigate('AddCardList',{token})}>
            <Image source={require('../../assets/image/more.png')} style={styles.plusIcon} />
        </TouchableOpacity>
    );

    const combinedData: Array<CardResponse | { cardId: number; cardName: string; cardProduct: { cardImg: string } }> = [...cardList, { cardId: -1, cardName: '', cardProduct: { cardImg: '' } }];



    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                {/* <View style={styles.nameContainer}>
                    <Text style={styles.cardText}>카드</Text>
                </View> */}
                <FlatList
                    data={combinedData}
                    renderItem={({ item }) => item.cardId === -1 ? renderAddCardButton() : renderItem({ item })}
                    keyExtractor={(item) => item.cardId.toString()}
                    contentContainerStyle={styles.flatListContainer}
                    numColumns={2}
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
        backgroundColor: 'white',
    },
    flatListContainer: {
        width: '100%',
        alignItems: 'flex-start',
        paddingBottom: 20,
        marginTop:15
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
    cardContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 10,
    },
    cardButton: {
        width: Dimensions.get('window').width / 2 - 60,
        height: 200,
        // borderWidth: 1.5,
        // borderColor: '#B7E1CE',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    cardAddButton:{
        width: Dimensions.get('window').width / 2 - 60,
        height: 200,
        borderWidth: 1.5,
        borderColor: '#B7E1CE',
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
