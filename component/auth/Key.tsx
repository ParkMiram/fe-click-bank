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
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    securityKeypadKeyNum: {
        fontSize: 32,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});