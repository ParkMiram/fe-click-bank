import {
    Alert,
    Image, KeyboardAvoidingView,
    Modal, Platform, StyleSheet,
    Text, TextInput, TouchableOpacity, View,
} from "react-native";
import React, {useState} from "react";
import {Circle, Path, Svg} from "react-native-svg";
import axios, {AxiosResponse} from "axios";

export default function FriendSearch(props: any) {

    // props
    const {isModalVisible, toggleModal, bearerToken} = props;

    // state
    const [friendCode, setFriendCode] = useState('');
    const [friend, setFriend] = useState({
        id: '',
        code: '',
        img: '',
        name: ''
    });
    const [searchFlag, setSearchFlag] = useState(false);

    // event
    const onChangeFriendCode = (text: string): void => {
        const regex: RegExp = /^[a-zA-Z0-9]*$/;
        if (regex.test(text)) {
            setFriendCode(text.toUpperCase());
        }
    }

    // 검색
    const getFriend = async () => {
        try {
            if(friendCode.length === 5) {
                const response: AxiosResponse<any, any> = await axios.get(`http://34.30.12.64:31000/api/v1/auth?code=${friendCode}`);
                setFriend(response.data);
                setSearchFlag(true);
            } else {
                return Alert.alert(
                    "친구 코드",
                    "친구 코드는 5자 입니다."
                );
            }
        } catch (error: any) {
            if (error.response) {
                console.log('Error:', error.response.data);
                Alert.alert(
                    "Error",
                    error.response.data
                );
            } else {
                console.log('Error:', error.message);
                Alert.alert(
                    "Error",
                    error.response
                );
            }
        }
    }
    // 친구 요청
    const requestFriend = async (code: string):Promise<void> => {
        try {
            const response: AxiosResponse<any, any> = await axios.post(`http://34.44.62.106:30000/api/v1/friends/request/${code}`,{}, {
                headers: {
                    Authorization: bearerToken
                }
            });
            Alert.alert(
                "친구 요청",
                response.data
            );
        } catch (error: any) {
            if (error.response) {
                console.log('Error:', error.response.data);
                Alert.alert(
                    "친구 요청",
                    error.response.data
                );
            } else {
                console.log('Error:', error.message);
                Alert.alert(
                    "친구 요청",
                    error.response
                );
            }
        }
    }

    return (
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
                            <TextInput
                                style={styles.searchInpt}
                                placeholder='친구 검색하기'
                                value={friendCode}
                                onChangeText={onChangeFriendCode}
                                maxLength={5}
                            />
                            <TouchableOpacity
                                onPress={getFriend}
                                style={styles.searchIcon}
                            >
                                <Svg
                                    width={14}
                                    height={14}
                                    fill="none"
                                >
                                    <Circle cx={6.25} cy={6.25} r={5.25} stroke="#404040"/>
                                    <Path stroke="#404040" strokeLinecap="round" d="m13 13-3-3"/>
                                </Svg>
                            </TouchableOpacity>
                        </View>
                        {
                            searchFlag ?
                                friend.code ?
                                    <View style={styles.list}>
                                        <View style={styles.friend}>
                                            {
                                                friend.img === '' ?
                                                <Svg
                                                    width={40}
                                                    height={40}
                                                    fill="none"
                                                    viewBox="0 0 30 30"
                                                    style={{marginRight: 10}}
                                                >
                                                    <Path
                                                        fill="#7E869E"
                                                        fillOpacity={0.25}
                                                        d="M0 15C0 6.716 6.716 0 15 0c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15Z"
                                                    />
                                                    <Circle cx={15} cy={11.667} r={6.667} fill="#7E869E" fillOpacity={0.5}/>
                                                    <Path
                                                        fill="#7E869E"
                                                        fillOpacity={0.5}
                                                        fillRule="evenodd"
                                                        d="M25.433 25.52c.057.097.04.22-.042.298A14.95 14.95 0 0 1 15 30a14.95 14.95 0 0 1-10.391-4.182.243.243 0 0 1-.042-.298C6.484 22.247 10.436 20 15 20s8.516 2.246 10.433 5.52Z"
                                                        clipRule="evenodd"
                                                    />
                                                </Svg>
                                                :
                                                <Image source={{ uri: friend.img }} style={ styles.profile } />
                                            }
                                            <Text style={styles.friendName}>{friend.name}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.request}
                                            onPress={() => requestFriend(friend.code)}
                                        >
                                            <Svg
                                                width={16}
                                                height={16}
                                                fill="none"
                                            >
                                                <Path
                                                    fill="#007378"
                                                    fillRule="evenodd"
                                                    d="m6.051 8.684-2.359-.787C1.34 7.113.162 6.721.162 6c0-.72 1.177-1.113 3.53-1.897l8.513-2.838C13.861.713 14.69.437 15.126.874c.437.437.161 1.265-.39 2.92l-2.839 8.514c-.784 2.353-1.176 3.53-1.897 3.53-.72 0-1.113-1.177-1.897-3.53l-.787-2.36c-.055-.164-.1-.3-.143-.414l4.18-4.18a.5.5 0 0 0-.707-.708l-4.18 4.18c-.114-.042-.25-.087-.415-.142Z"
                                                    clipRule="evenodd"
                                                />
                                            </Svg>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View style={styles.noList}>
                                        <Text style={styles.noListTxt}>검색 결과가 없습니다😓</Text>
                                    </View>
                                :
                                <View style={styles.noList}>
                                    <Text style={styles.noListTxt}>친구 코드를 입력해 검색해 주세요👆</Text>
                                </View>
                        }
                        <TouchableOpacity style={styles.close} onPress={toggleModal}>
                            <Text>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
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
        paddingLeft: 20,
        marginBottom: 20
    },
    searchInpt: {
        flex: 1,
        paddingVertical: 15,
    },
    searchIcon: {
        flex: 0,
        padding: 15
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        backgroundColor: '#ffffff',
    },
    noList: {
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 30
    },
    noListTxt: {
        color: '#aaa',
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
});