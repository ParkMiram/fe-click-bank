import { StyleSheet, Text, View } from "react-native";

type props = {
    text: string;
    size: number;
    color: string;
    strokeColor: string;
}

export default function StrokeText(props: any) {
    const { text, size, color, strokeColor }: props = props;

    const styles = StyleSheet.create({
        container: {
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            width:'100%',
            position: "absolute",
            bottom:"15%",
            color: color, 
            fontSize: size,
            textShadowColor: strokeColor,
            textShadowRadius: 1,
            textAlign:'center',
        },
    });

    return (
        <View style={styles.container}>
            <Text style={[styles.text, {textShadowOffset: { width: 1, height: 1 }}]}>
                {text}
            </Text>
            {/* <Text style={[styles.text, {textShadowOffset: { width: 1, height: -1 }}]}>
                {text}
            </Text>
            <Text style={[styles.text, {textShadowOffset: { width: -1, height: 1 }}]}>
                {text}
            </Text>
            <Text style={[styles.text, {textShadowOffset: { width: -1, height: -1 }}]}>
                {text}
            </Text>
            <Text style={[styles.text, {textShadowOffset: { width: 1, height: 0 }}]}>
                {text}
            </Text>
            <Text style={[styles.text, {textShadowOffset: { width: 0, height: 1 }}]}>
                {text}
            </Text>
            <Text style={[styles.text, {textShadowOffset: { width: -1, height: 0 }}]}>
                {text}
            </Text>
            <Text style={[styles.text, {textShadowOffset: { width: 0, height: -1 }}]}>
                {text}
            </Text> */}
        </View>
    );
}