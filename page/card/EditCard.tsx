import { useState,useEffect } from 'react';
import { TextInput,Modal,TouchableOpacity,Text, Platform, SafeAreaView, StatusBar, StyleSheet, View, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { deleteAccount, setAccountLimit, setAccountName, setAccountPassword } from '../../component/api/NewAccountApi';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { updateCard ,updateCardPasssword,updateCardName,updateCardOneTimeLimit,updateCardMonthLimit,updateCardPaymentDate} from '../../component/api/CardApi';
import { getMyCard } from "../../component/api/CardListApi";

import { Picker } from "@react-native-picker/picker";
import ReactNativeModal from 'react-native-modal';
import CardPassword from './CardPassword';
type props = {
    token: string;
    cardId: number;
}
// interface CardResponse {
//     cardId: number
//     cardName: string
//     cardNumber: string
//     cardOneTimeLimit:string
//     cardMonthLimit: string
//     cardPassword: string;
//     cardPaymentDate: string;
//     // cardProduct: {
//     //     cardImg: string
//     //     cardBenefits: string
//     // }
// }
interface CardResponse {
    cardId: number
    cardName: string
    cardNumber: string
    account: string
    cardCVC: string
    cardMonthLimit: number
    cardOneTimeLimit:number
    cardAnnualFee: number
    cardPassword: number;
    cardPaymentDate: number;
    cardProduct: {
        cardImg: string
        cardBenefits: string
    }
}

export default function EditCard( { route, navigation }: any ) {
    const id = route.params?.id;
    console.log("Card ID:", id);

    const [myCard, setMyCard] = useState<CardResponse>();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [monthLimit, setMonthLimit] = useState('');
    const [onetimeLimit, setOnetimeLimit] = useState('');
    const [cardPaymentDate,setCardPaymentDate] = useState('');
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
    const days = Array.from({ length: 31 }, (_, i) => i + 1).map(day => ({
        label: day.toString(),
        value: day.toString(),
      }));
      const token = route.params?.token;
      const handleSubmit = async () => {
        try {
            const data: any = {};
    
            if (password) {
                data.password = password;
            }
            if (onetimeLimit) {
                data.cardOneTimeLimit = parseInt(onetimeLimit);
            }
            if (monthLimit) {
                data.cardMonthLimit = parseInt(monthLimit);
            }
            if (name) {
                data.cardName = name;
            }
            if (selectedDate) {
                data.cardPaymentDate = selectedDate;
            }
    
            if (Object.keys(data).length > 0) {
                console.log("Updating with data:", data);
                await updateCard(token, id, data);
                navigation.navigate('CardList', { token });
            } else {
                Alert.alert("Error", "No changes to save.");
            }
        } catch (error) {
            console.error("Error updating card:", error);
            Alert.alert("Error", "Failed to update card. Please try again.");
        }
    };
  
 
    
    const toggleCategoryModal = () => {
        setCategoryModalVisible(!isCategoryModalVisible);
      };
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
            <View style = {styles.reContainerDate}>
            <View style = {styles.redateContainer}>
                            <Text style = {styles.datecontainer}>결제일 변경</Text>
                            <RNPickerSelect
                            onValueChange={(value) => setSelectedDate(value)}
                            items={days}
                            style={pickerSelectStyles}
                            placeholder={{ label: "결제일을 선택해주세요", value: null }}
                            value={selectedDate}
                             /> 
            </View>
            </View>
            
                <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                       
                       <View style = {styles.reContainer}>
                            <View style ={styles.renameContainer}>
                                <Text style = {styles.textcontainer}>카드명 수정</Text> 
                                <TextInput
                                    style={styles.inputName}
                                    value={name}
                                    onChangeText={setName}
                                    keyboardType="default"
                                    // placeholder={myCard?.cardName}
                                    placeholder="카드명"

                                />
                            </View>
                            {/* <View style = {styles.rePasswordContianer}>
                                <Text style = {styles.textcontainer}>비밀번호 변경</Text>
                                <TextInput
                                    style={styles.inputPassword}
                                    value={password}
                                    onChangeText={setPassword}
                                    keyboardType="number-pad"
                                    // placeholder={myCard?.cardPassword?myCard.cardPassword.toString() : ''}
                                    placeholder={'입력'}

                                    maxLength={4}
                                    secureTextEntry={true} 
                            />
                             </View> */}
                            
                            <View style = {styles.reLimitContainer}>
                                <Text style = {styles.textcontainer}>한달 한도 변경</Text>
                                <TextInput
                                    style={styles.inputLimit}
                                    value={monthLimit}
                                    onChangeText={setMonthLimit}
                                    keyboardType="number-pad"
                                    // placeholder={myCard?.cardOneTimeLimit? myCard.cardOneTimeLimit.toString() : ''}
                                    placeholder={'입력'}

                                />
                            </View>
                            <View style = {styles.reLimitContainer}>
                                <Text style = {styles.textcontainer}>일일 한도 변경</Text>
                                <TextInput
                                    style={styles.inputLimit}
                                    value={onetimeLimit}
                                    onChangeText={setOnetimeLimit}
                                    keyboardType="number-pad"
                                    placeholder={'입력'}
                                />
                            </View>
                          
                      
                            
                        </View>
                    </TouchableWithoutFeedback>
                    <View style = {styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonText}>저장</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {/* <Text style={styles.textcontainer}>{myCard?.cardName}</Text> */}
                    {/* <View style = {styles.reLimitContainer}>
                            <Text style = {styles.datecontainer}>결제일 변경</Text>
                            <RNPickerSelect
                            onValueChange={(value) => setSelectedDate(value)}
                            items={days}
                            style={pickerSelectStyles}
                            placeholder={{ label: "결제일을 선택해주세요", value: null }}
                            value={selectedDate}
                             /> 
                             </View> */}
                   {/* <Text style={styles.cardName}>{myCard?.cardPaymentDate}</Text>
                   <Text style={styles.cardName}>카드</Text> */}

                </KeyboardAvoidingView>
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
    cardName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    modalContent:{
        backgroundColor: 'white',
        padding: 23,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'stretch'

    }
    ,
    modalTitle:{
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 10,

    },
    reContainer:{
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom:150
        

    },
    reContainerDate:{
        justifyContent:'flex-start',
        alignItems:'center',
      
        

    },
    dateContainer:{
        
    },

    redateContainer:{
        flexDirection: 'row',
        width:'85%',
        justifyContent:'space-between',
        alignItems:'center',
        // marginBottom:30,
        marginTop:30

    },
    renameContainer:{
        flexDirection: 'row',
        width:'90%',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:30,
        marginTop:30
       

    },
    textcontainer:{
        fontSize:18,
        flex:1

    },
    datecontainer:{
        flexDirection:'row',
        flex:1,
        fontSize:18

    },
    nameText:{

    },
    modalTriggerText:{
        fontSize:18,
    },
    rePasswordContianer:{
        flexDirection:'row',
        width:'90%',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:30
    },
    passwordText:{

    },
    reLimitContainer:{
        flexDirection:'row',
        width:'90%',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:30
    },
    limitText:{
        
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent:'space-evenly',
        width: '100%',
        
    },
    button:{
        // backgroundColor: '#B7E1CE',
        // borderRadius:8,
        // width:'80%',
        // alignItems:'center',
        // marginTop:10,
        // paddingVertical:15,
        // paddingHorizontal
        marginTop: 5,
        marginBottom: 30,
        backgroundColor: '#B7E1CE',
        padding: 16,
        alignItems: 'center',
        borderRadius: 8,
        width: '90%',
        // maxWidth: 325,
        // alignSelf: 'center',
        },
    buttonAccount:{
        fontSize:18,
        borderColor: '#B7E1CE',
        borderRadius:5,
        borderWidth: 2,
        height: 40,
        width: 60,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10
    },
    
    buttonText:{
        fontSize:18,
        textAlign:'center'

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonClose: {
        // backgroundColor: '',
        marginRight: 10,
    },
    buttonDelete: {
        // backgroundColor: '#FF0000',
    },
    inputName:{
        fontSize:18,
        borderColor: '#B7E1CE',
        borderRadius:5,
        borderWidth: 2,
        height: 40,
        width: 180,
        // borderColor: 'gray',
        // borderRadius:5,
        // borderWidth: 1,
        //  marginTop:20,
        
         textAlign:'center',
    
    },
    inputPassword:{
        fontSize:18,
        borderColor: '#B7E1CE',
        borderRadius:5,
        borderWidth: 2,
        height: 40,
        width: 180,
        textAlign:'center',
    },
    inputLimit:{
        fontSize:18,
        borderColor: '#B7E1CE',
        borderRadius:5,
        borderWidth: 2,
        height: 40,
        width: 180,
        textAlign:'center',
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      textAlign: 'center',
      fontSize: 16,
    //   paddingVertical: 12,
      borderWidth: 2,
      borderColor: '#B7E1CE',
      borderRadius: 4,
      color: 'black',
    //   marginTop: 30,
      height:40,
      width:180
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
