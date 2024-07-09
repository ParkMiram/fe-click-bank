import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewNativeEvent } from 'react-native-webview/lib/WebViewTypes';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CLIENT_ID = "7c7b66bfebd17d00be7c61d798f0b6e9";
const REDIRECT_URI = "http://localhost:8081/login/redirect/kakao";

export default function KakaoLogin({ navigation }: any) {
    const onNavigationStateChange = (state: WebViewNativeEvent) => {
        if (!state.url.startsWith("https://kauth.kakao.com")){
            navigation.navigate('Login', {token: state.url});
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