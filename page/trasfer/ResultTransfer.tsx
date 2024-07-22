import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView, Platform, StatusBar } from "react-native";
// import { RootStackParamList } from "../../App";
import React from "react";

// type ReminingTranferNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ReminingTranfer'>

// type Props = {
//   navigation: ReminingTranferNavigationProp;
// };

type data = {
    name: string;
    amount: number;
    account: string;
    accountNumber: string;
    moneyAmount: number;
    token: string;
  }

const ResultTransfer = ({ navigation, route }: any) => {
    const { name, amount, accountNumber, account, moneyAmount, token }: data = route.params;
    if (typeof amount === 'number') {
        console.log(amount);
    } else {
        console.log("Amount is not a string");
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
            <Image style={styles.image} source={require('../../assets/image/Click_logo.png')} resizeMode="contain"></Image>
            <Text style={{width: 200, alignSelf: 'center',textAlign: 'center', fontSize:30, color: '#000000', marginTop: 70}}>{name}님에게</Text>
            <Text style={{width: 500, alignSelf: 'center',textAlign: 'center', fontSize:30, color: '#000000'}}>{amount.toLocaleString()}원을</Text>
            <Text style={{width: 150, alignSelf: 'center',textAlign: 'center', fontSize:30, color: '#000000'}}>보냈어요*</Text>
            <View style={{flex: 1}}/>
            <TouchableOpacity style={styles.sendButton} onPress={() => navigation.navigate('Transfer')}>
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