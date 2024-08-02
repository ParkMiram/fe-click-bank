import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container } from '../../css/sujin/Container';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import * as paymentApi from '../../component/api/PaymentApi';
import NextButton from '../../component/auth/NextButton';
import * as LocalAuthentication from 'expo-local-authentication';
import {Path, Svg} from "react-native-svg";

interface PaymentData {
    name: string;
    store: string;
    amount: number;
    successRedirect: string;
    failRedirect: string;
}
interface CardData {
    account: string;
    card_name: string;
    card_number: string;
    card_disable: boolean;
}

export default function Payment({ navigation, route }: any) {
    const { payment_id, token } = route.params;
    const [ payData, setPayData] = useState<PaymentData>();
    const [ cardData, setCardData] = useState<CardData>();
    
    // test data
    const testPayData:PaymentData = {
        name: "분도의 갬성가득한 밤",
        store: "T82",
        amount: 58500,
        successRedirect: '',
        failRedirect: '',
    }
    const testCardData:CardData = {
        account: "012012012345",
        card_name: "미람알뜰충동구매카드",
        card_number: "1234123412341234",
        card_disable: false
    }

    const goBack = () => {
    }

    const selectCard = () => {
        navigation.navigate('PaymentSelectCard');
    }

    const nextAndAuth = async () => {
        const available:LocalAuthentication.AuthenticationType[] = await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (available.length == 0) {
            alert("생체인증이 지원되지 않는 기기에서는 진행할 수 없습니다.");
            // ...
        } else {
            const result = await LocalAuthentication.authenticateAsync({promptMessage: "결제를 진행하려면 인증이 필요합니다."});
            if (result.success) {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'PaymentSuccess', params: {redirect: payData?.successRedirect}}]
                });
            } else {
                alert("인증에 실패했습니다.");
            }
        }
    }

    const getData = async () => {
        try {
            // const response: AxiosResponse<PaymentData> = await paymentApi.getPaymentInfo(payment_id);
            // setPayData(response.data);
            setPayData(testPayData);
        } catch (error) {
            const {response} = error as unknown as AxiosError;
            if(response){
                return {status: response.status, data: response.data};
            }
            return error;
        }
        try {
            // const response: AxiosResponse<CardData> = await paymentApi.getCardInfo(payment_id);
            // setCardData(response.data);
            setCardData(testCardData);
        } catch (error) {
            const {response} = error as unknown as AxiosError;
            if(response){
                return {status: response.status, data: response.data};
            }
            return error;
        }

    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <SafeAreaView style={Container.container}>
            <View style={Container.innerContainer}>
                <TouchableOpacity style={{width:"25%", marginRight:"72%", marginLeft:"3%"}} onPress={goBack}>
                    <View style={styles.backContainer}>
                        <Svg style={{justifyContent:'center'}} width={9} height={14} fill="none">
                            <Path stroke="#33363F" strokeWidth={2} d="M8 1 2 7l6 6" />
                        </Svg>
                        <Text style={{paddingLeft: 6, fontSize: 18}}>취소하기</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.nameText} numberOfLines={1} ellipsizeMode='tail'>{payData?.name}</Text>
                <Text style={styles.storeText}>{payData?.store}</Text>
                <Text style={styles.amontText}>{payData?.amount.toLocaleString()+"원"}</Text>
                <View style={{flex:1, width:'100%', alignItems:'center'}}>
                    <View style={styles.cardBox}>
                        <View style={styles.cardBoxHeader}>
                            <Text style={{fontSize:18}}>결제수단</Text>
                            <TouchableOpacity onPress={selectCard}>
                                <View style={styles.changeCardButton}><Text style={{fontSize:14, color:'white'}}>변경</Text></View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={styles.cardIcon}/>
                            <View style={{marginLeft: 12, marginRight:"10%"}}>
                                <Text style={{fontWeight:'bold', fontSize:17, marginBottom:4}} numberOfLines={1} ellipsizeMode='tail'>
                                    {cardData?.card_name}</Text>
                                <Text style={{color:'#aaa'}}>{"딸깍뱅크"}</Text>
                                <Text style={{color:'#aaa'}}>{cardData?.card_number}</Text>
                            </View>
                        </View>
                    </View>
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