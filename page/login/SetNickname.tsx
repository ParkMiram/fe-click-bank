import { Image, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Container } from '../../css/sujin/Container';
import NextButton from '../../component/auth/NextButton';
import { useState } from 'react';


export default function SetNickName({ navigation, route }: any) {
    const { identity, type, password, nickname, image } = route.params;
    const [newNickname, setNewNickname] = useState(nickname);
    const [infoText, setInfoText] = useState("");
    const [canGoNext, setGoNext] = useState(nickname.length >= 2);

    const changeNickname = (text: string) => {
        setNewNickname(text);
        if (text.length >= 2) {
            setGoNext(true);
            setInfoText("멋진 이름이네요!");
        } else {
            setGoNext(false);
            setInfoText(text.length == 0 ? "" : "조금 더 길면 좋을 것 같아요.");
        }
    }

    const goNext = () => {
        navigation.navigate('UserCreate', {
            identity: identity,
            type: type,
            password: password,
            nickname: newNickname,
            image: image
        });
    }

    return (
        <SafeAreaView style={Container.container}>
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                <View style={Container.innerContainer}>
                    <Text style={styles.titleText}>
                        닉네임 설정
                    </Text>
                    <Text>
                        나를 표현할 이름을 설정해 주세요.
                    </Text>
                    <View style={styles.nameBox}>
                        <View style={styles.nameBoxImageArea}>
                            <Image 
                                style={styles.profileImage}
                                source={image == "" ? require("../../assets/image/default_profile.jpeg") : {uri:image}}
                            />
                        </View>
                        <View style={styles.nameBoxInputArea}>
                            <TextInput
                                style={styles.nameInput}
                                defaultValue={nickname}
                                onChangeText={(text) => changeNickname(text)}
                                maxLength={8}
                            />
                            <Text>{infoText}</Text>
                        </View>
                    </View>
                    <NextButton  text="이제 끝인가요" press={goNext} active={canGoNext} />
                </View>
            </TouchableWithoutFeedback>
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
        paddingBottom: '0%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameBoxImageArea: {
        width: '100%',
        paddingTop: '10%',
        alignItems: 'center',
    },
    nameBoxInputArea: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        marginBottom: 12,
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