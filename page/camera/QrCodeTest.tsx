import { View, Text, SafeAreaView, TextInput } from 'react-native';
import { Container } from '../../css/sujin/Container';

export default function QrCodeTest({ route, navigation }: any) {
    const { data } = route.params;

    return (
        <SafeAreaView style={Container.container}>
            <View style={Container.innerContainer}>
                <Text>QR코드 결과창</Text>
                <TextInput 
                    style={{height:30}}
                    defaultValue={data}
                />
            </View>
        </SafeAreaView>
    );
}