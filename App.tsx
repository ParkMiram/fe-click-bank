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
import SimpleLogin from './page/login/SimpleLogin';
import AccountHistory from "./page/account-history/AccountHistory";
import AccountHistoryDetail from "./page/account-history/AccountHistoryDetail";
import Transfer from './page/trasfer/Transfer';
import SendingTransfer from './page/trasfer/SendingTransfer';
import ReminingTranfer from './page/trasfer/ReminingTransfer';
import ResultTransfer from './page/trasfer/ResultTransfer';
import GetLoginToken from './page/login/GetLoginToken';
import AccountHome from './page/newAccount/AccountHome';
import FriendsComponent from "./page/friend/FriendsComponent";
import AccountType from './page/newAccount/AccountType';
import AccountInformation from './page/newAccount/AccountInformation';
import CreateAccount from './page/newAccount/CreateAccount';
import AccountPassword from './page/newAccount/AccountPassword';
import AccountComplete from './page/newAccount/AccountComplete';
import AccountTerms from './page/newAccount/AccountTerms';
import KakaoLogout from './page/login/KakaoLogout';
import AccountHistoryStatistics from "./page/account-history/AccountHistoryStatistics";
import EditAccount from './page/newAccount/EditAccount';

import CardList from './page/card/CardList';
import MyCardInformation from './page/card/CardInformation';
import AddCardList from './page/card/AddCardList';
import CreateCard from './page/card/CreateCard';
import CardInformation from './page/card/CardInformation';


import CardComplete from './page/card/CardComplete';
import ApplicantInformation from './page/card/ApplicantInformation';
import CardPassword from './page/card/CardPassword';
import MyCard from './page/card/MyCard';

import { AccountDetail } from './page/newAccount/AccountDetail';
import AccountInviteFriends from './page/newAccount/AccountInviteFriends';
import { AccountInvitedUser } from './page/newAccount/AccountInvitedUser';

import EditCard from './page/card/EditCard';
import Bottom from './component/bottom-bar/Bottom';


// export type RootStackParamList = {
//     Home: undefined;
//     Transfer: undefined;
//     ReminingTranfer: undefined;
//     ResultTransfer: undefined;
//     SendingTransfer: { bank: string; accountNumber: string };
// };

export type RootStackParamList = {
    AccountType: undefined;
    AccountInformation: undefined;
};
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
                <Stack.Screen name="KakaoLogout" component={KakaoLogout} />
                <Stack.Screen name="SimpleLogin" component={SimpleLogin} />
                <Stack.Screen name="UserTermOfUse" component={TermOfUse} />
                <Stack.Screen name="UserSetPassword" component={SetPassword} />
                <Stack.Screen name="UserCheckPassword" component={CheckPassword} />
                <Stack.Screen name="UserSetNickName" component={SetNickName} />
                <Stack.Screen name="UserCreate" component={CreateUser} />
                <Stack.Screen name="UserGetLoginToken" component={GetLoginToken} />
                <Stack.Screen name="ClickHome" component={ClickHome} />

                {/* Account */}
                <Stack.Screen name="AccountType" component={AccountType}/>
                <Stack.Screen name='AccountInformation' component={AccountInformation}/>
                <Stack.Screen name="CreateAccount" component={CreateAccount}/>
                <Stack.Screen name="AccountPassword" component={AccountPassword}/>
                <Stack.Screen name="AccountComplete" component={AccountComplete}/>
                <Stack.Screen name="AccountTerms" component={AccountTerms}/>
                <Stack.Screen name="AccountHistory" component={AccountHistory} />
                <Stack.Screen name="AccountHistoryDetail" component={AccountHistoryDetail} />
                <Stack.Screen name="AccountHistoryStatistics" component={AccountHistoryStatistics} />
                <Stack.Screen name="AccountDetail" component={AccountDetail} />
                <Stack.Screen name="EditAccount" component={EditAccount}/>
                <Stack.Screen name='AccountInviteFriends' component={AccountInviteFriends} />
                <Stack.Screen name="AccountHome" component={AccountHome}/>

                <Stack.Screen name="CardList" options={{title:"카드 상품 목록"}} component={CardList}/>
                <Stack.Screen name="CardInformation" component={CardInformation}/>
                <Stack.Screen name="AddCardList" component={AddCardList}/>
                <Stack.Screen name="CreateCard" component={CreateCard}/>
                <Stack.Screen name="ApplicantInformation" component={ApplicantInformation}/>
                <Stack.Screen name="MyCard" component={MyCard}/>
                 <Stack.Screen name="CardPassword" component={CardPassword}/>
                <Stack.Screen name="CardComplete" component={CardComplete}/>
                <Stack.Screen name="EditCard" component={EditCard}/>
                <Stack.Screen name='AccountInvitedUser' component={AccountInvitedUser} />
                <Stack.Screen name="Transfer" component={Transfer} />
                <Stack.Screen name="SendingTransfer" component={SendingTransfer} />
                <Stack.Screen name="ReminingTranfer" component={ReminingTranfer} />
                <Stack.Screen name="ResultTransfer" component={ResultTransfer} />

                <Stack.Screen name='Bottom' component={Bottom}/>
             

                {/* Friend */}
                <Stack.Screen name="FriendsComponent" component={FriendsComponent} />

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
