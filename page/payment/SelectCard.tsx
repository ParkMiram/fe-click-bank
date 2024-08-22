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
    TouchableOpacity,
    BackHandler,
    ScrollView, RefreshControl
} from 'react-native';
import {getAllMyCard} from "../../component/api/CardListApi";
import {Path, Svg} from "react-native-svg";

interface CardResponse {
    cardId: number;
    cardName: string;
    cardProduct: {
        cardImg: string;
    };
}

const {width, height} = Dimensions.get('window');

export default function SelectCard({route, navigation}: any) {
    const {payData, token} = route.params;
    const [cardList, setCardList] = useState<CardResponse[]>([]);

    const gobackPayment = useCallback(() => {
        BackHandler.removeEventListener('hardwareBackPress', gobackPayment);
        navigation.goBack();
        return true;
    }, []);
    BackHandler.addEventListener('hardwareBackPress', gobackPayment);

    useEffect(() => {
        if (token) {
            getMyCardList();
        } else {
            console.error("Token is undefined");
        }
    }, [token]);

    const selectCard = (cardId: number) => {
        navigation.reset({
            index: 0,
            routes: [{name: 'Payment', params: {payData: payData, userToken: token, card: cardId}}]
        });
    }

    const getMyCardList = async () => {
        try {
            const res = await getAllMyCard(token);
            if (res.data && res.data.data && res.data.data.getAllMyCard) {
                setCardList(res.data.data.getAllMyCard);
            } else {
                console.error("Unexpected response structure", res);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const renderItem = ({item}: { item: CardResponse }) => (
        <TouchableOpacity style={styles.cardButton} onPress={() => selectCard(item.cardId)}>
            <Image source={{uri: item.cardProduct.cardImg}} style={styles.cardImg}/>
            <Text>{item.cardName}</Text>
        </TouchableOpacity>
    );

    const renderCardList = () => {
        return (
            <View style={styles.flatListContainer}>
                {
                    combinedData.map((item, index) => (
                        <>
                            {
                                item.cardId !== -1 ?
                                    <TouchableOpacity style={styles.cardButton}
                                                      onPress={() => selectCard(item.cardId)}
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
            </View>
        )
    }

    const combinedData: Array<CardResponse> = [...cardList];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.nameContainer}
                >
                    <Svg
                        width={10}
                        height={16}
                        fill="none"
                        viewBox="0 0 8 14"
                    >
                        <Path stroke="#222" d="M7 1 1 7l6 6"/>
                    </Svg>
                    <Text style={styles.cardText}>카드</Text>
                </TouchableOpacity>
                <ScrollView>
                    {renderCardList()}
                </ScrollView>
                {/*<FlatList*/}
                {/*    data={combinedData}*/}
                {/*    renderItem={({ item }) => renderItem({ item })}*/}
                {/*    keyExtractor={(item) => item.cardId.toString()}*/}
                {/*    contentContainerStyle={styles.flatListContainer}*/}
                {/*    numColumns={2}*/}
                {/*/>*/}
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
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    nameContainer: {
        width: width - 40,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center'
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10
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
});
