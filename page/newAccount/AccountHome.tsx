import React, { useCallback, useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    View,
    Dimensions,
    RefreshControl
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAccountByUserId, getUserInfo } from "../../component/api/NewAccountApi";
import { AxiosResponse } from 'axios';
import { Container } from '../../css/sujin/Container';
import {Circle, Path, Svg} from "react-native-svg";

interface AccountResponse {
    account: string;
    accountName: string;
    moneyAmount: number | null;
}

interface UserAccountResponse {
    accounts: AccountResponse[];
    userCode: string;
    userName: string;
    userImg: string;
}
const { width, height } = Dimensions.get('window');

export default function AccountHome({ route, navigation }: any) {
    const [numberHidden, setNumberHidden] = useState<{ [key: string]: boolean }>({});
    // 새로고침
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [accounts, setAccounts] = useState<AccountResponse[]>([]);
    const [userName, setUserName] = useState<string>('');
    const [userImg, setUserImg] = useState<string>('');
    const [userCode, setUserCode] = useState('');
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
            const { accounts, userCode, userName, userImg} = data;

            if (data) {
                setAccounts(accounts);
                setUserCode(userCode);
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

    // pull to refresh
    const handleRefresh = async () => {
        setIsRefreshing(true);
        await fetchAccountsByUserId(token);
        setIsRefreshing(false);
    };

    const renderItem = ({ item }: { item: AccountResponse }) => (
        <View style={styles.accountCard}>
            <View style={styles.accountDetailContainer}>
                <Text style={styles.accountName}>{item.accountName}</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AccountDetail', {
                        token,
                        account: item.account,
                        accountName: item.accountName,
                        userName,
                        userImg,
                        amount: item.moneyAmount
                    })}
                    style={styles.btnMore}
                >
                    {/*<View>*/}
                        {/*<Image*/}
                        {/*    source={require('../../assets/image/more.png')}*/}
                        {/*    style={styles.imageMore} resizeMode="contain"*/}
                        {/*/>*/}
                        <Svg
                            width={16}
                            height={4}
                            fill="none"
                        >
                            <Circle
                                cx={8}
                                cy={2}
                                r={1}
                                stroke="#33363F"
                                strokeLinecap="round"
                                strokeWidth={2}
                            />
                            <Circle
                                cx={2}
                                cy={2}
                                r={1}
                                stroke="#33363F"
                                strokeLinecap="round"
                                strokeWidth={2}
                            />
                            <Circle
                                cx={14}
                                cy={2}
                                r={1}
                                stroke="#33363F"
                                strokeLinecap="round"
                                strokeWidth={2}
                            />
                        </Svg>
                    {/*</View>*/}
                </TouchableOpacity>
            </View>
            <View style = {styles.historyContainer}>
                <Text style={styles.accountNumber}>
                    {item.account.replace(/^(\d{3})(\d{3})(\d+)$/, "$1-$2-$3")}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.balanceWrap}
                    onPress={() => navigation.navigate('AccountHistory',{token:token,account:item.account,moneyAmount:item.moneyAmount,accountName:item.accountName})}
                >
                    <Text style={numberHidden[item.account] ? {...styles.balance, fontSize: 24, color: '#aaa'} : styles.balance}>
                        {/* {numberHidden ? '잔액보기' : `${item.moneyAmount.toLocaleString()}원`} */}
                        {/* {numberHidden ? '잔액보기' : item.moneyAmount !== null ? `${item.moneyAmount.toLocaleString()}원` : '잔액 없음'} */}
                        {numberHidden[item.account] ? '잔액 숨김' : item.moneyAmount !== null ? `${item.moneyAmount.toLocaleString()}` : '잔액 없음'}
                    </Text>
                    {
                        !numberHidden[item.account] && item.moneyAmount !== null ?
                            <Text style={styles.accountText}>원</Text>
                            : ""
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.hiddenButton} onPress={() => toggleNumberHidden(item.account)}>
                    <Text style={styles.buttonHiddenText}>{numberHidden [item.account]? '보기' : '숨김'}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                <TouchableOpacity style={styles.history} onPress={() => navigation.navigate('AccountHistory',{token:token,account:item.account,moneyAmount:item.moneyAmount,accountName:item.accountName})}>
                    <Text style ={styles.historyText}>거래 내역</Text>
                </TouchableOpacity>
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
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {
                            userImg ?
                                <Image
                                    source={{ uri: userImg }}
                                    style={styles.imagePerson}
                                    resizeMode="cover"
                                />
                                :
                                <Svg
                                    width={40}
                                    height={40}
                                    fill="none"
                                    viewBox="0 0 30 30"
                                    style={styles.imagePerson}
                                >
                                    <Path
                                        fill="#7E869E"
                                        fillOpacity={0.25}
                                        d="M0 15C0 6.716 6.716 0 15 0c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15Z"
                                    />
                                    <Circle cx={15} cy={11.667} r={6.667} fill="#7E869E" fillOpacity={0.5}/>
                                    <Path
                                        fill="#7E869E"
                                        fillOpacity={0.5}
                                        fillRule="evenodd"
                                        d="M25.433 25.52c.057.097.04.22-.042.298A14.95 14.95 0 0 1 15 30a14.95 14.95 0 0 1-10.391-4.182.243.243 0 0 1-.042-.298C6.484 22.247 10.436 20 15 20s8.516 2.246 10.433 5.52Z"
                                        clipRule="evenodd"
                                    />
                                </Svg>
                        }
                        {/*<Image*/}
                        {/*    source={userImg ? { uri: userImg } : require('../../assets/image/person.png')}*/}
                        {/*    style={styles.imagePerson}resizeMode="cover"*/}
                        {/*/>*/}
                        <Text style={styles.text}>{userName}</Text>
                        <Text style={styles.code}>#{userCode}</Text>
                    </View>
                    {/*<View style={styles.bellContainer}>*/}
                    {/*    /!* <TouchableOpacity onPress={() => navigation.navigate('AccountType',{ token: token})}> *!/*/}
                    {/*        <Image*/}
                    {/*            source={require('../../assets/image/bell.png')}*/}
                    {/*            style={styles.imageBell} resizeMode="contain"*/}
                    {/*        />*/}
                    {/*    /!* </TouchableOpacity> *!/*/}
                    {/*</View>*/}

                    <TouchableOpacity
                        onPress={() => navigation.navigate('AccountType',{ token: token, userName: userName })}
                        style={styles.newAccount}
                    >
                        {/*<Image*/}
                        {/*    source={require('../../assets/image/plus.png')}*/}
                        {/*    style={styles.imagePlus}*/}
                        {/*    resizeMode="contain"*/}
                        {/*/>*/}
                        <Text style={styles.newAccountText}>새 계좌</Text>
                        <View style={styles.newAccountImg}>
                            <Svg
                                width={16}
                                height={16}
                                fill="none"
                                viewBox="0 0 22 22"
                            >
                                <Path
                                    stroke="#222"
                                    strokeLinecap="round"
                                    strokeWidth={3}
                                    d="M11 2.111V19.89M19.889 11H2.11"
                                />
                            </Svg>
                        </View>
                    </TouchableOpacity>
                </View>
                
                <FlatList
                    data={accounts}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={numberHidden}
                    contentContainerStyle={styles.flatListContainer}
                    refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh}/>}
                />
            </View>
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
        backgroundColor: 'white',
    },
    accountDetailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    flatListContainer: {
        width: width - 40,
        alignItems: 'center',
        paddingBottom: 10,
        marginHorizontal: 20
    },
    nameContainer: {
        marginTop: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        marginBottom: 15,
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
    btnMore: {
        width: 20,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageBell: {
        width: 80,
        height: 80,
    },
    text: {
        textAlign: 'left',
        fontSize: 20,
        color: 'black',
        marginLeft: 10,
        fontWeight: '600'
    },
    code: {
        color: '#888',
        marginLeft: 5,
        fontSize: 16
    },
    accountCard: {
        borderRadius: 20,
        padding: 16,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#f8f8f8',
        minWidth: '100%'
    },
    accountName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    accountNumber: {
        fontSize: 16,
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'flex-end'
    },
    balanceWrap: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    balance: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    accountText: {
        fontSize: 20,
        marginLeft: 2
    },
    hiddenButton: {
        backgroundColor: '#e8e8e8',
        borderRadius: 10,
        width: 40,
        height: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },
    transferButton: {
        width: '48%',
        alignItems: 'center',
        backgroundColor: 'rgba(0,115,120,0.1)',
        borderRadius: 10,
    },
    buttonText: {
        padding: 10,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007378'
    },
    buttonHiddenText: {
        color: '#888',
        fontSize: 15,
    },
    newAccount: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    newAccountText: {
        marginRight: 5,
        fontSize: 16
    },
    newAccountImg: {
        fontWeight: 'bold',
        marginRight: 20,
    },
    history:{
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    historyText:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    historyContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 20
    }
});