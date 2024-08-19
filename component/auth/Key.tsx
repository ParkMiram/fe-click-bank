import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

export default function Key(props: any) {
    return (
        <TouchableWithoutFeedback onPress={() => {props.numberKeyEvent(props.number)}}>
            <View style={{...styles.securityKeypadKey}}>
                <Text style={styles.securityKeypadKeyNum}>{props.number}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    securityKeypadKey: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#aaa'
    },
    securityKeypadKeyNum: {
        fontSize: 28,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        color: '#333'
    },
});