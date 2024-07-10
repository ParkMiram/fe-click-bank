import axios from 'axios';
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewNativeEvent } from 'react-native-webview/lib/WebViewTypes';
import { Container } from '../../css/sujin/Container';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CLIENT_ID = "7c7b66bfebd17d00be7c61d798f0b6e9";
const REDIRECT_URI = "http://192.168.0.16:8080/api/v1/auth/kakao";

export default function KakaoLogin({ navigation }: any) {
    let checkAlreadySend = false;

    const getData = async (uri: string) => {
        try {
            const response = await axios.get(uri+"&isFront=true");
            return response.data;
        } catch (error) {
            alert(error);
        }
    }

    const onNavigationStateChange = async (state: WebViewNativeEvent) => {
        const url = new URL(state.url);
        if (url.hostname != 'kauth.kakao.com' && !checkAlreadySend){
            checkAlreadySend = true;
            const data = await getData(state.url);
            if (data.isAlready) {
                // 자동로그인 토큰 발급
            } else {
                navigation.navigate('ClickHome', {identity: data.identity, type: data.type});
            }
        }
    }

    return (
        <SafeAreaView style={Container.container}>
            <WebView 
                style={styles.webview}
                source={{
                    uri: `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`
                }}
                onNavigationStateChange={onNavigationStateChange}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    webview: {
        flex: 1,
        width: windowWidth,
        height: windowHeight,
    },
});