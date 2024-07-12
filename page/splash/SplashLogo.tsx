import { StyleSheet, Image, View } from 'react-native';
import { Container } from '../../css/sujin/Container';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashLogo({ navigation }: any) {

    setTimeout( async () => {
        const loginToken = await AsyncStorage.getItem("login");
        if (loginToken) {
            navigation.reset({
                index: 0,
                routes: [{name: 'SimpleLogin', params: {token: loginToken}}]
            });
        } else {
            navigation.reset({
                index: 0,
                routes: [{name: 'Login'}]
            });
        }
        // navigation.navigate('Login') //, {token: null, error: null});
    }, 1000);

    return (
        <View style={Container.container}>
            <Image
                style={styles.splashLogo}
                source={require('../../assets/image/Click_logo.png')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    splashLogo: {
        width: 300,
        height: 120
    },
});