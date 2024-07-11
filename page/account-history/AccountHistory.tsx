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
    TouchableOpacity, Animated
} from "react-native";
import ScrollView = Animated.ScrollView;

export default function AccountHistory({ navigation }: any) {

    const navigateToDetail = () => {
        navigation.navigate('AccountHistoryDetail');
    };

    return (
        <SafeAreaView style={styles.whole}>
            <View style={styles.innerContainer}>
                <View style={styles.top}>
                    <Image source={require('../../assets/image/back_btn.png')} style={styles.topImage}/>
                    <Text style={styles.topFont}>거래 내역 조회</Text>
                </View>

                <ScrollView style={[{width: '100%'}]}>
                    <View style={[{marginBottom: 90}]}>
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
                                <Text style={styles.filterFont}>전체</Text>
                                <Image source={require('../../assets/image/select.png')} />
                            </View>
                            <TouchableOpacity style={styles.history} onPress={navigateToDetail}>
                                <Text style={styles.historyDateFont}>2024.07.07 12:46:44</Text>
                                <Text style={styles.historyNameFont}>카카오페이</Text>
                                <View style={styles.historyAmountArea}>
                                    <Text style={styles.historyAmountFont}>출금</Text>
                                    <Text style={styles.historyAmountFontColor}>10,000원</Text>
                                </View>
                                <Text style={styles.historyBalanceFont}>잔액 1,000,000,000원</Text>
                            </TouchableOpacity>
                            <View style={styles.history}>
                                <Text style={styles.historyDateFont}>2024.07.07 12:46:44</Text>
                                <Text style={styles.historyNameFont}>카카오페이</Text>

                                <View style={styles.historyAmountArea}>
                                    <Text style={styles.historyAmountFont}>출금</Text>
                                    <Text style={styles.historyAmountFontColor}>10,000원</Text>
                                </View>
                                <Text style={styles.historyBalanceFont}>잔액 1,000,000,000원</Text>
                            </View>
                            <View style={styles.history}>
                                <Text style={styles.historyDateFont}>2024.07.07 12:46:44</Text>
                                <Text style={styles.historyNameFont}>카카오페이</Text>
                                <View style={styles.historyAmountArea}>
                                    <Text style={styles.historyAmountFont}>출금</Text>
                                    <Text style={styles.historyAmountFontColor}>10,000원</Text>
                                </View>
                                <Text style={styles.historyBalanceFont}>잔액 1,000,000,000원</Text>
                            </View>
                            <View style={styles.history}>
                                <Text style={styles.historyDateFont}>2024.07.07 12:46:44</Text>
                                <Text style={styles.historyNameFont}>카카오페이</Text>
                                <View style={styles.historyAmountArea}>
                                    <Text style={styles.historyAmountFont}>출금</Text>
                                    <Text style={styles.historyAmountFontColor}>10,000원</Text>
                                </View>
                                <Text style={styles.historyBalanceFont}>잔액 1,000,000,000원</Text>
                            </View>
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
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        alignItems: 'center',
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
    account: {
        width: '100%',
        height: '20%',
        backgroundColor: 'white',
        padding: 20,
        paddingTop: 0,
        alignItems: 'center',
    },
    accountSub: {
        width: '100%',
        height: '30%',
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
        height: '40%'
    },
    balanceFont: {
        fontSize: 35,
        marginTop:10,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    accountBtnArea: {
        width: '100%',
        height: '8%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    accountBtn: {
        width: '40%',
        height: '70%',
        borderRadius: 10,
        backgroundColor: '#B7E1CE',
        justifyContent: "center"
    },
    accountBtnFont: {
        fontSize: 20,
        textAlign: "center",
    },
    historyArea: {
        width: '100%',
        height: '64%',
        backgroundColor: '#c7c7c7',
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
        height: 150,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#c7c7c7'
    },
    historyDateFont: {
        fontSize: 16,
        marginLeft: 20,
        marginTop: 20,
        color: '#808080',
        height: 35,
    },
    historyNameFont: {
        fontSize: 20,
        marginLeft: 20,
        height: 35,
    },
    historyAmountArea:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    historyAmountFont: {
        fontSize: 20,
        marginRight:10,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    historyAmountFontColor: {
        fontSize: 24,
        marginRight:20,
        textAlign: 'right',
        fontWeight: 'bold',
        color: 'red',
    },
    historyBalanceFont: {
        fontSize: 16,
        marginRight:20,
        color: '#808080',
        textAlign: 'right'
    }
});