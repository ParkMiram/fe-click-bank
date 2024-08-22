import React, {useEffect, useState} from "react";
import {
    Alert,
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {Circle, Path, Svg} from "react-native-svg";
import {acceptGroupAccount, saveGroup} from "../../component/api/NewAccountApi";

export default function FriendInvite(props: any) {

    // props
    const {isInviteModalVisible, toggleInviteModal, bearerToken} = props;
    const [inviteListData, setInviteListData] = useState([{
        accountName: ''
    }]);
    const [loading, setLoading] = useState(false);

    // 모임 통장 초대 조회
    const getInviteListData = async (): Promise<void> => {
        setInviteListData([]);
        try {
            const token = bearerToken.split(' ')[1];
            const response = await acceptGroupAccount(token)
            setInviteListData(response.data);
            setLoading(true);
            console.log(response.data);
        } catch (error: any) {
            console.log('Error:', error.message);
        }
    }

    // 초대 수락
    const inviteAccept = async (): Promise<void> => {
        try {
            const token = bearerToken.split(' ')[1];
            await saveGroup(token, {status: true})
            Alert.alert(
                '모임 통장',
                '모임 통장에 가입되었습니다.🤝'
            );
            getInviteListData();
        } catch (error: any) {
            console.log('Error:', error.message);
        }
    }

    // 초대 거절
    const inviteReject = async (): Promise<void> => {
        try {
            const token = bearerToken.split(' ')[1];
            console.log(token);
            await saveGroup(token, {status: false})
            Alert.alert(
                '모임 통장',
                '모임 통장 가입을 거절했습니다.'
            );
            getInviteListData();
        } catch (error: any) {
            console.log('Error:', error.message);
        }
    }

    useEffect((): void => {
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
                                loading ?
                                    inviteListData.length > 0 ?
                                        <FlatList
                                            data={inviteListData}
                                            keyExtractor={item => item.accountName}
                                            renderItem={({item, index}) => {
                                                return (
                                                    <View
                                                        key={index}
                                                        style={styles.inviteList}
                                                    >
                                                        <Text style={styles.inviteTxt}>
                                                            <Text style={styles.inviteName}>{item.accountName}</Text>
                                                            에 초대했습니다.
                                                        </Text>
                                                        <View
                                                            style={styles.inviteBtn}
                                                        >
                                                            <TouchableOpacity
                                                                style={{marginRight: 10}}
                                                                onPress={inviteAccept}
                                                            >
                                                                <Svg
                                                                    width={32}
                                                                    height={32}
                                                                    fill="none"
                                                                    viewBox="0 0 16 16"
                                                                >
                                                                    <Circle cx={8} cy={8} r={8} fill="#007378"
                                                                            fillOpacity={0.25}/>
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
                                                                    <Circle cx={9} cy={9} r={9} fill="#7E869E"
                                                                            fillOpacity={0.25}/>
                                                                    <Path stroke="#222" strokeWidth={1.2}
                                                                          d="m6 12 6-6M12 12 6 6"/>
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
                                    :
                                    <Text></Text>
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
        borderTopLeftRadius: 10,
        minHeight: 200
    },
    wrap: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between'
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