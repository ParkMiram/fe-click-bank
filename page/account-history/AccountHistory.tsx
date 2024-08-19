import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity, Animated, Alert, RefreshControl, Dimensions, ScrollView, SafeAreaView
} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {getAccountHistory, getPastAllHistories} from "../../component/api/AccountHistoryApi";
import {AxiosResponse} from "axios";
import RNPickerSelect from "react-native-picker-select";
import {Path, Rect, Svg} from "react-native-svg";
import * as Clipboard from 'expo-clipboard';
import {useFocusEffect} from "@react-navigation/native";

interface Category {
    id: number;
    name: string;
}

interface History {
    historyId: number;
    bhAt: Date;
    bhName: string;
    bhAmount: number;
    bhStatus: string;
    bhBalance: number;
    categoryId: Category;
}

const { width, height } = Dimensions.get('window');

export default function AccountHistory({ route, navigation }: any) {
    const [record, setRecord] = useState<History[]>([]);
    const [filteredHistories, setFilteredHistories] = useState<History[]>([]);
    const [purpose, setPurpose] = useState("전체");
    const [count, setCount] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false)
    const purposes = [
        { label: '입금', value: '입금' },
        { label: '출금', value: '출금' },
    ];
    const accountInfo = route.params;
    const account: string = accountInfo.account;
    // const account: string = "416847747645";

    const goBack = () => {
        navigation.goBack(); // 이전 화면으로 돌아가는 함수
    };

    useFocusEffect(
        useCallback(() => {
            fetchHistories();
        }, [])
    );

    useEffect(() => {
        filterHistories();
    }, [record, purpose]);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        fetchHistories();
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1000);
    };

    const fetchHistories = async (): Promise<any> => {
        try {
            setCount(0);
            setHasMore(true); // 초기화 시 hasMore 값을 true로 설정
            const response: AxiosResponse<History[]> = await getAccountHistory(account);

            let histories: History[] = [];
            if (response.data && response.data.length > 0) {
                histories = response.data.reverse();
            }

            const data = {account, count};
            const res = await getPastAllHistories(data);
            console.log(res.data);

            const combinedHistories = histories.concat(res.data);

            // 버그 수정
            const sortedHistories = combinedHistories.sort((a, b) => {
                return Number(b.historyId) - Number(a.historyId);
            });

            setRecord(sortedHistories);

            if (res.data.length < 10) {
                setHasMore(false); // 불러온 데이터가 10개 미만일 경우 더 이상 데이터를 불러오지 않도록 설정
            }

        } catch (error) {
            console.log(error);
        }
    };

    const loadMoreHistories = async () => {
        try {
            const newCount = count + 1;
            setCount(newCount); // count 값 증가

            const data = {account, count: newCount};
            const res = await getPastAllHistories(data);
            console.log(res.data);

            if (res.data && res.data.length > 0) {
                setRecord(prev => prev.concat(res.data));
            }

            if (res.data.length < 10) {
                setHasMore(false); // 불러온 데이터가 10개 미만일 경우 더 이상 데이터를 불러오지 않도록 설정
            }

        } catch (error) {
            console.log(error);
        }
    };

    const copyAccountToClipboard = async () => {
        await Clipboard.setStringAsync(account);
        Alert.alert("복사되었습니다.");
    };

    const filterHistories = () => {
        if (purpose === '전체' || purpose === null) {
            setFilteredHistories(record);
        } else {
            const filtered = record.filter(history => history.bhStatus === purpose);
            setFilteredHistories(filtered);
        }
    };

    const navigateToDetail = (history: History) => {
        navigation.navigate('AccountHistoryDetail', { history });
    };

    const goToStatistics = (account: string) => {
        navigation.navigate('AccountHistoryStatistics', { account });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh}/>}>
                    <View style={styles.accountContainer}>
                        <View style={styles.account}>
                            <View style={[styles.accountSub, { marginBottom: 5 }]}>
                                <Text style={styles.accountFont}>{accountInfo.accountName}</Text>
                            </View>
                            <View style={styles.accountSub}>
                                <Text style={[styles.accountFont, { color: '#888' }]}>{account.replace(/^(\d{3})(\d{3})(\d+)$/, "$1-$2-$3")}</Text>
                                <TouchableOpacity onPress={copyAccountToClipboard}>
                                    <Svg
                                        width={18}
                                        height={18}
                                        fill="none"
                                        style={{ marginLeft: 5 }}
                                    >
                                        <Path
                                            stroke="#888"
                                            d="M10.5 5.25c0-.232 0-.348-.01-.446A2 2 0 0 0 8.696 3.01C8.598 3 8.482 3 8.25 3h-1.5c-1.644 0-2.466 0-3.019.454a2.001 2.001 0 0 0-.277.277C3 4.284 3 5.106 3 6.75v1.5c0 .232 0 .348.01.446a2 2 0 0 0 1.794 1.794c.098.01.214.01.446.01"
                                        />
                                        <Rect width={7.5} height={7.5} x={7.5} y={7.5} stroke="#888" rx={2} />
                                    </Svg>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.balanceArea}>
                                <Text style={styles.balanceFont}>{(record.length > 0 ? record[0].bhBalance : 0).toLocaleString()}</Text>
                                <Text style={{ fontSize: 22 }}>원</Text>
                            </View>
                        </View>
                        {/*record.length-1*/}
                        <View style={styles.accountBtnArea}>
                            <TouchableOpacity
                                style={[styles.accountBtn, { backgroundColor: '#fff', borderWidth: 1, borderColor: 'rgba(0,115,120,0.1)' }]}
                                onPress={()=>goToStatistics(account)}
                            >
                                <Text style={[styles.accountBtnFont, { color: '#333' }]}>분석 / 예산</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.accountBtn}
                                onPress={() => navigation.navigate('Transfer',
                                    {token: accountInfo.token,
                                    account: accountInfo.account,
                                    // accountName: item.accountName,
                                    moneyAmount: accountInfo.moneyAmount}
                                )}>
                                <Text style={styles.accountBtnFont}>이체</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <View style={styles.filterArea}>
                            <Svg
                                width={14}
                                height={10}
                                fill="none"
                                viewBox="0 0 16 12"
                                style={{ marginRight: 10 }}
                            >
                                <Path
                                    stroke="#888"
                                    strokeLinecap="round"
                                    strokeWidth={2}
                                    d="M1 1h14M3 6h10M5 11h6"
                                />
                            </Svg>
                            <RNPickerSelect
                                onValueChange={(value) => setPurpose(value)}
                                items={purposes}
                                placeholder={{ label: '전체', value: '전체', color:'black' }}
                                value={purpose}
                                Icon={() => {
                                    return <Svg
                                        width={10}
                                        height={8}
                                        fill="none"
                                        viewBox="0 0 12 10"
                                        style={{ marginTop: 5 }}
                                    >
                                        <Path
                                            fill="#33363F"
                                            d="M5.18 8.83.543 2.203C-.108 1.275.556 0 1.689 0h8.622c1.133 0 1.796 1.275 1.147 2.203L6.819 8.83a1 1 0 0 1-1.638 0Z"
                                        />
                                    </Svg>;
                                }}
                                style={pickerSelectStyles}
                                useNativeAndroidPickerStyle={false}
                            />
                            {/*<Image source={require('../../assets/image/select.png')} />*/}
                        </View>
                        {
                            filteredHistories.length > 0 ?
                                filteredHistories.slice().map((item: History, index) => (
                                    <TouchableOpacity
                                        key={item.historyId}
                                        style={[styles.history, index === filteredHistories.length - 1 ? { borderBottomWidth: 0 } : {} ]}
                                        onPress={() => navigateToDetail(item)}
                                    >
                                        <Text style={styles.historyDateFont}>{new Date(item.bhAt).toLocaleString()}</Text>
                                        <View style={styles.historyInfo}>
                                            <Text style={styles.historyNameFont}>{item.bhName}</Text>
                                            <View style={styles.historyAmountArea}>
                                                {/*<Text style={styles.historyAmountFont}>{item.bhStatus}</Text>*/}
                                                <Text style={[styles.historyAmountFontColor, {color: item.bhStatus === '입금' ? '#4169e1' : '#dc143c'}]}>
                                                    {item.bhStatus === '출금' ? `-` : ''}{item.bhAmount.toLocaleString()}원
                                                </Text>
                                                {/*<Text style={styles.historyAmountFont}>원</Text>*/}
                                            </View>
                                        </View>
                                        <Text style={styles.historyBalanceFont}>잔액 {item.bhBalance.toLocaleString()}원</Text>
                                    </TouchableOpacity>
                                ))
                                :
                                <Text style={styles.noHistory}>거래 내역이 없습니다.</Text>
                        }

                        {hasMore && (
                            <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreHistories}>
                                <Text style={styles.loadMoreButtonText}>+ 더 보기</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </ScrollView>
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
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    },
    scrollView: {

    },
    accountContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(0,115,120,0.04)',
    },
    account: {
        width: width - 40,
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20
    },
    accountSub: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    accountFont: {
        fontSize: 16,
    },
    balanceArea: {
        width: '100%',
        marginTop: 15,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    balanceFont: {
        fontSize: 30,
        textAlign: 'right',
        fontWeight: 'bold',
        marginRight: 5
    },
    accountBtnArea: {
        width: width - 40,
        marginHorizontal: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    accountBtn: {
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,115,120,0.1)',
        borderRadius: 10,
        height: 36
    },
    accountBtnFont: {
        padding: 10,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007378',
    },
    filterArea: {
        width: width - 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: 15,
        marginRight: 20
    },
    history: {
        width: width - 40,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10
    },
    historyDateFont: {
        marginTop: 10,
        color: '#aaa',
    },
    historyNameFont: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    historyInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
    historyAmountArea:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    historyAmountFont: {
        fontSize: 18,
        textAlign: 'right',
    },
    historyAmountFontColor: {
        fontSize: 20,
        textAlign: 'right',
        fontWeight: 'bold',
        marginLeft: 10
    },
    historyBalanceFont: {
        fontSize: 14,
        color: '#888',
        textAlign: 'right',
        marginTop: 5
    },
    loadMoreButton: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    loadMoreButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    noHistory: {
        textAlign: 'center',
        marginVertical: 30,
        color: '#aaa'
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width: 60,
        color: 'black',
        fontSize: 16,
    },
    inputAndroid: {
        width: 80,
        color: 'black',
        fontSize: 16,
    },
    placeholder: {
        color: 'black',  // placeholder 텍스트 색상
    },
});

const imageStyles = StyleSheet.create({
    icon: {
        marginTop: 25,
    },
});