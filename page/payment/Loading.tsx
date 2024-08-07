import { Text, View } from 'react-native';
import { Container } from '../../css/sujin/Container';
import { SafeAreaView } from 'react-native-safe-area-context';
import CurserLogo from '../../component/pay/CurserLogo';
import { AxiosError, AxiosResponse } from 'axios';
import * as paymentApi from '../../component/api/PaymentApi';
import { useEffect, useState } from 'react';
import { PaymentData } from '../../types/PayTypes';

export default function Loading({ navigation, route }: any) {
    const { payToken } = route.params;
    const [ payData, setPayData] = useState<PaymentData>();

    // test data
    const testPayData:PaymentData = {
        store: "T82",
        payAmount: 58500,
        payState: "state",
        successRedirect: '',
        failRedirect: '',
    }

    const goLoginPage = () => {
        navigation.reset({
            index: 0,
            routes: [{name: 'PaymentLogin', params: {payData: payData}}]
        });
    }

    const getData = async () => {
        try {
            // const responsePay: AxiosResponse<PaymentData> = await paymentApi.getPaymentInfo(payToken);
            // setPayData(responsePay.data);
            setPayData(testPayData);
            goLoginPage();
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
    },[])

    return (
        <SafeAreaView style={Container.container}>
            <View style={Container.innerContainer}>
                <CurserLogo />
                <Text style={{fontSize:20, marginTop:100}}>
                    결제 정보를 불러오는 중입니다...
                </Text>
            </View>
        </SafeAreaView>
    );
}