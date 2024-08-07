import { useState } from 'react';
import { TextInput,Modal,TouchableOpacity,Text, Platform, SafeAreaView, StatusBar, StyleSheet, View, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { deleteAccount, setAccountLimit, setAccountName, setAccountPassword } from '../../component/api/NewAccountApi';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { updateCard } from '../../component/api/CardApi';

type props = {
    token: string;
    cardId: number;
}

export default function EditCard( { route, navigation }: any ) {
    const id = route.params?.id;
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [dailyLimit, setDailyLimit] = useState('');
    const [onetimeLimit, setOnetimeLimit] = useState('');
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const days = Array.from({ length: 31 }, (_, i) => i + 1).map(day => ({
        label: day.toString(),
        value: day.toString(),
      }));
      const token = route.params?.token;
    const handleSubmit = async () => {
        try {
            const data = {
                password: password,
                cardOneTimeLimit: onetimeLimit ? parseInt(onetimeLimit) : undefined,
                cardMonthLimit: dailyLimit ? parseInt(dailyLimit) : undefined,
                cardName: name,
                cardPaymentDate: selectedDate
            };
            await updateCard(token, id, data);
            navigation.navigate('CardHome', { token });
        } catch (error) {
            console.error(error);
        }
 
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <KeyboardAvoidingView 
                    // style={styles.container}
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
                                    placeholder="카드명"
                                />
                            </View>
                            <View style = {styles.rePasswordContianer}>
                                <Text style = {styles.textcontainer}>비밀번호 변경</Text>
                                <TextInput
                                    style={styles.inputPassword}
                                    value={password}
                                    onChangeText={setPassword}
                                    keyboardType="number-pad"
                                    placeholder="0000"
                                    maxLength={4}
                                    secureTextEntry={true} 
                            />
                            </View>
                            <View style = {styles.reLimitContainer}>
                                <Text style = {styles.textcontainer}>일일 한도 변경</Text>
                                <TextInput
                                    style={styles.inputLimit}
                                    value={dailyLimit}
                                    onChangeText={setDailyLimit}
                                    keyboardType="number-pad"
                                    placeholder="50,000,000"
                                />
                            </View>
                            <View style = {[styles.reLimitContainer]}>
                                <Text style = {styles.textcontainer}>한달 한도 변경</Text>
                                <TextInput
                                    style={styles.inputLimit}
                                    value={onetimeLimit}
                                    onChangeText={setOnetimeLimit}
                                    keyboardType="number-pad"
                                    placeholder="10,000,000"
                                />
                            </View>
                            <View style = {styles.reLimitContainer}>
                            <Text style = {styles.textcontainer}>결제일 변경</Text>
                            <RNPickerSelect
                            onValueChange={(value) => setSelectedDate(value)}
                            items={days}
                            style={pickerSelectStyles}
                            placeholder={{ label: "결제일을 선택해주세요", value: null }}
                            value={selectedDate}
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
                    <View style = {styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>카드 재발급</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={closeModal}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>정말로 계좌를 삭제하시겠습니까?</Text>
                                <View style={styles.modalButtonContainer}>
                                    <TouchableOpacity
                                        style={[styles.buttonAccount, styles.buttonClose]}
                                        onPress={closeModal}
                                    >
                                        <Text style={styles.buttonText}>취소</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.buttonAccount, styles.buttonDelete]}
                                        onPress={() => {
                                            closeModal();
                                        }}
                                    >
                                        <Text style={styles.buttonText} onPress={handleDeleteAccount}>삭제</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal> */}
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reContainer:{
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom:100
        

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
    nameText:{

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