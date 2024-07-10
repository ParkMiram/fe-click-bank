import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container } from '../../css/sujin/Container';

export default function LoginPage({ navigation }: any) {

    const onPress = () => {
        // navigation.navigate('KakaoLogin');
        navigation.navigate('UserTermOfUse', {token: "asd"});
    }

    return (
        <SafeAreaView style={Container.container}>
            <View style={Container.innerContainer}>
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
});
