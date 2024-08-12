import { BackHandler, Image, StyleSheet, Text, Vibration, View } from 'react-native';
import { Container } from '../../css/sujin/Container';
import { useEffect, useState } from 'react';
import Keypad from '../../component/auth/Keypad';
import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PaymentData } from '../../types/PayTypes';

const SERVER_URI = "http://34.30.12.64:31000/api/v1/auth";

export default function LoginCheck({ navigation, route }: any) {
    const { payData } = route.params;
    const [token, setToken] = useState<string>();
    const [password, setPassword] = useState("");
    const [toStar, setStar] = useState("");
    const [infoText, setInfoText] = useState("");
    
    const getUserToken = async (str: string) => {
        try {
            const response = await axios.get(`${SERVER_URI}/token?token=${token}&password=${str}`);
            return response.data;
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

    const addPassword = async (str: string) => {
        if (password.length >= 6) return;
        Vibration.vibrate(30);
        setPassword(password + str);
        setStar("●".repeat(password.length+1));
        if (password.length == 5) {
            const data = await getUserToken(password + str);
            if (data.status == 400) {
                setInfoText("로그인에 실패했어요...");
                Vibration.vibrate(200);
            } else if (data.status == 403) {
                AsyncStorage.removeItem("login");
                alert("자동 로그인 정보가 만료되었습니다.\n로그인 후 다시 시도해주세요.");
                BackHandler.exitApp();
            } else {
                Vibration.vibrate(60);
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Payment', params: {payData: payData, userToken: data}}]
                });
            }
        }


    }
    const removePassword = () => {
        if (password.length == 0) return;
        setInfoText("");
        setPassword(password.slice(0, password.length-1));
        setStar("●".repeat(password.length-1));
    }

    const getLoginToken = async () => {
        const getToken = await AsyncStorage.getItem("login")
        if (getToken == null) {
            alert("로그인 후 이용해 주세요.");
            // 결제 취소??
            BackHandler.exitApp();
        } else {
            setToken(getToken);
        }
    }

    useEffect(() => {
        getLoginToken();
    },[])

    return (
        <View style={Container.container}>
        <View style={Container.innerContainer}>
            <Image
                style={styles.logo}
                source={require('../../assets/image/Click_logo.png')}
            />
            <Text>간편 로그인</Text>
            <View style={styles.passwordBox}>
                <Text style={styles.passwordStar}>{toStar}</Text>
                <Text>{infoText}</Text>
            </View>
            <Keypad numberKeyEvent={addPassword} backKeyEvent={removePassword}/>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        marginTop: 50,
        width: 240,
        height: 100
    },
    titleText: {
        paddingTop:38,
        paddingBottom:12,
        fontSize: 48,
        color: "#007378",
        fontWeight: '600'
    },
    passwordBox: {
        flex: 1,
        width: "65%",
        paddingTop: "5%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    passwordStar: {
        width: '100%',
        letterSpacing: 12,
        paddingBottom: 16,
        paddingTop: 28,
        fontSize: 24,
        fontWeight:'600',
        textAlign: 'center',
        borderBottomWidth: 2,
        borderColor: "#000"
    },
});