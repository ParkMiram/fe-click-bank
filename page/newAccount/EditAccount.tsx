import { useState } from 'react';
import { TextInput,Modal,TouchableOpacity,Text, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { deleteAccount, setAccountLimit, setAccountName, setAccountPassword } from '../../component/api/NewAccountApi';

type props = {
    token: string;
    account: string;
}

export default function EditAccount( { route, navigation }: any ) {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [limit, setLimit] = useState('');
    const { token, account }: props = route.params;

    const handleDeleteAccount = async () => {
        setModalVisible(true);
        try {
            await deleteAccount(account, token);
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
            }
            if (password) {
                await setAccountPassword({ account, accountPassword: password }, token);
            }
            if (limit) {
                await setAccountLimit({ account, accountName: name }, token);
            }
            navigation.navigate('AccountHome');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
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

                <View style = {styles.rePasswordContianer}>
                <Text style = {styles.textcontainer}>계좌 비밀번호 수정</Text>
                <TextInput
                    style={styles.inputPassword}
                    value={password}
                    onChangeText={setPassword}
                    keyboardType="number-pad"
                    placeholder="0000"
                    maxLength={4}
                    secureTextEntry={true} 
                />
                </View>

                <View style = {styles.reLimitContainer}>
                <Text style = {styles.textcontainer}>계좌 한도 수정</Text>
                <TextInput
                    style={styles.inputLimit}
                    value={limit}
                    onChangeText={setLimit}
                    keyboardType="number-pad"
                    placeholder="계좌 한도 수정"
    
                    />
                </View>

                </View>

                <View style = {styles.buttonContainer}>
                        
             <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => navigation.navigate(handleSubmit)}
                        >
                <Text style={styles.buttonText}>자동이체</Text>
            </TouchableOpacity>
            </View>
            <View style = {styles.buttonContainer}>
            <TouchableOpacity
                        style={styles.button}
                        onPress={handleDeleteAccount}
                    >
                <Text style={styles.buttonText} onPress={handleDeleteAccount}>계좌 삭제</Text>
            </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>정말로 계좌를 삭제하시겠습니까?</Text>
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity
                                    style={[styles.buttonAccount, styles.buttonClose]}
                                    onPress={closeModal}
                                >
                                    <Text style={styles.buttonText}>취소</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.buttonAccount, styles.buttonDelete]}
                                    onPress={() => {
                                        closeModal();
                                        
                                    }}
                                >
                                    <Text style={styles.buttonText}>삭제</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
      
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reContainer:{
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom:250
        

    },
    renameContainer:{
        flexDirection: 'row',
        width:'90%',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:30,
        marginTop:30
       

    },
    textcontainer:{
        fontSize:23,
        flex:1

    },
    nameText:{

    },
    rePasswordContianer:{
        flexDirection:'row',
        width:'90%',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:30

    },
    passwordText:{

    },
    reLimitContainer:{
        flexDirection:'row',
        width:'90%',
        justifyContent:'space-between',
        alignItems:'center',
    

    },
    limitText:{
        
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent:'space-evenly',
        width: '100%',
        
    },
    button:{
        // backgroundColor: '#B7E1CE',
        // borderRadius:8,
        // width:'80%',
        // alignItems:'center',
        // marginTop:10,
        // paddingVertical:15,
        // paddingHorizontal
        marginTop: 5,
        marginBottom: 30,
        backgroundColor: '#B7E1CE',
        padding: 16,
        alignItems: 'center',
        borderRadius: 8,
        width: '90%',
        // maxWidth: 325,
        // alignSelf: 'center',
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
        fontSize:25,
        borderColor: '#B7E1CE',
        borderRadius:5,
        borderWidth: 2,
        height: 40,
        width: 180,
        // borderColor: 'gray',
        // borderRadius:5,
        // borderWidth: 1,
        //  marginTop:20,
        
         textAlign:'center',
    
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