import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container } from '../../css/sujin/Container';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import * as paymentApi from '../../component/api/PaymentApi';
import NextButton from '../../component/auth/NextButton';
import * as LocalAuthentication from 'expo-local-authentication';
import {Path, Svg} from "react-native-svg";
import { CardData, LastCard, PaymentData, PayUpdateRequest } from '../../types/PayTypes';
import PayCard from '../../component/pay/PayCard';

interface Params {
    payData: PaymentData;
    userToken: string;
    card: null | number;
}

export default function Payment({ navigation, route }: {navigation:any, route:{params:Params}}) {
    console.log(route.params);
    const { payData, userToken, card } = route.params;
    const [ cardData, setCardData] = useState<CardData>();

    const cancelPayment = useCallback(() => {
        BackHandler.removeEventListener('hardwareBackPress', cancelPayment);
        navigation.reset({
            index: 0,
            routes: [{name: 'PaymentCancel', params: {redirect: payData?.failRedirUrl}}]
        });
        return true;
    },[]);
    BackHandler.addEventListener('hardwareBackPress', cancelPayment);

    const selectCard = () => {
        navigation.navigate('PaymentSelectCard', {payData: payData, token: userToken});
    }

    const sendPayRequest = async () => {
        try {
            const request:PayUpdateRequest = {
                account: cardData?.account as unknown as string,
                cardId: cardData?.cardId as unknown as number,
                payState: "PAY_COMPLETE"
            }
            const response: AxiosResponse<string> = await paymentApi.updatePayment(request, userToken);
            if(response.data == "결제 실패") {
                return false;
            }
            return true;
        } catch (error) {
            const {response} = error as unknown as AxiosError;
            if(response){
                console.log(response.data);
                return {status: response.status, data: response.data};
            }
            console.log(error);
            return false;
        }
    }

    const nextAndAuth = async () => {
        const available:LocalAuthentication.AuthenticationType[] = await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (available.length == 0) {
            alert("생체인증이 지원되지 않는 기기에서는 진행할 수 없습니다.");
            // ...
        } else {
            const result = await LocalAuthentication.authenticateAsync({promptMessage: "결제를 진행하려면 인증이 필요합니다."});
            if (result.success) {
                if (await sendPayRequest()) {
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'PaymentSuccess', params: {redirect: payData?.successRedirUrl}}]
                    });
                } else {
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'PaymentCancel', params: {redirect: payData?.failRedirUrl}}]
                    });
                }
            } else {
                alert("인증에 실패했습니다.");
            }
        }
    }

    const getCardData = async () => {
        let reqCard:null|number = card;
        try {
            if (reqCard == null) {
                const responseLastCard: AxiosResponse<LastCard> = await paymentApi.getLastCard(userToken);
                console.log("responseLastCard: ");
                console.log(responseLastCard.data);
                if (responseLastCard.data.code === 1) {
                    setCardData({
                        cardId: null,
                        account: null,
                        cardName: null,
                        cardNumber: null,
                        cardProduct: null
                    });
                    return true;
                }
                reqCard = responseLastCard.data.cardId;
            }
            const responseCardInfo: AxiosResponse<CardData> = await paymentApi.getMyCard(reqCard as number);
            setCardData(responseCardInfo.data);
        } catch (error) {
            const {response} = error as unknown as AxiosError;
            if(response){
                console.log(response.data);
                return {status: response.status, data: response.data};
            }
            console.log(error);
            return error;
        }
    }

    useEffect(() => {
        getCardData();
    }, []);

    return (
        <SafeAreaView style={Container.container}>
            <View style={Container.innerContainer}>
                <TouchableOpacity style={{width:"25%", marginRight:"72%", marginLeft:"3%"}} onPress={cancelPayment}>
                    <View style={styles.backContainer}>
                        <Svg style={{justifyContent:'center'}} width={9} height={14} fill="none">
                            <Path stroke="#33363F" strokeWidth={2} d="M8 1 2 7l6 6" />
                        </Svg>
                        <Text style={{paddingLeft: 6, fontSize: 18}}>취소하기</Text>
                    </View>
                </TouchableOpacity>
                {/* <Text style={styles.nameText} numberOfLines={1} ellipsizeMode='tail'>{payData?.name}</Text> */}
                {/* <Text style={styles.storeText}>{payData?.businessName}</Text> */}
                <Text style={styles.nameText}>{payData?.businessName}</Text>
                <Text style={styles.amontText}>{payData?.payAmount.toLocaleString()+"원"}</Text>

                <View style={{flex:1, width:'100%', alignItems:'center'}}>
                    <PayCard selectCard={selectCard} cardName={cardData?.cardName} cardNumber={cardData?.cardNumber}/>
                </View>

                <TouchableOpacity onPress={() => {}}>
                    <Text style={{marginBottom: 14, fontSize: 13}}>✔ 필수 결제 정보 확인 및 정보 제공 동의</Text>
                </TouchableOpacity>
                <NextButton text="동의하고 결제하기" press={nextAndAuth} active={true}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backContainer: {
        width: '100%',
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems:'center'
    },
    nameText: {
        width:'100%', 
        paddingTop:'8%', 
        paddingHorizontal:'11%', 
        fontSize:32, 
        fontWeight:'500',
    },
    storeText: {
        width:'100%', 
        paddingTop:'2%', 
        paddingHorizontal:'11%', 
        fontSize:20,
    },
    amontText: {
        width:'100%', 
        paddingTop:'5%', 
        paddingHorizontal:'11%', 
        paddingBottom:'16%', 
        fontSize:42, 
        fontWeight:'500',
    },
    cardBox: {
        width:'80%',
        borderColor: '#B7E1CE',
        borderRadius: 10,
        borderWidth: 4,
        padding: 18,
    },
    cardBoxHeader: {
        width:'100%',
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    changeCardButton: {
        backgroundColor: '#6BC29A',
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    cardIcon: {
        width: 40,
        height: 40,
        backgroundColor: 'lightgray',
        borderColor: 'black',
        borderRadius: 20,
    },
});