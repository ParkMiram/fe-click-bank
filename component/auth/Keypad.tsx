import { Animated, Image, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Key from "./Key";
import { useRef, useState } from "react";

export default function Keypad(props: any) {
    const [randomKey, setRandomKey] = useState<number[]>([0,0,0,0,0,0,0,0,0,0]);
    const opacity = [
        useRef(new Animated.Value(0)).current, // 0
        useRef(new Animated.Value(0)).current, // 1
        useRef(new Animated.Value(0)).current, // 2
        useRef(new Animated.Value(0)).current, // 3
        useRef(new Animated.Value(0)).current, // 4
        useRef(new Animated.Value(0)).current, // 5
        useRef(new Animated.Value(0)).current, // 6
        useRef(new Animated.Value(0)).current, // 7
        useRef(new Animated.Value(0)).current, // 8
        useRef(new Animated.Value(0)).current, // 9
        useRef(new Animated.Value(0)).current, // back
    ]

    const effect = (n: number) => {
        opacity[n].setValue(100);
        Animated.timing(opacity[n], {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    const keyEvent = (n: number) => {
        effect(Math.floor(Math.random()*11));
        props.numberKeyEvent(n);
    }
    const backKeyEvent = () => {
        effect(Math.floor(Math.random()*11));
        props.backKeyEvent()
    }

    const keygen = () => {
        let generateKey: number[] = [];
        while(generateKey.length < 10) {
            const value = Math.floor(Math.random()*10);
            if (!generateKey.includes(value)) generateKey.push(value);
        }
        setRandomKey(generateKey);
    }

    useState(() => {
        keygen();
    });
    
    return (
        <View style={styles.securityKeypad}>
            <View style={styles.securityKeypadLine}>
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[randomKey[1]].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)']})}}>
                    <Key numberKeyEvent={keyEvent} number={randomKey[1]}/>
                </Animated.View>
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[randomKey[2]].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)']})}}>
                    <Key numberKeyEvent={keyEvent} number={randomKey[2]}/>
                </Animated.View>
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[randomKey[3]].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)']})}}>
                    <Key numberKeyEvent={keyEvent} number={randomKey[3]}/>
                </Animated.View>
            </View>
            <View style={styles.securityKeypadLine}>
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[randomKey[4]].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)']})}}>
                    <Key numberKeyEvent={keyEvent} number={randomKey[4]}/>
                </Animated.View>
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[randomKey[5]].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)']})}}>
                    <Key numberKeyEvent={keyEvent} number={randomKey[5]}/>
                </Animated.View>
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[randomKey[6]].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)']})}}>
                    <Key numberKeyEvent={keyEvent} number={randomKey[6]}/>
                </Animated.View>
            </View>
            <View style={styles.securityKeypadLine}>
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[randomKey[7]].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)']})}}>
                    <Key numberKeyEvent={keyEvent} number={randomKey[7]}/>
                </Animated.View>
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[randomKey[8]].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)']})}}>
                    <Key numberKeyEvent={keyEvent} number={randomKey[8]}/>
                </Animated.View>
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[randomKey[9]].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)']})}}>
                    <Key numberKeyEvent={keyEvent} number={randomKey[9]}/>
                </Animated.View>
            </View>
            <View style={styles.securityKeypadLine}>
                <View style={styles.securityKeypadKey}/>
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[randomKey[0]].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)']})}}>
                    <Key numberKeyEvent={keyEvent} number={randomKey[0]}/>
                </Animated.View>
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[10].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)']})}}>
                    <TouchableWithoutFeedback onPress={backKeyEvent}>
                        <Image style={styles.securityKeypadKeyRemove} source={require("../../assets/image/remove.png")}/>
                    </TouchableWithoutFeedback>
                </Animated.View>
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
        width: '24%',
        height: '80%',
        marginHorizontal: '3%',
        borderRadius: 12,
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