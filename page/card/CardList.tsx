import React, {useCallback, useEffect, useState} from 'react';
import {
    Image,
    Text,
    FlatList,
    Dimensions,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity, RefreshControl, ScrollView,
} from 'react-native';
import {getAllMyCard} from "../../component/api/CardListApi";
import {useFocusEffect} from '@react-navigation/native';
import {Path, Svg} from "react-native-svg";

interface CardResponse {
    cardId: number;
    cardName: string;
    cardProduct: {
        cardImg: string;
    };
}

const {width, height} = Dimensions.get('window');

export default function CardList({route, navigation}: any) {
    const token = route.params?.token;
    const [cardList, setCardList] = useState<CardResponse[]>([]);
    // 새로고침
    const [isRefreshing, setIsRefreshing] = useState(false);

    // pull to refresh
    const handleRefresh = async () => {
        setIsRefreshing(true);
        await getMyCardList();
        setIsRefreshing(false);
    };

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

    const renderItem = ({item}: { item: CardResponse }) => (
        <>
            <TouchableOpacity style={styles.cardButton}
                              onPress={() => navigation.navigate('MyCard', {id: item.cardId, token})}>
                <Image source={{uri: item.cardProduct.cardImg}} style={styles.cardImg}/>
                <Text>{item.cardName}</Text>
            </TouchableOpacity>
        </>

    );

    const renderAddCardButton = () => (
        <TouchableOpacity style={styles.cardAddButton} onPress={() => navigation.navigate('AddCardList', {token})}>
            <Image source={require('../../assets/image/more.png')} style={styles.plusIcon}/>
        </TouchableOpacity>
    );

    const combinedData: Array<CardResponse | {
        cardId: number;
        cardName: string;
        cardProduct: { cardImg: string }
    }> = [...cardList, {cardId: -1, cardName: '', cardProduct: {cardImg: ''}}];

    const renderCardList = () => {
        return (
            <View style={styles.flatListContainer}>
                {
                    combinedData.map((item, index) => (
                        <>
                            {
                                item.cardId !== -1 ?
                                <TouchableOpacity style={styles.cardButton}
                                                  onPress={() => navigation.navigate('MyCard', {
                                                      id: item.cardId,
                                                      token
                                                  })}
                                                  key={item.cardId}
                                >
                                    <Image source={{uri: item.cardProduct.cardImg}} style={styles.cardImg}/>
                                    <Text style={styles.cardName}>{item.cardName}</Text>
                                </TouchableOpacity>
                                    :
                                    <></>
                            }
                        </>
                    ))
                }
                {/* 카드 추가 */}
                <TouchableOpacity style={styles.cardAddButton}
                                  onPress={() => navigation.navigate('AddCardList', {token})}>
                    <Svg
                        width={24}
                        height={24}
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <Path
                            stroke="#222"
                            strokeLinecap="round"
                            strokeWidth={1.2}
                            d="M7 1v12M13 7H1"
                        />
                    </Svg>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                {/*<FlatList*/}
                {/*    data={combinedData}*/}
                {/*    // renderItem={({ item }) => item.cardId === -1 ? renderAddCardButton() : renderItem({ item })}*/}
                {/*    renderItem={({item}) => renderItem({item})}*/}
                {/*    keyExtractor={(item) => item.cardId.toString()}*/}
                {/*    style={styles.flatListContainer}*/}
                {/*    // numColumns={2}*/}
                {/*    refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh}/>}*/}
                {/*/>*/}
                <ScrollView
                    refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh}/>}
                >
                    {renderCardList()}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: 'white',
    },
    innerContainer: {
        flex: 1,
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    },
    flatListContainer: {
        width: width - 20,
        marginHorizontal: 10,
        marginBottom: 20,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    cardButton: {
        width: width / 2 - 30,
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 20
    },
    cardImg: {
        width: '100%',
        height: 260,
        borderRadius: 20,
    },
    cardName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5
    },
    cardAddButton: {
        width: width / 2 - 30,
        height: 260,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee',
        marginTop: 20,
        marginHorizontal: 10
    },
    plusIcon: {
        width: 50,
        height: 50,
        tintColor: 'grey',
    }
});
