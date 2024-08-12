import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, SafeAreaView, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAccountByUserId, getUserInfo } from "../../component/api/NewAccountApi";
import { AxiosResponse } from 'axios';
import { Container } from '../../css/sujin/Container';

interface AccountResponse {
    account: string;
    accountName: string;
    moneyAmount: number | null;
}

interface UserAccountResponse {
    accounts: AccountResponse[];
    userName: string;
    userImg: string;
}

export default function AccountHome({ route, navigation }: any) {
    // const [numberHidden, setNumberHidden] = useState(false);
    const [numberHidden, setNumberHidden] = useState<{ [key: string]: boolean }>({});

    const [accounts, setAccounts] = useState<AccountResponse[]>([]);
    const [userName, setUserName] = useState<string>('');
    const [userImg, setUserImg] = useState<string>('');
    const token = route.params?.token;

    const toggleNumberHidden = (accountId: string) => {
        setNumberHidden(prevState => ({
            ...prevState,
            [accountId]: !prevState[accountId]
        }));
    };

    const fetchAccountsByUserId = async (token: string): Promise<void> => {
        try {
            const response: AxiosResponse<UserAccountResponse[]> = await getAccountByUserId(token);
            const data = response.data[0]; 
            const { accounts, userName, userImg } = data;
    
            if (data) {
                setAccounts(accounts);
                setUserName(userName);
                setUserImg(userImg);
            } else {
                console.error('응답 데이터가 올바르지 않습니다:', data);
                const userInfoResponse: AxiosResponse<any> = await getUserInfo(token);
                const userInfoData = userInfoResponse.data;

            // 유저 정보 데이터 확인
                if (userInfoData) {
                    const { userName, userImg } = userInfoData;
                    console.log('User Info API 응답 데이터:', userInfoData);

                    // 상태 업데이트
                    setAccounts([]);
                    setUserName(userName || '');
                    setUserImg(userImg || '');
                } else {
                    console.error('User Info API 응답 데이터가 올바르지 않습니다:', userInfoData);
                }
            }
        } catch (error) {
            console.log(error);
            try {
                const userInfoResponse: AxiosResponse<any> = await getUserInfo(token);
                const userInfoData = userInfoResponse.data;
    
                // 유저 정보 데이터 확인
                if (userInfoData) {
                    const { userName, userImg } = userInfoData;
                    console.log('User Info API 응답 데이터:', userInfoData);
    
                    // 상태 업데이트
                    setAccounts([]);
                    setUserName(userName || '');
                    setUserImg(userImg || '');
                } else {
                    console.error('User Info API 응답 데이터가 올바르지 않습니다:', userInfoData);
                }
            } catch (userInfoError) {
                console.error('getUserInfo 호출 중 에러 발생:', userInfoError);
            }
        }
    };
    
    // const numberShow = () => {
    //     setNumberHidden(!numberHidden);
    // };

    const renderItem = ({ item }: { item: AccountResponse }) => (
        <View style={styles.accountCard}>
            <View style={styles.accountDetailContainer}>
                <Text style={styles.accountName}>{item.accountName}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AccountDetail', {token, account: item.account, accountName: item.accountName, userName, userImg, amount: item.moneyAmount})}>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={require('../../assets/image/more.png')}
                            style={styles.imageMore} resizeMode="contain"
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={styles.accountNumber}>
                {item.account.replace(/^(\d{3})(\d{3})(\d+)$/, "$1-$2-$3")}
            </Text>
            <View style={styles.buttonContainer}>
                <Text style={styles.balance}>
                    {/* {numberHidden ? '잔액보기' : `${item.moneyAmount.toLocaleString()}원`} */}
                    {/* {numberHidden ? '잔액보기' : item.moneyAmount !== null ? `${item.moneyAmount.toLocaleString()}원` : '잔액 없음'} */}
                    {numberHidden[item.account] ? '잔액보기' : item.moneyAmount !== null ? `${item.moneyAmount.toLocaleString()}원` : '잔액 없음'}
                </Text>
                <TouchableOpacity style={styles.sendButton} onPress={() => toggleNumberHidden(item.account)}>
                    <Text style={styles.buttonSendText}>{numberHidden [item.account]? '보기' : '숨김'}</Text>
                    
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.transferButton} onPress={() => navigation.navigate('Transfer',{ token: token,
                        account: item.account,
                        // accountName: item.accountName,
                        moneyAmount: item.moneyAmount})}>
                    <Text style={styles.buttonText}>이체</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    //useFocusEffect를 사용하여 화면이 포커스될 때 API를 호출
    useFocusEffect(
        useCallback(() => {
            if (token) {
                fetchAccountsByUserId(token);
            }
        }, [token])
    );
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={Container.innerContainer}>
                <View style={styles.nameContainer}>
                    <Image
                        source={userImg ? { uri: userImg } : require('../../assets/image/person.png')}
                        style={styles.imagePerson}resizeMode="cover"
                    />
                    <Text style={styles.text}>{userName}</Text>
                    <View style={styles.bellContainer}>
                        {/* <TouchableOpacity onPress={() => navigation.navigate('AccountType',{ token: token})}> */}
                            <Image
                                source={require('../../assets/image/bell.png')}
                                style={styles.imageBell} resizeMode="contain"
                            />
                        {/* </TouchableOpacity> */}
                    </View>
                </View>
                
                <FlatList
                    data={accounts}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={numberHidden}
                    contentContainerStyle={styles.flatListContainer}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('AccountType',{ token: token, userName: userName })}>
                <Image
                    source={require('../../assets/image/plus.png')}
                    style={styles.imagePlus} resizeMode="contain"
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    accountDetailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 30
    },
    flatListContainer: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 20,
    },
    nameContainer: {
        marginTop: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        marginBottom: 8,
    },
    bellContainer: {
        position: 'absolute',
        right: 20,
    },
    imagePerson:{
        width:45,
        height:45,
        borderRadius:50,
        marginLeft:20
    },
    imageMore: {
        width: 50,
        height: 20,
        position: 'absolute',
        right: 1,
        marginTop: 5,
    },
    imageBell: {
        width: 80,
        height: 80,
    },
    imageWrapper: {
        width: 90,
        height: 90,
        borderRadius: 45,
        overflow: 'hidden',
        marginLeft: 20,
    },
    text: {
        textAlign: 'left',
        fontSize: 20,
        color: 'black',
        marginLeft: 15,
    },
    accountCard: {
        backgroundColor: '#B7E1CE',
        borderRadius: 10,
        padding: 16,
        margin: 16,
        width: '90%',
        height: 160,
    },
    accountName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    accountNumber: {
        fontSize: 14,
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    balance: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    transferButton: {
        alignItems: 'flex-end',
        width: '100%',
    },
    buttonText: {
        width: 60,
        backgroundColor: '#6BC29A',
        color: 'black',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 16,
    },
    buttonSendText: {
        color: 'black',
        fontSize: 15,
    },
    imagePlus: {
        width: 90,
        height: 95,
    },
});