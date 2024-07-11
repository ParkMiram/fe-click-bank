import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Keypad(props: any) {
    return (
        <View style={styles.securityKeypad}>
            <View style={styles.securityKeypadLine}>
                <TouchableOpacity style={styles.securityKeypadKey} onPress={() => props.numberKeyEvent('1')}>
                    <Text style={styles.securityKeypadKeyNum}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.securityKeypadKey} onPress={() => props.numberKeyEvent('2')}>
                    <Text style={styles.securityKeypadKeyNum}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.securityKeypadKey} onPress={() => props.numberKeyEvent('3')}>
                    <Text style={styles.securityKeypadKeyNum}>3</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.securityKeypadLine}>
                <TouchableOpacity style={styles.securityKeypadKey} onPress={() => props.numberKeyEvent('4')}>
                    <Text style={styles.securityKeypadKeyNum}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.securityKeypadKey} onPress={() => props.numberKeyEvent('5')}>
                    <Text style={styles.securityKeypadKeyNum}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.securityKeypadKey} onPress={() => props.numberKeyEvent('6')}>
                    <Text style={styles.securityKeypadKeyNum}>6</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.securityKeypadLine}>
                <TouchableOpacity style={styles.securityKeypadKey} onPress={() => props.numberKeyEvent('7')}>
                    <Text style={styles.securityKeypadKeyNum}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.securityKeypadKey} onPress={() => props.numberKeyEvent('8')}>
                    <Text style={styles.securityKeypadKeyNum}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.securityKeypadKey} onPress={() => props.numberKeyEvent('9')}>
                    <Text style={styles.securityKeypadKeyNum}>9</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.securityKeypadLine}>
                <TouchableOpacity style={styles.securityKeypadKey}>
                    <Text style={styles.securityKeypadKeyNum}></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.securityKeypadKey} onPress={() => props.numberKeyEvent('0')}>
                    <Text style={styles.securityKeypadKeyNum}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.securityKeypadKey} onPress={props.backKeyEvent}>
                    <Image style={styles.securityKeypadKeyRemove} source={require("../../assets/image/remove.png")}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    securityKeypad: {
        width: '100%',
        height: 300,
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    securityKeypadLine: {
        width: '100%',
        height: '25%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    securityKeypadKey: {
        width: '30%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    securityKeypadKeyNum: {
        fontSize: 32,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    securityKeypadKeyRemove: {
        width: 34,
        height: 26,
    },
});