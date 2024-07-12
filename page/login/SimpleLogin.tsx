import { Image, StyleSheet, Text, Vibration, View } from 'react-native';
import { Container } from '../../css/sujin/Container';
import { useState } from 'react';
import Keypad from '../../component/auth/Keypad';
import axios from 'axios';

const SERVER_URI = "http://192.168.0.16:8080/api/v1/auth";

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
            alert(error);
            return `error`;
        }
    }

    const addPassword = async (str: string) => {
        if (password.length >= 6) return;
        setPassword(password + str);
        setStar("●".repeat(password.length+1));
        if (password.length == 5) {
            const data = await getUserToken(password + str);
            if (data == "error") {
                setInfoText("로그인에 실패했어요...");
                Vibration.vibrate(200);
            } else {
                Vibration.vibrate(60);
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