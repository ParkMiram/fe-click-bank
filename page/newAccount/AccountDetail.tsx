import { Alert, Image, ImageStyle, Modal, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Circle, Path, Svg } from "react-native-svg"
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { deleteAccount, deleteGroupMember, getGroupAccount } from "../../component/api/NewAccountApi";

type data = {
    token: string;
    account: string;
    userName: string;
    userImg: string;
}

export const AccountDetail = ({ navigation, route }: any) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalGroupVisible, setModalGroupVisible] = useState(false);
    const [friend, setFriend] = useState([]);
    const [accountName, setAccountName] = useState([]);
    const [type, setType] = useState<number | null>(null);
    const {token, account, userName, userImg }: data = route.params;

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

    const handleDeleteAccount = async () => {
        setModalVisible(false);
        try {
            console.log(token);
            console.log(account)
            await deleteAccount(token, account);
            navigation.reset({
                index: 0,
                routes: [{name: 'AccountHome', params: {token}}]
            });
        } catch(error: any) {
            console.log(error.message);
            Alert.alert("삭제 오류", "아직 돈이 존재합니다.");
            navigation.navigate("AccountHome", {token})
        }
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
        } catch(error) {
            console.log(error);
        }
    };

    const ProfileComponent = ({ userImg }: any) => {
        const imageUrl = userImg || null; 
        return (
            <View style={styles.profileContainer}>
                {imageUrl ? (
                    <Image
                        source={{ uri: imageUrl }}
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


    const GroupImageComponent = ({ userImg, index }: any) => {
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
                        source={{ uri: imageUrl }}
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
    
    const GroupImages = ({ members }: any) => {
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
            <TouchableOpacity style={styles.settingOption} onPress={() => {navigation.navigate("EditAccount", {token, account})}}>
                <Text style={styles.settingText}>계좌 정보 수정</Text>
                <Svg
                    width={24}
                    height={23}
                    fill="none"
                >
                    <Path stroke="#222" d="m9 5.75 6 5.75-6 5.75" />
                </Svg>
            </TouchableOpacity>
            <View style={[styles.line, {width: '100%'}]} />
            <TouchableOpacity style={styles.settingOption} onPress={() => setModalGroupVisible(true)}>
                <Text style={styles.settingText}>모임 통장 변환</Text>
                <Svg
                    width={24}
                    height={23}
                    fill="none"
                >
                    <Path stroke="#222" d="m9 5.75 6 5.75-6 5.75" />
                </Svg>
            </TouchableOpacity>
            <View style={[styles.line, {width: '100%'}]} />
            <Modal
                transparent={true}
                visible={modalGroupVisible}
                onRequestClose={() => setModalGroupVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>모임 통장으로 변환하시겠습니까?</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => {/* Confirm action */}}>
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
                <Text style={styles.settingText}>게좌 삭제</Text>
                <Svg
                    width={24}
                    height={23}
                    fill="none"
                >
                    <Path stroke="#222" d="m9 5.75 6 5.75-6 5.75" />
                </Svg>
            </TouchableOpacity>
            <View style={[styles.line, {width: '100%'}]} />
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

    const SavingAccountSettings = () => (
        <>
            <TouchableOpacity style={styles.settingOption} onPress={() => setModalVisible(true)}>
                <Text style={styles.settingText}>게좌 삭제</Text>
                <Svg
                    width={24}
                    height={23}
                    fill="none"
                >
                    <Path stroke="#222" d="m9 5.75 6 5.75-6 5.75" />
                </Svg>
            </TouchableOpacity>
            <View style={[styles.line, {width: '100%'}]} />
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
        navigation.navigate('AccountInvitedUser', { token, account });
    }

    const GroupAccountSettings = () => (
        <>
            <TouchableOpacity style={styles.settingOption} onPress={() => {navigation.navigate("EditAccount", {token})}}>
                <Text style={styles.settingText}>계좌 정보 수정</Text>
                <Svg
                    width={24}
                    height={23}
                    fill="none"
                >
                    <Path stroke="#222" d="m9 5.75 6 5.75-6 5.75" />
                </Svg>
            </TouchableOpacity>
            <View style={[styles.line, {width: '100%'}]} />
            <TouchableOpacity style={styles.settingOption} onPress={goInvitedUser}>
                <Text style={styles.settingText}>참여 중 멤버</Text>
                <View style={styles.membersInfo}>
                    <GroupImages members={friend} />
                    <Text style={styles.membersCount}>{friend.length}명</Text>
                </View>
                <Svg
                    width={24}
                    height={23}
                    fill="none"
                >
                    <Path stroke="#222" d="m9 5.75 6 5.75-6 5.75" />
                </Svg>
            </TouchableOpacity>
            <View style={[styles.line, {width: '100%'}]} />
            <TouchableOpacity style={styles.settingOption} onPress={() => navigation.navigate('AccountInviteFriends', {token, account})}>
                <Text style={styles.settingText}>친구 초대</Text>
                <Svg
                    width={24}
                    height={23}
                    fill="none"
                >
                    <Path stroke="#222" d="m9 5.75 6 5.75-6 5.75" />
                </Svg>
            </TouchableOpacity>
            <View style={[styles.line, {width: '100%'}]} />
            <TouchableOpacity style={styles.settingOption} onPress={() => setModalGroupVisible(true)}>
                <Text style={styles.settingText}>모임 통장 삭제</Text>
                <Svg
                    width={24}
                    height={23}
                    fill="none"
                >
                    <Path stroke="#222" d="m9 5.75 6 5.75-6 5.75" />
                </Svg>
            </TouchableOpacity>
            <View style={[styles.line, {width: '100%'}]} />
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
                    <Path stroke="#222" d="m9 5.75 6 5.75-6 5.75" />
                </Svg>
            </TouchableOpacity>
            <View style={[styles.line, {width: '100%'}]} />
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
                <View style={styles.header}>
                    <View style={styles.profileContainer}>
                        <ProfileComponent userImg={userImg} userName={userName}/>
                        <Text style={styles.profileName}>{userName}</Text>
                    </View>
                    <View style={styles.bellContainer}>
                        <Ionicons name="notifications" size={24} color="green" />
                    </View>
                </View>
                <View style={styles.accountNameContainer}>
                    <Text style={styles.accountName}>{accountName}</Text>
                    <Svg
                        width={21}
                        height={22}
                        fill="none"
                    >
                        <Path
                            fill="#222"
                            fillRule="evenodd"
                            d="m15.143 9.803 1.563-1.638c.328-.343.491-.514.6-.687a2 2 0 0 0 0-2.123c-.109-.172-.272-.344-.6-.686-.355-.373-.533-.56-.712-.68a2 2 0 0 0-2.238 0c-.179.12-.357.307-.712.68l-1.417 1.484a9.938 9.938 0 0 0 3.515 3.65Zm-4.95-2.148-5.879 6.158c-.404.424-.606.636-.738.893-.132.256-.187.544-.297 1.12l-.513 2.687c-.064.333-.096.5 0 .594.095.094.261.059.593-.01l2.425-.509c.604-.126.905-.19 1.17-.337.265-.147.478-.37.904-.816l5.876-6.157a11.941 11.941 0 0 1-3.541-3.623Z"
                            clipRule="evenodd"
                        />
                    </Svg>
                </View>
                <View style={[styles.line, {width: '90%'}]} />
                <View style={styles.settingsContainer}>
                    <View style={styles.row}>  
                        <Text style={styles.sectionHeader}>계좌 설정</Text>
                        <Svg
                            width={24}
                            height={24}
                            fill="none"
                            style={styles.icon}
                        >
                            <Circle cx={12} cy={12} r={8.5} stroke="#2A4157" strokeOpacity={0.24} />
                            <Path
                                fill="#222"
                                stroke="#222"
                                strokeWidth={0.2}
                                d="M12 18.6a.6.6 0 1 0 0-1.2.6.6 0 0 0 0 1.2Z"
                            />
                            <Path
                                stroke="#222"
                                strokeWidth={1.2}
                                d="M12 16v-.857c0-.714.357-1.381.951-1.777l.599-.4a3.257 3.257 0 0 0 1.45-2.71V10a3 3 0 1 0-6 0"
                            />
                        </Svg>
                    </View>
                    {type === 1 ? <AccountSettings /> : type === 2 ? <GroupAccountSettings /> : <SavingAccountSettings />}
                </View>
                <TouchableOpacity 
                    style={styles.sendButton}
                    onPress={() => navigation.reset({
                        index: 0,
                        routes: [{name: 'AccountHome', params: {token}}]
                    })}
                >
                    <Text style={styles.sendButtonText}>나가기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    innerContainer: {
        flex: 1,
        height: '100%',
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        alignItems: 'center',
        // display: 'flex'
        // justifyContent: 'center',
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
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
        marginTop: 30,
        marginLeft: 100,
    },
    accountName: {
        fontSize: 35,
        fontWeight: 'bold',
        marginRight: 10,
    },
    line: {
        borderTopColor: '#B7E1CE',
        borderTopWidth: 1,
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 15,
    },
    settingsContainer: {
        width: '80%',
        marginTop: 30,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    settingText: {
        fontSize: 16,
        paddingLeft: 10
    },
    membersInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: Platform.OS === 'ios'? 120 : 80
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
        marginTop: Platform.OS === 'ios'? 50 : 30,
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