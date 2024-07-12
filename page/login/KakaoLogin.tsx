import { SafeAreaView, StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewNativeEvent } from 'react-native-webview/lib/WebViewTypes';
import { Container } from '../../css/sujin/Container';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CLIENT_ID = "7c7b66bfebd17d00be7c61d798f0b6e9";
const REDIRECT_URI = "http://192.168.0.16:8080/api/v1/auth/login/kakao";

export default function KakaoLogin({ navigation }: any) {

    const onNavigationStateChange = async (state: WebViewNativeEvent) => {
        const url = new URL(state.url);
        if (url.host == '192.168.0.16:8080'){
            navigation.navigate('UserGetLoginToken', {url: state.url});
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
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        width: windowWidth,
        height: windowHeight,
    },
});