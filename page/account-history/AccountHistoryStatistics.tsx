import {
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Dimensions,
    Animated
} from "react-native";
import ScrollView = Animated.ScrollView;
import React, {useEffect, useState} from "react";
import {PieChart} from "react-native-chart-kit";
import {getAccountHistoryStatistics} from "../../component/api/AccountHistoryApi";

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

export default function AccountHistoryStatistics({ route, navigation }: any) {
    const [statistics, setStatistics] = useState<any>([]);
    const account = route.params.account;

    useEffect(()=> {
        getStatistics();
    },[]);

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
                <View style={styles.top}>
                    <Image source={require('../../assets/image/back_btn.png')} style={styles.topImage}/>
                    <Text style={styles.topFont}>분석 / 예산</Text>
                </View>

                <ScrollView style={styles.scrollView}>
                    <View style={styles.monthExpenditure}>
                        <Text style={styles.expenditureFont1}>7월 지출</Text>
                        <Text style={styles.expenditureFont2}>100,000,000원</Text>
                    </View>

                    <View style={styles.budgetArea}>
                        <View style={styles.budgetFontArea1}>
                            <Text style={styles.budgetFont}>예산</Text>
                            <View style={styles.budgetFontArea2}>
                                <Text style={styles.budgetFont}>10,000,000원</Text>
                                <Image source={require('../../assets/image/edit.png')} style={styles.topImage}/>
                            </View>
                        </View>
                        <View style={styles.budgetGraphArea}>
                            <View style={styles.budgetBaseGraph}>
                                <View style={styles.budgetGraph}>
                                    <Text style={styles.budgetGraphFont}>
                                        40%
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={[{padding: 20, marginTop: 30, backgroundColor: '#c7c7c7'}]}>
                        <Text style={styles.budgetFont}>카테고리별 지출</Text>
                        <PieChart
                            data={pieChartData.map(item => ({ ...item, name: '' }))}
                            width={screenWidth}
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
                            paddingLeft={"15"}
                            absolute
                        />
                        <View style={styles.legendContainer}>{renderLegend()}</View>
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
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    monthExpenditure: {
        backgroundColor: "#808080",
        padding: 10
    },
    expenditureFont1: {
        fontSize: 24,
        paddingLeft: 15,
    },
    expenditureFont2: {
        fontSize: 30,
        paddingLeft: 15
    },
    budgetArea: {
        backgroundColor: "#c7c7c7"
    },
    budgetFontArea1: {
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 20
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
        fontSize: 26
    },
    budgetGraphArea: {
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 30
    },
    budgetBaseGraph: {
        backgroundColor: "#6BC29A",
        height: 45,
        borderRadius: 10
    },
    budgetGraph: {
        backgroundColor: "#1D9287",
        width:'40%',
        height: 45,
        borderRadius: 10,
        justifyContent: 'center'
    },
    budgetGraphFont: {
        marginLeft: 10,
        fontSize: 24,
        color: 'white'
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
        color: '#7F7F7F',
    }
});
