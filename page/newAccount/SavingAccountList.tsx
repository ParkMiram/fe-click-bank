import { useEffect, useState } from "react";
import {
    Dimensions,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import {Path, Svg} from "react-native-svg";

interface Props {
    accountType: string;
    token: string;
    userName: string;
}

const { width, height } = Dimensions.get('window');

export default function SavingAccountList ({ navigation, route }: any) {
    const [interestRate, setInterestRate] = useState<number>(0);
    const [product, setProduct] = useState<String>('');

    let accountStatus = "";
    const { accountType, token, userName } = route.params;

    useEffect(() => {
        if (accountType === '적금')
            accountStatus = 'saving';
    }, [accountType]);
    console.log(accountType)

    const savingsItems = [
        { id: 1, product: '작은 거인 박미람 적금', interest: 3.30 },
        { id: 2, product: '그냥 개구리 김재민 적금', interest: 3.30 },
        { id: 3, product: '탈모 서연 적금', interest: 3.30 },
        { id: 4, product: '새치 수진 적금', interest: 3.30 },
        { id: 5, product: '큰 난쟁이 박분도 적금', interest: 3.30 },
        { id: 6, product: '대머리 분도 적금', interest: 3.30 },
        { id: 7, product: '늙은 분도 적금', interest: 3.30 },
        { id: 8, product: '몰라도 되는 성무 적금', interest: 3.30 },
        { id: 9, product: '딸깍 적금', interest: 3.30 },
        { id: 10, product: 'just click 적금', interest: 3.30 },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.title}>
                    <View>
                        <Svg
                            width={21}
                            height={24}
                            fill="none"
                            viewBox="0 0 18 21"
                        >
                            <Path
                                fill="#AFC2C2"
                                d="M18 4.875c0 2.692-4.03 4.875-9 4.875S0 7.567 0 4.875 4.03 0 9 0s9 2.183 9 4.875Z"
                            />
                            <Path
                                fill="#AFC2C2"
                                d="M9 11.25c2.685 0 5.19-.586 7.078-1.609a8.281 8.281 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368A8.282 8.282 0 0 0 1.922 9.64C3.809 10.664 6.315 11.25 9 11.25Z"
                            />
                            <Path
                                fill="#AFC2C2"
                                d="M9 15c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.283 8.283 0 0 0 1.897 1.384C3.809 14.414 6.315 15 9 15Z"
                            />
                            <Path
                                fill="#AFC2C2"
                                d="M9 18.75c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368C18 18.817 13.97 21 9 21s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.283 8.283 0 0 0 1.897 1.384C3.809 18.164 6.315 18.75 9 18.75Z"
                            />
                        </Svg>
                    </View>
                    <Text style={styles.text}>{accountType}</Text>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={styles.scrollView}
                >
                    {savingsItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.itemContainer}
                            onPress={() => {
                                setProduct(item.product);
                                setInterestRate(item.interest);
                                navigation.navigate("AccountPassword", {accountStatus, token, userName, product: item.product, interestRate: item.interest})}
                            }>
                            <Text style={styles.itemName}>{item.product}</Text>
                            <View style={styles.itemInterestWrap}>
                                <Text style={styles.itemInterest}>기본 <Text style={styles.itemInterestText}>{item.interest}%</Text></Text>
                                <Text style={styles.itemInterestMm}>(12개월 기준)</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    innerContainer: {
        flexGrow: 1,
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        justifyContent: 'center',
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginVertical: 20
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10
    },
    scrollView: {
        width: '100%',
        flexGrow: 1
    },
    itemContainer: {
        width: width - 40,
        marginHorizontal: 20,
        borderRadius: 20,
        backgroundColor: 'rgba(0,115,120,0.04)',
        padding: 20,
        marginBottom: 20,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    itemInterestWrap: {
        marginTop: 5,
    },
    itemInterest: {
        fontSize: 16,
        color: '#333',
    },
    itemInterestText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007378'
    },
    itemInterestMm: {
        color: '#888',
        marginTop: 3
    }
})