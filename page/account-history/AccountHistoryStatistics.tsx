import {
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Dimensions,
    Animated, TouchableOpacity
} from "react-native";
import ScrollView = Animated.ScrollView;
import React, {useEffect, useState} from "react";
import {PieChart} from "react-native-chart-kit";
import {getAccountBudget, getAccountHistoryStatistics} from "../../component/api/AccountHistoryApi";
import {Path, Svg} from "react-native-svg";
import BudgetUpdate from "../../component/account-history/BudgetUpdate";

const screenWidth = Dimensions.get("window").width;

const colors = [
    "#FADADD",
    "#A2C2E8",
    "#A8D5BA",
    "#F9B4AB",
    "#D7A9F0",
    "#B4E2D7",
    "#F6F7B0",
    "#D0D0D0",
];

interface Budget {
    mbAccount: string;
    mbBudget: number;
    mbExpenditure: number;
}

const { width, height } = Dimensions.get('window');

export default function AccountHistoryStatistics({ route, navigation }: any) {
    const [statistics, setStatistics] = useState<any>([]);
    const [budget, setBudget] = useState<Budget | null>();
    const [percentage, setPercentage] = useState<number>(0);
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const account = route.params.account;
    const month = new Date().getMonth()+1;

    useEffect(()=> {
        getStatistics();
        if (!isModalVisible){
            getBudget();
        }
    },[isModalVisible]);

    const goBack = () => {
        navigation.goBack(); // 이전 화면으로 돌아가는 함수
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const getBudget = async (): Promise<any> => {
        try {
            const response = await getAccountBudget(account);
            setBudget(response.data);
            if (response.data.mbBudget !== 0) {
                const per = (response.data.mbExpenditure / response.data.mbBudget) * 100;
                console.log(response.data.mbExpenditure, response.data.mbBudget)
                setPercentage(parseFloat(per.toFixed(2)));
                console.log(per)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getStatistics = async (): Promise<any> => {
        const date: Date = new Date();
        const month: number = date.getMonth() + 1;
        const data = {month,account};

        try{
            const response = await getAccountHistoryStatistics(account);
            console.log(response.data);
            setStatistics(response.data);
        } catch (error){
            console.log(error);
        }
    }

    const pieChartData = Object.keys(statistics).map((key, index) => ({
        name: key,
        population: statistics[key],
        color: colors[index % colors.length],
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
    }));

    const renderLegend = () => {
        return pieChartData.map((entry, index) => (
            <View key={index} style={styles.legendItem}>
                <View style={[styles.legendColorBox, { backgroundColor: entry.color }]} />
                <Text style={styles.legendText}>{entry.name}</Text>
            </View>
        ));
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
                    <Text style={styles.topFont}>{month}월 지출</Text>
                </TouchableOpacity>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.monthExpenditureWrap}>
                        <View style={styles.monthExpenditure}>
                            <Text style={styles.expenditureTitle}>총 지출</Text>
                            <Text style={styles.expenditureFont}>{budget?.mbExpenditure?.toLocaleString() || '0'}원</Text>
                        </View>
                        <View style={styles.budgetArea}>
                            <View style={styles.budgetFontArea}>
                                <Text style={styles.budgetFont}>예산</Text>
                                <View style={styles.budgetFontArea}>
                                    <Text style={styles.budgetFont}>{budget?.mbBudget.toLocaleString()}원</Text>
                                    <TouchableOpacity
                                        onPress={toggleModal}
                                        style={{ marginLeft: 10 }}
                                    >
                                        <Svg
                                            width={14}
                                            height={14}
                                            fill="none"
                                            viewBox="0 0 18 18"
                                        >
                                            <Path
                                                fill="#aaa"
                                                fillRule="evenodd"
                                                d="M14.204 7.796 16 6c.545-.545.818-.818.964-1.112a2 2 0 0 0 0-1.776C16.818 2.818 16.545 2.545 16 2c-.545-.545-.818-.818-1.112-.964a2 2 0 0 0-1.776 0c-.294.146-.567.419-1.112.964l-1.819 1.819a10.9 10.9 0 0 0 4.023 3.977ZM8.727 5.273l-6.87 6.87c-.426.426-.638.638-.778.9-.14.26-.199.555-.317 1.145l-.615 3.077c-.066.332-.1.498-.005.593.095.095.26.061.593-.005l3.077-.616c.59-.117.885-.176 1.146-.316.26-.14.473-.352.898-.777l6.89-6.89a12.902 12.902 0 0 1-4.02-3.98Z"
                                                clipRule="evenodd"
                                            />
                                        </Svg>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.budgetGraphArea}>
                                <View style={styles.budgetBaseGraph}>
                                    <View
                                        style={[{ width: `${percentage}%`, maxWidth: '100%', backgroundColor: `${percentage>=100? "#df2323": "#4D9DA1"}`},
                                            styles.budgetGraph]} />
                                    <Text
                                        style={[styles.budgetGraphFont, budget?.mbBudget !== 0 ? percentage>=100 ? { color: '#fff', fontWeight: 'bold' } : { color: '#333', fontWeight: 'bold' } : {}]}>
                                        {budget?.mbBudget === 0 ? '예산을 설정해주세요' : `${percentage}%`}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.categoryArea}>
                        <Text style={styles.budgetFont}>카테고리별 지출</Text>
                        <PieChart
                            data={pieChartData.map(item => ({ ...item, name: '' }))}
                            width={screenWidth+200}
                            height={220}
                            chartConfig={{
                                backgroundColor: "#1cc910",
                                backgroundGradientFrom: "#eff3ff",
                                backgroundGradientTo: "#efefef",
                                decimalPlaces: 2,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                            }}
                            accessor={"population"}
                            backgroundColor={"transparent"}
                            paddingLeft={''}
                            // absolute
                        />
                        <View style={styles.legendContainer}>{renderLegend()}</View>
                    </View>
                </ScrollView>
                {
                    isModalVisible &&
                    <BudgetUpdate
                        account={account}
                        mbBudget={budget?.mbBudget}
                        isModalVisible={isModalVisible}
                        toggleModal={toggleModal}
                    />
                }
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
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 20
    },
    topFont: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10
    },
    scrollView: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0,115,120,0.04)'
    },
    monthExpenditureWrap: {
        backgroundColor: "#fff",
        width: width - 40,
        marginHorizontal: 20,
        marginTop: 20,
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,115,120,0.1)'
    },
    monthExpenditure: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,115,120,0.1)',
        paddingBottom: 20
    },
    expenditureTitle: {
        fontSize: 16,
        marginRight: 10,
    },
    expenditureFont: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    budgetArea: {
        marginTop: 20
    },
    budgetFontArea: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    budgetEditImage: {
        marginLeft: 5,
        width: 20,
        height: 20,
    },
    budgetFont: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    budgetGraphArea: {
        marginTop: 20,
    },
    budgetBaseGraph: {
        backgroundColor: "#eee",
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        overflow: 'hidden'
    },
    budgetGraph: {
        height: 40,
        borderRadius: 20,
        justifyContent: 'center'
    },
    budgetGraphFont: {
        marginLeft: 15,
        fontSize: 16,
        color: '#888',
        zIndex: 1,
        position: "absolute"
    },
    categoryArea: {
        width: width - 40,
        padding: 20,
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'rgba(0,115,120,0.1)'
    },
    legendContainer: {
        marginTop: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    legendColorBox: {
        width: 15,
        height: 15,
        marginRight: 10,
        borderRadius: 8
    },
    legendText: {
        fontSize: 15,
        color: '#000',
    }
});
