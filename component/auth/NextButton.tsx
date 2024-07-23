import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Shadow } from '../../css/sujin/Shadow';

export default function NextButton(props: any) {
    const {active, text, width, press} = props;

    const isPress = () => {
        if (active) {
            press();
        }
    }

    return (
        <TouchableOpacity
            onPress={isPress} 
            activeOpacity={.5}
            disabled={!active}
            style={[styles.nextButton, Shadow.dropShadow, {width: width?width:"70%"}]}>
            <Text style={[styles.nextButtonText, {color:active?"#000":"#aaa"}]}>
                {text}
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