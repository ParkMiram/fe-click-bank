import React, {useEffect, useState} from 'react';
import { TouchableOpacity, Image, TextInput, Text, Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import {getCardProduct} from "../../component/api/CardListApi";
import {Path, Svg} from "react-native-svg";

interface CardProductResponse {
    cardProductId: number;
    cardProductName: string;
    cardBenefits: string;
    cardAnnualFee: number;
    cardImg: string;
}

const { width, height } = Dimensions.get('window');

export default function CardInformation({ route, navigation }:any) {
    const id:number = route.params?.id;
    const [cardProduct, setCardProduct] = useState<CardProductResponse>();
    const token = route.params?.token;

    useEffect(() => {
        getCardProductInfo();
    },[])

    const getCardProductInfo = async ()  => {
        try {
            const res = await getCardProduct(id);
            setCardProduct(res.data.data.getCardProduct);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.nameContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Svg
                            width={10}
                            height={16}
                            fill="none"
                            viewBox="0 0 8 14"
                        >
                            <Path stroke="#222" d="M7 1 1 7l6 6" />
                        </Svg>
                    </TouchableOpacity>
                    <Text style={styles.cardText}>카드 정보</Text>
                </View>
                <View style={styles.wrap}>
                    <View style={styles.header}>
                        <View style={styles.cardImageContainer}>
                            <Image style={styles.cardImage} source={{ uri: cardProduct?.cardImg }} />
                        </View>
                        <View style={styles.cardInformation}>
                            <View style={styles.cardContainer}>
                                <Text style={styles.cardName}>{cardProduct?.cardProductName}</Text>
                            </View>
                            <View style={styles.cardBenefits}>
                                <Text style={styles.cardDescription}>카드 설명</Text>
                                <Text style={styles.cardBenefitsText}>{cardProduct?.cardBenefits}</Text>
                            </View>
                        </View>
                    </View>
                    {/*<View style={styles.feeContainer}>*/}
                    {/*    <Text style={[styles.feeText, { fontWeight: 'bold' }]}>연회비</Text>*/}
                    {/*    <Text style={styles.feeText}>{cardProduct?.cardAnnualFee.toLocaleString()}원</Text>*/}
                    {/*</View>*/}
                    <View style={styles.cardDetailDescription}>
                        <Text style={styles.cardDetailDescriptionTitle}>카드 상세 설명</Text>
                        <View>
                            <Text>여기는 카드 상세 설명이 들어가는 설명칸입니다. 여기는 카드 상세 설명이 들어가는 설명칸입니다. 여기는 카드 상세 설명이 들어가는 설명칸입니다. 여기는 카드 상세 설명이 들어가는 설명칸입니다. 여기는 카드 상세 설명이 들어가는 설명칸입니다. 여기는 카드 상세 설명이 들어가는 설명칸입니다.여기는 카드 상세 설명이 들어가는 설명칸입니다. </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.applyButton} onPress={() =>
                    navigation.navigate('ApplicantInformationCheck', {
                        cardCheck: "CHECK",
                        cardTransportation: "PREPATMENT",
                        id,
                        token,
                    })}
                >
                    <Text style={styles.applyButtonText}>신청하기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
         backgroundColor: 'white',
    },
    innerContainer: {
        flex: 1,
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrap: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    nameContainer: {
        width: width - 40,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 5,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardImageContainer: {
        alignItems: 'center',
    },
    cardImage: {
        width: 100,
        height: 160,
        borderRadius: 10,
    },
    cardDetails: {
        alignItems: 'center',
        marginVertical: 10,
        justifyContent:'space-between',
    },
    cardInformation: {
        marginLeft: 20,
        flex: 1,
        justifyContent: 'space-between'
    },
    cardName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardBenefits: {
        flex: 1,
        marginTop: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
    },
    cardDescription: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardBenefitsText: {
        marginTop: 5
    },
    feeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 10
    },
    feeText: {
        fontSize: 14,
    },
    cardDetailDescription: {
        width: '100%',
        borderRadius: 10,
        padding: 20,
        flex: 1,
        marginTop: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd'
    },
    cardDetailDescriptionTitle: {
        width: '100%',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10
    },
    applyButton: {
        backgroundColor: '#007378',
        width: width - 40,
        height: 40,
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    applyButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
    cardContainer: {}
});