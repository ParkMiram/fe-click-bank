import React, { useState } from 'react';
import { Image, Text, FlatList, Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, View, TouchableOpacity } from 'react-native';
import MyCardInformation from './CardInformation';


interface CardResponse {
    cardImg: string;
}

export default function CardList({ route, navigation }: any) {
    const [cards, setCards] = useState<CardResponse[]>([
        // { cardImg: 'https://via.placeholder.com/150' }, 
        // { cardImg: 'https://via.placeholder.com/150' }, 
        { cardImg: ('../../assets/image/cardImg.png') }  
    ]);

    const token = route.params?.token;

    // 카드 항목 
    const renderItem = ({ item }: { item: CardResponse }) => (
        // <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('MyCard')}>
                <Image source={{ uri: item.cardImg }} style={styles.cardImg} />
            </TouchableOpacity>
        // </View>
    );

    // 카드 추가 버튼 
    const renderAddCardButton = () => (
        // <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('AddCardList')}>
                <Image source={require('../../assets/image/more.png')} style={styles.plusIcon} />
            </TouchableOpacity>
        // </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.cardText}>카드</Text>
                </View>
                <FlatList
                    data={[...cards, { cardImg: '' }]} // 카드 리스트에 빈 항목 추가
                    renderItem={({ item, index }) => item.cardImg === '' ? renderAddCardButton() : renderItem({ item })}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.flatListContainer}
                    
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
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    cardButton: {
        width: 150,
        height: 200,
        borderWidth: 1.5,
        borderColor: '#B7E1CE',
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
