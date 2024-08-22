import { Image, SafeAreaView, StyleSheet, Text, Vibration, View } from 'react-native';
import { Container } from '../../css/sujin/Container';
import { useState } from 'react';
import Keypad from '../../component/auth/Keypad';
import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SERVER_URI = "https://just-click.shop/api/v1/auth";

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
            const {response} = error as unknown as AxiosError;
            if(response){
                return {status: response.status, data: response.data};
            }
            return error;
        }
    }

    const checkMainAccount = async (userToken: string) => {
        try {
            const response = await axios.get(`${SERVER_URI}/token/${userToken}`);
            return response.data;
        } catch (error) {
            const {response} = error as unknown as AxiosError;
            if(response){
                return {status: response.status, data: response.data};
            }
            return error;
        }
    }

    const addPassword = async (str: string) => {
        if (password.length >= 6) return;
        setPassword(password + str);
        setInfoText('');
        // setStar("●".repeat(password.length+1));
        if (password.length == 5) {
            const data = await getUserToken(password + str);
            if (data.status == 400) {
                setInfoText("로그인에 실패했어요🥲");
                // 비밀번호 초기화
                setPassword('');
                Vibration.vibrate(200);
            } else if (data.status == 403) {
                AsyncStorage.removeItem("login");
                alert("자동 로그인 정보가 만료되었습니다.\n로그인 화면으로 돌아갑니다.");
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Login'}]
                });
            } else {
                Vibration.vibrate(60);
                const parseData = await checkMainAccount(data);
                if (parseData.account == null) {
                    setPassword("");
                    setStar("");
                    alert("딸깍은 처음이시군요!\n먼저, 계좌 개설로 이동합니다.")
                    navigation.navigate('CreateAccount', { accountType: '입출금 통장', token: data, userName: parseData.name });
                    return true;
                }
                navigation.reset({
                    index: 0,
                    routes: [{name: 'AccountHome', params: {token: data}}]
                });
                navigation.navigate('Bottom', {token: data});
            }
        }
    }

    const splitePassword = password.split('');

    const removePassword = () => {
        if (password.length == 0) return;
        setInfoText("");
        setPassword(password.slice(0, password.length-1));
        setStar("●".repeat(password.length-1));
    }

    return (
        <SafeAreaView style={Container.container}>
            <View style={Container.innerContainer}>
                {/*<Svg*/}
                {/*    width={100}*/}
                {/*    height={33.14}*/}
                {/*    fill="none"*/}
                {/*    viewBox="0 0 203 85"*/}
                {/*>*/}
                {/*    <G filter="url(#a)">*/}
                {/*        <Path*/}
                {/*            fill="url(#b)"*/}
                {/*            d="M40.56 43.04h10c-.32 3.813-1.387 7.213-3.2 10.2-1.813 2.96-4.36 5.293-7.64 7-3.28 1.707-7.267 2.56-11.96 2.56-3.6 0-6.84-.64-9.72-1.92a21.31 21.31 0 0 1-7.4-5.52c-2.053-2.4-3.627-5.293-4.72-8.68-1.067-3.387-1.6-7.173-1.6-11.36v-4.84c0-4.187.547-7.973 1.64-11.36 1.12-3.387 2.72-6.28 4.8-8.68a20.75 20.75 0 0 1 7.48-5.56c2.933-1.28 6.227-1.92 9.88-1.92 4.64 0 8.56.853 11.76 2.56 3.2 1.707 5.68 4.067 7.44 7.08 1.787 3.013 2.88 6.467 3.28 10.36h-10c-.267-2.507-.853-4.653-1.76-6.44-.88-1.787-2.187-3.147-3.92-4.08-1.733-.96-4-1.44-6.8-1.44-2.293 0-4.293.427-6 1.28-1.707.853-3.133 2.107-4.28 3.76-1.147 1.653-2.013 3.693-2.6 6.12-.56 2.4-.84 5.147-.84 8.24v4.92c0 2.933.253 5.6.76 8 .533 2.373 1.333 4.413 2.4 6.12 1.093 1.707 2.48 3.027 4.16 3.96 1.68.933 3.693 1.4 6.04 1.4 2.853 0 5.16-.453 6.92-1.36 1.787-.907 3.133-2.227 4.04-3.96.933-1.76 1.547-3.907 1.84-6.44ZM69.048.56V62h-9.68V.56h9.68Zm20.888 18.16V62h-9.68V18.72h9.68ZM79.616 7.36c0-1.467.48-2.68 1.44-3.64.987-.987 2.347-1.48 4.08-1.48 1.707 0 3.053.493 4.04 1.48.987.96 1.48 2.173 1.48 3.64 0 1.44-.493 2.64-1.48 3.6s-2.333 1.44-4.04 1.44c-1.733 0-3.093-.48-4.08-1.44-.96-.96-1.44-2.16-1.44-3.6Zm38.568 47.76c1.573 0 2.987-.307 4.24-.92 1.28-.64 2.307-1.52 3.08-2.64.8-1.12 1.24-2.413 1.32-3.88h9.08c-.053 2.8-.88 5.347-2.48 7.64-1.6 2.293-3.72 4.12-6.36 5.48-2.64 1.333-5.56 2-8.76 2-3.307 0-6.187-.56-8.64-1.68-2.453-1.147-4.493-2.72-6.12-4.72-1.627-2-2.853-4.307-3.68-6.92-.8-2.613-1.2-5.413-1.2-8.4v-1.4c0-2.987.4-5.787 1.2-8.4.827-2.64 2.053-4.96 3.68-6.96 1.627-2 3.667-3.56 6.12-4.68 2.453-1.147 5.32-1.72 8.6-1.72 3.467 0 6.507.693 9.12 2.08 2.613 1.36 4.667 3.267 6.16 5.72 1.52 2.427 2.307 5.253 2.36 8.48h-9.08c-.08-1.6-.48-3.04-1.2-4.32a7.924 7.924 0 0 0-2.96-3.12c-1.253-.773-2.76-1.16-4.52-1.16-1.947 0-3.56.4-4.84 1.2-1.28.773-2.28 1.84-3 3.2-.72 1.333-1.24 2.84-1.56 4.52a29.527 29.527 0 0 0-.44 5.16v1.4c0 1.787.147 3.52.44 5.2.293 1.68.8 3.187 1.52 4.52a8.853 8.853 0 0 0 3.04 3.16c1.28.773 2.907 1.16 4.88 1.16ZM153.032.56V62h-9.68V.56h9.68Zm26.88 18.16-18.84 20.88-10.32 10.56-2.52-8.16 7.8-9.64 12.24-13.64h11.64ZM170.352 62l-14.04-20.32 6.08-6.76L181.512 62h-11.16ZM197.16 3.76l-.96 41.08h-8.24l-1-41.08h10.2Zm-10.48 53.68c0-1.467.48-2.693 1.44-3.68.987-1.013 2.347-1.52 4.08-1.52 1.707 0 3.053.507 4.04 1.52.987.987 1.48 2.213 1.48 3.68 0 1.413-.493 2.627-1.48 3.64-.987.987-2.333 1.48-4.04 1.48-1.733 0-3.093-.493-4.08-1.48-.96-1.013-1.44-2.227-1.44-3.64Z"*/}
                {/*        />*/}
                {/*        <Path*/}
                {/*            fill="#fff"*/}
                {/*            fillRule="evenodd"*/}
                {/*            d="m153.739 58.37 10.938-3.888L135.28 38.32l8.57 32.434 6.418-9.673 7.684 9.835 3.471-2.712-7.684-9.835Z"*/}
                {/*            clipRule="evenodd"*/}
                {/*        />*/}
                {/*        <Path*/}
                {/*            stroke="#000"*/}
                {/*            strokeOpacity={0.8}*/}
                {/*            strokeWidth={2.354}*/}
                {/*            d="m155.672 58.931 9.399-3.34 2.47-.878-2.297-1.263-29.397-16.162-2.407-1.323.702 2.656 8.57 32.433.67 2.535 1.449-2.185 5.515-8.311 6.678 8.548.725.927.928-.724 3.471-2.712.927-.725-.724-.928-6.679-8.547Z"*/}
                {/*        />*/}
                {/*    </G>*/}
                {/*    <Defs>*/}
                {/*        <LinearGradient*/}
                {/*            id="b"*/}
                {/*            x1={49.634}*/}
                {/*            x2={153.945}*/}
                {/*            y1={33}*/}
                {/*            y2={33}*/}
                {/*            gradientUnits="userSpaceOnUse"*/}
                {/*        >*/}
                {/*            <Stop stopColor="#6BC29A" />*/}
                {/*            <Stop offset={0.5} stopColor="#51AF93" />*/}
                {/*            <Stop offset={0.75} stopColor="#1D9287" />*/}
                {/*            <Stop offset={1} stopColor="#007378" />*/}
                {/*        </LinearGradient>*/}
                {/*    </Defs>*/}
                {/*</Svg>*/}
                {/*<Image*/}
                {/*    style={styles.logo}*/}
                {/*    source={require('../../assets/image/Click_logo.png')}*/}
                {/*/>*/}
                <Text style={styles.titleText}>간편 로그인</Text>
                <View style={styles.passwordBox}>
                    {/*<Text style={styles.passwordStar}>{toStar}</Text>*/}
                    <View style={styles.circleWrap}>
                        <Text style={splitePassword[0] !== undefined ? styles.circleOn : styles.circleOff}>●</Text>
                        <Text style={splitePassword[1] !== undefined ? styles.circleOn : styles.circleOff}>●</Text>
                        <Text style={splitePassword[2] !== undefined ? styles.circleOn : styles.circleOff}>●</Text>
                        <Text style={splitePassword[3] !== undefined ? styles.circleOn : styles.circleOff}>●</Text>
                        <Text style={splitePassword[4] !== undefined ? styles.circleOn : styles.circleOff}>●</Text>
                        <Text style={splitePassword[5] !== undefined ? styles.circleOn : styles.circleOff}>●</Text>
                    </View>
                    <View style={infoText !== "" ? styles.infoTextView : { position: "absolute", bottom: 100 }}>
                        <Text
                            style={styles.infoText}
                        >{infoText}</Text>
                    </View>
                </View>
                <Keypad numberKeyEvent={addPassword} backKeyEvent={removePassword}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logo: {
        marginTop: 50,
        width: 240,
        height: 100
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 30,
    },
    passwordBox: {
        flex: 1,
        width: "100%",
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
    circleWrap: {
        width: 240,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    circleOn: {
        color: "#333",
        fontSize: 30
    },
    circleOff: {
        color: '#ddd',
        fontSize: 30
    },
    infoTextView: {
        position: 'absolute',
        bottom: 100,
        marginTop: 50,
        backgroundColor: '#f3f3f3',
        borderRadius: 10,
    },
    infoText: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        textAlign: 'center',
        fontSize: 14,
        color: '#888',
        fontWeight: 'bold',
    }
});