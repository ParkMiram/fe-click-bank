import { SafeAreaView, StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewNativeEvent } from 'react-native-webview/lib/WebViewTypes';
import { Container } from '../../css/sujin/Container';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CLIENT_ID = "7c7b66bfebd17d00be7c61d798f0b6e9";
const REDIRECT_URI = "http://34.30.12.64:31000/api/v1/auth/logout/kakao";

export default function KakaoLogout({ navigation }: any) {

    const onNavigationStateChange = async (state: WebViewNativeEvent) => {
        const url = new URL(state.url);
        if (url.host == '34.30.12.64:31000'){
            alert("로그아웃 되었습니다.");
            AsyncStorage.removeItem("login");
            navigation.reset({
                index: 0,
                routes: [{name: 'Login'}]
            });
        }
    }

    return (
        <SafeAreaView style={Container.container}>
            <WebView 
                style={styles.webview}
                source={{
                    uri: `https://kauth.kakao.com/oauth/logout?client_id=${CLIENT_ID}&logout_redirect_uri=${REDIRECT_URI}`
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