import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, StatusBar, Alert } from 'react-native';
// import { RootStackParamList } from '../../App';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { Path, Svg } from 'react-native-svg';
import { getAccountUserInfo } from '../../component/api/AccountTranfer';

// type SendingTransferNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Transfer'>

// type SendingTransferRouteProp = RouteProp<RootStackParamList, 'SendingTransfer'>;

// type Props = {
//   navigation: SendingTransferNavigationProp;
//   route: SendingTransferRouteProp;
// };

type userInfo = {
  userId: string;
  account: string;
  nickName: string;
  amount: number;
}

type props = {
  bank: string;
  accountNumber: string;
  account: string;
  moneyAmount: number;
  category: number
}

const SendingTransfer = ({ navigation, route }: any) => {
  const [amount, setAmount] = useState('');
  const [userInfo, setUserInfo] = useState<userInfo | undefined>(undefined);
  const { bank, accountNumber, account, moneyAmount, category}: props = route.params;
  const token: string = route.params?.token;
  console.log(userInfo)       // 상대 유저 정보
  console.log(bank)
  console.log(accountNumber) // 상대 계좌
  console.log(account)      
  console.log(moneyAmount) // 본인 잔액
  console.log(category)

  const data = {
    bank: bank,
    account: account,
    transferAmount: parseInt(amount),
    category: category
  }

  const fetchUserInfo = async (account: string, token: string) => {
    try {
      const response = await getAccountUserInfo(account, token);
      console.log(response.data);
      setUserInfo(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert('', '계좌 정보를 가져오는 데 실패했습니다.');
      navigation.navigate('Transfer', {token, account, moneyAmount})
    }
  };

  useEffect(() => {
    fetchUserInfo(accountNumber, token);
  }, [accountNumber])

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
      if (userInfo && userInfo.nickName) {
        navigation.navigate('ReminingTranfer', { userInfo: userInfo, data: data, token });
      } else {
        Alert.alert('', '사용자 정보가 없습니다.');
      }
    } else {
      Alert.alert('', '돈 입력 안하냐? ***');
    }
  };

    // 금액이 잔액을 초과할 경우 글자색을 빨간색으로 변경
    const amountTextStyle = { color: parseInt(amount, 10) > (moneyAmount || 0) ? 'red' : 'black' };

    // 잔액을 초과하면 보내기 버튼을 비활성화 (회색 배경)
    const sendButtonStyle = { backgroundColor: parseInt(amount, 10) > (moneyAmount || 0)|| amount === '' ? '#CCCCCC' : '#B7E1CE' };
    const sendButtonDisabled = parseInt(amount, 10) > (moneyAmount || 0) || amount === '';

  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
          <Svg width={31} height={23} fill="none" style={styles.image}>
            <Path stroke="#33363F" strokeWidth={2} d="m19.375 6-7.75 6 7.75 6" />
          </Svg>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.label}>예금주</Text>
          <Text style={styles.recipient}>
            <Text style={styles.boldText}>{userInfo?.nickName}</Text>님에게
          </Text>
          <Text style={styles.accountInfo}>{bank} {userInfo?.account}</Text>
          <Text style={styles.question}>얼마를 보낼까요?</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.amountText, amountTextStyle]}>{parseInt(amount).toLocaleString()}</Text>
        </View>
        <View style={styles.greenLine}></View>

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>잔액</Text>
          <Text style={styles.balance}>{moneyAmount.toLocaleString()}원</Text>
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
      </View>
      <View style={styles.fixedBottom}>
        <View style={styles.keypad}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0'].map((num, index) => (
            <TouchableOpacity key={index} style={styles.key} onPress={() => handleNumberPress(num)}>
              <Text style={styles.keyText}>{num}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.key} onPress={handleClear}>
            <Image source={require('../../assets/image/Symbol.png')} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.sendButton, sendButtonStyle]} onPress={handleSend} disabled={sendButtonDisabled}>
          <Text style={styles.sendButtonText}>보내기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
  image: {
    marginBottom: 20,
    alignSelf: 'flex-start'
  },
  textContainer: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  label: {
    fontSize: Platform.OS === 'ios' ? 30 : 25,
    // fontSize: 30,
    fontWeight: 'bold',
  },
  recipient: {
    fontSize: Platform.OS === 'ios' ? 16 : 12,
    // fontSize: 16,
    marginTop: 8,
  },
  boldText: {
    fontWeight: '500',
    fontSize: Platform.OS === 'ios' ? 27 : 22,
    // fontSize: 27,
  },
  accountInfo: {
    fontSize: Platform.OS === 'ios' ? 14 : 8,
    // fontSize: 14,
    color: '#888888',
    marginTop: 5,
  },
  question: {
    fontSize: Platform.OS === 'ios' ? 25 : 20,
    // fontSize: 25,
    marginTop: 16,
  },
  amountContainer: {
    height: Platform.OS === 'ios' ? 100 : 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Platform.OS === 'ios' ? 20 : 15,
  },
  amountText: {
    fontSize: Platform.OS === 'ios' ? 30 : 25,
    // fontSize: 30,
  },
  greenLine: {
    borderBottomColor: '#B7E1CE',
    borderBottomWidth: 3,
    width: '100%',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  balanceLabel: {
    fontSize: 16,
  },
  balance: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  predefinedAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  amountButtonWrapper: {
    marginHorizontal: 18,
  },
  amountButtonText: {
    fontSize: 16,
    color: '#6BC29A',
  },
  fixedBottom: {
    padding: Platform.OS === 'ios' ? 16 : 8,
    // bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
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
    marginTop: Platform.OS === 'ios' ? 16 : 0,
    marginBottom: 15,
    backgroundColor: '#B7E1CE',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  sendButtonText: {
    fontSize: 16,
  },
});

export default SendingTransfer;