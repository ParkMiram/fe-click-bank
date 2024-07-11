import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { RootStackParamList } from '../../App';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

type SendingTransferNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Transfer'>

type Props = {
  navigation: SendingTransferNavigationProp;
};

const SendingTransfer: React.FC<Props> = ({ navigation }) => {
  const [amount, setAmount] = useState('');

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
    // Add your send logic here
    console.log('Amount:', amount);
  };

  return (
    
    <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
            <Image style={styles.image} source={require('../../assets/image/Expand_left.png')}></Image>
            <View style={styles.textContainer}>
                <Text style={styles.label}>예금주</Text>
                <Text style={styles.recipient}>
                    <Text style={styles.boldText}>박분도</Text>님에게
                </Text>
                <Text style={styles.accountInfo}>클릭뱅크 12345678900011</Text>
                <Text style={styles.question}>얼마를 보낼까요?</Text>
            </View>
            <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                maxLength={15}
                />

            <View style={styles.balanceContainer}>
                <Text style={styles.balanceLabel}>잔액</Text>
                <Text style={styles.balance}>100,000,000원</Text>
            </View>

            <View style={styles.predefinedAmounts}>
                <View style={styles.amountButtonWrapper}>
                <Button title="+ 1만" onPress={() => handlePredefinedAmount(10000)} />
                </View>
                <View style={styles.amountButtonWrapper}>
                <Button title="+ 5만" onPress={() => handlePredefinedAmount(50000)} />
                </View>
                <View style={styles.amountButtonWrapper}>
                <Button title="+ 10만" onPress={() => handlePredefinedAmount(100000)} />
                </View>
                <View style={styles.amountButtonWrapper}>
                <Button title="전액" onPress={() => setAmount('100000000')} />
                </View>
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
            <TouchableOpacity style={styles.sendButton} onPress={() => navigation.navigate('ReminingTranfer')}>
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
  input: {
    borderBottomColor: '#B7E1CE',
    borderBottomWidth: 3,
    height: 100,
    width: 345,
    // marginBottom: 16,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 30,
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 43,
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