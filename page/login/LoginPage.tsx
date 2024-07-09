import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LoginPage({ route, navigation }: any) {
    const { token, error, error_description } = route.params;

    const onPress = () => {
        navigation.navigate('KakaoLogin');
    }

    return (
        <View style={styles.container}>
            <Image 
                style={styles.clickLogo}
                source={require('../../assets/image/Click_logo.png')}
            />
            {/* <Text>쉽고 간편한 금융서비스 딸깍!</Text> */}
            <Text>{token}</Text>
            <Text>{error}</Text>
            <Text>{error_description}</Text>
            <TouchableOpacity
                style={{marginTop:100}}
                onPress={onPress}>
                <Image 
                    style={styles.kakaoLogin}
                    source={require('../../assets/image/kakao_login_large_narrow.png')}
                />
            </TouchableOpacity>
        </View>
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
