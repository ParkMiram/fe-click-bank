import { StyleSheet, View, Text, SafeAreaView, TextInput } from 'react-native';
import { Container } from '../../css/sujin/Container';
import NextButton from '../../component/auth/NextButton';

export default function ClickHome({ route, navigation }: any) {
    const { token } = route.params;

    return (
        <SafeAreaView style={Container.container}>
            <View style={Container.innerContainer}>
                <Text>Click home</Text>
                <View style={styles.tokenContatiner}>
                    <Text>유저 토큰</Text>
                    <TextInput 
                        style={{height:30}}
                        defaultValue={token}
                    />
                </View>
                <NextButton  text="내계좌보기" press={() => navigation.navigate('AccountHome')} active={true} />
                <NextButton  text="내칭구보기" press={() => navigation.navigate('FriendsComponent')} active={true} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tokenContatiner: {
        paddingHorizontal: 20,
        marginTop: 12,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
});