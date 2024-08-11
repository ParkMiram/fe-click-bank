import React, { useState } from 'react';
import { Keyboard,TouchableWithoutFeedback, Text, TextInput, TouchableOpacity, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

type data = {
  accountStatus: string;
  token: string;
  userName: string;
  product: string | null;
  interestRate: number | null;
}

export default function AccountPassword( {  navigation, route }: any ) {
    const [password, setPassword] = useState('');
    const [purpose, setPurpose] = useState('계좌사용용도');
    const [firstQuestion, setFirstQuestion] = useState(false);
    const [secondQuestion, setSecondQuestion] = useState(false);
    const [pickerVisible, setPickerVisible] = useState(false);

    const { accountStatus, token, userName, product, interestRate }: data = route.params;

    const dismissKeyboard = () => {
      Keyboard.dismiss();
    };
    const purposes = [
        { label: '급여 및 아르바이트', value: '급여 및 아르바이트' },
        { label: '생활비 관리', value: '생활비 관리' },
        { label: '적금 자동이체', value: '적금 자동이체' },
        { label: '예금가입', value: '예금가입' }
    ];
      
    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
            <View style={styles.purposeContainer}>
        <Text style={styles.title}>통장 비밀번호 만들기</Text>
        <View style={styles.purposeInput}>
        <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        keyboardType="number-pad"
        placeholder="0000"
        maxLength={4}
        secureTextEntry={true}
      />
        </View> 
      </View>
      <Text style={styles.subtitle}>어떤 용도로 통장을 사용하실 건가요?</Text>
      <View style={styles.purposeContainer}>
        <Text style={styles.purposeLabel}>계좌사용용도</Text>
        <View style={styles.pickerWrapper}>
          <RNPickerSelect
            onValueChange={(value) => setPurpose(value)}
            useNativeAndroidPickerStyle={false}
            items={purposes}
            placeholder={{ label: '선택하세요', value: 'null',color:'black' }}
            value={purpose}
            style={pickerSelectStyles}
          />
        </View> 
      </View>
      <Text style={styles.question1}>타인으로부터 통장대여 요청을 받은 사실이 있나요?</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity 
          onPress={() => setFirstQuestion(true)} 
          style={[styles.radioLeft, firstQuestion === true && styles.selectedRadio]}
        >
          <Text>예 </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setFirstQuestion(false)} 
          style={[styles.radioRight, firstQuestion === false && styles.selectedRadio]}
        >
          <Text>아니요 </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.question2}>타인으로부터 신용정보 상환, 대출 등의 목적으로 통장 개설을 요청받은 사실이 있나요?</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity 
          onPress={() => setSecondQuestion(true)} 
          style={[styles.radioLeft, secondQuestion === true && styles.selectedRadio]}
        >
          <Text>예 </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setSecondQuestion(false)} 
          style={[styles.radioRight, secondQuestion === false && styles.selectedRadio]}
        >
          <Text>아니요 </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('AccountInformation', { accountStatus, token, userName, accountPassword: password, purpose })}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
            </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
      
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    purposeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#B7E1CE',
        padding: 10,
        borderRadius:5,
        height:80,
        width:350,
      },
      title: {
        marginLeft:10,
        fontSize: 16,
        fontWeight: 'bold',
       marginRight: 20,
  
       
      },
      purposeInput: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#B7E1CE',
        paddingHorizontal: 10,
        marginBottom: 20,
        
      },
      pickerWrapper: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#B7E1CE',
        paddingHorizontal: 10,
        marginBottom: 20,
        // borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
      },
      input: {
        height: 40,
        width: 150,
        borderColor: 'gray',
        borderRadius:5,
        borderWidth: 1,
         marginTop:20,
         backgroundColor: '#B7E1CE',
         textAlign:'center',

      },
      subtitle: {
        marginTop:20,
        fontSize: 16,
        marginBottom: 15,
        fontWeight: 'bold',
        textAlign:'left',
        marginRight:100
     
      },
      purposeLabel: {
        fontSize: 16,
        marginRight: 10,
        fontWeight: 'bold',
        marginLeft:10
      },
      question1: {
        fontSize: 16,
        marginBottom: 10,
        marginTop:50,
        fontWeight: 'bold',
      },
      question2: {
        fontSize: 16,
        marginBottom: 10,
        marginTop:30,
        fontWeight: 'bold',
        marginRight:20,
        marginLeft:20
      },
      radioContainer: {
        flexDirection: 'row',
        marginBottom: 20,
      },
      radioLeft: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#fff',
        marginLeft:30
      },
      radioRight: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#fff',
        marginRight:30
      },

      selectedRadio: {
        backgroundColor: '#B7E1CE',
      },
      buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      button: {
        backgroundColor: '#B7E1CE',
        // padding: 15,
        borderRadius:8,
        width:'100%',
        alignItems: 'center',
        marginTop:80,
        maxWidth: 325,
        // height:60,
        // width:350,
        paddingHorizontal: 10,
        paddingVertical: 20,
      },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      height: 40,
      marginTop: 20,
      backgroundColor: '#B7E1CE',
      paddingHorizontal: 20,
      paddingVertical: 30,
      borderRadius: 5,
      color:'black',
      fontSize:16
    },
    inputAndroid: {
      fontSize: 16,
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, 
    },
    placeholder: {
        color: 'black',  
      },
  });