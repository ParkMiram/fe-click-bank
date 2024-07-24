import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Platform, SafeAreaView, StatusBar } from 'react-native';

type data = {
    accountStatus: string;
    token: string;
    userName: string,
    accountPassword: string,
    purpose: string
}

export default function AccountInformation( { navigation, route }: any ) {
    const { accountStatus, token, userName, accountPassword, purpose }: data = route.params;
    console.log(accountPassword);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                {/* 여기에 페이지 내용 작성 */}
                <Text style={styles.text}>고객 정보 확인</Text>
            <View>
                <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => alert('메인으로 이동합니다')}
                >
                    <Text style={styles.buttonText}>정보 수정</Text>
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.userText}>고객 정보:</Text>
                <Text style={styles.userText}>이름: {userName}</Text>
                {/* <View style={styles.textContainer}> */}
                <Text style={styles.userText}>거래 목적: {purpose}</Text>
                {/* </View> */}
            </View>
            <TouchableOpacity 
                style={styles.buttonApplication} 
                onPress={() => navigation.navigate('AccountTerms', {accountStatus, token, accountPassword})}
            >
                <Text style={styles.buttonTextApplication}>신청하기</Text>
            </TouchableOpacity>
            </View>
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
    text: {
        textAlign:'center',
        width: '100%',
        fontSize: 40,
        marginTop: 60,
        marginBottom: 10,
    },
    buttonContainer:{
        width:'100%',
        justifyContent:'flex-end',
        flexDirection:'row',
        marginTop: Platform.OS === "ios"? 50 : 30
    },
    button: {
      
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: '#B7E1CE',
        borderRadius: 5,
        justifyContent:'flex-end',
       marginRight:15
        
    },
    buttonText: {
        fontSize: 15,
        color: 'black',
        textAlign:'center',
    },
    userText: {
        textAlign: 'left',
        fontSize: 20,
        padding: 5,
        marginLeft: 25,
    },
    textContainer: {
        marginTop: 40,
    },
    buttonApplication:{
        position: 'absolute', 
        bottom: 0.5,
        // left: 0,
        // right: 0,
        // paddingHorizontal: 100,
        // paddingVertical: 20,
        // backgroundColor: '#B7E1CE',
        // borderRadius: 5,
        // alignSelf: 'center',
        // // position: "static",
        // marginBottom: 20,
        // marginRight:15,
        // marginLeft:15,
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
    buttonTextApplication: {
        textAlign:'center',
        // fontSize: 20,
        color: 'black',
        fontSize: 16,

    },
});