import {
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Alert,
    Dimensions
} from 'react-native';
import {saveAccount} from '../../component/api/NewAccountApi';
import {getUserInfo, setMainAccount} from '../../component/api/AuthApi';
import {AxiosError} from 'axios';
import {Defs, G, Path, Svg} from "react-native-svg";

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

const { width, height } = Dimensions.get('window');

export default function AccountComplete({navigation, route}: any) {
    const {accountStatus, token, accountPassword}: data = route.params;
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

                try {
                    console.log(`token:${token}`);
                    const userInfo = await getUserInfo(token);
                    if (userInfo.data.account == null) {
                        console.log({data: response.data});
                        try {
                            console.log(`userInfo.data.id:${userInfo.data.id}`);
                            const updateResponse = await setMainAccount(userInfo.data.id, {data: response.data});
                            console.log("updateResponse: " + updateResponse.status);
                        } catch (error) {
                            console.log("asd");
                        }
                    }
                } catch (error) {
                    const {response} = error as unknown as AxiosError;
                    if (response) {
                        console.log(response.data);
                    }
                    console.log(error);
                }

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
                <View style={styles.textContainer}>
                    <Svg
                        width={285}
                        height={90}
                        fill="none"
                        viewBox="0 0 65 24"
                    >
                        <Path
                            fill="#007378"
                            d="M5.185 18.17c-.794 0-1.49-.147-2.091-.442a3.403 3.403 0 0 1-1.377-1.275c-.318-.555-.476-1.207-.476-1.955V9.092c0-.76.158-1.411.476-1.955a3.29 3.29 0 0 1 1.377-1.258c.6-.306 1.297-.459 2.09-.459.805 0 1.497.153 2.075.459a3.29 3.29 0 0 1 1.377 1.258c.328.544.493 1.196.493 1.955H6.987c0-.59-.16-1.037-.476-1.343-.306-.306-.748-.459-1.326-.459-.578 0-1.026.153-1.343.459-.318.306-.476.748-.476 1.326v5.423c0 .578.158 1.026.476 1.343.317.306.765.459 1.343.459s1.02-.153 1.326-.459c.317-.317.476-.765.476-1.343h2.142c0 .737-.165 1.383-.493 1.938a3.367 3.367 0 0 1-1.377 1.292c-.578.295-1.27.442-2.074.442ZM11.96 18V5.59h2.125v10.438h5.27V18h-7.395Zm9.972 0v-1.87h2.5V7.46h-2.5V5.59h7.14v1.87h-2.499v8.67h2.5V18h-7.14Zm13.832.17c-.794 0-1.49-.147-2.091-.442a3.402 3.402 0 0 1-1.377-1.275c-.318-.555-.476-1.207-.476-1.955V9.092c0-.76.158-1.411.476-1.955a3.288 3.288 0 0 1 1.377-1.258c.6-.306 1.297-.459 2.09-.459.805 0 1.497.153 2.075.459a3.29 3.29 0 0 1 1.377 1.258c.328.544.493 1.196.493 1.955h-2.142c0-.59-.159-1.037-.476-1.343-.306-.306-.748-.459-1.326-.459-.578 0-1.026.153-1.343.459-.318.306-.476.748-.476 1.326v5.423c0 .578.158 1.026.476 1.343.317.306.765.459 1.343.459s1.02-.153 1.326-.459c.317-.317.476-.765.476-1.343h2.142c0 .737-.165 1.383-.493 1.938a3.368 3.368 0 0 1-1.377 1.292c-.578.295-1.27.442-2.074.442Zm6.317-.17V5.59h2.125v5.015h1.479l2.329-5.015h2.312l-2.771 5.95L50.463 18H48.1l-2.448-5.457h-1.445V18h-2.125Z"
                        />
                        <G filter="url(#a)">
                            <Path
                                fill="#fff"
                                fillRule="evenodd"
                                d="m53.769 12.47-.64-.876c-.437-.598-1.368-.817-2.08-.489l.166-.076c-.177.081-.262.284-.189.453l.886 2.055c.14.325.5.786.796 1.017 0 0 1.782 1.323 1.782 1.818V17H59.543v-.628c0-.495 1.09-2.057 1.09-2.057.2-.303.367-.838.367-1.193v-2.61c-.013-.579-.561-1.047-1.237-1.047-.339 0-.613.234-.613.523v.21c0-.579-.548-1.047-1.224-1.047-.339 0-.613.234-.613.523v.21c0-.579-.548-1.047-1.224-1.047-.338 0-.613.234-.613.523v.21a.66.66 0 0 0-.032-.226l-.187-2.696C55.232 6.283 54.89 6 54.49 6c-.401 0-.721.29-.721.647v5.824Z"
                                clipRule="evenodd"
                            />
                            <Path
                                stroke="#363B3E"
                                d="M53.269 11.008c-.592-.532-1.501-.698-2.26-.426l-.004-.007-.165.076.008.018a.846.846 0 0 0-.281 1.01l.886 2.056c.093.215.245.45.404.654.16.205.353.411.544.56l.01.007.003.003.014.01.054.04a15.891 15.891 0 0 1 .787.644c.216.19.42.384.564.553.073.084.122.15.149.198l.008.015V17.5H60.043V16.378s.004-.024.022-.08c.021-.064.055-.145.1-.243.092-.194.219-.42.351-.64a16 16 0 0 1 .483-.75l.033-.048.008-.012.002-.003.008-.011c.134-.203.243-.46.319-.705.076-.245.131-.52.131-.764V10.5c-.02-.913-.858-1.535-1.737-1.535-.204 0-.413.055-.594.159a1.858 1.858 0 0 0-1.243-.473c-.204 0-.413.055-.594.159a1.858 1.858 0 0 0-1.243-.473c-.07 0-.142.006-.212.02l-.121-1.744C55.709 5.94 55.102 5.5 54.49 5.5c-.626 0-1.221.465-1.221 1.147v4.361Zm.73 5.43v-.002a.01.01 0 0 1 0 .003Z"
                            />
                        </G>
                        <Defs></Defs>
                    </Svg>
                    <Text style={styles.text}>통장이 개설되었습니다! 🥳</Text>
                </View>
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
        backgroundColor: 'white',
    },
    textContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold'
    },
    button: {
        width: width - 40,
        height: 40,
        marginHorizontal: 20,
        backgroundColor: '#007378',
        borderRadius: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
});