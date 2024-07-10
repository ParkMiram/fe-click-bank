import axios from 'axios';
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewNativeEvent } from 'react-native-webview/lib/WebViewTypes';

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
            const token = await getData(state.url);
            navigation.navigate('ClickHome', {code: token});
        }
    }

    return (
        <SafeAreaView style={styles.container}>
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },    
    webview: {
        flex: 1,
        width: windowWidth,
        height: windowHeight,
    },
});