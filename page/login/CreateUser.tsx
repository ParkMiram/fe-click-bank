import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { Container } from '../../css/sujin/Container';
import { useEffect, useState } from 'react';

export default function CreateUser({ navigation, route }: any) {
    const [waitMessage, setWaitMessage] = useState("잠시만 기다려주세요...");

    const sendCreateUser = () => {

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