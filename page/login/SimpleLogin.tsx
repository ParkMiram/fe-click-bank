import { Image, SafeAreaView, StyleSheet, Text, Vibration, View } from 'react-native';
import { Container } from '../../css/sujin/Container';
import { useState } from 'react';
import Keypad from '../../component/auth/Keypad';
import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SERVER_URI = "https://just-click.shop/api/v1/auth";

export default function SimpleLogin({ navigation, route }: any) {
    const { token } = route.params;
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
                return {status: response.status, data: response.data};
            }
            return error;
        }
    }

    const checkMainAccount = async (userToken: string) => {
        try {
            const response = await axios.get(`${SERVER_URI}/token/${userToken}`);
            return response.data;
        } catch (error) {
            const {response} = error as unknown as AxiosError;
            if(response){
                return {status: response.status, data: response.data};
            }
            return error;
        }
    }

    const addPassword = async (str: string) => {
        if (password.length >= 6) return;
        setPassword(password + str);
        setStar("●".repeat(password.length+1));
        if (password.length == 5) {
            const data = await getUserToken(password + str);
            if (data.status == 400) {
                setInfoText("로그인에 실패했어요...");
                Vibration.vibrate(200);
            } else if (data.status == 403) {
                AsyncStorage.removeItem("login");
                alert("자동 로그인 정보가 만료되었습니다.\n로그인 화면으로 돌아갑니다.");
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Login'}]
                });
            } else {
                Vibration.vibrate(60);
                const parseData = await checkMainAccount(data);
                if (parseData.account == null) {
                    setPassword("");
                    setStar("");
                    alert("딸깍은 처음이시군요!\n먼저, 계좌 개설로 이동합니다.")
                    navigation.navigate('CreateAccount', { accountType: '입출금 통장', token: data, userName: parseData.name });
                    return true;
                }
                navigation.reset({
                    index: 0,
                    routes: [{name: 'ClickHome', params: {token: data}}]
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

    return (
        <SafeAreaView style={Container.container}>
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
        </SafeAreaView>
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