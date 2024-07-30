import React, { useState } from 'react';
import { Image, Text, FlatList, Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, View, TouchableOpacity } from 'react-native';
import MyCardInformation from './CardInformation';
import { TextInput } from 'react-native-paper';

('../../assets/image/more.png')


interface CardResponse {
    cardImg: string;
}

export default function AddCardList({ route, navigation }: any) {
    const [cards, setCards] = useState<CardResponse[]>([
        // { cardImg: 'https://via.placeholder.com/150' }, // 실제 카드 이미지 URL로 교체
        { cardImg: 'https://via.placeholder.com/160' }, 
        { cardImg: ('../../assets/image/more.png') }  
    ]);

    const token = route.params?.token;

    const renderItem = ({ item }: { item: CardResponse }) => (
        // <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate(MyCardInformation)}>
                <Image source={{ uri: item.cardImg }} style={styles.cardImg} />
            </TouchableOpacity>
        // </View>
    );

   

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.cardText}>카드 목록</Text>
                </View>
                <FlatList
                    data={cards}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.flatListContainer}
                    // numColumns={2} // 2개의 열로 카드 표시
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
        alignItems: 'center',
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
        width: 150,
        height: 200,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardImg: {
        width: 140,
        height: 190,
        borderRadius: 10,
    },
    plusIcon: {
        width: 50,
        height: 50,
        tintColor: 'grey',
    }
});
