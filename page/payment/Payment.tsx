import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container } from '../../css/sujin/Container';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import * as paymentApi from '../../component/api/PaymentApi';
import NextButton from '../../component/auth/NextButton';
import * as LocalAuthentication from 'expo-local-authentication';
import {Path, Svg} from "react-native-svg";
import { CardData, PaymentData } from '../../types/PayTypes';

interface Params {
    payData: PaymentData;
    userToken: string;
    selectedCard: number;
}

export default function Payment({ navigation, route }: {navigation:any, route:{params:Params}}) {
    const { payData, userToken, selectedCard } = route.params;
    const [ cardData, setCardData] = useState<CardData>();
    
    const testCardData:CardData = {
        account: "012012012345",
        cardName: "미람알뜰충동구매카드",
        cardNumber: "1234123412341234",
        cardProduct: {cardImg: "test.png"}
    }


    const cancelPayment = useCallback(() => {
        BackHandler.removeEventListener('hardwareBackPress', cancelPayment);
        navigation.reset({
            index: 0,
            routes: [{name: 'PaymentCancel', params: {redirect: payData?.failRedirect}}]
        });
        return true;
    },[]);
    BackHandler.addEventListener('hardwareBackPress', cancelPayment);

    const selectCard = () => {
        // Todo: need return and param
        navigation.navigate('PaymentSelectCard');
    }

    const sendPayUpdate = () => {
        try {
            
        } catch (error) {
            const {response} = error as unknown as AxiosError;
            if(response){
                return {status: response.status, data: response.data};
            }
            return error;
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
                navigation.reset({
                    index: 0,
                    routes: [{name: 'PaymentSuccess', params: {redirect: payData?.successRedirect}}]
                });
            } else {
                alert("인증에 실패했습니다.");
            }
        }
    }

    const getCardData = async () => {
        try {
            // const responseLastCard: AxiosResponse<number> = await paymentApi.getCardInfo(userToken);
            // const responseCardInfo: AxiosResponse<CardData> = await paymentApi.getMyCard(responseLastCard.data);
            // setCardData(responseCardInfo.data);
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
                <Text style={styles.storeText}>{payData?.store}</Text>
                <Text style={styles.amontText}>{payData?.payAmount.toLocaleString()+"원"}</Text>
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
                                    {cardData?.cardName}</Text>
                                <Text style={{color:'#aaa'}}>{"딸깍뱅크"}</Text>
                                <Text style={{color:'#aaa'}}>{cardData?.cardNumber}</Text>
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