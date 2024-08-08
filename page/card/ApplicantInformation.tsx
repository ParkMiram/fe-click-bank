import { TouchableOpacity, TextInput, Text, Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-paper';
import { AxiosResponse } from 'axios';
import { getAccountByUserId } from "../../component/api/NewAccountApi";
import RNPickerSelect from 'react-native-picker-select';
type CardCheck = 'CREDIT' | 'CHECK';
type CardTransportation = 'POSTPAID' | 'PREPAYMENT';
type data = {
  cardPassword: string;
  cardCheck: CardCheck;
  account: string;
  cardTransportation: CardTransportation;
  cardProductId: number;
  cardPaymentDate:number;
}
interface AccountResponse {
  accounts: { account: string; accountName: string; moneyAmount: number; }[];
  userCode: string;
  userImg: string;
  userName: string;
}

export default function ApplicantInformation({ route, navigation }: any) {
  const [cardBrand, setCardBrand] = useState<CardCheck | null>(null);
  const [name, setName] = useState('홍길동');
  const [applyFeature, setApplyFeature] = useState(false);
  const [applyFeature1, setApplyFeature1] = useState(false);
  const [applyFeature2, setApplyFeature2] = useState(false);
  const [account, setAccount] = useState('');
  const [items, setItems] = useState<{ label: string, value: string }[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const days = Array.from({ length: 31 }, (_, i) => i + 1).map(day => ({
    label: day.toString(),
    value: day.toString(),
  }));
  const {cardPassword,  cardCheck, cardTransportation, cardProductId}:data  = route.params;

  const { token } = route.params;

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response: AxiosResponse<AccountResponse[]> = await getAccountByUserId(token);
        const data = response.data[0]; // 배열에서 첫 번째 객체 추출
        console.log('API 응답 데이터:', data); // API 응답 데이터 로그
        if (data.accounts && data.accounts.length > 0) {
          const accountData = data.accounts.map(account => ({
            label: account.account,
            value: account.account
          }));
          setItems(accountData);
          setAccount(data.accounts[0].account);
        } else {
          console.error('No accounts found in the response');
          Alert.alert("계좌 정보를 찾을 수 없습니다.");
        }
        setName(data.userName); // 사용자 이름 설정
      } catch (error) {
        console.error('계좌 정보를 가져오는데 실패했습니다:', error);
        Alert.alert("계좌 정보를 가져오는 데 실패했습니다. 나중에 다시 시도해주세요.");
      }
    };
    fetchAccount();
  }, [token]);

  const handleNextPress = () => {
    if (applyFeature && applyFeature1 && applyFeature2) {
      navigation.navigate('CardPassword',{cardPaymentDate: selectedDate,cardPassword, account, cardCheck, cardTransportation, cardProductId,token});
    } else {
      Alert.alert("모든 동의사항에 체크해 주세요.");
    }
  }

  const toggleFeature = () => {
    setApplyFeature(!applyFeature);
  };

  const toggleFeature1 = () => {
    setApplyFeature1(!applyFeature1);
  };

  const toggleFeature2 = () => {
    setApplyFeature2(!applyFeature2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.cardText}>카드 생성</Text>
        </View>
        <View style={styles.userContainer}>
          <Text style={styles.label}>신청인 정보</Text>
          <View style={styles.username}>
            <Text style={styles.user}>이름</Text>
            <Text style={styles.usename}>{name}</Text>
            <View style={styles.underline} />
          </View>
        </View>
        <View style={styles.account}>
          <RNPickerSelect
            onValueChange={(value) => setAccount(value)}
            items={items}
            style={pickerSelectStyles}
            placeholder={{ label: "계좌 선택", value: null }}
            value={account} 
          />
          <RNPickerSelect
            onValueChange={(value) => setSelectedDate(value)}
            items={days}
            style={pickerSelectStyles}
            placeholder={{ label: "결제일을 선택해주세요", value: null }}
            value={selectedDate}
          />
        </View>
        <View style={styles.checkCard}>
          <Text style={styles.label}>카드발급 관련 동의사항</Text>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={toggleFeature}>
              <Icon source={applyFeature ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color='#000' />
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>개인(신용)정보 필수적 동의</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={toggleFeature1}>
              <Icon source={applyFeature1 ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color='#000' />
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>카드발급 관련 개인(신용)정보 동의</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={toggleFeature2}>
              <Icon source={applyFeature2 ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color='#000' />
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>카드신청 미완료 시 연락을 위한 동의</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.applyButton} onPress={handleNextPress}>
          <Text style={styles.applyButtonText}>다음</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  account: {
    width: '85%'
  },
  nameContainer: {
    width: '85%',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'flex-start',
  },
  userContainer: {
    width: '85%',
    justifyContent: 'flex-start',
  },
  cardText: {
    fontSize: 30,
  },
  label: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: 'bold',
  },
  subLabel: {
    marginTop: 16,
    fontSize: 14,
  },
  user: {
    marginTop: 16,
    fontSize: 14,
    textAlign: 'left'
  },
  usename: {
    marginTop: 16,
    fontSize: 14,
    textAlign: 'left'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    marginTop: 8,
  },
  underline: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    width: '100%',
    marginTop: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  checkboxLabel: {
    fontSize: 14,
  },
  applyButton: {
    backgroundColor: '#B7E1CE',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '85%',
    marginTop: 100
  },
  applyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  checkCard: {
    justifyContent: 'flex-start',
    width: '85%',
  },
  username: {
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#B7E1CE',
    borderRadius: 4,
    color: 'black',
    marginTop: 30
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 16,
  },
});
