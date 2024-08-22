import {
    Modal,
    Platform,
    View,
    StatusBar,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Dimensions, Alert
} from 'react-native';
import React, {useCallback, useEffect, useState} from "react";
import {getMyCard} from "../../component/api/CardListApi";
import {deleteCard} from '../../component/api/CardApi';
import {useFocusEffect} from '@react-navigation/native';
import {Circle, Svg} from "react-native-svg";

interface CardResponse {
    cardId: number
    cardName: string
    cardNumber: string
    account: string
    cardCVC: string
    cardMonthLimit: number
    cardAnnualFee: number
    cardProduct: {
        cardImg: string
        cardBenefits: string
    }
}

const {width, height} = Dimensions.get('window');

export default function MyCard({route, navigation}: any) {
    const id = route.params?.id;
    console.log("Card ID:", id);
    const [myCard, setMyCard] = useState<CardResponse>();
    const [modalVisible, setModalVisible] = useState(false);
    const token = route.params?.token;

    useFocusEffect(
        useCallback(() => {
            getMyCardInfo();
        }, [])
    );
    const getMyCardInfo = async () => {
        try {
            const res = await getMyCard(id);
            setMyCard(res.data.data.getMyCard);
            console.log(res.data.data.getMyCard);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteCard = async () => {
        Alert.alert("카드 해지", "카드 해지하시겠습니까?", [
            { text: "취소", style: "default" },
            {
                text: "삭제", style: "destructive",
                onPress: async (): Promise<void> => {
                    try {
                        if (myCard && myCard.cardNumber) {
                            await deleteCard(token, myCard.cardNumber);
                            Alert.alert("카드 해지", "해지되었습니다.");
                            navigation.goBack();
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        ]);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.cardText}>카드 정보</Text>
                    <TouchableOpacity style={styles.imageWrapper}
                                      onPress={() => navigation.navigate('EditCard', {id, token, cardName: myCard?.cardName})}>
                        <Svg
                            width={16}
                            height={4}
                            fill="none"
                            style={styles.imageMore}
                        >
                            <Circle
                                cx={8}
                                cy={2}
                                r={1}
                                stroke="#333"
                                strokeLinecap="round"
                                strokeWidth={2}
                            />
                            <Circle
                                cx={2}
                                cy={2}
                                r={1}
                                stroke="#333"
                                strokeLinecap="round"
                                strokeWidth={2}
                            />
                            <Circle
                                cx={14}
                                cy={2}
                                r={1}
                                stroke="#333"
                                strokeLinecap="round"
                                strokeWidth={2}
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'space-between', marginTop: 30 }}>
                    <View style={styles.cardContainer}>
                        <View style={styles.cardImageContainer}>
                            <Image source={{uri: myCard?.cardProduct.cardImg}} style={styles.cardImage}/>
                        </View>
                        <Text style={styles.cardName}>{myCard?.cardName}</Text>
                        <View style={styles.infoWrap}>
                            <Text style={styles.infoLabel}>카드 번호</Text>
                            <Text style={styles.infoValue}>{myCard?.cardNumber}</Text>
                        </View>
                        <View style={[styles.infoWrap, { marginTop: 10 }]}>
                            <Text style={styles.infoLabel}>연동 계좌</Text>
                            <Text style={styles.infoValue}>{myCard?.account}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.removeButton} onPress={handleDeleteCard}>
                        <Text style={styles.removeButtonText}>해지하기</Text>
                    </TouchableOpacity>
                </View>

                {/*<Modal*/}
                {/*    animationType="slide"*/}
                {/*    transparent={true}*/}
                {/*    visible={modalVisible}*/}
                {/*    onRequestClose={() => setModalVisible(false)}*/}
                {/*>*/}
                {/*    <View style={styles.modalContainer}>*/}
                {/*        <View style={styles.modalContent}>*/}
                {/*            <Text style={styles.modalText}>카드를 해지 하시겠습니까?</Text>*/}
                {/*            <View style={styles.modalButtonContainer}>*/}
                {/*                <TouchableOpacity style={styles.modalButton} onPress={handleDeleteCard}>*/}
                {/*                    <Text style={styles.modalButtonText}>확인</Text>*/}
                {/*                </TouchableOpacity>*/}
                {/*                <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>*/}
                {/*                    <Text style={styles.modalButtonText}>취소</Text>*/}
                {/*                </TouchableOpacity>*/}
                {/*            </View>*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*</Modal>*/}
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    innerContainer: {
        flex: 1,
        width: width - 40,
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        marginHorizontal: 20,
        marginBottom: 20
    },
    nameContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    closeButton: {
        // 스타일을 수정하여 아이콘 추가
    },
    closeButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    cardContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
        flex: 1
    },
    cardImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardImage: {
        width: 100,
        height: 150,
        borderRadius: 10,
    },
    cardImageText: {
        fontSize: 16,
        color: '#cfcfcf',
    },
    button: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#B7E1CE',
        marginLeft: 10
    },
    cardName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    barcodeButton: {
        backgroundColor: '#000000',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    barcodeButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center'
    },
    modalButtonText: {
        fontSize: 16
    },
    modalText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
        marginBottom: 20
    },
    cardDetailText: {
        fontSize: 14,
    },
    infoWrap: {
        width: '100%',
        backgroundColor: '#f3f3f3',
        padding: 20,
        borderRadius: 10
    },
    infoLabel: {
        color: '#888888',
        fontWeight: 'bold',
        marginBottom: 5
    },
    infoValue: {
        fontSize: 18,
    },
    infoButton: {
        backgroundColor: '#B7E1CE',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    removeButton: {
        width: '100%',
        backgroundColor: 'rgba(220,20,60,0.1)',
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    removeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#dc143c',
    },
    imageWrapper: {
        padding: 10
    },
    imageMore: {
        width: 50,
        height: 20,
        position: 'absolute',
        right: 1,
        marginTop: 5,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#B7E1CE',
    }
});