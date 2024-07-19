import { useState } from "react";
import { FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Text, TextInput } from "react-native-paper";
// import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ReactNativeModal from "react-native-modal";
import { Path, Svg } from "react-native-svg";

// type TransferNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Transfer'>

// type Props = {
//   navigation: TransferNavigationProp;
// };

const banks = [
  { label: '국민은행', value: '국민은행', logo: require('../../assets/image/kb_bank.png') },
  { label: '신한은행', value: '신한은행', logo: require('../../assets/image/sol_bank.png') },
  { label: '카카오뱅크', value: '카카오뱅크', logo: require('../../assets/image/kakao_bank.jpeg') },
  { label: '클릭뱅크', value: '클릭뱅크', logo: require('../../assets/image/Click_logo.png') },
];
// : React.FC<Props>

type data = {
  token: String
  account: String;
  moneyAmount: Number;
}

const Transfer = ({ navigation, route }: any) => {
    const [accountNumber, setAccountNumber] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedBank, setSelectedBank] = useState('');
    const { token, account, moneyAmount }: data = route.params;
    
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    
    const renderItem = ({ item }: any) => (
      <TouchableOpacity 
        style={styles.bankItem} 
        onPress={() => {
          setSelectedBank(item.value);
          toggleModal();
        }}
      >
        <View style={styles.bankIconContainer}>
          <Image source={item.logo} style={styles.bankIcon} resizeMode="cover"/>
        </View>
        <Text style={styles.bankText}>{item.label}</Text>
      </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.innerContainer}>
            <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.inner}>
                    <TouchableOpacity onPress={() => console.log('hello')}>
                      <Svg
                        width={31}
                        height={23}
                        fill="none"
                        style={styles.image}
                      >
                        <Path stroke="#33363F" strokeWidth={2} d="m19.375 6-7.75 6 7.75 6" />
                      </Svg>
                    </TouchableOpacity>
                    <Text style={styles.label}>계좌 번호</Text>
                    <TextInput
                    style={styles.input}
                    value={accountNumber}
                    onChangeText={setAccountNumber}
                    keyboardType="number-pad"
                    maxLength={15}
                    />
                    <View> 
                    <TouchableOpacity style={styles.button} onPress={toggleModal}>
                        <Text style={styles.buttonText}>은행 선택</Text>
                    </TouchableOpacity>
                    <ReactNativeModal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                        <View style={styles.modalContent}>
                          <Text style={styles.modalTitle}>은행 선택</Text>
                          <FlatList
                              data={banks}
                              renderItem={renderItem}
                              keyExtractor={(item, index) => index.toString()}
                              numColumns={3}
                              columnWrapperStyle={styles.row}
                          />
                        </View>
                    </ReactNativeModal>
                    <Text style={styles.selectedBankText}>선택된 은행: {selectedBank}</Text>
                </View>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity 
                        style={styles.sendButton} 
                        onPress={() => navigation.navigate('SendingTransfer', { bank: selectedBank, accountNumber, account, moneyAmount, token })}
                    >
                    <Text style={styles.sendButtonText}>보내기</Text>
                    </TouchableOpacity>
                </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </View>
        </SafeAreaView>
    );
  };
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    inner: {
      flex: 1,
      justifyContent: "space-between"
    },
    image: {
      marginBottom: 20,
      alignSelf: 'flex-start'
    },
    label: {
      fontSize: 30,
      alignSelf: 'flex-start',
      height: 50,
      width: 345,
      marginBottom: 40
    },
    input: {
      borderBottomColor: '#B7E1CE',
      borderBottomWidth: 3,
      width: 345,
      backgroundColor: '#ffffff',
      textAlign: 'center',
      fontSize: 30,
      marginBottom: 100
    },
    button: {
      backgroundColor: '#B7E1CE',
      padding: 16,
      marginBottom: 30,
      borderRadius: 8,
      width: '100%',
      maxWidth: 325,
      alignSelf: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'black',
      fontSize: 16,
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 23,
      borderRadius: 10,
      justifyContent: 'center',
      alignSelf: 'stretch'
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginBottom: 10,
    },
    row: {
      justifyContent: 'space-between',
    },
    bankItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ffffff',
    },
    bankIconContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#f0f0f0',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
      overflow: 'hidden',
    },
    bankIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      resizeMode: 'cover',
    },
    bankText: {
      fontSize: 16,
    },
    selectedBankText: {
      marginTop: 20,
      fontSize: 16,
      alignSelf: 'center',
      alignItems: 'center',
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
});

export default Transfer;