
import { Modal, Platform, View, StatusBar, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useEffect, useState } from "react";
import { getMyCard } from "../../component/api/CardListApi";
import { deleteCard } from '../../component/api/CardApi';

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

export default function MyCard({ route, navigation }: any) {
    const id = route.params?.id;
    const [myCard, setMyCard] = useState<CardResponse>();
    const [modalVisible, setModalVisible] = useState(false);
    const token = route.params?.token;

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

    const handleDeleteCard = async () => {
        try {
            if (myCard && myCard.cardNumber) {
                await deleteCard(token, myCard.cardNumber);
                setModalVisible(false); // 모달을 닫음
                navigation.goBack(); // 카드 목록 화면으로 돌아감
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.cardText}>카드 정보</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('EditCard', {id,token})}>
                        <View style={styles.imageWrapper}>
                            <Image
                                source={require('../../assets/image/more.png')}
                                style={styles.imageMore} resizeMode="contain"
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.cardImageContainer}>
                    <Image source={{ uri: myCard?.cardProduct.cardImg }} style={styles.cardImage} />
                        {/* <Text style={styles.cardImageText}>카드 이미지</Text> */}
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
                    <TouchableOpacity style={styles.removeButton} onPress={() => setModalVisible(true)}>
                        <Text style={styles.removeButtonText}>해지하기</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>카드를 해지 하시겠습니까?</Text>
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity style={styles.modalButton} onPress={handleDeleteCard}>
                                    <Text style={styles.modalButtonText}>확인</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.modalButtonText}>취소</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
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
    cardImage: {
        width: 100,
        height: 150,
        // backgroundColor: '#B7E1CE',
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
    modalButtonText:{
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
    imageWrapper: {
        width: 90,
        height: 90,
        borderRadius: 45,
        overflow: 'hidden',
        marginLeft: 90,
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
        borderColor:'#B7E1CE',
}
});