import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView, Platform, StatusBar } from "react-native";
import { RootStackParamList } from "../../App";
import React from "react";

const money: number = 159200000;

type ReminingTranferNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ReminingTranfer'>

type Props = {
  navigation: ReminingTranferNavigationProp;
};


const ReminingTranfer: React.FC<Props> = ({ navigation }) => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>  
            <View>
                <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                    <Image style={styles.markImage} source={require('../../assets/image/Expand_left.png')} resizeMode="contain" onError={(e) => console.log(e.nativeEvent.error)}></Image>
                </TouchableOpacity>
            </View>
            <Image style={styles.image} source={require('../../assets/image/Click_logo.png')} resizeMode="contain"></Image>
            <Text style={{width: 200, alignSelf: 'center',textAlign: 'center', fontSize:30, color: '#000000', marginTop: 70}}>박분도님에게</Text>
            <Text style={{width: 500, alignSelf: 'center',textAlign: 'center', fontSize:30, color: '#000000'}}>{money}원을</Text>
            <Text style={{width: 150, alignSelf: 'center',textAlign: 'center', fontSize:30, color: '#000000'}}>보낼까요?</Text>
            <View style={{flex: 1}}/>
            <TouchableOpacity style={styles.sendButton} onPress={() => navigation.navigate('ResultTransfer')}>
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