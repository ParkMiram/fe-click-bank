import { View, Text, SafeAreaView, TextInput } from 'react-native';
import { Container } from '../../css/sujin/Container';
import * as LocalAuthentication from 'expo-local-authentication';
import NextButton from '../../component/auth/NextButton';


export default function QrCodeTest({ route, navigation }: any) {
    const { data } = route.params;

    const testAuth = async () => {
        const available:LocalAuthentication.AuthenticationType[] = await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (available.length == 0) {
            alert("생체인증이 지원되지 않는 기기에서는 진행할 수 없습니다.");
            // ...
        } else {
            const result = await LocalAuthentication.authenticateAsync();
            alert(`인증결과: ${result.success}`);
        }
    }

    return (
        <SafeAreaView style={Container.container}>
            <View style={Container.innerContainer}>
                <Text>QR코드 결과창</Text>
                <TextInput 
                    style={{height:30}}
                    defaultValue={data}
                />
                <NextButton active={true} text={"인증테스트"} width={160} press={testAuth}/>
            </View>
        </SafeAreaView>
    );
}