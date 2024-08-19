import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView, Platform, StatusBar } from "react-native";
// import { RootStackParamList } from "../../App";
import React from "react";
import { Path, Svg } from "react-native-svg";

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
  nickname: string;
  transferAmount: number; // 보낼 금액
  category: number
}

type data = {
  name: string;
  amount: number;
  account: string;
  accountNumber: string;
  moneyAmount: number;
  token: string;
}

const ReminingTranfer = ({ navigation, route }: any) => {
    const userInfo: userInfo = route.params.userInfo;
    const data: props = route.params.data;
    const token: string = route.params.token;
    console.log(userInfo)
    console.log(data)

    console.log(data.transferAmount.toLocaleString());
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
            <View>
                <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                    <Svg
                      width={31}
                      height={23}
                      fill="none"
                      style={styles.markImage}
                    >
                      <Path stroke="#33363F" strokeWidth={2} d="m19.375 6-7.75 6 7.75 6" />
                    </Svg>
                </TouchableOpacity>
            </View>
            <Image style={styles.image} source={require('../../assets/image/Click_logo.png')} resizeMode="contain"></Image>
            <Text style={{width: 200, alignSelf: 'center',textAlign: 'center', fontSize:30, color: '#000000', marginTop: 70}}>{userInfo.nickName}님에게</Text>
            <Text style={{width: 500, alignSelf: 'center',textAlign: 'center', fontSize:30, color: '#000000'}}>{data.transferAmount.toLocaleString()}원을</Text>
            <Text style={{width: 150, alignSelf: 'center',textAlign: 'center', fontSize:30, color: '#000000'}}>보낼까요?</Text>
            <View style={{flex: 1}}/>
            <TouchableOpacity style={styles.sendButton} onPress={() => navigation.navigate('ResultTransfer', { userInfo, data, token })}>
            <Text style={styles.sendButtonText}>보내기</Text>
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
        // alignItems: 'center',
        justifyContent: 'space-between',
    },
    markImage: {
        marginBottom: 20,
        marginLeft: 25,
        alignSelf: 'flex-start',
    },
    image: {
      marginBottom: 70,
      marginTop: 50,
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

  export default ReminingTranfer;