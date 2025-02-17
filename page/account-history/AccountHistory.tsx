import {
    Button,
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Dimensions,
    TouchableOpacity, Animated, Alert
} from "react-native";
import ScrollView = Animated.ScrollView;
import React, {useEffect, useState} from "react";
import {getAccountHistory} from "../../component/api/AccountHistoryApi";
import {AxiosResponse} from "axios";
import RNPickerSelect from "react-native-picker-select";
import {Path, Rect, Svg} from "react-native-svg";

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

export default function AccountHistory({ navigation }: any) {
    const [histories, setHistories] = useState<History[]>([]);
    const [filteredHistories, setFilteredHistories] = useState<History[]>([]);
    const [purpose, setPurpose] = useState("전체");
    const purposes = [
        { label: '입금', value: '입금' },
        { label: '출금', value: '출금' },
    ];

    const goBack = () => {
        navigation.goBack(); // 이전 화면으로 돌아가는 함수
    };


    useEffect(()=> {
        getAccountHistories();
    },[]);

    useEffect(() => {
        filterHistories();
    }, [histories, purpose]);

    const getAccountHistories = async (): Promise<any> => {
        try {
            const account: string = "110-486-119643";
            const response: AxiosResponse<History[]> = await getAccountHistory(account);
            console.log(response.data); //TODO 나중에 지우기
            setHistories(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const filterHistories = () => {
        if (purpose === '전체' || purpose === null) {
            setFilteredHistories(histories);
        } else {
            const filtered = histories.filter(history => history.bhStatus === purpose);
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
        <SafeAreaView style={styles.whole}>
            <View style={styles.innerContainer}>
                <View style={styles.top}>
                    <TouchableOpacity style={[{padding: 10, paddingLeft: 0, paddingRight: 15}]} onPress={goBack}>
                        <Svg
                            width={9}
                            height={14}
                            fill="none"
                        >
                            <Path stroke="#33363F" strokeWidth={2} d="M8 1 2 7l6 6" />
                        </Svg>
                    </TouchableOpacity>
                    <Text style={styles.topFont}>거래 내역 조회</Text>
                </View>

                <ScrollView style={styles.scrollView}>
                    <View style={styles.historyArea}>
                        <View style={styles.account}>
                            <View style={styles.accountSub}>
                                <Text style={styles.accountFont}>재민이의 텅...장</Text>
                                <Svg
                                    width={11}
                                    height={10}
                                    fill="none"
                                >
                                    <Path
                                        fill="#222"
                                        fillRule="evenodd"
                                        d="M8.634 4.046 9.64 3.04c.305-.305.458-.458.54-.623a1.12 1.12 0 0 0 0-.994c-.082-.165-.235-.318-.54-.623-.305-.305-.458-.458-.623-.54a1.12 1.12 0 0 0-.994 0C7.858.342 7.705.495 7.4.8L6.38 1.818a6.104 6.104 0 0 0 2.253 2.228ZM5.567 2.633 1.72 6.48c-.239.238-.358.357-.436.504-.078.146-.111.311-.177.641L.762 9.348c-.037.186-.056.28-.003.333.053.053.147.034.333-.003l1.723-.345c.33-.066.495-.099.641-.177.146-.079.265-.198.504-.436l3.858-3.858a7.225 7.225 0 0 1-2.251-2.23Z"
                                        clipRule="evenodd"
                                    />
                                </Svg>
                            </View>
                            <View style={styles.accountSub}>
                                <Text style={styles.accountFont}>938002-00-537764</Text>
                                <Svg
                                    width={18}
                                    height={18}
                                    fill="none"
                                >
                                    <Path
                                        stroke="#222"
                                        d="M10.5 5.25c0-.232 0-.348-.01-.446A2 2 0 0 0 8.696 3.01C8.598 3 8.482 3 8.25 3h-1.5c-1.644 0-2.466 0-3.019.454a2.001 2.001 0 0 0-.277.277C3 4.284 3 5.106 3 6.75v1.5c0 .232 0 .348.01.446a2 2 0 0 0 1.794 1.794c.098.01.214.01.446.01"
                                    />
                                    <Rect width={7.5} height={7.5} x={7.5} y={7.5} stroke="#222" rx={2} />
                                </Svg>
                            </View>
                            <View style={styles.balanceArea}>
                                <Text style={styles.balanceFont}>{histories[histories.length-1]?.bhBalance.toLocaleString()} 원</Text>
                            </View>
                        </View>

                        <View style={styles.accountBtnArea}>
                            <TouchableOpacity style={styles.accountBtn} onPress={()=>goToStatistics("110-486-119643")}>
                                <Text style={styles.accountBtnFont}>분석 / 예산</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.accountBtn}>
                                <Text style={styles.accountBtnFont}>이체</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.historyArea}>
                            <View style={styles.filterArea}>
                                <RNPickerSelect
                                    onValueChange={(value) => setPurpose(value)}
                                    items={purposes}
                                    placeholder={{ label: '전체', value: '전체', color:'black' }}
                                    value={purpose}
                                    Icon={() => {
                                        return <Svg
                                            width={20}
                                            height={10}
                                            fill="none"
                                            viewBox="0 0 10 5"
                                            style={imageStyles.icon}
                                        >
                                            <Path stroke="#222" strokeWidth={0.7} d="M9.6.3 5.4 4.5 1.2.3" />
                                        </Svg>;
                                    }}
                                    style={pickerSelectStyles}
                                    useNativeAndroidPickerStyle={false}
                                />
                                {/*<Image source={require('../../assets/image/select.png')} />*/}
                            </View>
                            {filteredHistories.slice().reverse().map((item: History) => (
                                <TouchableOpacity key={item.historyId} style={styles.history} onPress={() => navigateToDetail(item)}>
                                    <Text style={styles.historyDateFont}>{new Date(item.bhAt).toLocaleString()}</Text>
                                    <Text style={styles.historyNameFont}>{item.bhName}</Text>
                                    <View style={styles.historyAmountArea}>
                                        <Text style={styles.historyAmountFont}>{item.bhStatus}</Text>
                                        <Text style={[styles.historyAmountFontColor, {color: item.bhStatus === '입금' ? 'blue' : 'red'}]}>
                                            {item.bhAmount.toLocaleString()}
                                        </Text>
                                        <Text style={styles.historyAmountFont}>원</Text>
                                    </View>
                                    <Text style={styles.historyBalanceFont}>잔액 {item.bhBalance.toLocaleString()}원</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>


                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    whole: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    innerContainer: {
        flex: 1,
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    },
    top: {
        width: '100%',
        height: '8%',
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    topFont: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10
    },
    topImage: {
        marginLeft: 5
        // width: 15,
        // height: 15,
    },
    accountContainer: {
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    account: {
        width: '100%',
        padding: 20,
        paddingTop: 0,
        alignItems: 'center',
    },
    accountSub: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    accountFont: {
        fontSize: 22,
        marginRight: 5
    },
    balanceArea: {
        marginVertical: 5,
        width: '100%',
    },
    balanceFont: {
        fontSize: 35,
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    accountBtnArea: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 10,
    },
    accountBtn: {
        width: '40%',
        height: 40,
        borderRadius: 10,
        backgroundColor: '#B7E1CE',
        justifyContent: "center"
    },
    accountBtnFont: {
        fontSize: 20,
        textAlign: "center",
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    historyArea: {
        width: '100%'
    },
    filterArea: {
        width: '100%',
        height: 60,
        backgroundColor: '#d9d9d9',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1.5,
        borderTopColor: '#c7c7c7',
    },
    filterFont: {
        fontSize: 20,
        marginLeft: 20,
        marginRight: 5
    },
    history: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#c7c7c7'
    },
    historyDateFont: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 10,
        color: '#808080',
    },
    historyNameFont: {
        fontSize: 20,
        marginLeft: 10,
    },
    historyAmountArea:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    historyAmountFont: {
        fontSize: 20,
        marginRight: 10,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    historyAmountFontColor: {
        fontSize: 24,
        marginRight: 0,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    historyBalanceFont: {
        fontSize: 16,
        marginRight: 10,
        color: '#808080',
        textAlign: 'right'
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width: 80,
        height: '100%',
        color: 'black',
        paddingHorizontal: 20,
        fontSize:16,
    },
    inputAndroid: {
        width: 80,
        height: '100%',
        color: 'black',
        paddingHorizontal: 20,
        fontSize:16,
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