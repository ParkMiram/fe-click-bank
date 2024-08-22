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
            style={styles.nextButton}>
            <Text style={[styles.nextButtonText, {color:props.active?"#fff":"#aaa"}]}>
                {props.text}
            </Text>
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    nextButton: {
        backgroundColor: '#007378',
        borderRadius: 10,
        height: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold'
    },
});