import { Dimensions, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LoginPage({ route, navigation }: any) {

    const onPress = () => {
        // navigation.navigate('KakaoLogin');
        navigation.navigate('UserTermOfUse');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Image 
                    style={styles.clickLogo}
                    source={require('../../assets/image/Click_logo.png')}
                />
                <Text>쉽고 간편한 금융서비스 딸깍!</Text>
                <TouchableOpacity
                    style={{marginTop:100}}
                    onPress={onPress}>
                    <Image 
                        style={styles.kakaoLogin}
                        source={require('../../assets/image/kakao_login_large_narrow.png')}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    clickLogo: {
        width:280,
        height:115,
    },
    kakaoLogin: {
        width:230,
        height:56,
    },
    innerContainer: {
        flex: 1,
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
