import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './page/login/LoginPage';
import KakaoLogin from './page/login/KakaoLogin';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashLogo from './page/splash/SplashLogo';

import AccountInformation from './page/newAccount/AccountInformation';
import AccountType from './page/newAccount/AccountType';
import CreateAccount from './page/newAccount/CreateAccount';
import AccountPassword from './page/newAccount/AccountPassword';
import AccountComplete from './page/newAccount/AccountComplete';
import AccountTerms from './page/newAccount/AccountTerms';
export type RootStackParamList = {
    AccountType: undefined;
    AccountInformation: undefined;

};
const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="AccountType" 
                screenOptions={{headerShown: false}}
            >
                <Stack.Screen name="Splash" component={SplashLogo} />
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
                <Stack.Screen name="AccountType" component={AccountType}/>
               <Stack.Screen name='AccountInformation' component={AccountInformation}/>
                <Stack.Screen name="CreateAccount" component={CreateAccount}/>
                <Stack.Screen name="AccountPassword" component={AccountPassword}/>
                <Stack.Screen name="AccountComplete" component={AccountComplete}/>
                <Stack.Screen name="AccountTerms" component={AccountTerms}/>



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
