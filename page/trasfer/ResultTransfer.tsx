import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView, Platform, StatusBar, Alert } from "react-native";
// import { RootStackParamList } from "../../App";
import React, { useEffect } from "react";
import { setAccountMoney } from "../../component/api/AccountTranfer";

// type ReminingTranferNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ReminingTranfer'>

// type Props = {
//   navigation: ReminingTranferNavigationProp;
// };

type userInfo = {
  userId: string;
  account: string;
  nickName: string;
  amount: number; // 상대방 잔액
}

type props = {
  bank: string;
  account: string;
  sendNickname: string;
  transferAmount: number; // 보낼 금액
  category: number
}

type data = {
    name: string;
    amount: number;
    account: string;
    accountNumber: string;
    moneyAmount: number;
    category: number;
    token: string;
  }

const ResultTransfer = ({ navigation, route }: any) => {
    const userInfo: userInfo = route.params.userInfo;
    const data: props = route.params.data;
    const token: string = route.params.token;
    // const { name, amount, account, moneyAmount, token }: data = route.params;
    console.log(userInfo);
    console.log(data);
    console.log(token);
    console.log(userInfo.account);

    useEffect(() => {
      const performTransfer = async () => {
          const bodyToRecipient = {
              accountStatus: "deposit",
              account: userInfo.account,
              nickname: data.sendNickname,
              moneyAmount: data.transferAmount,
              category: data.category
          };

          const bodyToSender = {
              accountStatus: "transfer",
              account: data.account,
              nickname: userInfo.nickName,
              moneyAmount: data.transferAmount,
              category: data.category
          };
          
          console.log(bodyToRecipient.moneyAmount);
          console.log(bodyToSender.moneyAmount);

          try {
              await setAccountMoney(bodyToSender, token);
              await setAccountMoney(bodyToRecipient, token);
              console.log("Transfer successful");
          } catch (error) {
              console.error("Failed to set account money:", error);
              Alert.alert("Transfer Failed", "An error occurred during the transfer. Please try again.");
          }
      };

      performTransfer();
    }, [data.transferAmount, userInfo?.account, data.account, token]);

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
            <Image style={styles.image} source={require('../../assets/image/Click_logo.png')} resizeMode="contain"></Image>
            <Text style={{width: 200, alignSelf: 'center',textAlign: 'center', fontSize:30, color: '#000000', marginTop: 70}}>{userInfo.nickName}님에게</Text>
            <Text style={{width: 500, alignSelf: 'center',textAlign: 'center', fontSize:30, color: '#000000'}}>{data.transferAmount.toLocaleString()}원을</Text>
            <Text style={{width: 150, alignSelf: 'center',textAlign: 'center', fontSize:30, color: '#000000'}}>보냈어요*</Text>
            <View style={{flex: 1}}/>
            <TouchableOpacity style={styles.sendButton} onPress={() => navigation.reset({
                        index: 0,
                        routes: [{name: 'AccountHome', params: {token}}]
            })}>
                <Text style={styles.sendButtonText}>메인으로</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: "#ffffff",
        alignItems: 'center',
    },
    innerContainer: {
        flex: 1,
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        marginBottom: 72,
        marginTop: 93,
        width: 230, 
        height: 100, 
        alignSelf: 'center'
    },
    sendButton: {
        marginTop: 16,
        marginBottom: 30,
        backgroundColor: '#B7E1CE',
        padding: 16,
        alignItems: 'center',
        borderRadius: 8,
        width: '100%',
        maxWidth: 325,
        alignSelf: 'center',
      },
      sendButtonText: {
        fontSize: 16,
      },
  })

  export default ResultTransfer;