import React, {useState} from 'react';
import {
    Keyboard,
    TouchableWithoutFeedback,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View, Dimensions
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

type data = {
    accountStatus: string;
    token: string;
    userName: string;
    product: string | null;
    interestRate: number | null;
}

interface SavingAccount {
    interestRate: number | null;
    term: number | null;
    product: string | null;
    sendAccount: string | null;
}

interface Transfer {
    type: string | null;
    amount: number | null;
    transferDate: number | null;
    account: string | null;
}

const { width, height } = Dimensions.get('window');

export default function AccountPassword({navigation, route}: any) {
    const [password, setPassword] = useState('');
    const [purpose, setPurpose] = useState('계좌사용용도');
    const [firstQuestion, setFirstQuestion] = useState(false);
    const [secondQuestion, setSecondQuestion] = useState(false);

    const {accountStatus, token, userName, product, interestRate}: data = route.params;

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };
    const purposes = [
        {label: '급여 및 아르바이트', value: '급여 및 아르바이트'},
        {label: '생활비 관리', value: '생활비 관리'},
        {label: '적금 자동이체', value: '적금 자동이체'},
        {label: '예금가입', value: '예금가입'}
    ];

    const handleNextPress = () => {
        if (accountStatus === 'saving') {
            navigation.navigate('CreateSavingAccount', {
                accountStatus,
                token,
                userName,
                accountPassword: password,
                purpose,
                product,
                interestRate
            });
        } else {
            navigation.navigate('AccountComplete', {
                accountStatus,
                token,
                // userName,
                accountPassword: password,
                // purpose,
                savingAccountRequest: null,
                transferRequest: null
            });
        }
    };

    return (
        <TouchableWithoutFeedback
            onPress={dismissKeyboard}
            style={{ flexGrow: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.innerContainer}>
                    <View>
                        <Text style={styles.title}>통장 비밀번호를 설정해 주세요.</Text>
                        <View style={styles.purposeContainer}>
                            <View style={styles.purposeInput}>
                                <TextInput
                                    style={styles.input}
                                    value={password}
                                    onChangeText={setPassword}
                                    keyboardType="number-pad"
                                    placeholder='4자리 비밀번호'
                                    placeholderTextColor="#aaa"
                                    maxLength={4}
                                    secureTextEntry={true}
                                />
                            </View>
                        </View>
                        <Text style={styles.title}>어떤 용도로 통장을 사용하실 건가요?</Text>
                        <View style={styles.purposeContainer}>
                            {/*<Text style={styles.purposeLabel}>계좌사용용도</Text>*/}
                            <View style={styles.pickerWrapper}>
                                <RNPickerSelect
                                    onValueChange={(value) => setPurpose(value)}
                                    useNativeAndroidPickerStyle={false}
                                    items={purposes}
                                    placeholder={{label: '선택하세요', value: 'null'}}
                                    value={purpose}
                                    style={pickerSelectStyles}
                                />
                            </View>
                        </View>
                        <Text style={styles.title}>타인으로부터 통장대여 요청을 받은 사실이 있나요?</Text>
                        <View style={styles.radioContainer}>
                            <TouchableOpacity
                                onPress={() => setFirstQuestion(true)}
                                style={[styles.radio, firstQuestion && styles.selectedRadio]}
                            >
                                <Text style={firstQuestion && styles.selectedRadioText}>예 </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setFirstQuestion(false)}
                                style={[styles.radio, !firstQuestion && styles.selectedRadio]}
                            >
                                <Text style={!firstQuestion && styles.selectedRadioText}>아니요 </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title}>타인으로부터 신용정보 상환, 대출 등의 목적으로 통장 개설을 요청받은 사실이 있나요?</Text>
                        <View style={styles.radioContainer}>
                            <TouchableOpacity
                                onPress={() => setSecondQuestion(true)}
                                style={[styles.radio, secondQuestion && styles.selectedRadio]}
                            >
                                <Text style={secondQuestion && styles.selectedRadioText}>예 </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setSecondQuestion(false)}
                                style={[styles.radio, !secondQuestion && styles.selectedRadio]}
                            >
                                <Text style={!secondQuestion && styles.selectedRadioText}>아니요 </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                        <Text style={styles.buttonText}>신청하기</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
    },
    innerContainer: {
        flexGrow: 1,
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        paddingHorizontal: 20,
        paddingTop: 20,
        justifyContent: 'space-between'
    },
    purposeContainer: {
        marginBottom: 40,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    purposeInput: {
        marginTop: 20
    },
    input: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        padding: 15,
        fontSize: 16
    },
    pickerWrapper: {
        borderRadius: 10,
    },
    purposeLabel: {
        fontSize: 16,
        marginRight: 10,
        fontWeight: 'bold',
        marginLeft: 10
    },
    radioContainer: {
        flexDirection: 'row',
        marginBottom: 40,
        marginTop: 20,
        justifyContent: 'space-between'
    },
    radio: {
        width: '49%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 10
    },
    selectedRadio: {
        backgroundColor: 'rgba(0,115,120,0.2)',
    },
    selectedRadioText: {
        color: '#007378',
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#007378',
        borderRadius: 10,
        width: width - 40,
        height: 40,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        marginTop: 10
    },
    inputAndroid: {
        fontSize: 16,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginTop: 10
    },
    placeholder: {
        color: '#aaa'
    }
});