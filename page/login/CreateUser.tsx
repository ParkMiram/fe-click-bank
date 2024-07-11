import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Container } from '../../css/sujin/Container';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SERVER_URI = "http://192.168.0.16:8080/api/v1/auth";

export default function CreateUser({ navigation, route }: any) {
    const [waitMessage, setWaitMessage] = useState("잠시만 기다려주세요...");

    const sendCreateUser = async () => {
        try {
            const response = await axios.post(
                SERVER_URI,
                {
                    identity: route.params.identity,
                    type: route.params.type,
                    nickname: route.params.nickname,
                    passwd: route.params.password
                }
            );
            setWaitMessage(response.data);
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