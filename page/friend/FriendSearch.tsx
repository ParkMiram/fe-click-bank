import {
    Image, KeyboardAvoidingView,
    Modal, Platform, StyleSheet,
    Text, TextInput, TouchableOpacity, View,
} from "react-native";
import React from "react";

export default function FriendSearch (props: any) {
    const {isModalVisible, toggleModal} = props;

    return (
        <>
            <View style={styles.overlay}>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={toggleModal}
                >
                    <KeyboardAvoidingView
                        style={styles.searchModal}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                        <View style={styles.wrap}>
                            <View style={styles.searchWrap}>
                                <TextInput style={styles.searchInpt} placeholder='친구 검색하기' />
                                <TouchableOpacity>
                                    <Image source={require('../../assets/image/search.png')} style={styles.searchIcon} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.list}>
                                <View style={styles.friend}>
                                    <Image source={require('../../assets/image/basicProfile.png')} style={styles.profile} />
                                    <Text style={styles.friendName}>김재민</Text>
                                </View>
                                <TouchableOpacity style={styles.request}>
                                    <Image source={require('../../assets/image/send.png')} style={styles.requestIcon}/>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.close} onPress={toggleModal}>
                                <Text>닫기</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </Modal>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    searchModal: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    wrap: {
        padding: 20,
        // paddingBottom: 30,
    },
    searchWrap: {
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#f8f8f8',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 20
    },
    searchInpt: {
        flex: 1,
    },
    searchIcon: {
        flex: 0,
        marginLeft: 10
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        backgroundColor: '#ffffff',
    },
    friend: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profile: {
        marginRight: 10,
        width: 40,
        height: 40
    },
    friendName: {
        fontWeight: '500',
        fontSize: 16
    },
    request: {
        width: 32,
        height: 32,
        backgroundColor: 'rgba(0, 115, 120, 0.2)',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    requestIcon: {
        width: 12,
        height: 12
    },
    close: {
        width: '100%',
        backgroundColor: '#ddd',
        borderRadius: 5,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    }
})