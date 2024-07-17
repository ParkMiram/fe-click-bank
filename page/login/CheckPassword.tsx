import { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Vibration } from 'react-native';
import { Container } from '../../css/sujin/Container';
import NextButton from '../../component/auth/NextButton';
import Keypad from '../../component/auth/Keypad';

export default function CheckPassword({ navigation, route }: any) {
    const { identity, type, nickname, password, image } = route.params;
    const [checkPassword, setCheckPassword] = useState("");
    const [toStar, setStar] = useState("");
    const [canGoNext, setGoNext] = useState(false);
    const [infoText, setInfoText] = useState("");

    const goNext = () => {
        navigation.navigate('UserSetNickName', {
            identity: identity,
            type: type,
            password: password,
            nickname: nickname,
            image: image
        });
    }

    const addPassword = (str: string) => {
        if (checkPassword.length >= 6) return;
        if (checkPassword.length == 5) {
            if (password === checkPassword+str) {
                setGoNext(true);
                setInfoText("좋아요, 기억력이 훌륭하시네요!");
                Vibration.vibrate(60);
            } else {
                setInfoText("아까랑 암호가 다른 것 같아요.");
                Vibration.vibrate(200);
            }
        }
        setCheckPassword(checkPassword + str);
        setStar("●".repeat(checkPassword.length+1));
    }
    const removePassword = () => {
        if (checkPassword.length == 0) return;
        setGoNext(false);
        setInfoText("");
        setCheckPassword(checkPassword.slice(0, checkPassword.length-1));
        setStar("●".repeat(checkPassword.length-1));
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