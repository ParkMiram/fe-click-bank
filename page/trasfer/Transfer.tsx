import React, {useState} from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Text,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet, TextInput,
    View
} from "react-native";
import {TouchableOpacity, TouchableWithoutFeedback} from "react-native-gesture-handler";
// import { RootStackParamList } from "../../App";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import ReactNativeModal from "react-native-modal";
import {Path, Svg} from "react-native-svg";
import RNPickerSelect from 'react-native-picker-select';
import {Picker} from "@react-native-picker/picker";

// type TransferNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Transfer'>

// type Props = {
//   navigation: TransferNavigationProp;
// };

const banks = [
    {label: '국민은행', value: '국민은행', logo: require('../../assets/image/kb_bank.png')},
    {label: '신한은행', value: '신한은행', logo: require('../../assets/image/sol_bank.png')},
    {label: '카카오뱅크', value: '카카오뱅크', logo: require('../../assets/image/kakao_bank.jpeg')},
    {label: '클릭뱅크', value: '클릭뱅크', logo: require('../../assets/image/Click_logo.png')},
];


type data = {
    token: String
    account: String;
    moneyAmount: Number;
}

// : React.FC<Props>

const {width, height} = Dimensions.get('window');

const Transfer = ({navigation, route}: any) => {
    const [accountNumber, setAccountNumber] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
    const [selectedBank, setSelectedBank] = useState('');
    const [selectedCategoryID, setSelectedCategoryID] = useState<number | null>(null);

    const categories = [
        {label: '식비', value: 1},
        {label: '생활', value: 2},
        {label: '쇼핑', value: 3},
        {label: '교통', value: 4},
        {label: '의료/건강', value: 5},
        {label: '문화/여가', value: 6},
        {label: '교육', value: 7},
        {label: '경조/선물', value: 8},
        {label: '수입', value: 9},
        {label: '기타', value: 10},
    ];

    const {token, account, moneyAmount}: data = route.params;
    console.log(accountNumber);

    const selectedCategory = categories.filter(cat => cat.value == selectedCategoryID).pop();

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleCategoryModal = () => {
        setCategoryModalVisible(!isCategoryModalVisible);
    };

    const renderItem = ({item}: any) => (
        <TouchableOpacity
            style={styles.bankItem}
            onPress={() => {
                setSelectedBank(item.value);
                toggleModal();
            }}
        >
            <View style={styles.bankIconContainer}>
                <Image source={item.logo} style={styles.bankIcon} resizeMode="cover"/>
            </View>
            <Text style={styles.bankText}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                {/*<KeyboardAvoidingView*/}
                {/*    style={styles.container}*/}
                {/*    behavior={Platform.OS === "ios" ? "padding" : "height"}*/}
                {/*>*/}
                {/*    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>*/}
                        <View style={styles.inner}>
                            {/*<View style={styles.title}>*/}
                            {/*    <TouchableOpacity onPress={() => {*/}
                            {/*        navigation.navigate("AccountHome", {token})*/}
                            {/*    }}>*/}
                            {/*        <Svg*/}
                            {/*            width={10}*/}
                            {/*            height={16}*/}
                            {/*            fill="none"*/}
                            {/*            viewBox="0 0 8 14"*/}
                            {/*        >*/}
                            {/*            <Path stroke="#222" d="M7 1 1 7l6 6"/>*/}
                            {/*        </Svg>*/}
                            {/*    </TouchableOpacity>*/}
                            {/*    <Text style={styles.titleText}>이체</Text>*/}
                            {/*</View>*/}
                            <View style={{ marginVertical: 20 }}>
                                <Text style={styles.label}>계좌 번호를 입력해 주세요.</Text>
                                <TextInput
                                    style={styles.input}
                                    value={accountNumber}
                                    onChangeText={setAccountNumber}
                                    keyboardType="number-pad"
                                    returnKeyType={'done'}
                                    maxLength={15}
                                />
                            </View>
                            <View>
                                <Text style={styles.label}>은행을 선택해 주세요.</Text>
                                <View style={styles.selectButtonWrap}>
                                    <TouchableOpacity style={styles.button} onPress={toggleModal}>
                                        <Text style={styles.buttonText}>은행 선택</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.selected}>{selectedBank}</Text>
                                </View>
                                <ReactNativeModal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                                    <View style={styles.modalContent}>
                                        <Text style={styles.modalTitle}>은행 선택</Text>
                                        <FlatList
                                            data={banks}
                                            renderItem={renderItem}
                                            keyExtractor={(item, index) => index.toString()}
                                            numColumns={3}
                                            columnWrapperStyle={styles.row}
                                        />
                                    </View>
                                </ReactNativeModal>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.label}>카테고리를 선택해 주세요.</Text>
                                <View style={styles.selectButtonWrap}>
                                    <TouchableOpacity style={styles.button} onPress={toggleCategoryModal}>
                                        <Text style={styles.buttonText}>카테고리 선택</Text>
                                    </TouchableOpacity>
                                    {selectedCategoryID !== null && selectedCategory && (
                                        <Text style={styles.selected}>
                                            {selectedCategory.label}
                                        </Text>
                                    )}
                                </View>
                            </View>
                            <ReactNativeModal isVisible={isCategoryModalVisible} onBackdropPress={toggleCategoryModal}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>카테고리 선택</Text>
                                    <Picker
                                        selectedValue={selectedCategoryID}
                                        onValueChange={(itemValue) => {
                                            setSelectedCategoryID(itemValue);
                                            toggleCategoryModal();
                                        }}
                                    >
                                        {categories.map((category) => (
                                            <Picker.Item key={category.value} label={category.label}
                                                         value={category.value}/>
                                        ))}
                                    </Picker>
                                </View>
                            </ReactNativeModal>
                            <View style={{flex: 1}}/>
                            <TouchableOpacity
                                style={styles.sendButton}
                                onPress={() => navigation.navigate('SendingTransfer', {
                                    bank: selectedBank,
                                    accountNumber,
                                    account,
                                    category: selectedCategoryID,
                                    token
                                })}
                            >
                                <Text style={styles.sendButtonText}>보내기</Text>
                            </TouchableOpacity>
                        </View>
                {/*    </TouchableWithoutFeedback>*/}
                {/*</KeyboardAvoidingView>*/}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: 'center',
    },
    innerContainer: {
        flex: 1,
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inner: {
        width: width - 40,
        flexGrow: 1,
        marginHorizontal: 20
    },
    title: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    },
    titleText: {
        fontSize: 18,
        marginLeft: 10
    },
    image: {
        marginBottom: 20,
        alignSelf: 'flex-start'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    input: {
        marginTop: 10,
        width: '100%',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
        padding: 15
    },
    selectButtonWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#f3f3f3',
        borderRadius: 10,
        padding: 10
    },
    selected: {
        fontSize: 16,
        alignSelf: 'center',
        alignItems: 'center',
        marginLeft: 10,
        color: '#555',
        fontWeight: 'bold'
    },
    selectedBankName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10
    },
    button: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#ddd',
        borderRadius: 5
    },
    buttonText: {
        color: '#333'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 23,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 10,
    },
    row: {
        justifyContent: 'space-between',
    },
    bankItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
    },
    bankIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f0f0f0',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        overflow: 'hidden',
    },
    bankIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: '#eee'
    },
    bankText: {
        fontSize: 16,
    },
    sendButton: {
        height: 40,
        backgroundColor: '#007378',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: '100%',
        marginBottom: 20
    },
    sendButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold'
    },
});

export default Transfer;