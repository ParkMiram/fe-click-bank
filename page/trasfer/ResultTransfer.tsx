import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView, Platform, StatusBar } from "react-native";
import { RootStackParamList } from "../../App";
import React from "react";

const money: number = 159200000;

type ReminingTranferNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ReminingTranfer'>

type Props = {
  navigation: ReminingTranferNavigationProp;
};


const ResultTransfer: React.FC<Props> = ({ navigation }) => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
            <Image style={styles.image} source={require('../../assets/image/Click_logo.png')} resizeMode="contain"></Image>
            <Text style={{width: 200, alignSelf: 'center',textAlign: 'center', fontSize:30, color: '#000000', marginTop: 70}}>박분도님에게</Text>
            <Text style={{width: 500, alignSelf: 'center',textAlign: 'center', fontSize:30, color: '#000000'}}>{money}원을</Text>
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
        // fontWeight: 'bold',
      },
  })

  export default ResultTransfer;