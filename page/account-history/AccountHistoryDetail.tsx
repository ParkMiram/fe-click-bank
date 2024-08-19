import {
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    StatusBar, TouchableOpacity, TextInput, Dimensions
} from "react-native";
import React, {useEffect, useState} from "react";
import {AxiosResponse} from "axios";
import {
    getAccountHistory,
    getAccountHistoryDetail, getPastHistoryDetail, updateAccountHistoryCategory,
    updateAccountHistoryMemo, updatePastHistoryCategory, updatePastHistorymemo
} from "../../component/api/AccountHistoryApi";
import {Path, Svg} from "react-native-svg";
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

interface Detail {
    historyId: number;
    bhOutType: number;
    cardId: number;
    bhMemo: string;
}

const { width, height } = Dimensions.get('window');

export default function AccountHistoryDetail({ route, navigation }: any) {
    const [detail, setDetail] = useState<Detail>();
    const [memo, setMemo] = useState('');
    const {history} = route.params;
    const id: number = history.historyId;
    const [purpose, setPurpose] = useState<number>(history.categoryId.categoryId);
    const [purposes, setPurposes] = useState<{ label: string; value: number; }[]>([]);
    const purposesDeposit = [
        { label: '식비', value: 1 },
        { label: '생활', value: 2 },
        { label: '쇼핑', value: 3 },
        { label: '교통', value: 4 },
        { label: '의료/건강', value: 5 },
        { label: '문화/여가', value: 6 },
        { label: '교육', value: 7 },
        { label: '경조/선물', value: 8 },
        { label: '수입', value: 9 },
        { label: '기타', value: 10 },
    ];

    const purposesWithDraw = [
        { label: '식비', value: 1 },
        { label: '생활', value: 2 },
        { label: '쇼핑', value: 3 },
        { label: '교통', value: 4 },
        { label: '의료/건강', value: 5 },
        { label: '문화/여가', value: 6 },
        { label: '교육', value: 7 },
        { label: '경조/선물', value: 8 },
        { label: '기타', value: 10 },
    ]

    const goBack = () => {
        navigation.goBack(); // 이전 화면으로 돌아가는 함수
    };

    useEffect(()=> {
        getDetail();
    },[]);

    useEffect(() => {
        if (detail && detail.bhMemo) {
            setMemo(detail.bhMemo);
        }
    }, [detail]);

    useEffect(() => {
        if (history.bhStatus === "입금") {
            setPurposes(purposesDeposit);
        } else if (history.bhStatus === "출금") {
            setPurposes(purposesWithDraw);
        }
    }, [history.bhStatus]);

    const getDetail = async (): Promise<any> => {
        try {
            const bhAtDate = new Date(history.bhAt);
            const today = new Date();

            // 시간을 0시 0분 0초로 설정하여 날짜만 비교할 수 있게 함
            bhAtDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);

            // 날짜 차이 계산 (밀리초 단위 차이 -> 일 단위로 변환)
            // const differenceInDays = (today.getTime() - bhAtDate.getTime()) / (1000 * 3600 * 24);

            let response: AxiosResponse<Detail>;
            if (bhAtDate.getDate() !== today.getDate()) {
                // bhAt이 오늘보다 하루 전이라면 getPastHistoryDetail 호출
                response = await getPastHistoryDetail(id);
                console.log(response.data)
            } else {
                // 그렇지 않다면 getAccountHistoryDetail 호출
                response = await getAccountHistoryDetail(id);
            }
            setDetail(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const updateMemo = async (param: any): Promise<any> => {
        let memo = param.memo;
        const categoryId = param.purpose;

        try {
            const bhAtDate = new Date(history.bhAt);
            const today = new Date();

            // 시간을 0시 0분 0초로 설정하여 날짜만 비교할 수 있게 함
            bhAtDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);

            if (bhAtDate.getDate() !== today.getDate()) {
                if (memo && memo.length > 0) {
                    const data = {id, memo};
                    await updatePastHistorymemo(data);
                    const data2 = {id, categoryId};
                    await updatePastHistoryCategory(data2);
                } else if(memo.length == 0) {
                    memo = "";
                    const data = {id, memo}
                    await updatePastHistorymemo(data);
                    const data2 = {id, categoryId};
                    await updatePastHistoryCategory(data2);
                }
            } else {
                if (memo && memo.length > 0) {
                    const data = {id, memo};
                    await updateAccountHistoryMemo(data);
                    const data2 = {id, categoryId};
                    await updateAccountHistoryCategory(data2);
                } else if(memo.length == 0) {
                    memo = '';
                    const data = {id, memo}
                    await updateAccountHistoryMemo(data);
                    const data2 = {id, categoryId};
                    await updateAccountHistoryCategory(data2);
                }
                // const data = {id, memo};
                // await updateAccountHistoryMemo(data);
                // const data2 = {id, categoryId};
                // await updateAccountHistoryCategory(data2);
            }
        } catch (error) {
            console.log(error);
        }

        goBack();
    };

    return (
        <SafeAreaView style={styles.whole}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={goBack} style={styles.top}>
                    <Svg
                        width={10}
                        height={16}
                        fill="none"
                        viewBox="0 0 8 14"
                    >
                        <Path stroke="#222" d="M7 1 1 7l6 6" />
                    </Svg>
                    <Text style={styles.topFont}>{history.bhName}</Text>
                </TouchableOpacity>

                <View style={styles.wrap}>
                    <View>
                        {/*<Text style={styles.title}>{history.bhName}</Text>*/}
                        <Text style={styles.memoFont}>메모</Text>
                        <View style={styles.inputBox}>
                            <TextInput
                                style={styles.inputTextFont}
                                placeholder="메모 입력 (최대 20자)"
                                value={memo === "\"\"" ? undefined : memo?.replace(/^"|"$/g, '')}
                                onChangeText={setMemo}
                                maxLength={20}
                            />
                        </View>
                    </View>
                    <View style={styles.historyDetailData}>
                        <Text style={styles.historyDate}>{new Date(history.bhAt).toLocaleString()}</Text>
                        <View style={styles.historyData}>
                            <Text style={styles.historyDataFont}>거래 금액</Text>
                            <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
                                {/*<Text style={styles.historyDataFont}>{history.bhStatus}</Text>*/}
                                <Text
                                    style={[styles.historyDataFont, {fontWeight: 'bold', color: history.bhStatus === '입금' ? '#4169e1' : '#dc143c'}]}
                                >
                                    {history.bhStatus === '출금' ? `-` : ''}{history.bhAmount.toLocaleString()}원
                                </Text>
                                {/*<Text style={styles.historyDataFont}>원</Text>*/}
                            </View>
                        </View>
                        <View style={styles.historyData}>
                            <Text style={styles.historyDataFont}>거래 후 잔액</Text>
                            <Text style={[styles.historyDataFont, { fontWeight: 'bold' }]}>{history.bhBalance.toLocaleString()}원</Text>
                        </View>
                        <View style={styles.historyData}>
                            {/* TODO: 결제 방법 넣을 건지 결정 */}
                            <Text style={styles.historyDataFont}>결제 방법</Text>
                            <Text style={[styles.historyDataFont, { fontWeight: 'bold' }]}>{detail?.bhOutType}</Text>
                        </View>
                        <View style={styles.historyData}>
                            <Text style={styles.historyDataFont}>카테고리</Text>
                            <RNPickerSelect
                                onValueChange={(value) => setPurpose(value)}
                                items={purposes}
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
                            {/*<Text style={styles.historyDataFont}>{history?.categoryId.categoryName}</Text>*/}
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => updateMemo({memo,purpose})}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    whole: {
        flex: 1,
        backgroundColor: 'white',
    },
    innerContainer: {
        flex: 1,
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    },
    top: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20
    },
    topFont: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10
    },
    wrap: {
        flex: 1,
        width: width - 40,
        marginHorizontal: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    memoFont: {
        fontSize: 16,
        color: '#888',
        marginTop: 10,
    },
    inputBox: {
        marginTop: 10,
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#f8f8f8',
        padding: 15,
        fontSize: 14,
    },
    inputTextFont: {
        fontSize: 16,
        color: '#222',
        marginLeft: 5
    },
    historyDetailData: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        marginTop: 20,
        paddingTop: 20,
        flex: 1
    },
    historyDate: {
        fontSize: 14,
        color: '#aaa',
        marginBottom: 20
    },
    historyData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    historyDataFont: {
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007378',
        borderRadius: 10,
        width: width - 40,
        height: 40,
        justifyContent: 'center',
        marginVertical: 20
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
        color: 'black',
        paddingRight: 10,
        fontSize: 16,
        textAlign: "center",
        marginRight: 10,
        fontWeight: 'bold'
    },
    inputAndroid: {
        color: 'black',
        paddingRight: 10,
        fontSize: 16,
        textAlign: "center",
        marginRight: 10,
        fontWeight: 'bold'
    },
    placeholder: {
        color: 'black',  // placeholder 텍스트 색상
    },
});

const imageStyles = StyleSheet.create({
    icon: {
        marginTop: 8,
    },
});