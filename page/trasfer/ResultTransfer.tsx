import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    Dimensions
} from "react-native";
import React, {useEffect} from "react";
import {setAccountMoney} from "../../component/api/AccountTranfer";
import {Circle, Defs, G, Path, Svg} from "react-native-svg";

type userInfo = {
    userId: string;
    account: string;
    nickName: string;
    amount: number; // 상대방 잔액
}

type props = {
    bank: string;
    account: string;
    nickname: string;
    transferAmount: number; // 보낼 금액
    category: number
}

type data = {
    name: string;
    amount: number;
    account: string;
    accountNumber: string;
    moneyAmount: number;
    category: number;
    token: string;
}

const {width, height} = Dimensions.get('window');

const ResultTransfer = ({navigation, route}: any) => {
    const userInfo: userInfo = route.params.userInfo;
    const data: props = route.params.data;
    const token: string = route.params.token;
    console.log(userInfo);
    console.log(data);
    console.log(token);
    console.log(userInfo.account);

    useEffect(() => {
        const performTransfer = async () => {
            const bodyToRecipient = {
                accountStatus: "deposit",
                account: userInfo.account,
                nickname: data.nickname,
                moneyAmount: data.transferAmount,
                category: data.category
            };

            const bodyToSender = {
                accountStatus: "transfer",
                account: data.account,
                nickname: userInfo.nickName,
                moneyAmount: data.transferAmount,
                category: data.category
            };

            console.log(bodyToRecipient.moneyAmount);
            console.log(bodyToSender.moneyAmount);

            try {
                await setAccountMoney(bodyToSender, token);
                await setAccountMoney(bodyToRecipient, token);
                console.log("Transfer successful");
            } catch (error) {
                console.error("Failed to set account money:", error);
                Alert.alert("Transfer Failed", "An error occurred during the transfer. Please try again.");
            }
        };

        performTransfer();
    }, [data.transferAmount, userInfo?.account, data.account, token]);

    const handleGoHome = () => {
        navigation.reset({
            index: 0,
            routes: [{name: 'AccountHome', params: {token}}]
        })
        navigation.navigate('Bottom', {token})
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.image}>
                    <Svg
                        width={70}
                        height={70}
                        fill="none"
                        viewBox="0 0 30 30"
                    >
                        <Path
                            fill="#007378"
                            fillRule="evenodd"
                            d="m11.889 17.025-2.36-.786C7.178 15.455 6 15.062 6 14.342c0-.721 1.177-1.113 3.53-1.898l8.513-2.837c1.656-.552 2.484-.828 2.92-.391.438.437.162 1.265-.39 2.92l-2.838 8.514c-.784 2.353-1.177 3.53-1.897 3.53-.721 0-1.113-1.177-1.898-3.53l-.786-2.36c-.055-.165-.1-.3-.143-.414l4.18-4.18a.5.5 0 0 0-.707-.708l-4.18 4.18a12.22 12.22 0 0 0-.415-.143Z"
                            clipRule="evenodd"
                        />
                        <Circle cx={15} cy={15} r={15} fill="#007378" fillOpacity={0.2} />
                    </Svg>
                </View>
                <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                    <View style={styles.nameWrap}>
                        <Text style={styles.name}>{userInfo.nickName}님</Text>
                        <Text style={styles.nameText}>에게</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                        <Text style={styles.transferAmount}>{data.transferAmount.toLocaleString()}원</Text>
                    </View>
                    <Text style={styles.transferAmountText}>보냈어요!</Text>
                </View>
                <TouchableOpacity style={styles.sendButton} onPress={handleGoHome}>
                    <Text style={styles.sendButtonText}>홈으로</Text>
                </TouchableOpacity>
                {/*<Image style={styles.image} source={require('../../assets/image/Click_logo.png')} resizeMode="contain"></Image>*/}
                {/*<Text style={{width: 200, alignSelf: 'center',textAlign: 'center', fontSize:30, color: '#000000', marginTop: 70}}>{userInfo.nickName}님에게</Text>*/}
                {/*<Text style={{width: 500, alignSelf: 'center',textAlign: 'center', fontSize:30, color: '#000000'}}>{data.transferAmount.toLocaleString()}원을</Text>*/}
                {/*<Text style={{width: 150, alignSelf: 'center',textAlign: 'center', fontSize:30, color: '#000000'}}>보냈어요*</Text>*/}
                {/*<View style={{flex: 1}}/>*/}
                {/*<TouchableOpacity style={styles.sendButton} onPress={() => navigation.reset({*/}
                {/*            index: 0,*/}
                {/*            routes: [{name: 'AccountHome', params: {token}}]*/}
                {/*})}>*/}
                {/*    <Text style={styles.sendButtonText}>메인으로</Text>*/}
                {/*</TouchableOpacity>*/}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: "#ffffff",
        alignItems: 'center',
    },
    innerContainer: {
        flex: 1,
        width: width - 40,
        margin: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    },
    nameWrap: {
        flexDirection: 'row',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 26,
    },
    nameText: {
        fontSize: 26
    },
    transferAmount: {
        fontWeight: 'bold',
        fontSize: 26,
        marginTop: 10,
        color: '#007378'
    },
    transferAmountText: {
        fontSize: 24,
        marginTop: 5
    },
    sendButton: {
        backgroundColor: '#007378',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: '100%',
        alignSelf: 'center',
    },
    sendButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold'
    },
})

export default ResultTransfer;