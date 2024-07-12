import { StyleSheet, Image, View, Text, SafeAreaView } from 'react-native';
import { Container } from '../../css/sujin/Container';
import NextButton from '../../component/auth/NextButton';

export default function TermOfUse({ navigation, route }: any) {
    const { identity, type, nickname, image } = route.params;
    
    const goNext = () => {
        navigation.navigate('UserSetPassword', {
            identity: identity,
            type: type,
            nickname: nickname,
            image: image
        });
    }

    return (
        <SafeAreaView style={Container.container}>
            <View style={Container.innerContainer}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/image/Click_logo.png')}
                />
                <Text>
                    딸깍을 이용하려면 약관 동의가 필요해요.
                </Text>
                <View style={styles.termBox}>
                    <Text>대충 동의하시죠?</Text>
                    <Text>승인은 딸깍이 했어요~</Text>
                </View>
                <NextButton text="어서 시작해요" press={goNext} active={true} />
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
    termBox: {
        flex: 1,
        width: "70%",
        marginTop: 20,
        marginBottom: 40,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
});