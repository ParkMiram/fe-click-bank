import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Container } from '../../css/sujin/Container';
import NextButton from '../../component/auth/NextButton';
import { useState } from 'react';


export default function SetNickName({ navigation, route }: any) {
    const [nickname, setNickname] = useState("");
    const [infoText, setInfoText] = useState("");
    const [canGoNext, setGoNext] = useState(false);

    const changeNickname = (text: string) => {
        setNickname(text);
        if (text.length > 2) {
            setGoNext(true);
            setInfoText("멋진 이름이네요!");
        } else {
            setGoNext(false);
            setInfoText(text.length == 0 ? "" : "조금 더 길면 좋을 것 같아요.");
        }
    }

    const goNext = () => {
        navigation.navigate('UserCreate', {
            identity: route.params.identity,
            type: route.params.type,
            password: route.params.password,
            nickname: nickname
        });
    }

    return (
        <SafeAreaView style={Container.container}>
            <View style={Container.innerContainer}>
                <Text style={styles.titleText}>
                    닉네임 설정
                </Text>
                <Text>
                    나를 표현할 이름을 설정해 주세요.
                </Text>
                <View style={styles.nameBox}>
                    <TextInput
                        style={styles.nameInput}
                        // defaultValue='딸깍이'
                        onChangeText={(text) => changeNickname(text)}
                        maxLength={8}
                    />
                    <Text>{infoText}</Text>
                </View>
                <NextButton  text="이제 끝인가요" press={goNext} active={canGoNext} />
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
    nameBox: {
        flex: 1,
        width: '100%',
        paddingBottom: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameInput: {
        width: '70%',
        height: 64,
        fontSize: 32,
        textAlign: 'center',
        borderBottomWidth: 2,
        borderColor: "#000",
    }
});