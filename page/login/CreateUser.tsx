import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Container } from '../../css/sujin/Container';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SERVER_URI = "http://192.168.0.16:8080/api/v1/auth";

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
            setWaitMessage("딸깍을 사용할 준비가 모두 끝났습니다!");
            setTimeout(() => {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'SimpleLogin', params: {token: response.data}}]
                });
            }, 1500);
        } catch (error) {
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