import { StyleSheet, View, Text } from 'react-native';

export default function ClickHome({ route, navigation }: any) {
    const { code } = route.params;

    return (
        <View style={styles.container}>
            <Text>Click home</Text>
            <Text>
                {code}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});