import React, {Key, useEffect, useState} from "react";
import {
    Alert, Dimensions,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet, Text, TextInput,
    View
} from "react-native";
import {TouchableOpacity, TouchableWithoutFeedback} from "react-native-gesture-handler";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import ReactNativeModal from "react-native-modal";
import {Path, Svg} from "react-native-svg";
import RNPickerSelect from 'react-native-picker-select';
import {Picker} from "@react-native-picker/picker";
import {getAccountByType} from "../../component/api/NewAccountApi";

type data = {
    token: string
    accountStatus: string;
    userName: string;
    product: string;
    interestRate: number;
    accountPassword: string;
}

interface SavingAccount {
    interestRate: number;
    term: number;
    product: string;
    sendAccount: string;
}

interface Transfer {
    type: string;
    amount: number;
    transferDate: number;
    account: string;
}

interface Account {
    account: string;
}

const { width, height } = Dimensions.get('window');

export const CreateSavingAccount = ({navigation, route}: any) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
    const [isInputModalVisible, setInputModalVisible] = useState(false);
    const [isPeriodVisible, setPeriodVisible] = useState(false);
    const [isAccountVisible, setAccountVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState<number>(14);
    const [selectedPeriod, setSelectedPeriod] = useState<number>(1);
    const [maturityDate, setMaturityDate] = useState<string | null>(null);
    const [selectedAmount, setSelectedAmount] = useState<number>(10000);
    const [inputAmount, setInputAmount] = useState('');
    const [accountList, setAccountList] = useState<Account[]>([])
    const [selectedAccount, setSelectedAccount] = useState<string>('');
    const [inputAccount, setInputAccount] = useState<string>('');
    const {token, accountStatus, userName, product, interestRate, accountPassword}: data = route.params;

    const savingAccountRequest: SavingAccount = {
        interestRate: interestRate,
        term: selectedPeriod,
        product: product,
        sendAccount: selectedAccount
    }

    const transferRequest: Transfer = {
        type: accountStatus,
        amount: selectedAmount,
        transferDate: Number(selectedDay),
        account: selectedAccount
    }

    const maturityPeriods = [
        {label: '1 년', value: 1},
        {label: '2 년', value: 2},
    ];

    const days = Array.from({length: 28}, (_, i) => i + 1);

    const amountOptions = [10000, 50000, 100000, 500000, 1000000, "직접 입력"];

    const calculateMaturityDate = (months: number) => {
        const startDate = new Date();
        const maturityDate = new Date(startDate.setMonth(startDate.getMonth() + months));

        // Format the date to a readable format, e.g., "YYYY-MM-DD"
        const formattedDate = maturityDate.toISOString().split('T')[0];
        setMaturityDate(formattedDate);
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleCategoryModal = () => {
        setCategoryModalVisible(!isCategoryModalVisible);
    };

    const toggleInputModal = () => {
        setInputModalVisible(!isInputModalVisible);
    };

    const toggelPeriods = () => {
        setPeriodVisible(!isPeriodVisible)
    }

    const toggleAccountModal = () => {
        setAccountVisible(!isAccountVisible);
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
        const a = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return a;
    };

    const handleInputChange = (text: string) => {
        const cleanedText = text.replace(/[^0-9]/g, '');
        const formattedText = formatAmount(cleanedText);
        setInputAmount(formattedText);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAccountByType(token);
                console.log(response.data)
                setAccountList(response.data); // API에서 받은 데이터 상태에 저장
            } catch (err) {
                console.error("API 호출 중 오류 발생:", err);
                Alert.alert("데이터를 불러오는 중에 오류가 발생했습니다.");
                navigation.goBack();
            }
        };

        fetchData();
        calculateMaturityDate(selectedPeriod);
    }, [selectedPeriod, token]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.inner}>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <TouchableOpacity
                                onPress={() => {navigation.navigate("SavingAccountList")}}
                            >
                                <Svg
                                    width={31}
                                    height={23}
                                    fill="none"
                                >
                                    <Path stroke="#33363F" strokeWidth={2} d="m19.375 6-7.75 6 7.75 6"/>
                                </Svg>
                            </TouchableOpacity>
                            <Text style={styles.title}>적금 개설</Text>
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.subTitle}>날짜를 선택해 주세요.</Text>
                            <TouchableOpacity style={styles.button} onPress={toggleModal}>
                                <Text style={styles.buttonText}>{selectedDay}일</Text>
                            </TouchableOpacity>
                            <ReactNativeModal isVisible={isModalVisible} onBackdropPress={toggleModal} animationIn={'zoomIn'} animationOut={'zoomOut'}>
                                <View style={styles.modalContent}>
                                    <Picker
                                        selectedValue={selectedDay}
                                        onValueChange={(itemValue) => {
                                            setSelectedDay(itemValue);
                                            toggleModal();
                                        }}
                                    >
                                        {days.map((day) => (
                                            <Picker.Item key={day} label={day + "일"} value={day}/>
                                        ))}
                                    </Picker>
                                </View>
                            </ReactNativeModal>
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.subTitle}>이체할 금액을 적어주세요.</Text>
                            <TouchableOpacity style={styles.button} onPress={toggleCategoryModal}>
                                <Text style={styles.buttonText}>{selectedAmount?.toLocaleString()}원</Text>
                            </TouchableOpacity>
                            <ReactNativeModal isVisible={isCategoryModalVisible} onBackdropPress={toggleCategoryModal} animationIn={'zoomIn'} animationOut={'zoomOut'}>
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
                                                placeholder="금액을 입력하세요"
                                                placeholderTextColor={'#aaa'}
                                                value={inputAmount}
                                                onChangeText={handleInputChange}
                                                keyboardType="number-pad"
                                                style={styles.textInput}
                                            />
                                            <TouchableOpacity style={styles.confirmButton}
                                                              onPress={handleCustomAmountConfirm}>
                                                <Text style={styles.confirmButtonText}>확인</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            </ReactNativeModal>
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.subTitle}>만기 기간을 선택해 주세요.</Text>
                            <TouchableOpacity style={styles.button} onPress={toggelPeriods}>
                                <Text style={styles.buttonText}>{selectedPeriod}년</Text>
                            </TouchableOpacity>
                        </View>
                        <ReactNativeModal isVisible={isPeriodVisible} onBackdropPress={toggelPeriods} animationIn={'zoomIn'} animationOut={'zoomOut'}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>적금 만기 기간</Text>
                                <Picker
                                    selectedValue={selectedPeriod}
                                    onValueChange={(value) => {
                                        setSelectedPeriod(value);
                                        toggelPeriods();
                                    }}
                                >
                                    {maturityPeriods.map((period) => (
                                        <Picker.Item key={period.value} label={period.label} value={period.value}/>
                                    ))}
                                </Picker>
                            </View>
                        </ReactNativeModal>
                        <View>
                            <Text style={styles.subTitle}>이체할 계좌를 선택해 주세요.</Text>
                            <TouchableOpacity style={styles.button} onPress={toggleAccountModal}>
                                <Text style={styles.buttonText}>
                                    {selectedAccount?.replace(/^(\d{3})(\d{3})(\d+)$/, "$1-$2-$3")}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <ReactNativeModal isVisible={isAccountVisible} onBackdropPress={toggleAccountModal}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>이체 계좌 선택</Text>
                                <Picker
                                    selectedValue={selectedAccount}
                                    onValueChange={(value: string) => {
                                        const account: string | undefined = accountList.find((item) => item.account === value)?.account;
                                        setSelectedAccount(account !== undefined ? account : "계좌 선택");
                                        toggleAccountModal();
                                    }}
                                >
                                    {accountList.map((item, index) => (
                                        <Picker.Item key={index} label={item.account} value={item.account}/>
                                    ))}
                                </Picker>
                            </View>
                        </ReactNativeModal>
                    </View>
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={() => {
                            if (!selectedAccount || selectedAccount.trim() === "") {
                                Alert.alert("계좌 선택 오류", "계좌를 선택하세요.");
                            } else {
                                navigation.navigate('AccountComplete', {
                                    token,
                                    accountStatus,
                                    accountPassword,
                                    savingAccountRequest,
                                    transferRequest
                                })
                            }
                        }}
                    >
                        <Text style={styles.sendButtonText}>신청하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    innerContainer: {
        flex: 1,
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    },
    inner: {
        width: width - 40,
        margin: 20,
        flex: 1,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
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
        backgroundColor: '#007378',
        borderRadius: 10,
        marginTop: 10,
        width: '100%',
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        padding: 15,
        textAlign: 'center'
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
        width: '100%',
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
    },
    subTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10
    },
    buttonText: {
        width: '100%',
        padding: 15,
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
        width: '100%',
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        borderWidth: 0,
        padding: 15,
        fontSize: 16,
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
        backgroundColor: '#007378',
        borderRadius: 10,
        width: '100%',
        height: 40,
        justifyContent: 'center'
    },
    sendButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});