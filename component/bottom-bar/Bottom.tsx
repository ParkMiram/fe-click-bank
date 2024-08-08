import React from 'react';
import { Image, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountHome from '../../page/newAccount/AccountHome';
import ClickHome from '../../page/main/ClickHome';
import CardList from '../../page/card/CardList';
import FriendsComponent from '../../page/friend/FriendsComponent';
import AccountHistory from '../../page/account-history/AccountHistory';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>홈!</Text>
//     </View>
//   );
// }

// function OrdersScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>주문!</Text>
//     </View>
//   );
// }

// function PayScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>결제!</Text>
//     </View>
//   );
// }

function NotificationsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>알림!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Bottom({ route, navigation }: any) {
    const { token } = route.params;
    
    

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconImage;
            // if (route.name === 'Account') {
            //   iconImage = require('../../assets/image/account.png'); 
            // } else if (route.name === 'Friend') {
            //   iconImage = require('../../assets/image/friend.png'); 
            // } else if (route.name === 'Card') {
            //   iconImage = require('../../assets/image/card.png');
            // } else if (route.name === 'Alarm') {
            //   iconImage = require('../../assets/image/history.png');
            // }
            if (route.name === 'Account') {
                iconImage = require('../../assets/image/account.png'); 
              } else if (route.name === 'Friend') {
                iconImage = require('../../assets/image/friend.png'); 
              } else if (route.name === 'Card') {
                iconImage = require('../../assets/image/card.png');
              } else if (route.name === 'Alarm') {
                iconImage = require('../../assets/image/history.png');
              }
            return <Image source={iconImage} style={{ width: size, height: size, tintColor: color }} />;
          },
          tabBarLabel: () => null,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            // backgroundColor: '#d6f2e3',
            borderWidth:1
          },
        })}
      >
        <Tab.Screen name="Account" component={AccountHome}initialParams={{ token }}  />
        <Tab.Screen name="Friend" component={FriendsComponent}initialParams={{ token }}  />
        <Tab.Screen name="Card" component={CardList} initialParams={{ token }} />
        <Tab.Screen name="Alarm" component={AccountHistory} initialParams={{ token }} />
        {/* <Tab.Screen name="More" component={MoreScreen} /> */}
      </Tab.Navigator>
  );
}