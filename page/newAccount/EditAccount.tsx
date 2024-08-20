import React, { useState } from 'react';
import {
    TextInput,
    TouchableOpacity,
    Text,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    Alert,
    Dimensions
} from 'react-native';
import { deleteAccount, setAccountLimit, setAccountName, setAccountPassword } from '../../component/api/NewAccountApi';
import {Path, Svg} from "react-native-svg";

type props = {
    token: string;
    account: string;
    accountName: string;
}

const { width, height } = Dimensions.get('window');

export default function EditAccount( { route, navigation }: any ) {
    const { token, account, accountName }: props = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState(accountName);
    const [password, setPassword] = useState('');
    const [dailyLimit, setDailyLimit] = useState('');
    const [onetimeLimit, setOnetimeLimit] = useState('')

    console.log(account);

    const handleDeleteAccount = async () => {
        setModalVisible(true);
        try {
            await deleteAccount(account, token);
            navigation.navigate('AccountHome', {token});
        } catch(error) {
            console.log(error);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleSubmit = async () => {
        try {
            if (name) {
                await setAccountName({ account, accountName: name }, token);
                navigation.navigate('AccountHome', {token});
            }
            if (password) {
                await setAccountPassword({ account, accountPassword: password }, token);
                navigation.navigate('AccountHome', {token});
            }
            if (dailyLimit && onetimeLimit) {
                const body = {
                    account: account,
                    accountDailyLimit: parseInt(dailyLimit),
                    accountOneTimeLimit: parseInt(onetimeLimit)
                }
                
                await setAccountLimit(body, token);
                navigation.navigate('AccountHome', { token });
            }
            if (!name && !password && !dailyLimit && !onetimeLimit) {
                return Alert.alert("계좌 수정", "수정된 정보가 없습니다.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.title}>
                    <Svg
                        width={10}
                        height={16}
                        fill="none"
                        viewBox="0 0 8 14"
                    >
                        <Path stroke="#222" d="M7 1 1 7l6 6" />
                    </Svg>
                    <Text style={styles.titleText}>계좌 정보 수정</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style = {styles.reContainer}>
                        <View style ={styles.renameContainer}>
                            <Text style = {styles.textcontainer}>계좌명 수정</Text>
                            <TextInput
                                style={styles.inputName}
                                value={name}
                                onChangeText={setName}
                                keyboardType="default"
                                returnKeyType='done'
                                placeholder="계좌명"
                            />
                        </View>
                        <View style = {styles.renameContainer}>
                            <Text style = {styles.textcontainer}>계좌 비밀번호 수정</Text>
                            <TextInput
                                style={styles.inputName}
                                value={password}
                                onChangeText={setPassword}
                                keyboardType="number-pad"
                                returnKeyType='done'
                                placeholder="4자리 비밀번호"
                                maxLength={4}
                                secureTextEntry={true}
                        />
                        </View>
                        <View style = {styles.renameContainer}>
                            <Text style = {styles.textcontainer}>일일 한도 수정</Text>
                            <TextInput
                                style={styles.inputName}
                                value={dailyLimit}
                                onChangeText={setDailyLimit}
                                keyboardType="number-pad"
                                returnKeyType='done'
                                placeholder="50,000,000"
                            />
                        </View>
                        <View style = {[styles.renameContainer]}>
                            <Text style = {styles.textcontainer}>회별 한도 수정</Text>
                            <TextInput
                                style={styles.inputName}
                                value={onetimeLimit}
                                onChangeText={setOnetimeLimit}
                                keyboardType="number-pad"
                                returnKeyType='done'
                                placeholder="10,000,000"
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>저장</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 20
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10
    },
    reContainer:{
        width: width - 40,
        marginHorizontal: 20,
        flex: 1
    },
    renameContainer:{
        width: '100%',
        marginTop: 20
    },
    textcontainer:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    button:{
        width: width - 40,
        backgroundColor: '#007378',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 20,
        height: 40,
    },
    buttonAccount:{
        fontSize:25,
        borderColor: '#B7E1CE',
        borderRadius:5,
        borderWidth: 2,
        width: 60,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
    },
    buttonText:{
        fontSize: 16,
        textAlign:'center',
        color: '#fff',
        fontWeight: 'bold'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonClose: {
        // backgroundColor: '',
        marginRight: 10,
    },
    buttonDelete: {
        // backgroundColor: '#FF0000',
    },
    inputName:{
        borderRadius: 10,
        backgroundColor: '#f8f8f8',
        padding: 15,
        width: '100%',
        fontSize: 16
    },
    inputPassword:{
        fontSize:25,
        borderColor: '#B7E1CE',
        borderRadius:5,
        borderWidth: 2,
        height: 40,
        width: 180,
        textAlign:'center',
    },
    inputLimit:{
        fontSize:25,
        borderColor: '#B7E1CE',
        borderRadius:5,
        borderWidth: 2,
        height: 40,
        width: 180,
        textAlign:'center',
    }
});