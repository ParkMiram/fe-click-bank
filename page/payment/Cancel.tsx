import { Text, View } from 'react-native';
import { Container } from '../../css/sujin/Container';
import { SafeAreaView } from 'react-native-safe-area-context';
import CurserLogo from '../../component/pay/CurserLogo';

export default function Cancel({ navigation, route }: any) {
    const { redirect } = route.params;

    setTimeout(() => {
        alert(`이도오오옹: ${redirect}`);
        // ...
    }, 3000);

    return (
        <SafeAreaView style={Container.container}>
            <View style={Container.innerContainer}>
                <CurserLogo />
                <Text style={{fontSize:48, fontWeight:500, marginTop:80, marginBottom:40}}>
                    결제 중단!
                </Text>
                <Text style={{fontSize:20}}>
                    잠시 후 이전 페이지로 돌아갑니다.
                </Text>
            </View>
        </SafeAreaView>
    );
}