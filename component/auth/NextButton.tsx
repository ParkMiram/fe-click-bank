import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Shadow } from '../../css/sujin/Shadow';

export default function NextButton(props: any) {
    const isPress = () => {
        if (props.active) {
            props.press();
        }
    }

    return (
        <TouchableOpacity
            onPress={isPress} 
            activeOpacity={.5}
            disabled={!props.active}
            style={[styles.nextButton, Shadow.dropShadow, {width: props.width?props.width:"70%"}]}>
            <Text style={[styles.nextButtonText, {color:props.active?"#000":"#aaa"}]}>
                {props.text}
            </Text>
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    nextButton: {
        marginBottom: 26,
        borderWidth: 0,
        borderRadius: 12,
        overflow: 'hidden',
    },
    nextButtonText: {
        width: "100%",
        padding: 12,
        backgroundColor: "#B7E1CE",
        textAlign: 'center',
        fontSize: 18
    },
});