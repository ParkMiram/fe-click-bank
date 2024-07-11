import { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Vibration } from 'react-native';
import { Container } from '../../css/sujin/Container';
import NextButton from '../../component/auth/NextButton';
import Keypad from '../../component/auth/Keypad';

export default function SetPassword({ navigation, route }: any) {
    const [password, setPassword] = useState("");
    const [toStar, setStar] = useState("");
    const [canGoNext, setGoNext] = useState(false);

    const goNext = () => {
        navigation.navigate('UserCheckPassword', {
            identity: route.params.identity,
            type: route.params.type,
            password: password
        });
    }

    const addPassword = (str: string) => {
        if (password.length >= 6) return;
        if (password.length == 5) {
            setGoNext(true);
            Vibration.vibrate(60);
        }
        setPassword(password + str);
        setStar("●".repeat(password.length+1));
    }
    const removePassword = () => {
        if (password.length == 0) return;
        setGoNext(false);
        setPassword(password.slice(0, password.length-1));
        setStar("●".repeat(password.length-1));
    }

    return (
        <SafeAreaView style={Container.container}>
            <View style={Container.innerContainer}>
                <Text style={styles.titleText}>
                    간편 암호 설정
                </Text>
                <Text>
                    적당히 안 들킬 만한 6자리를 설정해 주세요.
                </Text>
                <View style={styles.passwordBox}>
                    <Text style={styles.passwordStar}>{toStar}</Text>
                    <Text/>
                </View>
                <Keypad numberKeyEvent={addPassword} backKeyEvent={removePassword}/>
                <NextButton text="이제 어서 시작해요" press={goNext} active={canGoNext} />
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