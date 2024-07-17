import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Container } from '../../css/sujin/Container';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SERVER_URI = "http://34.30.12.64:31000/api/v1/auth";

export default function CreateUser({ navigation, route }: any) {
    const { identity, type, password, nickname } = route.params;
    const [waitMessage, setWaitMessage] = useState("잠시만 기다려주세요...");

    const sendCreateUser = async () => {
        try {
            const response = await axios.post(
                SERVER_URI,
                {
                    identity: identity,
                    type: type,
                    nickname: nickname,
                    passwd: password
                }
            );
            AsyncStorage.setItem("login", response.data);
            setWaitMessage("딸깍을 사용할 준비가 모두 끝났습니다!");
            setTimeout( async () => {
                const token = await AsyncStorage.getItem("login");
                navigation.reset({
                    index: 0,
                    routes: [{name: 'SimpleLogin', params: {token: token}}]
                    // routes: [{name: 'SimpleLogin', params: {token: response.data}}]
                });
            }, 1000);
        } catch (error) {
            const {response} = error as unknown as AxiosError;
            if (response) alert("STATUS: " + response.status + "\nDATA: " + response.data);
            alert(error);
        }
    }

    useEffect(() => {
        sendCreateUser();
    }, []);

    return (
        <SafeAreaView style={Container.container}>
            <Text style={styles.waitMessage}>
                {waitMessage}
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    waitMessage: {
        fontSize: 20,
        textAlign: 'center',
    }
});