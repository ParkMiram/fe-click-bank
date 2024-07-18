import { StyleSheet, View, Text, SafeAreaView, TextInput } from 'react-native';
import { Container } from '../../css/sujin/Container';
import NextButton from '../../component/auth/NextButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ClickHome({ route, navigation }: any) {
    const { token } = route.params;

    const logout = () => {
        alert("로그아웃 되었습니다.");
        AsyncStorage.removeItem("login");
        navigation.reset({
            index: 0,
            routes: [{name: 'Login'}]
        });
    }

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
                <NextButton text="로그아웃" press={logout} active={true} />
                <NextButton text="내칭구보기" press={() => navigation.navigate('FriendsComponent', { token: token })} active={true} />
                <NextButton text="내계좌보기" press={() => navigation.navigate('AccountHome')} active={true} />
                <NextButton text="내계좌내역보기" press={() => navigation.navigate('AccountHistory')} active={true} />
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