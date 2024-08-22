import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    StatusBar,
    Alert,
    SafeAreaView,
    Dimensions
} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {getAccountUserInfo} from '../../component/api/AccountTranfer';

type userInfo = {
    userId: string;
    account: string;
    nickName: string;
    amount: number;
}

type props = {
    bank: string;
    accountNumber: string;
    account: string;
    moneyAmount: number;
    category: number
}

const {width, height} = Dimensions.get('window');

const SendingTransfer = ({navigation, route}: any) => {
    const [amount, setAmount] = useState<string>('0');
    const [receiveUserInfo, setReceiveUserInfo] = useState<userInfo | undefined>(undefined);
    const [sendUserInfo, setSendUserInfo] = useState<userInfo | undefined>(undefined);
    const {bank, accountNumber, account, category}: props = route.params;
    const token: string = route.params?.token;
    console.log(receiveUserInfo)       // 상대 유저 정보
    console.log(bank)
    console.log(accountNumber) // 상대 계좌
    console.log(account)
    console.log(sendUserInfo?.amount) // 본인 잔액
    console.log(category)

    const data = {
        bank: bank,
        account: account,
        nickname: sendUserInfo?.nickName,
        transferAmount: parseInt(amount),
        category: category
    }

    const fetchReceiveUserInfo = async (account: string, token: string) => {
        try {
            const response = await getAccountUserInfo(account, token);
            console.log(response.data);
            setReceiveUserInfo(response.data);
        } catch (error) {
            console.log(error);
            Alert.alert('', '계좌 정보를 가져오는 데 실패했습니다.');
            navigation.goBack();
        }
    };

    const fetchSendUserInfo = async (account: string, token: string) => {
        try {
            const response = await getAccountUserInfo(account, token);
            console.log(response.data);
            setSendUserInfo(response.data);
        } catch (error) {
            console.log(error);
            Alert.alert('', '계좌 정보를 가져오는 데 실패했습니다.');
            navigation.goBack();
        }
    }

    useEffect(() => {
        fetchReceiveUserInfo(accountNumber, token);
        fetchSendUserInfo(account, token);
    }, [accountNumber, account])

    const handleNumberPress = (num: string) => {
        if (parseInt(amount) === 0 && (parseInt(num) === 0 || num === '00')) setAmount('0');
        else setAmount(amount + num);
    };

    const handleClear = () => {
        setAmount(amount.slice(0, -1));
    };

    const handleAllAmlount = () => {
        let allAmount;
        if (sendUserInfo !== null && sendUserInfo !== undefined) {
            allAmount = sendUserInfo.amount;
            setAmount(allAmount.toLocaleString());
        } else {
            allAmount = undefined;
        }
    }

    const handlePredefinedAmount = (num: number) => {
        setAmount((parseInt(amount, 10) || 0) + num + '');
    };

    const handleSend = () => {
        if (!Number.isNaN(parseInt(amount)) && parseInt(amount) !== 0) {
            if (receiveUserInfo && receiveUserInfo.nickName) {
                navigation.navigate('ReminingTranfer', {userInfo: receiveUserInfo, data: data, token});
            } else {
                Alert.alert('', '사용자 정보가 없습니다.');
            }
        } else {
            Alert.alert('', '돈을 입력해주세요.');
        }
    };

    // 금액이 잔액을 초과할 경우 글자색을 빨간색으로 변경
    const amountTextStyle = {color: parseInt(amount, 10) > (sendUserInfo?.amount || 0) ? 'red' : 'black'};

    // 잔액을 초과하면 보내기 버튼을 비활성화 (회색 배경)
    const sendButtonStyle = {backgroundColor: parseInt(amount, 10) > (sendUserInfo?.amount || 0) || amount === '0' || amount === '00' || amount === '' ? '#CCCCCC' : '#007378'};
    const sendButtonDisabled = parseInt(amount, 10) > (sendUserInfo?.amount || 0) || amount === '';

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.textContainer}>
                    <View style={styles.recipient}>
                        <Text style={styles.nameText}>{receiveUserInfo?.nickName}님</Text>
                        <Text style={{fontSize: 24}}>에게</Text>
                    </View>
                    <Text style={styles.question}>얼마를 보낼까요?</Text>
                    <View style={styles.accountInfoWrap}>
                        <Text style={styles.accountInfo}>{bank} {receiveUserInfo?.account}</Text>
                    </View>
                </View>
                <View style={styles.amountContainer}>
                    <Text
                        style={[styles.amountText, amountTextStyle]}>{!isNaN(parseInt(amount)) ? parseInt(amount).toLocaleString() : 0}</Text>
                </View>
                <View style={{flex: 1}}>
                    <View style={styles.balanceContainer}>
                        <Text style={styles.balanceLabel}>잔액</Text>
                        <Text style={styles.balance}>{sendUserInfo?.amount.toLocaleString()}원</Text>
                    </View>
                    <View style={styles.predefinedAmounts}>
                        <TouchableOpacity style={styles.amountButtonWrapper}
                                          onPress={() => handlePredefinedAmount(10000)}>
                            <Text style={styles.amountButtonText}>+ 1만</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.amountButtonWrapper}
                                          onPress={() => handlePredefinedAmount(50000)}>
                            <Text style={styles.amountButtonText}>+ 5만</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.amountButtonWrapper}
                                          onPress={() => handlePredefinedAmount(100000)}>
                            <Text style={styles.amountButtonText}>+ 10만</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.amountButtonWrapper}
                                          onPress={() => setAmount(Number(sendUserInfo?.amount).toLocaleString())}>
                            <Text style={styles.amountButtonText}>전액</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.fixedBottom}>
                        <View style={styles.keypad}>
                            {/*{['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0'].map((num, index) => (*/}
                            {/*    <TouchableOpacity key={index} style={styles.key} onPress={() => handleNumberPress(num)}>*/}
                            {/*        <Text style={styles.keyText}>{num}</Text>*/}
                            {/*    </TouchableOpacity>*/}
                            {/*))}*/}
                            <View style={styles.keyWrap}>
                                {['1', '2', '3'].map((num, index) => (
                                    <TouchableOpacity key={index} style={styles.key}
                                                      onPress={() => handleNumberPress(num)}>
                                        <Text style={styles.keyText}>{num}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={styles.keyWrap}>
                                {['4', '5', '6'].map((num, index) => (
                                    <TouchableOpacity key={index} style={styles.key}
                                                      onPress={() => handleNumberPress(num)}>
                                        <Text style={styles.keyText}>{num}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={styles.keyWrap}>
                                {['7', '8', '9'].map((num, index) => (
                                    <TouchableOpacity key={index} style={styles.key}
                                                      onPress={() => handleNumberPress(num)}>
                                        <Text style={styles.keyText}>{num}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={styles.keyWrap}>
                                {['00', '0'].map((num, index) => (
                                    <TouchableOpacity key={index} style={styles.key}
                                                      onPress={() => handleNumberPress(num)}>
                                        <Text style={styles.keyText}>{num}</Text>
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity style={styles.key} onPress={handleClear}>
                                    <Svg
                                        width={25}
                                        height={21}
                                        fill="none"
                                        viewBox="0 0 22 18"
                                    >
                                        <Path
                                            fill="#333"
                                            fillRule="evenodd"
                                            d="M1.515 7.674a1.875 1.875 0 0 0 0 2.652L7.89 16.7c.352.351.829.549 1.326.549H18.5a3 3 0 0 0 3-3V3.75a3 3 0 0 0-3-3H9.216c-.497 0-.974.198-1.326.55L1.515 7.673ZM11.53 6.22a.75.75 0 1 0-1.06 1.06L12.19 9l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L14.31 9l1.72-1.72a.75.75 0 0 0-1.06-1.06l-1.72 1.72-1.72-1.72Z"
                                            clipRule="evenodd"
                                        />
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={[styles.sendButton, sendButtonStyle]} onPress={handleSend}
                                          disabled={sendButtonDisabled}>
                            <Text style={styles.sendButtonText}>보내기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    innerContainer: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        margin: 20
    },
    textContainer: {},
    label: {},
    recipient: {
        flexDirection: 'row'
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: 24
    },
    accountInfoWrap: {
        width: '55%',
        backgroundColor: 'rgba(0,115,120,0.1)',
        marginTop: 10,
        borderRadius: 10
    },
    accountInfo: {
        textAlign: 'center',
        color: '#007378',
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontWeight: 'bold'
    },
    question: {
        fontSize: 24,
        marginTop: 5
    },
    amountContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 50
    },
    amountText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    balanceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#f8f8f8',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 10
    },
    balanceLabel: {},
    balance: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    predefinedAmounts: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 5
    },
    amountButtonWrapper: {
        width: '25%',
    },
    amountButtonText: {
        fontSize: 16,
        color: '#888',
        fontWeight: 'bold',
        paddingVertical: 10,
        textAlign: 'center'
    },
    fixedBottom: {
        width: '100%',
        backgroundColor: 'white',
        alignSelf: 'center',
        flex: 1
    },
    keypad: {
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        flex: 1
    },
    keyWrap: {
        flex: 1,
        flexDirection: 'row'
    },
    key: {
        width: (width - 40) / 3,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    keyText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    sendButton: {
        backgroundColor: '#007378',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 10
    },
    sendButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold'
    },
});

export default SendingTransfer;