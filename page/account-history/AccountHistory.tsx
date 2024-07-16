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
            console.log(response.data);
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

    return (
        <SafeAreaView style={styles.whole}>
            <View style={styles.innerContainer}>
                <View style={styles.top}>
                    <Image source={require('../../assets/image/back_btn.png')} style={styles.topImage}/>
                    <Text style={styles.topFont}>거래 내역 조회</Text>
                </View>

                <ScrollView style={styles.scrollView}>
                    <View style={styles.historyArea}>
                        <View style={styles.account}>
                            <View style={styles.accountSub}>
                                <Text style={styles.accountFont}>재민이의 텅...장</Text>
                                <Image source={require('../../assets/image/edit.png')} />
                            </View>
                            <View style={styles.accountSub}>
                                <Text style={styles.accountFont}>938002-00-537764</Text>
                                <Image source={require('../../assets/image/copy.png')} />
                            </View>
                            <View style={styles.balanceArea}>
                                <Text style={styles.balanceFont}>1,000,000,000 원</Text>
                            </View>
                        </View>

                        <View style={styles.accountBtnArea}>
                            <TouchableOpacity style={styles.accountBtn}>
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
                                        return <Image style={imageStyles.icon} source={require('../../assets/image/select.png')} />;
                                    }}
                                    style={pickerSelectStyles}
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