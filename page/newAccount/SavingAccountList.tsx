import { Platform, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export const SavingAccountList = () => {
    const savingsItems = [
        { id: 1, name: '작은 거인 박미람 적금', interest: '기본 3.30% (12)' },
        { id: 2, name: '그냥 개구리 김재민', interest: '기본 3.30% (12)' },
        { id: 3, name: '탈모 서연 적금', interest: '기본 3.30% (12)' },
        { id: 4, name: '탈모 서연 적금', interest: '기본 3.30% (12)' },
        { id: 5, name: '탈모 서연 적금', interest: '기본 3.30% (12)' },
        { id: 6, name: '탈모 서연 적금', interest: '기본 3.30% (12)' },
        { id: 7, name: '탈모 서연 적금', interest: '기본 3.30% (12)' },
        { id: 8, name: '탈모 서연 적금', interest: '기본 3.30% (12)' },
        { id: 9, name: '탈모 서연 적금', interest: '기본 3.30% (12)' },
        { id: 10, name: '탈모 서연 적금', interest: '기본 3.30% (12)' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
            <View style={styles.nameContainer}>
                    <Text style={styles.text}>적금 목록</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={true} style={styles.scrollView}>
                    {savingsItems.map((item) => (
                    <View key={item.id} style={styles.itemContainer}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemInterest}>{item.interest}</Text>
                    </View>
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
        backgroundColor: 'white',
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