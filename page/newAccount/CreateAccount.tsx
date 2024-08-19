import { Text,TouchableOpacity,Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import {Path, Svg} from "react-native-svg";

const { width, height } = Dimensions.get('window');

export default function CreateAccount( { route, navigation }: any ) {
    let accountStatus: string = "";
    const { accountType, token, userName } = route.params;

    const accountTypeImg = () => {
        if(accountType === '입출금 통장')
            return (
                <Svg
                    width={28}
                    height={24}
                    fill="none"
                    viewBox="0 0 18 14"
                >
                    <Path
                        fill="#AFC2C2"
                        fillRule="evenodd"
                        d="M0 3a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3Zm4 1.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2 3a4 4 0 0 0-3.665 2.395.75.75 0 0 0 .416 1A8.98 8.98 0 0 0 6 11.5a8.98 8.98 0 0 0 3.249-.604.75.75 0 0 0 .416-1.001A4 4 0 0 0 6 7.5Zm5-3.75a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm0 6.5a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm.75-4a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z"
                        clipRule="evenodd"
                    />
                </Svg>
            )
        if(accountType === '모임 통장')
            return (
                <Svg
                    width={27}
                    height={24}
                    fill="none"
                    viewBox="0 0 18 15"
                >
                    <Path
                        fill="#AFC2C2"
                        d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM5 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM.49 12.326a.78.78 0 0 1-.358-.442A3 3 0 0 1 4.44 8.367a6.484 6.484 0 0 0-1.905 3.96c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM15.44 12.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.025.654ZM17 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM4.304 13.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 9 15a6.974 6.974 0 0 1-4.696-1.81Z"
                    />
                </Svg>
            )
        if(accountType === '적금' || accountType === '예금')
            return (
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
                        fill="#AFC2C2
                        "
                        d="M9 18.75c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368C18 18.817 13.97 21 9 21s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.283 8.283 0 0 0 1.897 1.384C3.809 18.164 6.315 18.75 9 18.75Z"
                    />
                </Svg>
            )
    }

    useEffect(() => {
        if (accountType === '입출금 통장') {
            accountStatus = 'account'
        } else if (accountType === '모임 통장') {
            accountStatus = 'group'
        }
    }, [accountType]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.title}>
                    <View>{accountTypeImg()}</View>
                    <Text style={styles.text}>{accountType}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.boxText}>통장에 대한 설명입니다.</Text>
                    <Text style={styles.boxText}>계속 진행하시려면 아래 신청하기 버튼을 눌러주세요.👇</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('AccountPassword', { accountStatus, token, userName })}
                >
                    <Text style={styles.buttonText}>신청하기</Text>
                </TouchableOpacity>
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
        flex: 1,
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        justifyContent: 'center',
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
    },
    box: {
        width: width - 40,
        flex: 1,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        marginHorizontal: 20,
        padding: 20
    },
    boxText: {
        fontSize: 14
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 20,
        marginLeft: 10
    },
    button: {
        marginTop: 20,
        backgroundColor: '#007378',
        borderRadius: 10,
        width: width - 40,
        marginHorizontal: 20,
        height: 40,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    kindImg: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
});