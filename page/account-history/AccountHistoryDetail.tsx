import {
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    StatusBar, Animated, TouchableOpacity
} from "react-native";

export default function AccountHistoryDetail({ navigation }: any) {

    const goBack = () => {
        navigation.goBack(); // 이전 화면으로 돌아가는 함수
    };

    return (
        <SafeAreaView style={styles.whole}>
            <View style={styles.innerContainer}>
                <View style={styles.top}>
                    <Text style={styles.topFont}>거래 내역 조회</Text>
                    <TouchableOpacity onPress={goBack}>
                        <Image source={require('../../assets/image/close.png')}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.wrap}>
                    <View style={[{marginBottom: 30}]}>
                        <Text style={styles.title}>카카오페이</Text>
                        <Text style={styles.memoFont}>메모</Text>
                        <View style={styles.memoData}>
                            <Text style={styles.memoDataFont}>직접 작성</Text>
                            <Image source={require('../../assets/image/select.png')}/>
                        </View>
                        <View style={styles.inputBox}>
                            <Text style={styles.inputTextFont}>메모 입력(최대 20자)</Text>
                        </View>
                    </View>
                    <View style={styles.historyDetailData}>
                        <Text style={styles.historyDate}>2024.07.07 12:46:44</Text>
                        <Text style={styles.historyTitle}>카카오페이</Text>
                        <View style={styles.historyData}>
                            <Text style={styles.historyDataFont}>거래 금액</Text>
                            <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
                                <Text style={styles.historyDataFont}>출금</Text>
                                <Text style={[styles.historyDataFont, {color: 'red', fontWeight: 'bold'}]}>10,000</Text>
                                <Text style={styles.historyDataFont}>원</Text>
                            </View>
                        </View>
                        <View style={styles.historyData}>
                            <Text style={styles.historyDataFont}>거래 후 잔액</Text>
                            <Text style={styles.historyDataFont}>100,000,000원</Text>
                        </View>
                        <View style={styles.historyData}>
                            <Text style={styles.historyDataFont}>거래 유형</Text>
                            <Text style={styles.historyDataFont}>이체</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={goBack}>
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
        // alignItems: 'center',
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
        marginVertical: 20
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