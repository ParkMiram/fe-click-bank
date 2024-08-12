import { Platform, SafeAreaView, StatusBar, StyleSheet, View ,Image,Text,TouchableOpacity, Alert} from 'react-native';
import { saveAccount } from '../../component/api/NewAccountApi';

type data = {
    accountStatus: string;
    token: string;
    accountPassword: string;
}

interface SavingAccount {
    interestRate: number | null;
    term: number | null;
    product: string | null;
}

interface Transfer {
    type: string | null;
    amount: number | null;
    transferDate: number | null;
}

export default function AccountComplete( {  navigation, route }: any ) {
    const { accountStatus, token, accountPassword }: data = route.params;
    const savingAccountRequest: SavingAccount = route.params.savingAccountRequest;
    const transferRequest: Transfer = route.params.transferRequest;

    console.log(transferRequest);
    console.log(savingAccountRequest)

    const body = {
        accountStatus: accountStatus,
        accountPassword: accountPassword,
        transferRequest: transferRequest,
        savingRequest: savingAccountRequest
    }

    const handleSaveAccount = async () => {
        try {
            const response = await saveAccount(token, body);
            
            if (response && response.status == 201) {
                console.log(response.status);
                if (accountStatus === 'group') {
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'AccountHome', params: {token}}]
                    });
                } else {
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'AccountHome', params: {token}}]
                    });
                }
            } else {
                alert('서버에 이상이 있습니다.');
            }
        } catch (error) {
            console.error('Failed to create account:', error);
            Alert.alert('계좌 생성 실패', '계좌 생성 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                {/* 여기에 페이지 내용 작성 */}
                <Image
                source={require('../../assets/image/Click_logo.png')}
                style={styles.imageStyle} resizeMode="contain"/>
                <Text style = {styles.textcontainer}>축! 개설완료!</Text>  
                <TouchableOpacity style={styles.button} onPress={handleSaveAccount}>
                    <Text style={styles.buttonText}>메인으로</Text>
                </TouchableOpacity>
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
    imageStyle:{
        // width:"100%",
        // height:"100%",
        // justifyContent:'center',
        alignSelf: 'auto',
        alignItems:'center',
        width: 300, // 로고 이미지의 너비
        height: 300, // 로 이미지의 높이
        // marginBottom:100 ,
    },

    textcontainer:{
    // height: 100,
    // width: 500,
    textAlign:'center',
    fontSize: 25,
    marginBottom:100,
    },
    button: {
    // paddingHorizontal: 100,
    // paddingVertical: 20,
    // backgroundColor: '#B7E1CE',
    // borderRadius: 5,
    // position:"static"
    marginTop: 16,
    marginBottom: 30,
    backgroundColor: '#B7E1CE',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    width: '100%',
    maxWidth: 325,
    alignSelf: 'center',
    },
    buttonText: {
    fontSize: 20,
    color: 'black',
    },
});