import React, {useEffect, useState} from "react";
import {
    Alert,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {Circle, Path, Svg} from "react-native-svg";
import axios, {AxiosResponse} from "axios";

export default function  FriendInvite (props: any) {

    // props
    const {isInviteModalVisible, toggleInviteModal, bearerToken} = props;
    const [inviteListData, setInviteListData] = useState([{
        userName: '',
        userImg: '',
        userCode: '',
        admin: ''
    }]);
    const testData = [
        {id: '1', name: "박분도"},
        // {id: '2', name: "박박박"},
        // {id: '3', name: "박번도"},
        // {id: '4', name: "박분도박"},
        // {id: '5', name: "박분도남도"},
    ]

    // 모임 통장 초대 조회
    const getInviteListData = async () => {
        setInviteListData([]);
        try {
            const response: AxiosResponse<any, any> = await axios.get('http://35.192.67.71:32001/api/v1/accounts/group/accept', {
                headers: {
                    'Authorization': bearerToken
                }
            });
            setInviteListData(response.data);
            console.log(response.data);
        } catch (error: any) {
            console.log('Error:', error.message);
        }
    }

    // 초대 수락
    const inviteAccept = async () => {
        try {
            await axios.post('http://35.192.67.71:32001/api/v1/accounts/group', { status: true }, {
                headers: {
                    Authorization: bearerToken
                }
            });
            Alert.alert(
                '모임 통장',
                '모임 통장에 가입되었습니다.🤝'
            );
        } catch (error: any) {
            console.log('Error:', error.message);
        }
    }

    // 초대 거절
    const inviteReject = async () => {
        try {
            await axios.post('http://35.192.67.71:32001/api/v1/accounts/group', { status: false }, {
                headers: {
                    Authorization: bearerToken
                }
            });
            Alert.alert(
                '모임 통장',
                '모임 통장 가입을 거절했습니다.'
            );
        } catch (error: any) {
            console.log('Error:', error.message);
        }
    }

    useEffect(() => {
        getInviteListData();
    }, []);

    return (
        <>
            <View style={styles.overlay}>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={isInviteModalVisible}
                    onRequestClose={toggleInviteModal}
                >
                    <View
                        style={styles.searchModal}
                    >
                        <View style={styles.wrap}>
                            {
                                inviteListData.length > 0 ?
                                    <FlatList
                                        data={inviteListData}
                                        keyExtractor={item => item.userCode}
                                        renderItem={({item}) => {
                                            return (
                                                <View
                                                    key={item.userCode}
                                                    style={styles.inviteList}
                                                >
                                                    <Text style={styles.inviteTxt}>
                                                        <Text style={styles.inviteName}>{item.userName}</Text>
                                                        님이 모임통장에 초대했습니다.
                                                    </Text>
                                                    <View
                                                        style={styles.inviteBtn}
                                                    >
                                                        <TouchableOpacity
                                                            style={{ marginRight: 10 }}
                                                            onPress={inviteAccept}
                                                        >
                                                            <Svg
                                                                width={32}
                                                                height={32}
                                                                fill="none"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <Circle cx={8} cy={8} r={8} fill="#007378" fillOpacity={0.25} />
                                                                <Path
                                                                    stroke="#007378"
                                                                    strokeWidth={1.2}
                                                                    d="m5.5 8 1.894 1.894a.15.15 0 0 0 .212 0L11.5 6"
                                                                />
                                                            </Svg>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            onPress={inviteReject}
                                                        >
                                                            <Svg
                                                                width={32}
                                                                height={32}
                                                                fill="none"
                                                                viewBox="0 0 18 18"
                                                            >
                                                                <Circle cx={9} cy={9} r={9} fill="#7E869E" fillOpacity={0.25} />
                                                                <Path stroke="#222" strokeWidth={1.2} d="m6 12 6-6M12 12 6 6" />
                                                            </Svg>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            )
                                        }}
                                    />
                                    :
                                    <View style={styles.noList}>
                                        <Text style={styles.noListTxt}>모임 통장 초대가 없습니다.</Text>
                                    </View>
                            }
                            <TouchableOpacity style={styles.close} onPress={toggleInviteModal}>
                                <Text>닫기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    },
    inviteList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    inviteTxt: {
        fontSize: 15
    },
    inviteName: {
        textDecorationLine: 'underline'
    },
    inviteBtn: {
        flexDirection: 'row'
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