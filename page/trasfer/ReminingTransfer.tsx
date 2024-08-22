import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    StatusBar,
    Dimensions
} from "react-native";
// import { RootStackParamList } from "../../App";
import React from "react";
import {Circle, Defs, G, Path, Svg} from "react-native-svg";

// type ReminingTranferNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ReminingTranfer'>

// type Props = {
//   navigation: ReminingTranferNavigationProp;
// };

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
    token: string;
}

const {width, height} = Dimensions.get('window');

const ReminingTranfer = ({navigation, route}: any) => {
    const userInfo: userInfo = route.params.userInfo;
    const data: props = route.params.data;
    const token: string = route.params.token;
    console.log(userInfo)
    console.log(data)

    console.log(data.transferAmount.toLocaleString());
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.image}>
                    <Svg
                        width={70}
                        height={70}
                        fill="none"
                        viewBox="0 0 26 26"
                    >
                        <Circle cx={13} cy={13} r={13} fill="#007378"/>
                        <G filter="url(#a)">
                            <Path
                                fill="#fff"
                                fillRule="evenodd"
                                d="m10.769 13.47-.64-.876c-.437-.598-1.368-.817-2.08-.489l.166-.076c-.177.081-.262.284-.189.453l.886 2.055c.14.325.5.786.796 1.017 0 0 1.783 1.323 1.783 1.818V18h5.052v-.628c0-.495 1.09-2.057 1.09-2.057.2-.303.367-.838.367-1.193v-2.61c-.013-.579-.561-1.047-1.238-1.047-.338 0-.612.234-.612.523v.21c0-.579-.548-1.047-1.224-1.047-.339 0-.613.234-.613.523v.21c0-.579-.548-1.047-1.224-1.047-.338 0-.613.234-.613.523v.21a.66.66 0 0 0-.032-.226l-.187-2.696C12.232 7.283 11.89 7 11.491 7c-.402 0-.722.29-.722.647v5.824Z"
                                clipRule="evenodd"
                            />
                            <Path
                                stroke="#363B3E"
                                d="M10.269 12.008c-.592-.532-1.501-.698-2.26-.426l-.004-.007-.165.076.008.018a.846.846 0 0 0-.281 1.01l.886 2.056c.093.215.245.45.404.654.16.205.353.411.544.56l.01.007.003.003.014.01.054.04a15.178 15.178 0 0 1 .787.644c.216.19.42.384.564.553.073.084.122.15.149.198l.009.015V18.5h6.052V17.378s.004-.024.022-.08c.021-.064.055-.145.1-.243.092-.194.219-.42.351-.64a16 16 0 0 1 .483-.75l.033-.048.008-.012.002-.003.008-.011c.134-.203.243-.46.319-.705.076-.245.131-.52.131-.764V11.5c-.02-.913-.858-1.535-1.738-1.535-.203 0-.412.055-.593.159a1.858 1.858 0 0 0-1.243-.473c-.204 0-.413.055-.594.159a1.858 1.858 0 0 0-1.243-.473c-.07 0-.142.006-.212.02l-.121-1.744c-.047-.673-.654-1.113-1.265-1.113-.627 0-1.222.465-1.222 1.147v4.361Zm.73 5.43v-.002a.01.01 0 0 1 0 .003Z"
                            />
                        </G>
                        <Defs></Defs>
                    </Svg>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={styles.nameWrap}>
                        <Text style={styles.name}>{userInfo.nickName}님</Text>
                        <Text style={styles.nameText}>에게</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={styles.transferAmount}>{data.transferAmount.toLocaleString()}원</Text>
                    </View>
                    <Text style={styles.transferAmountText}>보낼까요?</Text>
                </View>
                <TouchableOpacity style={styles.sendButton}
                                  onPress={() => navigation.navigate('ResultTransfer', {userInfo, data, token})}>
                    <Text style={styles.sendButtonText}>보내기</Text>
                </TouchableOpacity>
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

export default ReminingTranfer;