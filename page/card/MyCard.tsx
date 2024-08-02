import { Platform,View, StatusBar,Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import {useEffect, useState} from "react";
import {getMyCard} from "../../component/api/CardListApi";

interface CardResponse {
    cardId : number
    cardName : string
    cardNumber : string
    account : string
    cardCVC : string
    cardMonthLimit: number
    cardAnnualFee : number
    cardProduct: {
        cardImg : string
        cardBenefits: string
    }
}

export default function MyCard( { route, navigation }: any ) {
    const id = route.params?.id;
    const [myCard, setMyCard] = useState<CardResponse>()


    useEffect(() => {
        getMyCardInfo();
    }, []);

    const getMyCardInfo = async () => {
        try {
            const res = await getMyCard(id);
            setMyCard(res.data.data.getMyCard);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                {/* 여기에 페이지 내용 작성 */}
                {/* <ScrollView contentContainerStyle={styles.scrollContainer}> */}
                {/* <View style={styles.header}> */}
                    {/* <Text style={styles.headerText}>카드 정보</Text> */}
                    {/* 여기에 닫기 버튼 아이콘 추가 */}
                    <View style={styles.nameContainer}>
                    <Text style={styles.cardText}>카드 정보</Text>
                </View>
                    {/* <TouchableOpacity style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity> */}
                {/* </View> */}
                <View style={styles.cardContainer}>
                    <View style={styles.cardImageContainer}>
                        <Text style={styles.cardImageText}>카드 이미지</Text>
                    </View>
                    <Text style={styles.cardName}>{myCard?.cardName}</Text>
                    <TouchableOpacity style={styles.barcodeButton}>
                        <Text style={styles.barcodeButtonText}>바코드</Text>
                    </TouchableOpacity>
                    <Text style={styles.cardDetailText}>{myCard?.cardNumber}</Text>
                    <Text style={styles.infoLabel}>포인트</Text>
                    <Text style={styles.infoValue}>100,000,000원</Text>
                    <Text style={styles.infoLabel}>연동 계좌</Text>
                    <Text style={styles.infoValue}>{myCard?.account}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.infoButton}>
                        <Text style={styles.buttonText}>이번 달 내역</Text>
                        <Text style={styles.buttonText}>전체내역보기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoButton}>
                        <Text style={styles.buttonText}>이번 달 혜택</Text>
                        <Text style={styles.buttonText}>전체혜택보기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.removeButton}>
                        <Text style={styles.removeButtonText}>해지하기</Text>
                    </TouchableOpacity>
                </View>
            {/* </ScrollView> */}
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
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        alignItems: 'center',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    nameContainer: {
        width: '85%',
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'flex-start',
    },
    cardText: {
        fontSize: 30,
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
    },
    cardImageContainer: {
        width: 100,
        height: 150,
        borderWidth: 1,
        borderColor: '#cfcfcf',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardImageText: {
        fontSize: 16,
        color: '#cfcfcf',
    },
    cardName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
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
    cardDetailText: {
        fontSize: 14,
        color: '#000000',
        marginBottom: 20,
    },
    infoLabel: {
        fontSize: 16,
        color: '#888888',
        marginBottom: 5,
    },
    infoValue: {
        fontSize: 16,
        marginBottom: 20,
    },
    buttonContainer: {
        width: '85%',
    },
    infoButton: {
        backgroundColor: '#B7E1CE',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 16,
    },
    removeButton: {
        backgroundColor: '#B7E1CE',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    removeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});