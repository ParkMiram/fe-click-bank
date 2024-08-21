import React, {useEffect} from "react";
import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {Circle, Path, Svg} from "react-native-svg";

export default function MyFriendSearch({ ...props }) {
    // props
    const { srchMyFriend, setSrchMyFriend } = props;

    // event
    const onChangeSrchMyFriend = (text: string): void => {
        setSrchMyFriend(text);
    }

    useEffect(() => {

    }, []);

    return (
        <>
            <TextInput
                style={styles.searchInpt}
                placeholder='내 친구 검색하기'
                value={srchMyFriend}
                onChangeText={onChangeSrchMyFriend}
                returnKeyType={'done'}
            />
            <View style={styles.searchIcon}>
                <Svg
                    width={14}
                    height={14}
                    fill="none"
                >
                    <Circle cx={6.25} cy={6.25} r={5.25} stroke="#404040"/>
                    <Path stroke="#404040" strokeLinecap="round" d="m13 13-3-3"/>
                </Svg>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    searchInpt: {
        flex: 1,
    },
    searchIcon: {
        flex: 0,
        marginLeft: 10,
        paddingHorizontal: 15,
        paddingVertical: 20
    },
})