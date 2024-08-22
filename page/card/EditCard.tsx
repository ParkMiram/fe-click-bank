import React, {useState, useEffect} from 'react';
import {
    TextInput,
    Modal,
    TouchableOpacity,
    Text,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Keyboard,
    Alert, Dimensions
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import {
    updateCard,
    updateCardPasssword,
    updateCardName,
    updateCardOneTimeLimit,
    updateCardMonthLimit,
    updateCardPaymentDate
} from '../../component/api/CardApi';
import {getMyCard} from "../../component/api/CardListApi";

import {Picker} from "@react-native-picker/picker";
import ReactNativeModal from 'react-native-modal';
import CardPassword from './CardPassword';
import {Path, Svg} from "react-native-svg";

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
    cardOneTimeLimit: number
    cardAnnualFee: number
    cardPassword: number;
    cardPaymentDate: number;
    cardProduct: {
        cardImg: string
        cardBenefits: string
    }
}

const {width, height} = Dimensions.get('window');

export default function EditCard({route, navigation}: any) {
    const id = route.params?.id;
    console.log("Card ID:", id);
    const cardName = route.params?.cardName;

    const [myCard, setMyCard] = useState<CardResponse>();
    const [name, setName] = useState(cardName);
    const [password, setPassword] = useState('');
    const [monthLimit, setMonthLimit] = useState('');
    const [onetimeLimit, setOnetimeLimit] = useState('');
    const [cardPaymentDate, setCardPaymentDate] = useState('');
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
    const days = Array.from({length: 31}, (_, i) => i + 1).map(day => ({
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
                navigation.navigate('CardList', {token});
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
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cardNameContainer}>
                    <Svg
                        width={10}
                        height={16}
                        fill="none"
                        viewBox="0 0 8 14"
                    >
                        <Path stroke="#222" d="M7 1 1 7l6 6"/>
                    </Svg>
                    <Text style={styles.cardName}>{cardName}</Text>
                </TouchableOpacity>
                <View style={{ width: width - 40, marginHorizontal: 20, flex: 1, justifyContent: 'space-between', marginBottom: 20 }}>
                    {/*<KeyboardAvoidingView*/}
                    {/*    behavior={Platform.OS === "ios" ? "padding" : "height"}*/}
                    {/*>*/}
                        {/*<View style={{ flex: 1 }}>*/}
                        {/*    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>*/}
                        <View style={styles.reContainer}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>결제일 변경</Text>
                                <RNPickerSelect
                                    onValueChange={(value) => setSelectedDate(value)}
                                    items={days}
                                    style={pickerSelectStyles}
                                    placeholder={{label: "결제일을 선택해주세요", value: null}}
                                    value={selectedDate}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>카드명 수정</Text>
                                <TextInput
                                    style={styles.input}
                                    value={name}
                                    onChangeText={setName}
                                    keyboardType="default"
                                    returnKeyType={'done'}
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
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>한달 한도 변경</Text>
                                <TextInput
                                    style={styles.input}
                                    value={monthLimit}
                                    onChangeText={setMonthLimit}
                                    keyboardType="number-pad"
                                    returnKeyType={'done'}
                                    // placeholder={myCard?.cardOneTimeLimit? myCard.cardOneTimeLimit.toString() : ''}

                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>일일 한도 변경</Text>
                                <TextInput
                                    style={styles.input}
                                    value={onetimeLimit}
                                    onChangeText={setOnetimeLimit}
                                    keyboardType="number-pad"
                                    returnKeyType={'done'}
                                />
                            </View>
                        </View>
                        {/*    </TouchableWithoutFeedback>*/}
                        {/*</View>*/}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonText}>저장</Text>
                        </TouchableOpacity>

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
                    {/*</KeyboardAvoidingView>*/}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    innerContainer: {
        flex: 1,
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    },
    cardNameContainer: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginVertical: 20,
        alignItems: 'center'
    },
    cardName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10
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
    reContainer: {

    },
    inputContainer: {
        width: '100%',
        marginBottom: 20
    },
    textcontainer: {
        fontSize: 18,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    modalTriggerText: {
        fontSize: 18,
    },
    rePasswordContianer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    passwordText: {},
    reLimitContainer: {
        width: '100%',
    },
    limitText: {},
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        flex: 1
    },
    button: {
        height: 40,
        backgroundColor: '#007378',
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
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
    input: {
        fontSize: 16,
        borderRadius: 10,
        color: 'black',
        width: '100%',
        backgroundColor: '#f8f8f8',
        padding: 15
    },
    inputPassword: {
        fontSize: 18,
        borderColor: '#B7E1CE',
        borderRadius: 5,
        borderWidth: 2,
        height: 40,
        width: 180,
        textAlign: 'center',
    },
    inputLimit: {
        fontSize: 18,
        borderColor: '#B7E1CE',
        borderRadius: 5,
        borderWidth: 2,
        height: 40,
        width: 180,
        textAlign: 'center',
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        borderRadius: 10,
        color: 'black',
        width: '100%',
        backgroundColor: '#f8f8f8',
        padding: 15
    },
    inputAndroid: {
        fontSize: 16,
        borderRadius: 10,
        color: 'black',
        width: '100%',
        padding: 15
    },
});
