import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Easing, View } from "react-native";
import { Path, Svg } from "react-native-svg";

export default function CurserLogo(props: any) {
    const circle = {
        width: useRef(new Animated.Value(15)).current,
        size: useRef(new Animated.Value(30)).current,
    }
    const circleWith = () => {
        circle.width.setValue(15);
        Animated.timing(circle.width, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }
    const circleSize = () => {
        circle.size.setValue(30);
        Animated.timing(circle.size, {
            toValue: 100,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }

    useEffect(() => {
        circleWith();
        circleSize();
    },[circle])

    return (
        <View style={{width:160, height:124, justifyContent:'center', alignItems:'center'}}>
            <View style={{position:'relative', top:22, right:40, width:80, height:80, alignItems: 'center', justifyContent:'center'}}>
                <Animated.View style={{...styles.circle, width:circle.size, height:circle.size, borderWidth:circle.width}}/>
            </View>
            <Svg style={{position:'relative', bottom:22, left:0}} width={80} height={88} fill="none">
                <Path stroke="#000" fill="#fff" scale={2} strokeOpacity={0.8} strokeWidth={2.354} d="m33.791 22.271 2.47-.878-2.297-1.262L4.567 3.968 2.16 2.645l.702 2.656 8.57 32.433.67 2.535 1.45-2.184 5.514-8.312 6.678 8.548.725.927.928-.724 3.47-2.712.928-.725-.724-.928-6.679-8.547 9.4-3.34Z"/>
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    circle: {
        borderRadius: 100,
        borderColor: '#1D9287',
    },
});