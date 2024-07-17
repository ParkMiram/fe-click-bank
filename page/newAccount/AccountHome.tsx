import React, { useState } from 'react';
import { FlatList,Image, Text, TouchableOpacity, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const data = [
    { user_nickname: '박분도', account_name: "클릭", account: 416280405051, account_amount: 10000000 },
    { user_nickname: '박분도', account_name: "플레이데이터", account: 416042172881, account_amount: 20000000 },
    { user_nickname: '박분도', account_name: "하이", account: 416464183736, account_amount: 30000000 },
    { user_nickname: '박분도', account_name: "ㅇㅅㅇ", account: 416072768011, account_amount: 40000000 }
];

type Data = {
    user_nickname: string;
    account_name: string;
    account: number;
    account_amount: number;
}

export default function AccountHome({ route, navigation }: any) {
    const [numberHidden, setNumbereHidden] = useState(false);

    const numberShow = () => {
        setNumbereHidden(!numberHidden);
    };
    const renderItem = ({ item }: { item: Data }) => (
        <View style={styles.accountCard}>
            <TouchableOpacity onPress={() => navigation.navigate('EditAccount')}>
                <Text style={styles.accountName}>{item.account_name}</Text>
                 <Image
                    source={require('../../assets/image/more.png')}
                    style={styles.imageMore} resizeMode="contain"
                />
            </TouchableOpacity>
            <Text style={styles.accountNumber}>
                {/* {numberHidden ? '****-****-****' : item.account.toString().replace(/\B(?=(\d{4})+(?!\d))/g, "-")} */}
                {item.account.toString().replace(/\B(?=(\d{4})+(?!\d))/g, "-")}
            </Text>
            <View style={styles.buttonContainer}>
                <Text style={styles.balance}>
                    {numberHidden ? '잔액보기' : `${item.account_amount.toLocaleString()}원`}
                </Text>
                <TouchableOpacity style={styles.sendButton} onPress={numberShow}>
                    <Text style={styles.buttonsendText}>{numberHidden ? '보기' : '숨김'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.transferButton}>
                    <Text style={styles.buttonText}>이체</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.nameContainer}>
                    <Image
                        source={require('../../assets/image/person.png')}
                        style={styles.imagePerson} resizeMode="contain"
                    />
                    <Text style={styles.text}>박분도</Text>
                    <View style={styles.bellContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('AccountType')}>
                            <Image
                                source={require('../../assets/image/bell.png')}
                                style={styles.imageBell} resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.flatListContainer}
            />

             
            </View>
        
            <TouchableOpacity onPress={() => navigation.navigate('AccountType')}>
                <Image
                    source={require('../../assets/image/plus.png')}
                    style={styles.imagePlus} resizeMode="contain"
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatListContainer: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 20,
    },
    nameContainer: {
        marginTop: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        marginBottom: 8,
    },
    bellContainer: {
        position: 'absolute',
        right: 20,
    },
    imagePerson: {
        width: 45,
        height: 45,
        marginLeft: 20,
    },
    imageMore: {
        width: 50,
        height: 20,
        position: 'absolute',
        right: 1,
        marginTop:5
    },
    imageBell: {
        width: 80,
        height: 80,
    },
    text: {
        textAlign: 'left',
        fontSize: 20,
        color: 'black',
        marginLeft: 15,
    },
    accountCard: {
        backgroundColor: '#B7E1CE',
        borderRadius: 10,
        padding: 16,
        margin: 16,
        width: '90%',
        height: 160,
    },
    accountName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    accountNumber: {
        fontSize: 14,
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // marginTop: 20,
    },
    balance: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    transferButton: {
        alignItems: 'flex-end',
        width: '100%',
    },
    buttonText: {
        width: 60,
        backgroundColor: '#6BC29A',
        color: 'black',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 16,
    },
    buttonsendText: {
        color: 'black',
        fontSize: 15,
    },
    imagePlus: {
        width: 90,
        height: 95,
    },
});
