
import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AccountHome from '../../page/newAccount/AccountHome';
import { AccountDetail } from '../../page/newAccount/AccountDetail';
import CardList from '../../page/card/CardList';
import CardComplete from '../../page/card/CardComplete';
import AddCardList from '../../page/card/AddCardList';
import CardInformation from '../../page/card/CardInformation';
import MyFriend from '../../page/friend/MyFriend';
import AccountHistory from '../../page/account-history/AccountHistory';
import CreateAccount from '../../page/newAccount/CreateAccount';
import CreateCard from '../../page/card/CreateCard';
import ApplicantInformation from '../../page/card/ApplicantInformation';
import CardPassword from '../../page/card/CardPassword';
import MyCard from '../../page/card/MyCard';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import EditCard from '../../page/card/EditCard';
import FriendInvite from '../../page/friend/FriendInvite';
import FriendSearch from '../../page/friend/FriendSearch';
import AccountHistoryDetail from '../../page/account-history/AccountHistoryDetail';
import AccountHistoryStatistics from '../../page/account-history/AccountHistoryStatistics';
import AccountComplete from '../../page/newAccount/AccountComplete';
import AccountInformation from '../../page/newAccount/AccountInformation';
import { AccountInvitedUser } from '../../page/newAccount/AccountInvitedUser';
import AccountInviteFriends from '../../page/newAccount/AccountInviteFriends';
import AccountPassword from '../../page/newAccount/AccountPassword';
import AccountTerms from '../../page/newAccount/AccountTerms';
import AccountType from '../../page/newAccount/AccountType';
import EditAccount from '../../page/newAccount/EditAccount';
import SavingAccountList from '../../page/newAccount/SavingAccountList';
import ReminingTranfer from '../../page/trasfer/ReminingTransfer';
import ResultTransfer from '../../page/trasfer/ResultTransfer';
import SendingTransfer from '../../page/trasfer/SendingTransfer';
import Transfer from '../../page/trasfer/Transfer';
import { CreateSavingAccount } from '../../page/newAccount/CreateSavingAccount';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AccountStack({ navigation,route }:any) {
  const token = route?.params?.token || '';
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'CreateAccount'|| routeName === 'SavingAccountList'|| routeName === 'AccountPassword'|| routeName === 'AccountInformation'|| routeName === 'AccountTerms') {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    }  

    else {
      navigation.setOptions({ tabBarStyle: { display: undefined } });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AccountHome" component={AccountHome} initialParams={{ token }} />
      <Stack.Screen name="AccountComplete" component={AccountComplete} initialParams={{ token }} />
      <Stack.Screen name="AccountDetail" component={AccountDetail} initialParams={{ token }} />
      <Stack.Screen name="AccountInformation" component={AccountInformation} initialParams={{ token }} />
      <Stack.Screen name="AccountInvitedUser" component={AccountInvitedUser} initialParams={{ token }} />
      <Stack.Screen name="AccountInviteFriends" component={AccountInviteFriends} initialParams={{ token }} />
      <Stack.Screen name="AccountPassword" component={AccountPassword} initialParams={{ token }} />
      <Stack.Screen name="AccountTerms" component={AccountTerms} initialParams={{ token }} />
      <Stack.Screen name="AccountType" component={AccountType} initialParams={{ token }} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} initialParams={{ token }} />
      <Stack.Screen name="EditAccount" component={EditAccount} initialParams={{ token }} />
      <Stack.Screen name="SavingAccountList" component={SavingAccountList} initialParams={{ token }} />
      <Stack.Screen name="ReminingTranfer" component={ReminingTranfer} initialParams={{ token }} />
      <Stack.Screen name="ResultTransfer" component={ResultTransfer} initialParams={{ token }} />
      <Stack.Screen name="SendingTransfer" component={SendingTransfer} initialParams={{ token }} />
      <Stack.Screen name="Transfer" component={Transfer} initialParams={{ token }} />
      <Stack.Screen name="CreateSavingAccount" component={CreateSavingAccount} initialParams={{ token }} />
      <Stack.Screen name="AccountHistory" component={AccountHistory} initialParams={{ token }} />
     <Stack.Screen name="AccountHistoryDetail" component={AccountHistoryDetail} initialParams={{ token }} />
      <Stack.Screen name="AccountHistoryStatistics" component={AccountHistoryStatistics} initialParams={{ token }} />
      </Stack.Navigator>
  );
}

function CardStack({ navigation,route }:any) {
  const token = route?.params?.token || '';
    
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'CreateCard'|| routeName === 'ApplicantInformation'|| routeName === 'CardPassword'|| routeName === 'CardPassword'|| routeName === 'CardComplete') {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    }  

    else {
      navigation.setOptions({ tabBarStyle: { display: undefined } });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CardList" component={CardList} initialParams={{ token }} />
      <Stack.Screen name="CardComplete" component={CardComplete} initialParams={{ token }} />
      <Stack.Screen name="AddCardList" component={AddCardList} initialParams={{ token }} />
      <Stack.Screen name="CardInformation" component={CardInformation} initialParams={{ token }} />
      <Stack.Screen name="CreateCard" component={CreateCard} initialParams={{ token }} />
     < Stack.Screen name="ApplicantInformation" component={ApplicantInformation} initialParams={{ token }} />
     <Stack.Screen name="CardPassword" component={CardPassword} initialParams={{ token }} />
     <Stack.Screen name="MyCard" component={MyCard} initialParams={{ token }} />
     <Stack.Screen name="EditCard" component={EditCard} initialParams={{ token }} />
      </Stack.Navigator>
  );
}

function FriendStack({ route }:any) {
  const token = route?.params?.token || '';
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
          name="FriendsComponent"
          component={MyFriend}
          initialParams={{ token }}
      />
      <Stack.Screen
          name="FriendInvite"
          component={FriendInvite}
          initialParams={{ token }}
      />
      <Stack.Screen
          name="FriendSearch"
          component={FriendSearch}
          initialParams={{ token }}
      />


    </Stack.Navigator>
  );
}

// function HistoryStack({ route }:any) {
//   const token = route?.params?.token || '';
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="AccountHistory" component={AccountHistory} initialParams={{ token }} />
//       <Stack.Screen name="AccountHistoryDetail" component={AccountHistoryDetail} initialParams={{ token }} />
//       <Stack.Screen name="AccountHistoryStatistics" component={AccountHistoryStatistics} initialParams={{ token }} />


//     </Stack.Navigator>
//   );
// }

export default function Bottom({ route }:any) {
  const token = route?.params?.token || '';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconImage;
          if (route.name === '내 계좌') {
            iconImage = require('../../assets/image/account.png');
          } else if (route.name === 'Friend') {
            iconImage = require('../../assets/image/friend.png');
          } else if (route.name === '카드💳') {
            iconImage = require('../../assets/image/card.png');
          }
          // else if (route.name === '거래내역') {
          //   iconImage = require('../../assets/image/history.png');
          // }
          return <Image source={iconImage} style={{ width: size, height: size, tintColor: color }} />;
        },
        tabBarLabel: () => null,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          borderWidth: 1
        }
      })}
    >
      <Tab.Screen name="내 계좌" component={AccountStack} initialParams={{ token }} />
      <Tab.Screen name="Friend" component={FriendStack} initialParams={{ token }} options={{ headerShown: false }} />
      <Tab.Screen name="카드💳" component={CardStack} initialParams={{ token }} />
      {/* <Tab.Screen name="거래내역" component={HistoryStack} initialParams={{ token }} /> */}
    </Tab.Navigator>
  );
}
