import { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Vibration } from 'react-native';
import { Container } from '../../css/sujin/Container';
import NextButton from '../../component/auth/NextButton';
import Keypad from '../../component/auth/Keypad';

export default function CheckPassword({ navigation, route }: any) {
    const [password, setPassword] = useState("");
    const [toStar, setStar] = useState("");
    const [canGoNext, setGoNext] = useState(false);
    const [infoText, setInfoText] = useState("");

    const goNext = () => {
        navigation.navigate('UserSetNickName', {
            identity: route.params.identity,
            type: route.params.type,
            password: route.params.password
        });
    }

    const addPassword = (str: string) => {
        if (password.length >= 6) return;
        if (password.length == 5) {
            if (route.params.password === password+str) {
                setGoNext(true);
                setInfoText("좋아요, 기억력이 훌륭하시네요!");
                Vibration.vibrate(60);
            } else {
                setInfoText("아까랑 암호가 다른 것 같아요.");
                Vibration.vibrate(200);
            }
        }
        setPassword(password + str);
        setStar("●".repeat(password.length+1));
    }
    const removePassword = () => {
        if (password.length == 0) return;
        setGoNext(false);
        setInfoText("");
        setPassword(password.slice(0, password.length-1));
        setStar("●".repeat(password.length-1));
    }

    return (
        <SafeAreaView style={Container.container}>
            <View style={Container.innerContainer}>
                <Text style={styles.titleText}>
                    암호 확인
                </Text>
                <Text>확인을 위해 한번 더 입력해 주세요.</Text>
                <View style={styles.passwordBox}>
                    <Text style={styles.passwordStar}>{toStar}</Text>
                    <Text>{infoText}</Text>
                </View>
                <Keypad numberKeyEvent={addPassword} backKeyEvent={removePassword}/>
                <NextButton text="이거 언제 끝나요" press={goNext} active={canGoNext} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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