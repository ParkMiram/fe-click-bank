import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './page/login/LoginPage';
import KakaoLogin from './page/login/KakaoLogin';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashLogo from './page/splash/SplashLogo';
import Transfer from './page/trasfer/Transfer';
import SendingTransfer from './page/trasfer/SendingTransfer';
import ReminingTranfer from './page/trasfer/ReminingTransfer';
import ResultTransfer from './page/trasfer/ResultTransfer';

// export type RootStackParamList = {
//     Home: undefined;
//     Transfer: undefined;
//     ReminingTranfer: undefined;
//     ResultTransfer: undefined;
//     SendingTransfer: { bank: string; accountNumber: string };
// };

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Transfer" 
                screenOptions={{headerShown: false}}
            >
                <Stack.Screen name="Transfer" component={Transfer} />
                <Stack.Screen name="SendingTransfer" component={SendingTransfer} />
                <Stack.Screen name="ReminingTranfer" component={ReminingTranfer} />
                <Stack.Screen name="ResultTransfer" component={ResultTransfer} />
                <Stack.Screen name="Splash" component={SplashLogo} />
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
            </Stack.Navigator>
        </NavigationContainer>
        // <View style={styles.container}>
        //     <LoginPage />
        //     <StatusBar style="auto" />
        // </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
