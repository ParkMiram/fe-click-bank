import { BackHandler, Text, View } from 'react-native';
import { Container } from '../../css/sujin/Container';
import { SafeAreaView } from 'react-native-safe-area-context';
import CurserLogo from '../../component/pay/CurserLogo';
import * as Linking from 'expo-linking';

export default function Success({ navigation, route }: any) {
    const { redirect } = route.params;

    setTimeout(() => {
        Linking.openURL(redirect);
        BackHandler.exitApp();
    }, 2000);

    return (
        <SafeAreaView style={Container.container}>
            <View style={Container.innerContainer}>
                <CurserLogo />
                <Text style={{fontSize:32, fontWeight: 'bold', marginBottom:30}}>
                    결제 성공!
                </Text>
                <Text style={{fontSize:20}}>
                    잠시 후 이전 페이지로 돌아갑니다.
                </Text>
            </View>
        </SafeAreaView>
    );
}