import React, { useState,useEffect } from 'react';
import {  Image,Text,TouchableOpacity, Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
// import Clipboard from '@react-native-clipboard/clipboard';

// import Clipboard from "@react-native-community/react-native-clipboard";

export default function AccountHome( { route, navigation }: any ) {
    const [numberHidden, setNumbereHidden] = useState(false);

    const numberShow = () => {
        setNumbereHidden(!numberHidden);
    };
    // const copyToClipboard = () => {
    //     Clipboard.setString('1000-1234-0987');
    //     Alert.alert("복사 완료", "계좌 번호가 복사되었습니다.");
    // };
    //  const[copiedText,setCopiedText] = useState('');
    //  const copyToClipboard = () => {
    //     Clipboard.setString('hello world');
    //   };
    
    //   const fetchCopiedText = async () => {
    //     const text = await Clipboard.getString();
    //     setCopiedText(text);
    //   };
  
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
            <View style={styles.nameComtianer}>
                
            <Image
            source={require('../../assets/image/person.png')}
            style={styles.imagePerson} resizeMode="contain"/>
             <Text style={styles.text}>이름가져오기</Text>
             <View style={styles.bellContainer}>
             <Image
            source={require('../../assets/image/bell.png')}
            style={styles.imageBell} resizeMode="contain"/>
            </View>
            </View>
            
            <View style={styles.accountCard}>
        <Text style={styles.accountName}>계좌명</Text>
        {/* <View style = {styles.printContianer}> */}
        {/* <TouchableOpacity onPress={copyToClipboard}> */}
        {/* <Image
            source={require('../../assets/image/print.png')}
            style={styles.imagePrint} resizeMode="contain"/> */}
                              {/* </TouchableOpacity> */}
    {/* <TouchableOpacity onPress={fetchCopiedText}> */}
                              
        <Text style={styles.accountNumber}>1000-1234-0987</Text>
        {/* </TouchableOpacity> */}
       {/* </View> */}
        <View style={styles.buttonContainer}>
        <Text style={styles.balance}>{numberHidden ? '잔액보기' : '100,000,000원'}</Text>
        <TouchableOpacity style={styles.sendButton}onPress={numberShow}>
            <Text style={styles.buttonsendText}>{numberHidden ? '보기' : '숨김'}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.transferButton}>
            <Text style={styles.buttonText}>이체</Text>
          </TouchableOpacity>
        </View>
            </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('AccountType')}>
            <Image
            source={require('../../assets/image/plus.png')}
            style={styles.imagePlus} resizeMode="contain"
           />
           </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    nameComtianer:{
        marginTop:15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width:'100%',
        flexDirection:'row',
        marginBottom:8
    },
    bellContainer:{
        position: 'absolute',
        right: 20,
        
    },
    imagePerson:{
        // alignSelf: 'auto',
        // alignItems:'center',
        width: 45,
        height: 45, 
        marginLeft:20,
    },
    imageBell:{
        width: 80, 
        height: 80, 
    },
    imagePrint:{
        width:25,
        height:25

    },
    text:{
        textAlign:'left',
        fontSize: 20,
        color: 'black',
        marginLeft:15
    },
    accountContianer:{
        justifyContent:"center"
    },
    buttonAccount:{
        backgroundColor: '#B7E1CE',
        // padding: 15,
        // alignItems: 'center',
        // marginTop:60,
        height:60,
        width:350,
        // paddingHorizontal: 10,
        // paddingVertical: 20,
    }, balance: {
        fontSize: 24,
        fontWeight: 'bold',
        // marginTop: 8,
        marginRight:10
      },
      printContianer:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 16,
        width:'100%',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 16,
        // width:'100%',
      },
      sendButton: {
        // marginTop:13,
        backgroundColor: 'white',
        paddingLeft:8,
        paddingRight:8,
        paddingBottom:5,
        paddingTop:5,
        // width:20,
        // height:30,
        padding:10,
        borderRadius: 5,
        // height:25
      },
      transferButton: {
        backgroundColor: '#6BC29A',
        padding: 10,
        borderRadius: 5,
        marginLeft:270
       
        
      },
      buttonText: {
        color: 'black',
        fontSize: 16,
      
      },
      buttonsendText:{
        color: 'black',
        fontSize: 15,

      },
      accountCard: {
        backgroundColor: '#B7E1CE',
        borderRadius: 10,
        padding: 16,
        margin: 16,
        width:350,
      },
      accountName: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      accountNumber: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
      },
      imagePlus:{
        width: 90,
        height: 95, 
        // marginLeft:20,
      }
});