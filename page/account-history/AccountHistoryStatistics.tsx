import {
    Image,
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
    "#C7F279",
    "#6BC29A",
    "#ACE685",
    "#88D18E",
    "#35A18D",
    "#1D9287",
    "#51AF93",
    "#007378",
];

interface Budget {
    mbAccount: string;
    mbBudget: number;
    mbExpenditure: number;
}

export default function AccountHistoryStatistics({ route, navigation }: any) {
    const [statistics, setStatistics] = useState<any>([]);
    const [budget, setBudget] = useState<Budget | null>(null);
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
            const response = await getAccountHistoryStatistics(data);
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
                {/*<View style={styles.top}>*/}
                {/*    <TouchableOpacity style={[{padding: 10, paddingLeft: 0, paddingRight: 15}]} onPress={goBack}>*/}
                {/*        <Svg*/}
                {/*            width={9}*/}
                {/*            height={14}*/}
                {/*            fill="none"*/}
                {/*        >*/}
                {/*            <Path stroke="#33363F" strokeWidth={2} d="M8 1 2 7l6 6" />*/}
                {/*        </Svg>*/}
                {/*    </TouchableOpacity>*/}
                {/*    <Text style={styles.topFont}>분석 / 예산</Text>*/}
                {/*</View>*/}

                <ScrollView style={styles.scrollView}>
                    <View style={styles.monthExpenditure}>
                        <Text style={styles.expenditureFont1}>{month}월 지출</Text>
                        <Text style={styles.expenditureFont2}>{budget?.mbExpenditure?.toLocaleString() || '0'}원</Text>
                    </View>

                    <View style={styles.budgetArea}>
                        <View style={styles.budgetFontArea1}>
                            <Text style={styles.budgetFont}>예산</Text>
                            <View style={styles.budgetFontArea2}>
                                <Text style={styles.budgetFont}>{budget?.mbBudget.toLocaleString()}원</Text>
                                <TouchableOpacity
                                    style={[{padding: 10, paddingRight: 15, paddingLeft: 5}]}
                                    onPress={toggleModal}
                                >
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
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.budgetGraphArea}>
                            <View style={styles.budgetBaseGraph}>
                                <View
                                    style={[{ width: `${percentage}%`, maxWidth: '100%', backgroundColor: `${percentage>=100? "#df2323": "#1D9287"}`},
                                        styles.budgetGraph]} />
                                <Text style={styles.budgetGraphFont}>
                                    {budget?.mbBudget === 0 ? '예산을 설정해주세요' : `${percentage}%`}
                                </Text>
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
                            paddingLeft={"25"}
                            absolute
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
        marginTop: Platform.OS === 'ios' ? 10 : StatusBar.currentHeight,
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    monthExpenditure: {
        backgroundColor: "#fff",
        padding: 10
    },
    expenditureFont1: {
        fontSize: 18,
        paddingLeft: 15,
    },
    expenditureFont2: {
        fontSize: 30,
        paddingLeft: 15
    },
    budgetArea: {
        borderTopWidth: 1,
        borderColor: 'black',
        backgroundColor: "#fff"
    },
    budgetFontArea1: {
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 20,
        paddingRight: 10
    },
    budgetFontArea2: {
        flexDirection: "row",
        alignItems: "center"
    },
    budgetEditImage: {
        marginLeft: 5,
        width: 20,
        height: 20,
    },
    budgetFont: {
        fontSize: 26,
        marginRight: 5
    },
    budgetGraphArea: {
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 30
    },
    budgetBaseGraph: {
        backgroundColor: "#6BC29A",
        height: 45,
        borderRadius: 10,
        justifyContent: 'center'
    },
    budgetGraph: {
        // backgroundColor: "#1D9287",
        // width: ,
        height: 45,
        borderRadius: 10,
        justifyContent: 'center'
    },
    budgetGraphFont: {
        marginLeft: 10,
        fontSize: 24,
        color: 'white',
        zIndex: 1,
        position: "absolute"
    },
    categoryArea: {
        padding: 20,
        marginTop: 30,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: 'black',
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
    },
    legendText: {
        fontSize: 15,
        color: '#000',
    }
});
