import { StyleSheet, Image, View } from 'react-native';
import { Container } from '../../css/sujin/Container';

export default function SplashLogo({ navigation }: any) {

    setTimeout(() => {
        navigation.reset({
            index: 0,
            routes: [{name: 'Login'}]
        });
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