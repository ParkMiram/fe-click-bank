import {
    TouchableOpacity,
    TextInput,
    Text,
    Dimensions,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    Alert
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from 'react-native-paper';
import {AxiosResponse} from 'axios';
import {getAccountByUserId} from "../../component/api/NewAccountApi";
import RNPickerSelect from 'react-native-picker-select';
import {Path, Svg} from "react-native-svg";

type CardCheck = 'CREDIT' | 'CHECK';
type CardTransportation = 'POSTPAID' | 'PREPAYMENT';
type data = {
    cardPassword: string;
    cardCheck: CardCheck;
    account: string;
    cardTransportation: CardTransportation;
    id: number;
    cardPaymentDate: number;
}

interface AccountResponse {
    accounts: { account: string; accountName: string; moneyAmount: number; }[];
    userCode: string;
    userImg: string;
    userName: string;
}

const {width, height} = Dimensions.get('window');

export default function ApplicantInformationCheck({route, navigation}: any) {
    const [cardBrand, setCardBrand] = useState<CardCheck | null>(null);
    const [name, setName] = useState('홍길동');
    const [applyFeature, setApplyFeature] = useState(false);
    const [applyFeature1, setApplyFeature1] = useState(false);
    const [applyFeature2, setApplyFeature2] = useState(false);
    const [account, setAccount] = useState('');
    const [items, setItems] = useState<{ label: string, value: string }[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const days = Array.from({length: 31}, (_, i) => i + 1).map(day => ({
        label: day.toString(),
        value: day.toString(),
    }));
    const {cardPassword, cardCheck, cardTransportation, id}: data = route.params;

    const {token} = route.params;

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
                    // Alert.alert("계좌 정보를 찾을 수 없습니다.");
                }
                setName(data.userName); // 사용자 이름 설정
            } catch (error) {
                console.error('계좌 정보를 가져오는데 실패했습니다:', error);
                // Alert.alert("계좌 정보를 가져오는 데 실패했습니다. 나중에 다시 시도해주세요.");
                setItems([{label: '계좌 만들기', value: 'create_account'}]);
                setAccount('create_account');
            }
        };
        fetchAccount();
    }, [token]);

    const handleNextPress = () => {
        if (applyFeature && applyFeature1 && applyFeature2) {
            navigation.navigate('CardPassword', {
                cardPaymentDate: selectedDate,
                cardPassword,
                account,
                cardCheck,
                cardTransportation,
                id,
                token
            });
        }
            // if(
        // )
        else {
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
    const handleAccountChange = (value: string) => {
        if (value === 'create_account') {
            navigation.navigate('AccountType', {token});
        } else {
            setAccount(value);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity style={styles.nameContainer} onPress={() => navigation.goBack()}>
                    <Svg
                        width={10}
                        height={16}
                        fill="none"
                        viewBox="0 0 8 14"
                    >
                        <Path stroke="#222" d="M7 1 1 7l6 6"/>
                    </Svg>
                    <Text style={styles.cardText}>카드 생성</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ width: width - 40, marginHorizontal: 20 }}>
                        <View style={[styles.userContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <Text style={styles.label}>신청인 이름</Text>
                            <View style={styles.userName}>
                                <Text style={styles.userNameText}>{name}</Text>
                            </View>
                        </View>
                        <View style={[styles.userContainer, { marginTop: 0 }]}>
                            <Text style={styles.label}>연동 계좌 선택</Text>
                            <RNPickerSelect
                                // onValueChange={(value) => setAccount(value)}
                                onValueChange={handleAccountChange}
                                items={items}
                                style={pickerSelectStyles}
                                placeholder={{label: "계좌 선택", value: null}}
                                value={account}
                            />

                        </View>
                        <View style={styles.checkCard}>
                            <Text style={styles.label}>카드 발급 관련 동의사항</Text>
                            <TouchableOpacity onPress={toggleFeature} style={styles.checkboxContainer}>
                                <Icon source={applyFeature ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24}
                                      color='#000'/>
                                <Text style={styles.checkboxLabel}>개인(신용)정보 필수적 동의</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleFeature1} style={styles.checkboxContainer}>
                                <Icon source={applyFeature1 ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24}
                                      color='#000'/>
                                <Text style={styles.checkboxLabel}>카드발급 관련 개인(신용)정보 동의</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleFeature2} style={styles.checkboxContainer}>
                                <Icon source={applyFeature2 ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24}
                                      color='#000'/>
                                <Text style={styles.checkboxLabel}>카드신청 미완료 시 연락을 위한 동의</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.applyButton} onPress={handleNextPress}>
                        <Text style={styles.applyButtonText}>다음</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    innerContainer: {
        flex: 1,
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    },
    account: {
        width: '100%'
    },
    nameContainer: {
        width: width - 40,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20
    },
    userContainer: {
        width: '100%',
        justifyContent: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 20,
        marginTop: 10
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10
    },
    label: {
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
    userName: {
        justifyContent: 'center',
    },
    userNameText: {
        fontSize: 16,
        fontWeight: 'bold'
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
        marginTop: 20,
    },
    checkboxLabel: {
        fontSize: 16,
        marginLeft: 5
    },
    applyButton: {
        backgroundColor: '#007378',
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: width - 40,
        marginHorizontal: 20
    },
    applyButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
    checkCard: {
        justifyContent: 'flex-start',
        width: width - 40
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#f8f8f8',
        color: 'black',
        marginTop: 10
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
