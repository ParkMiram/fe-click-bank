import React, { useState } from 'react';
import {
    TextInput,
    Modal,
    TouchableOpacity,
    Text,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Keyboard,
    Alert,
    Dimensions
} from 'react-native';
import { deleteAccount, setAccountLimit, setAccountName, setAccountPassword } from '../../component/api/NewAccountApi';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {Path, Svg} from "react-native-svg";

type props = {
    token: string;
    account: string;
}

const { width, height } = Dimensions.get('window');

export default function EditAccount( { route, navigation }: any ) {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [dailyLimit, setDailyLimit] = useState('');
    const [onetimeLimit, setOnetimeLimit] = useState('')
    const { token, account }: props = route.params;

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
                                placeholder="0000"
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
                                placeholder="10,000,000"
                            />
                        </View>
                    </View>
                    <View>
                        <View style = {styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.buttonText}>계좌 변경</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>계좌 삭제</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/*<Modal*/}
                    {/*    animationType="slide"*/}
                    {/*    transparent={true}*/}
                    {/*    visible={modalVisible}*/}
                    {/*    onRequestClose={closeModal}*/}
                    {/*>*/}
                    {/*    <View style={styles.modalContainer}>*/}
                    {/*        <View style={styles.modalView}>*/}
                    {/*            <Text style={styles.modalText}>정말로 계좌를 삭제하시겠습니까?</Text>*/}
                    {/*            <View style={styles.modalButtonContainer}>*/}
                    {/*                <TouchableOpacity*/}
                    {/*                    style={[styles.buttonAccount, styles.buttonClose]}*/}
                    {/*                    onPress={closeModal}*/}
                    {/*                >*/}
                    {/*                    <Text style={styles.buttonText}>취소</Text>*/}
                    {/*                </TouchableOpacity>*/}
                    {/*                <TouchableOpacity*/}
                    {/*                    style={[styles.buttonAccount, styles.buttonDelete]}*/}
                    {/*                    onPress={() => {*/}
                    {/*                        closeModal();*/}
                    {/*                    }}*/}
                    {/*                >*/}
                    {/*                    <Text style={styles.buttonText} onPress={handleDeleteAccount}>삭제</Text>*/}
                    {/*                </TouchableOpacity>*/}
                    {/*            </View>*/}
                    {/*        </View>*/}
                    {/*    </View>*/}
                    {/*</Modal>*/}
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
    buttonContainer:{
        flexDirection: 'row',
        justifyContent:'space-evenly',
        width: '100%'
    },
    button:{
        marginTop: 5,
        marginBottom: 30,
        backgroundColor: '#B7E1CE',
        padding: 16,
        alignItems: 'center',
        borderRadius: 8,
        width: '90%',
        },
    buttonAccount:{
        fontSize:25,
        borderColor: '#B7E1CE',
        borderRadius:5,
        borderWidth: 2,
        height: 40,
        width: 60,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10
    },
    buttonText:{
        fontSize:18,
        textAlign:'center'

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