import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, SafeAreaView, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAccountByUserId } from "../../component/api/NewAccountApi";
import { AxiosResponse } from 'axios';

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
    const [numberHidden, setNumberHidden] = useState(false);
    const [account, setAccount] = useState<AccountResponse[]>([]);
    const [userName, setUserName] = useState<string>('');
    const [userImg, setUserImg] = useState<string>('');
    const token = route.params?.token;
    
    const fetchAccountsByUserId = async (token: string): Promise<void> => {
        try {
            const response: AxiosResponse<UserAccountResponse[]> = await getAccountByUserId(token);
            const data = response.data[0]; 
            const { accounts, userName, userImg } = data;
    
            console.log('API 응답 데이터:', data);
    
            if (data) {
                setAccount(accounts);
                setUserName(userName);
                setUserImg(userImg);
            } else {
                console.error('응답 데이터가 올바르지 않습니다:', data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    const numberShow = () => {
        setNumberHidden(!numberHidden);
    };

    const renderItem = ({ item }: { item: AccountResponse }) => (
        <View style={styles.accountCard}>
            <TouchableOpacity onPress={() => navigation.navigate('EditAccount', {token, account: item.account})}>
                <Text style={styles.accountName}>{item.accountName}</Text>
                <Image
                    source={require('../../assets/image/more.png')}
                    style={styles.imageMore} resizeMode="contain"
                />
            </TouchableOpacity>
            <Text style={styles.accountNumber}>
                {item.account.replace(/\B(?=(\d{4})+(?!\d))/g, "-")}
            </Text>
            <View style={styles.buttonContainer}>
                <Text style={styles.balance}>
                    {/* {numberHidden ? '잔액보기' : `${item.moneyAmount.toLocaleString()}원`} */}
                    {numberHidden ? '잔액보기' : item.moneyAmount !== null ? `${item.moneyAmount.toLocaleString()}원` : '잔액 없음'}

                </Text>
                <TouchableOpacity style={styles.sendButton} onPress={numberShow}>
                    <Text style={styles.buttonSendText}>{numberHidden ? '보기' : '숨김'}</Text>
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

    useEffect(() => {
        if (token) {
            fetchAccountsByUserId(token);
        }
    }, [token])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.nameContainer}>
                    <Image
                        source={userImg ? { uri: userImg } : require('../../assets/image/person.png')}
                        style={styles.imagePerson} resizeMode="contain"
                    />
                    <Text style={styles.text}>{userName}</Text>
                    <View style={styles.bellContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('AccountType',{ token: token})}>
                            <Image
                                source={require('../../assets/image/bell.png')}
                                style={styles.imageBell} resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={account}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.flatListContainer}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('AccountType',{ token: token, userName: userName})}>
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
    imagePerson: {
        width: 45,
        height: 45,
        marginLeft: 20,
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
