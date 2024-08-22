import {BackHandler, Text, View} from 'react-native';
import {Container} from '../../css/sujin/Container';
import {SafeAreaView} from 'react-native-safe-area-context';
import CurserLogo from '../../component/pay/CurserLogo';
import * as paymentApi from '../../component/api/PaymentApi';
import * as Linking from 'expo-linking';
import {AxiosError, AxiosResponse} from 'axios';
import {useEffect} from 'react';

export default function Cancel({navigation, route}: any) {
    const {redirect, payId} = route.params;

    const updateState = async () => {
        try {
            const response: AxiosResponse<any> = await paymentApi.updateStateToCancle(payId);
        } catch (error) {
            const {response} = error as unknown as AxiosError;
            console.log(response?.data);
            return {status: response?.status, data: response?.data};
        }
    }

    setTimeout(() => {
        Linking.openURL(redirect);
        BackHandler.exitApp();
    }, 3000);

    useEffect(() => {
        updateState();
    }, [])

    return (
        <SafeAreaView style={Container.container}>
            <View style={Container.innerContainer}>
                <CurserLogo/>
                <Text style={{fontSize: 32, fontWeight: 'bold', marginBottom: 30}}>
                    결제 취소
                </Text>
                <Text style={{fontSize: 20}}>
                    문제가 발생했거나, 진행을 취소했습니다.
                </Text>
                <Text style={{fontSize: 20, marginTop: 5}}>
                    잠시 후 이전 페이지로 돌아갑니다.
                </Text>
            </View>
        </SafeAreaView>
    );
}