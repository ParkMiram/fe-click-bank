import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, StatusBar, Alert } from 'react-native';
// import { RootStackParamList } from '../../App';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';

// type SendingTransferNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Transfer'>

// type SendingTransferRouteProp = RouteProp<RootStackParamList, 'SendingTransfer'>;

// type Props = {
//   navigation: SendingTransferNavigationProp;
//   route: SendingTransferRouteProp;
// };

const SendingTransfer = ({ navigation, route }: any) => {
  const [amount, setAmount] = useState('');
  
  const name: string = '난쟁이미람';
  const { bank, accountNumber } = route.params;

  const handleNumberPress = (num: string) => {
    setAmount(amount + num);
  };

  const handleClear = () => {
    setAmount(amount.slice(0, -1));
  };

  const handlePredefinedAmount = (num: number) => {
    setAmount((parseInt(amount, 10) || 0) + num + '');
  };

  const handleSend = () => {
    if (!Number.isNaN(parseInt(amount)) && parseInt(amount) !== 0) {
      navigation.navigate('ReminingTranfer', { name, amount: parseInt(amount) });
    } else {
      Alert.alert('', '돈 입력 안하냐? ***');
    }
  };

  return (
    
    <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
            <Image style={styles.image} source={require('../../assets/image/Expand_left.png')}></Image>
            <View style={styles.textContainer}>
                <Text style={styles.label}>예금주</Text>
                <Text style={styles.recipient}>
                    <Text style={styles.boldText}>{name}</Text>님에게
                </Text>
                <Text style={styles.accountInfo}>{bank} {accountNumber}</Text>
                <Text style={styles.question}>얼마를 보낼까요?</Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={styles.amountText}>{amount}</Text>
            </View>
            <View style={styles.greenLine}></View>

            <View style={styles.balanceContainer}>
                <Text style={styles.balanceLabel}>잔액</Text>
                <Text style={styles.balance}>100,000,000원</Text>
            </View>

            <View style={styles.predefinedAmounts}>
            <TouchableOpacity style={styles.amountButtonWrapper} onPress={() => handlePredefinedAmount(10000)}>
                    <Text style={styles.amountButtonText}>+ 1만</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.amountButtonWrapper} onPress={() => handlePredefinedAmount(50000)}>
                    <Text style={styles.amountButtonText}>+ 5만</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.amountButtonWrapper} onPress={() => handlePredefinedAmount(100000)}>
                    <Text style={styles.amountButtonText}>+ 10만</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.amountButtonWrapper} onPress={() => setAmount('100000000')}>
                    <Text style={styles.amountButtonText}>전액</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.keypad}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0'].map((num, index) => (
                <TouchableOpacity key={index} style={styles.key} onPress={() => handleNumberPress(num)}>
                    <Text style={styles.keyText}>{num}</Text>
                </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.key} onPress={handleClear}>
                <Image source={require('../../assets/image/Symbol.png')} resizeMode="contain"></Image>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1}}/>
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Text style={styles.sendButtonText}>보내기</Text>
            </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    flex: 1,
    width: "100%",
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 20,
    marginLeft: 25,
    alignSelf: 'flex-start'
  },
  textContainer: {
    alignSelf: 'flex-start',
    marginLeft: 45,
  },
  label: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  recipient: {
    fontSize: 16,
    marginTop: 8,
  },
  boldText: {
    fontWeight: '500',
    fontSize: 27
  },
  accountInfo: {
    fontSize: 14,
    color: '#888888',
    marginTop: 5
  },
  question: {
    fontSize: 25,
    marginTop: 16,
  },
  amountContainer: {
    height: 100,
    width: 345,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountText: {
    fontSize: 30,
  },
  greenLine: {
    borderBottomColor: '#B7E1CE',
    borderBottomWidth: 3,
    width: '100%',
    maxWidth: 345,
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20,
    maxWidth: 325
  },
  balanceLabel: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  balance: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  predefinedAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  amountButtonWrapper: {
    marginHorizontal: 18,
  },
  amountButtonText: {
    fontSize: 16,
    color: '#6BC29A',
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  key: {
    width: '30%',
    padding: 16,
    backgroundColor: '#ffffff',
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 18,
  },
  sendButton: {
    marginTop: 3,
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
});

export default SendingTransfer;