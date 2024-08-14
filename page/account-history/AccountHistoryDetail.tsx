import {
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    StatusBar, Animated, TouchableOpacity, TextInput
} from "react-native";
import React, {useEffect, useState} from "react";
import {AxiosResponse} from "axios";
import {
    getAccountHistory,
    getAccountHistoryDetail, getPastHistoryDetail, updateAccountHistoryCategory,
    updateAccountHistoryMemo
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

            if (bhAtDate.getTime() !== today.getTime()) {
                // bhAt이 오늘보다 하루 전이라면 getPastHistoryDetail 호출
                response = await getPastHistoryDetail(id);
                console.log("데이터: " + response.data)
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
        if (memo && memo.length > 0) {
            try {
                const data = {id, memo};
                await updateAccountHistoryMemo(data);
                const data2 = {id, categoryId};
                await updateAccountHistoryCategory(data2);
            } catch (error) {
                console.log(error);
            }
        } else if(memo.length == 0) {
            try {
                memo = "";
                const data = {id, memo}
                await updateAccountHistoryMemo(data);
                const data2 = {id, categoryId};
                await updateAccountHistoryCategory(data2);
            } catch (error) {
                console.log(error);
            }
        }
        goBack();
    };

    return (
        <SafeAreaView style={styles.whole}>
            <View style={styles.innerContainer}>
                <View style={styles.top}>
                    <Text style={styles.topFont}>거래 내역 조회</Text>
                    <TouchableOpacity onPress={goBack}>
                        <Svg
                            width={24}
                            height={24}
                            fill="none"
                        >
                            <Path
                                stroke="#33363F"
                                strokeLinecap="square"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18 6 6 18M6 6l12 12"
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>

                <View style={styles.wrap}>
                    <View style={[{marginBottom: 30}]}>
                        <Text style={styles.title}>{history.bhName}</Text>
                        <Text style={styles.memoFont}>메모</Text>

                        <View style={styles.inputBox}>
                            <TextInput
                                style={styles.inputTextFont}
                                placeholder="메모 입력(최대 20자)"
                                value={memo}
                                onChangeText={setMemo}
                                maxLength={20}
                            />
                        </View>
                    </View>
                    <View style={styles.historyDetailData}>
                        <Text style={styles.historyDate}>{new Date(history.bhAt).toLocaleString()}</Text>
                        <Text style={styles.historyTitle}>{history.bhName}</Text>
                        <View style={styles.historyData}>
                            <Text style={styles.historyDataFont}>거래 금액</Text>
                            <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
                                <Text style={styles.historyDataFont}>{history.bhStatus}</Text>
                                <Text style={[styles.historyDataFont, {fontWeight: 'bold', color: history.bhStatus === '입금' ? 'blue' : 'red'}]}>{history.bhAmount.toLocaleString()}</Text>
                                <Text style={styles.historyDataFont}>원</Text>
                            </View>
                        </View>
                        <View style={styles.historyData}>
                            <Text style={styles.historyDataFont}>거래 후 잔액</Text>
                            <Text style={styles.historyDataFont}>{history.bhBalance.toLocaleString()}원</Text>
                        </View>
                        <View style={styles.historyData}>
                            <Text style={styles.historyDataFont}>거래 유형</Text>
                            <Text style={styles.historyDataFont}>{detail?.bhOutType}</Text>
                        </View>
                        <View style={styles.historyData}>
                            <Text style={styles.historyDataFont}>카테고리</Text>
                            <RNPickerSelect
                                onValueChange={(value) => setPurpose(value)}
                                items={purposes}
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
                            {/*<Text style={styles.historyDataFont}>{history?.categoryId.categoryName}</Text>*/}
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={() => updateMemo({memo,purpose})}>
                    <View style={styles.bottom}>
                        <Text style={styles.bottomText}>확인</Text>
                    </View>
                </TouchableOpacity>

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
        // alignItems: 'center',
    },
    top: {
        width: '100%',
        height: '8%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    topFont: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10
    },
    wrap: {
        flex: 1,
        // width: '100%',
        // height: '82%',
        paddingVertical: 20,
        paddingHorizontal: 30
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    memoFont: {
        fontSize: 18,
        color: '#acacac',
        marginVertical: 20,
        marginBottom: 10
    },
    memoData: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    memoDataFont: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    inputBox: {
        marginVertical: 10,
        width: '100%',
        height: 50,
        borderColor: '#000',
        borderWidth: 0.5,
        justifyContent: 'center'
    },
    inputTextFont: {
        fontSize: 18,
        color: '#808080',
        marginLeft: 5
    },
    historyDetailData: {
        borderTopColor: '#e7e7e7',
        borderBottomColor: '#e7e7e7',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        paddingVertical: 30,
        paddingHorizontal: 5
    },
    historyDate: {
        fontSize: 18,
        color: '#808080',
        marginVertical: 2.5
    },
    historyTitle: {
        fontSize: 22,
        fontWeight: '400',
        marginVertical: 5
    },
    historyData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4
    },
    historyDataFont: {
        fontSize: 22,
        marginRight:5
    },
    bottom: {
        // width: '100%',
        height: 60,
        backgroundColor: '#6BC29A',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomText: {
        fontSize: 26,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width: 120,
        // height: '100%',
        color: 'black',
        paddingRight: 10,
        fontSize:22,
        textAlign: "center"
    },
    inputAndroid: {
        width: 120,
        // height: '100%',
        color: 'black',
        paddingRight: 10,
        fontSize:22,
        textAlign: "center"
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