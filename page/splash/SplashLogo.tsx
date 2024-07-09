import { StyleSheet, Image, View } from 'react-native';

export default function SplashLogo({ navigation }: any) {

    setTimeout(() => {
        navigation.navigate('Login', {token: null, error: null});
    }, 1000);

    return (
        <View style={styles.container}>
            <Image
                style={styles.splashLogo}
                source={require('../../assets/image/Click_logo.png')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    splashLogo: {
        width: 300,
        height: 100
    },
});