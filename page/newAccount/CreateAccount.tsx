import { Text,TouchableOpacity,Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import AccountType from './AccountType';

export default function CreateAccount( { route,navigation }: any ) {
    const { accountType } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                {/* 여기에 페이지 내용 작성 */}
                <Text style={styles.text}>{accountType}</Text>
            <View style={styles.box}>
                <Text style={styles.boxText}>통장 설명 1</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.boxText}>통장 설명 2</Text>
            </View>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('AccountInformation')}
            >
                <Text style={styles.buttonText}>신청하기</Text>
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
    box: {
        width: 330,
        height: 250,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#B7E1CE',
        margin: 'auto',
        marginBottom: 15,
    },
    boxText: {
        fontSize: 20,
        textAlign: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 40,
        marginTop: 60,
        marginBottom: 10,
    },
    button: {
        // paddingHorizontal: 100,
        // paddingVertical: 20,
        // backgroundColor: '#B7E1CE',
        // borderRadius: 5,
        // position: "static",
        // marginBottom: 10,
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
        fontSize: 16,
        color: 'black',
    },
});