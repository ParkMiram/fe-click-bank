import {
    Alert, Dimensions,
    Image,
    ImageStyle,
    Modal,
    Platform, SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import {Circle, Path, Svg} from "react-native-svg"
import {Ionicons} from '@expo/vector-icons';
import React, {useEffect, useState} from "react";
import {deleteAccount, deleteGroupMember, getGroupAccount} from "../../component/api/NewAccountApi";

type data = {
    token: string;
    account: string;
    userName: string;
    userImg: string;
}

const { width, height } = Dimensions.get('window');

export const AccountDetail = ({navigation, route}: any) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalGroupVisible, setModalGroupVisible] = useState(false);
    const [friend, setFriend] = useState([]);
    const [accountName, setAccountName] = useState([]);
    const [type, setType] = useState<number | null>(null);
    const {token, account, userName, userImg}: data = route.params;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getGroupAccount(token, account);
                setAccountName(response.data.accountName)
                setFriend(response.data.userResponses);
                setType(response.data.type);
                console.log(response.data.userResponses);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleDeleteAccount = (): void => {
        // setModalVisible(false);
        Alert.alert("계좌 삭제", "계좌를 삭제하시겠습니까?",
            [
                { text: "취소", style: "default" },
                { text: "삭제", style: "destructive",
                    onPress: async (): Promise<void> => {
                        try {
                            console.log(token);
                            console.log(account);
                            await deleteAccount(token, account);
                            navigation.reset({
                                index: 0,
                                routes: [{name: 'AccountHome', params: {token}}]
                            });
                        } catch (error: any) {
                            console.log(error.message);
                            Alert.alert("삭제 오류", "아직 돈이 존재합니다.");
                            // navigation.navigate("AccountHome", {token})
                        }
                    }
                }
            ]
        )
    };

    const handleDeleteGroupMember = async () => {
        setModalVisible(true);
        try {
            const res = await deleteGroupMember(token, account);
            console.log(res.data);
            navigation.reset({
                index: 0,
                routes: [{name: 'AccountHome', params: {token}}]
            });
        } catch (error) {
            console.log(error);
        }
    };

    const ProfileComponent = ({userImg}: any) => {
        const imageUrl = userImg || null;
        return (
            <View style={styles.profileContainer}>
                {imageUrl ? (
                    <Image
                        source={{uri: imageUrl}}
                        style={styles.profileImage}
                    />
                ) : (
                    <Svg
                        width={45}
                        height={45}
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
                )}
            </View>
        );
    };


    const GroupImageComponent = ({userImg, index}: any) => {
        const imageStyle: ImageStyle[] = [styles.memberImage];
        const imageUrl = userImg || null;

        if (index === 0)
            imageStyle.push(styles.firstImage);
        else if (index === 1)
            imageStyle.push(styles.secondImage);

        return (
            <View style={styles.imageWrapper}>
                {imageUrl ? (
                    <Image
                        source={{uri: imageUrl}}
                        style={imageStyle}
                    />
                ) : (
                    <Svg
                        fill="none"
                        viewBox="0 0 30 30"
                        style={imageStyle}
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
                )}
            </View>
        );
    };

    const GroupImages = ({members}: any) => {
        return (
            <View style={styles.imageWrapper}>
                {members.map((member: any, index: number) => (
                    <GroupImageComponent
                        key={index}
                        userImg={member.userImg}
                        index={index}
                    />
                ))}
            </View>
        );
    };

    const AccountSettings = () => (
        <>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View>
                    <TouchableOpacity
                        style={styles.settingOption}
                    >
                        <Text style={styles.settingText}>대표 계좌 설정</Text>
                        <Svg
                            width={24}
                            height={23}
                            fill="none"
                        >
                            <Path stroke="#222" d="m9 5.75 6 5.75-6 5.75"/>
                        </Svg>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingOption} onPress={() => {
                        navigation.navigate("EditAccount", {token, account, accountName})
                    }}>
                        <Text style={styles.settingText}>계좌 정보 수정</Text>
                        <Svg
                            width={24}
                            height={23}
                            fill="none"
                        >
                            <Path stroke="#222" d="m9 5.75 6 5.75-6 5.75"/>
                        </Svg>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.settingOption, { marginBottom: 0 }]} onPress={() => Alert.alert("오류: 고객 센터에 문의해 주세요.")}>
                        <Text style={styles.settingText}>모임 통장 변환</Text>
                        <Svg
                            width={24}
                            height={23}
                            fill="none"
                        >
                            <Path stroke="#222" d="m9 5.75 6 5.75-6 5.75"/>
                        </Svg>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.accountDelete} onPress={handleDeleteAccount}>
                    <Text style={styles.accountDeleteText}>계좌 삭제</Text>
                </TouchableOpacity>
            </View>
        </>
    );

    const SavingAccountSettings = () => (
        <>
            <TouchableOpacity style={styles.settingOption} onPress={() => setModalVisible(true)}>
                <Text style={styles.settingText}>계좌 삭제</Text>
                <Svg
                    width={24}
                    height={23}
                    fill="none"
                >
                    <Path stroke="#222" d="m9 5.75 6 5.75-6 5.75"/>
                </Svg>
            </TouchableOpacity>
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>계좌를 삭제 하시겠습니까?</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
                                <Text style={styles.buttonText}>확인</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );

    const goInvitedUser = () => {
        console.log(`detail tap/ token: ${token}, account: ${account}`);
        navigation.navigate('AccountInvitedUser', {token, account});
    }

    const GroupAccountSettings = () => (
        <>
            <TouchableOpacity style={styles.settingOption} onPress={() => {
                navigation.navigate("EditAccount", {token})
            }}>
                <Text style={styles.settingText}>계좌 정보 수정</Text>
                <Svg
                    width={24}
                    height={23}
                    fill="none"
                >
                    <Path stroke="#222" d="m9 5.75 6 5.75-6 5.75"/>
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingOption} onPress={goInvitedUser}>
                <Text style={styles.settingText}>참여 중 멤버</Text>
                <View style={styles.membersInfo}>
                    <GroupImages members={friend}/>
                    <Text style={styles.membersCount}>{friend.length}명</Text>
                </View>
                <Svg
                    width={24}
                    height={23}
                    fill="none"
                >
                    <Path stroke="#222" d="m9 5.75 6 5.75-6 5.75"/>
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingOption}
                              onPress={() => navigation.navigate('AccountInviteFriends', {token, account})}>
                <Text style={styles.settingText}>친구 초대</Text>
                <Svg
                    width={24}
                    height={23}
                    fill="none"
                >
                    <Path stroke="#222" d="m9 5.75 6 5.75-6 5.75"/>
                </Svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingOption} onPress={() => setModalGroupVisible(true)}>
                <Text style={styles.settingText}>모임 통장 삭제</Text>
                <Svg
                    width={24}
                    height={23}
                    fill="none"
                >
                    <Path stroke="#222" d="m9 5.75 6 5.75-6 5.75"/>
                </Svg>
            </TouchableOpacity>
            <Modal
                transparent={true}
                visible={modalGroupVisible}
                onRequestClose={() => setModalGroupVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>모임 통장을 삭제하시겠습니까?</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
                                <Text style={styles.buttonText}>확인</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setModalGroupVisible(false)}>
                                <Text style={styles.buttonText}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity style={styles.settingOption} onPress={() => setModalVisible(true)}>
                <Text style={styles.settingText}>모임 통장 탈퇴</Text>
                <Svg
                    width={24}
                    height={23}
                    fill="none"
                >
                    <Path stroke="#222" d="m9 5.75 6 5.75-6 5.75"/>
                </Svg>
            </TouchableOpacity>
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>모임을 탈퇴 하시겠습니까?</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleDeleteGroupMember}>
                                <Text style={styles.buttonText}>확인</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                {/*<View style={styles.header}>*/}
                {/*    <View style={styles.profileContainer}>*/}
                {/*        <ProfileComponent userImg={userImg} userName={userName}/>*/}
                {/*        <Text style={styles.profileName}>{userName}</Text>*/}
                {/*    </View>*/}
                {/*    <View style={styles.bellContainer}>*/}
                {/*        <Ionicons name="notifications" size={24} color="green" />*/}
                {/*    </View>*/}
                {/*</View>*/}
                {/*<View style={styles.accountNameContainer}>*/}
                {/*    <Text style={styles.accountName}>{accountName}</Text>*/}
                {/*</View>*/}
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.accountNameContainer}>
                    <Svg
                        width={10}
                        height={16}
                        fill="none"
                        viewBox="0 0 8 14"
                    >
                        <Path stroke="#222" d="M7 1 1 7l6 6" />
                    </Svg>
                    <Text style={styles.accountName}>{accountName}</Text>
                </TouchableOpacity>
                <View style={styles.settingsContainer}>
                    {/*<View style={styles.row}>*/}
                    {/*    <Text style={styles.sectionHeader}>계좌 설정</Text>*/}
                    {/*</View>*/}
                    {type === 1 ? <AccountSettings/> : type === 2 ? <GroupAccountSettings/> : <SavingAccountSettings/>}
                </View>
                {/*<TouchableOpacity*/}
                {/*    style={styles.sendButton}*/}
                {/*    onPress={() => navigation.reset({*/}
                {/*        index: 0,*/}
                {/*        routes: [{name: 'AccountHome', params: {token}}]*/}
                {/*    })}*/}
                {/*>*/}
                {/*    <Text style={styles.sendButtonText}>나가기</Text>*/}
                {/*</TouchableOpacity>*/}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    innerContainer: {
        flex: 1,
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
        marginTop: 20
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 25
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 25,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 15
    },
    bellContainer: {
        position: 'absolute',
        right: 40,
    },
    accountNameContainer: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 20
    },
    accountName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10
    },
    settingsContainer: {
        width: width - 40,
        marginHorizontal: 20,
        flex: 1
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#B7E1CE',
        paddingLeft: 10,
        borderRadius: 10,
        marginBottom: 30,
        height: 50
    },
    icon: {
        marginLeft: 5,
    },
    sectionHeader: {
        flexDirection: 'row',
        textAlign: 'center',
        fontSize: 16,
        color: '#555',
    },
    settingOption: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 20,
        borderRadius: 20,
        marginBottom: 10
    },
    settingText: {
        fontSize: 18,
    },
    accountDelete: {
        width: '100%',
        backgroundColor: 'rgba(220,20,60,0.1)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 20
    },
    accountDeleteText: {
        color: '#dc143c',
        fontSize: 16
    },
    membersInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: Platform.OS === 'ios' ? 120 : 80
    },
    memberImage: {
        width: 25,
        height: 25,
        borderRadius: 25,
    },
    imageWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    firstImage: {
        position: 'absolute',
        left: 13,
        zIndex: 1,
    },
    secondImage: {
        position: 'absolute',
        left: 26,
        zIndex: 2,
    },
    membersCount: {
        marginLeft: 50,
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    sendButton: {
        marginTop: Platform.OS === 'ios' ? 50 : 30,
        backgroundColor: '#B7E1CE',
        padding: 16,
        alignItems: 'center',
        borderRadius: 8,
        width: '80%',
        alignSelf: 'center',
        marginBottom: 50
    },
    sendButtonText: {
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center'
    },
    modalText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 20,
        marginBottom: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 30,
    },
    button: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#B7E1CE',
        marginLeft: 10
    },
    buttonText: {
        fontSize: 16
    }
})