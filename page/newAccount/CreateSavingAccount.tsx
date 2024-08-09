import { useState } from "react";
import { FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Text, TextInput } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ReactNativeModal from "react-native-modal";
import { Path, Svg } from "react-native-svg";
import RNPickerSelect from 'react-native-picker-select';
import { Picker } from "@react-native-picker/picker";

type data = {
    token: String
    account: String;
    moneyAmount: Number;
}

export const CreateSavingAccount = ({ navigation, route }: any) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
    const [isInputModalVisible, setInputModalVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState<number>(14);
    const [selectedAmount, setSelectedAmount] = useState<number>(0);
    const [inputAmount, setInputAmount] = useState('');
    const { token, account, moneyAmount }: data = route.params;

    const days = Array.from({ length: 28 }, (_, i) => i + 1);

    const amountOptions = [10000, 50000, 100000, 500000, 1000000, "직접 입력"];

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleCategoryModal = () => {
        setCategoryModalVisible(!isCategoryModalVisible);
    };

    const toggleInputModal = () => {
        setInputModalVisible(!isInputModalVisible);
    };

    const handleAmountChange = (value: any) => {
        if (value === "직접 입력") {
            setInputModalVisible(true); // 입력 모달을 엽니다.
        } else {
            const amount = Number(value);
            if (!isNaN(amount)) {
                setSelectedAmount(amount);
                toggleCategoryModal();
            } else {
                console.error('Invalid amount selected');
            }
        }
    };

    const handleCustomAmountConfirm = () => {
        const amount = Number(inputAmount.replace(/,/g, ''));
    if (!isNaN(amount)) {
        setSelectedAmount(amount);
        toggleInputModal();
        toggleCategoryModal();
    } else {
        console.error('Invalid custom amount');
    }
    };

    const formatAmount = (amount: string) => {
        const a =  amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return a;
    };

    const handleInputChange = (text: string) => {
        const cleanedText = text.replace(/[^0-9]/g, '');
        const formattedText = formatAmount(cleanedText);

        setInputAmount(formattedText);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.inner}>
                    <TouchableOpacity onPress={() => {navigation.navigate("AccountHome")}}>
                        <Svg
                        width={31}
                        height={23}
                        fill="none"
                        style={styles.image}
                        >
                        <Path stroke="#33363F" strokeWidth={2} d="m19.375 6-7.75 6 7.75 6" />
                        </Svg>
                    </TouchableOpacity>
                    <Text style={styles.label}>적금 개설</Text>
                    <View> 
                        <TouchableOpacity style={styles.button} onPress={toggleModal}>
                            <Text style={styles.buttonText}>선택된 날짜 : {selectedDay}일</Text>
                        </TouchableOpacity>
                        <ReactNativeModal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                            <View style={styles.modalContent}>
                                <Picker
                                    selectedValue={selectedDay}
                                    onValueChange={(itemValue) => {
                                    setSelectedDay(itemValue);
                                    toggleModal();
                                    }}
                                >
                                    {days.map((day) => (
                                    <Picker.Item key={day} label={day+"일"} value={day} />
                                    ))}
                                </Picker>
                            </View>
                        </ReactNativeModal>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={toggleCategoryModal}>
                        <Text style={styles.buttonText}>선택된 금액 : {selectedAmount?.toLocaleString()}원</Text>
                    </TouchableOpacity>
                    <ReactNativeModal isVisible={isCategoryModalVisible} onBackdropPress={toggleCategoryModal}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>이체 금액</Text>
                            {!isInputModalVisible ? (
                                <Picker selectedValue={selectedAmount} onValueChange={handleAmountChange}>
                                    {amountOptions.map((amount, index) => (
                                        <Picker.Item
                                            key={index}
                                            label={typeof amount === "string" ? amount : `${amount.toLocaleString()}원`}
                                            value={amount}
                                        />
                                    ))}
                                </Picker>
                            ) : (
                                <View>
                                    <TextInput
                                        label="금액을 입력하세요"
                                        value={inputAmount}
                                        onChangeText={handleInputChange}
                                        keyboardType="number-pad"
                                        mode="outlined"
                                        style={styles.textInput}
                                    />
                                    <TouchableOpacity style={styles.confirmButton} onPress={handleCustomAmountConfirm}>
                                        <Text style={styles.buttonText}>확인</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </ReactNativeModal>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity 
                        style={styles.sendButton} 
                        onPress={() => navigation.navigate('AccountTerms', {  })}
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
        marginBottom: 20
    },
    input: {
        borderBottomColor: '#B7E1CE',
        borderBottomWidth: 3,
        width: 345,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 20
    },
    confirmButton: {
        backgroundColor: "#B7E1CE",
        padding: 16,
        borderRadius: 8,
        width: 200,
        alignItems: "center",
    },
    dayItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
        alignItems: 'center',
    },
    dayText: {
        fontSize: 16,
    },
    selectedDayText: {
        marginTop: 20,
        fontSize: 16,
        alignSelf: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#B7E1CE',
        padding: 16,
        marginBottom: 20,
        marginTop: 50,
        borderRadius: 25,
        width: '70%',
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
        borderRadius: 25,
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 10,
    },
    textInput: {
        width: '80%',
        marginBottom: 15,
    },
    selectedAmountText: {
        marginTop: 20,
        fontSize: 16,
        alignSelf: 'center',
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