import { Animated, Image, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Key from "./Key";
import { useRef, useState } from "react";
import {red} from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import {Path, Svg} from "react-native-svg";

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
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[randomKey[1]].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)']})}}>
                    <Key numberKeyEvent={keyEvent} number={randomKey[1]}/>
                </Animated.View>
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[randomKey[2]].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)']})}}>
                    <Key numberKeyEvent={keyEvent} number={randomKey[2]}/>
                </Animated.View>
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[randomKey[3]].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)']})}}>
                    <Key numberKeyEvent={keyEvent} number={randomKey[3]}/>
                </Animated.View>
            </View>
            <View style={styles.securityKeypadLine}>
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[randomKey[4]].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)']})}}>
                    <Key numberKeyEvent={keyEvent} number={randomKey[4]}/>
                </Animated.View>
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[randomKey[5]].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)']})}}>
                    <Key numberKeyEvent={keyEvent} number={randomKey[5]}/>
                </Animated.View>
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[randomKey[6]].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)']})}}>
                    <Key numberKeyEvent={keyEvent} number={randomKey[6]}/>
                </Animated.View>
            </View>
            <View style={styles.securityKeypadLine}>
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[randomKey[7]].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)']})}}>
                    <Key numberKeyEvent={keyEvent} number={randomKey[7]}/>
                </Animated.View>
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[randomKey[8]].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)']})}}>
                    <Key numberKeyEvent={keyEvent} number={randomKey[8]}/>
                </Animated.View>
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[randomKey[9]].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)']})}}>
                    <Key numberKeyEvent={keyEvent} number={randomKey[9]}/>
                </Animated.View>
            </View>
            <View style={styles.securityKeypadLine}>
                <View style={styles.securityKeypadKey}/>
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[randomKey[0]].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)']})}}>
                    <Key numberKeyEvent={keyEvent} number={randomKey[0]}/>
                </Animated.View>
                <Animated.View style={{...styles.securityKeypadKey, backgroundColor: opacity[10].interpolate({inputRange:[0,100], outputRange:['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)']})}}>
                    <TouchableWithoutFeedback onPress={backKeyEvent}>
                        {/*<Image style={styles.securityKeypadKeyRemove} source={require("../../assets/image/remove.png")}/>*/}
                        <View>
                            <Svg
                                width={25}
                                height={21}
                                fill="none"
                                viewBox="0 0 22 18"
                            >
                                <Path
                                    fill="#333"
                                    fillRule="evenodd"
                                    d="M1.515 7.674a1.875 1.875 0 0 0 0 2.652L7.89 16.7c.352.351.829.549 1.326.549H18.5a3 3 0 0 0 3-3V3.75a3 3 0 0 0-3-3H9.216c-.497 0-.974.198-1.326.55L1.515 7.673ZM11.53 6.22a.75.75 0 1 0-1.06 1.06L12.19 9l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L14.31 9l1.72-1.72a.75.75 0 0 0-1.06-1.06l-1.72 1.72-1.72-1.72Z"
                                    clipRule="evenodd"
                                />
                            </Svg>
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    securityKeypad: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    securityKeypadLine: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    securityKeypadKey: {
        width: '25%',
        height: '70%',
        marginHorizontal: '3%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    securityKeypadKeyNum: {
        fontSize: 30,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    securityKeypadKeyRemove: {
        width: 20,
        height: 15,
    },
});