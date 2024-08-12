import { useEffect, useState } from "react";
import { Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface Props {
    accountType: string;
    token: string;
    userName: string;
}

export const SavingAccountList = ({ navigation, route }: any) => {
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
        { id: 4, product: '탈모 서연 적금', interest: 3.30 },
        { id: 5, product: '탈모 서연 적금', interest: 3.30 },
        { id: 6, product: '탈모 서연 적금', interest: 3.30 },
        { id: 7, product: '탈모 서연 적금', interest: 3.30 },
        { id: 8, product: '탈모 서연 적금', interest: 3.30 },
        { id: 9, product: '탈모 서연 적금', interest: 3.30 },
        { id: 10, product: '탈모 서연 적금', interest: 3.30 },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
            <View style={styles.nameContainer}>
                    <Text style={styles.text}>적금 목록</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={true} style={styles.scrollView}>
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
                        <Text style={styles.itemInterest}>기본 {item.interest}% (12)</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer: {
        flex: 1,
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameContainer: {
        marginTop: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        marginBottom: 15,
    },
    text: {
        textAlign: 'left',
        fontSize: 30,
        color: 'black',
        marginLeft: 30,
    },
    scrollView: {
        paddingHorizontal: 40,
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: '#dcdcdc',
        borderRadius: 25,
        padding: 25,
        marginBottom: 40,
        width: 300
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15
    },
    itemInterest: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
})