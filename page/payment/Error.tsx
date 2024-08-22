import {BackHandler, Text, View} from 'react-native';
import {Container} from '../../css/sujin/Container';
import {SafeAreaView} from 'react-native-safe-area-context';
import CurserLogo from '../../component/pay/CurserLogo';
import * as Linking from 'expo-linking';

export default function Error({navigation, route}: any) {
    const {redirect} = route.params;

    setTimeout(() => {
        Linking.openURL(redirect);
        BackHandler.exitApp();
    }, 3000);

    return (
        <SafeAreaView style={Container.container}>
            <View style={Container.innerContainer}>
                <CurserLogo/>
                <Text style={{fontSize: 32, fontWeight: 'bold', marginBottom: 30}}>
                    결제 오류
                </Text>
                <Text style={{fontSize: 20}}>
                    진행중 오류가 발생했습니다.
                </Text>
                <Text style={{fontSize: 20, marginTop: 5}}>
                    잠시 후 이전 페이지로 돌아갑니다.
                </Text>
            </View>
        </SafeAreaView>
    );
}