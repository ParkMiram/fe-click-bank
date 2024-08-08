import { Platform, StatusBar, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export const SavingAccountList = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})