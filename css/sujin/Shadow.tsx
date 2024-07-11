import { StyleSheet } from "react-native";

const Shadow = StyleSheet.create({
    dropShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 2,
    }
});

export { Shadow }