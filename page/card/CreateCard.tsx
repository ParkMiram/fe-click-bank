import { Alert, Image, TouchableOpacity, Text, Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import React, { useEffect,useState } from 'react';
import { Icon } from 'react-native-paper';
import {getCardProduct} from "../../component/api/CardListApi";




type CardCheck = 'CREDIT' | 'CHECK';
type CardTransportation = 'POSTPAID' | 'PREPATMENT';

type data = {
//   cardPassword: string;
  cardCheck: CardCheck;
//   account: string;
  cardTransportation: CardTransportation;
  cardProductId: number;
}
interface CardProductResponse {
    cardImg: string;
}


export default function CreateCard({ route, navigation }: any) {
  const [cardBrand, setCardBrand] = useState<CardCheck | null>(null);
  const [cardTransportation, setCardTransportation] = useState<CardTransportation | null>(null);
  const [applyFeature, setApplyFeature] = useState(false);
//   const {  account, cardCheck }: data = route.params;
  const { token } = route.params;
  const id:number = route.params?.id;
  const cardProductId:number = route.params?.id;
  const [cardProduct, setCardProduct] = useState<CardProductResponse>();
  const toggleFeature = () => {
    setApplyFeature(!applyFeature);
    setCardTransportation(applyFeature ? 'PREPATMENT' : 'POSTPAID');
  };
  useEffect(() => {
    getCardProductInfo();
},[])

const getCardProductInfo = async ()  => {
    try {
        const res = await getCardProduct(id);
        setCardProduct(res.data.data.getCardProduct);
    } catch (error) {
        console.log(error);
    }
}

  const handleNextPress = () => {
    if (cardBrand && cardTransportation) {
      navigation.navigate('ApplicantInformation', {
        // cardPassword,
        // account,
        cardCheck: cardBrand,
        cardTransportation,
        cardProductId, 
        token
      });
    } else {
      Alert.alert("모든 필드를 입력해 주세요.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.cardText}>카드 생성</Text>
        </View>
        <View style={styles.imgContainer}>
          <Text style={styles.cardName}>카드명</Text>
          <View style={styles.cardImageContainer}>
            <Image style={styles.cardImage} source={{ uri: cardProduct?.cardImg }} />
          </View>
        </View>
        <View style={styles.cardBrand}>
          <RNPickerSelect
            onValueChange={(value) => setCardBrand(value as CardCheck)}
            items={[
              { label: '신용', value: 'CREDIT' },
              { label: '체크', value: 'CHECK' },
            ]}
            style={pickerSelectStyles}
            placeholder={{ label: "선택해주세요", value: null }}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={toggleFeature}>
            <Icon source={applyFeature ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color='#000' />
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>후불교통 기능 신청</Text>
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
    height: "90%",
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardName: {
    textAlign: 'center'
  },
  imgContainer: {},
  cardBrand: {
    width: '85%'
  },
  nameContainer: {
    width: '85%',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'flex-start',
  },
  cardText: {
    fontSize: 30,
  },
  cardContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  cardImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  cardImage: {
    width: 120,
    height: 180,
    backgroundColor: '#B7E1CE',
    borderRadius: 10,
  },
  cardImageText: {
    color: '#aaa',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  applyButton: {
    backgroundColor: '#B7E1CE',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '85%',
    marginTop: 185
  },
  applyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
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
    marginBottom: 16,
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
