import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './page/login/LoginPage';
import KakaoLogin from './page/login/KakaoLogin';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashLogo from './page/splash/SplashLogo';
import ClickHome from './page/main/ClickHome';
import TermOfUse from './page/login/TermOfUse';
import SetPassword from './page/login/SetPassword';
import CheckPassword from './page/login/CheckPassword';
import SetNickName from './page/login/SetNickname';
import CreateUser from './page/login/CreateUser';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Splash" 
                screenOptions={{headerShown: false}}
            >
                <Stack.Screen name="Splash" component={SplashLogo} />
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
                <Stack.Screen name="UserTermOfUse" component={TermOfUse} />
                <Stack.Screen name="UserSetPassword" component={SetPassword} />
                <Stack.Screen name="UserCheckPassword" component={CheckPassword} />
                <Stack.Screen name="UserSetNickName" component={SetNickName} />
                <Stack.Screen name="UserCreate" component={CreateUser} />
                <Stack.Screen name="ClickHome" component={ClickHome} />
            </Stack.Navigator>
        </NavigationContainer>
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
