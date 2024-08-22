import React, {useEffect, useState} from "react";
import {
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
    FlatList,
    Alert, Dimensions
} from "react-native";
import {Circle, Path, Svg} from "react-native-svg";
import { getFriends, waitGroupMember } from "../../component/api/NewAccountApi";
import MyFriendSearch from "../friend/MyFriendSearch";

interface props {
    token: string;
    account: string;
}

interface GroupMemberInfo {
    id: string,
    code: string;
    name: string;
    img: string;
    admin: boolean;
}

interface GroupMemberRequset {
    id: string;
    code: string;
    img: string;
    name: string;
    rank: number;
}

interface ToggleButtonProps {
    item: GroupMemberRequset;
    isActive: boolean;
    onToggle: (item: GroupMemberRequset, isActive: boolean) => void;
}

const {width, height} = Dimensions.get('window');

export default function AccountInviteFriends({ navigation, route }: any) {
    const { token, account }: props = route.params;
    const [groupMember, setGroupMember] = useState<GroupMemberInfo[]>([]);
    const [members, setMembers] = useState<GroupMemberRequset[]>([]);
    // 내 친구 검색
    const [srchMyFriend, setSrchMyFriend] = useState('');

    console.log("members : "+members.length)

    // 내 친구 내 검색
    const searchFriends = groupMember.filter((friend: { name: string | string[]; }) =>
        friend.name.includes(srchMyFriend)
    );

    const ToggleButton = ({ item, isActive, onToggle }: ToggleButtonProps) => {
        const [color, setColor] = useState(isActive ? '#007378' : '#ddd');
        const [fillColor, setFillColor] = useState(isActive ? '#007378' : '#fff');
        const [fontColor, setFontColor] = useState(isActive ? '#fff' : '#ddd');

        const handlePress = () => {
            const newColor = color === '#ddd' ? '#007378' : '#ddd';
            setColor(newColor);
            setFillColor(newColor);
            setFontColor(newColor === '#ddd' ? '#ddd' : '#fff');
            onToggle(item, newColor === '#007378');
        };

        return (
            <TouchableOpacity style={styles.checkbox} onPress={handlePress}>
                <Svg
                    width={30} height={30} fill="none"
                    viewBox="0 0 24 24"
                >
                    <Circle cx={12} cy={12} r={9} stroke={color} fill={fillColor} />
                    <Path stroke={fontColor} d="m8 12 3 3 5-6" />
                </Svg>
            </TouchableOpacity>
        );
    };

    const handleToggle = (item: GroupMemberRequset, isActive: boolean) => {
        if (isActive) {
            setMembers(prevMembers => [...prevMembers, item]);
        } else {
            setMembers(prevMembers => prevMembers.filter(member => member.id !== item.id));
        }
    };

    const handleMembersPress = async () => {
        try {
            const response = await waitGroupMember(token, account, members);
            console.log('API Response:', response.data);
            Alert.alert("모임 통장 초대", "초대되었습니다.")
            navigation.goBack();
        } catch (error) {
            // Handle error
            console.log(members);
            Alert.alert('Error', 'Failed to send invitation');
        }
    };

    const fetchData = async () => {
        try {
            const response = await getFriends(token, account);
            setGroupMember(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert("모임 통장 초대", "모임에 초대할 멤버가 없습니다.")
            navigation.navigate("AccountDetail", { token })
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderItem = ({ item }: { item: any }) => {
        const isActive = members.some(member => member.code === item.code);

        return (
            <View style={[styles.list, item.index === groupMember.length - 1 ? { marginBottom: 110 } : null]}>
                <View style={styles.friend}>
                    {
                        item.img === '' ?
                            <Svg
                                width={40}
                                height={40}
                                fill="none"
                                viewBox="0 0 30 30"
                                style={{ marginRight: 10 }}
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
                            <Image source={{ uri: item.img }} style={ styles.profile } />
                    }
                    <Text style={styles.friendName}>{item.name}</Text>
                </View>
                <ToggleButton item={item} isActive={isActive} onToggle={handleToggle} />
            </View>
        )
    };

    const FriendList = () => {
        return (
            <>
                <View style={styles.wrap}>
                    <View style={styles.title}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Svg
                                width={10}
                                height={16}
                                fill="none"
                                viewBox="0 0 8 14"
                            >
                                <Path stroke="#222" d="M7 1 1 7l6 6"/>
                            </Svg>
                        </TouchableOpacity>
                        <Text style={styles.titleTxt}>모임 통장 초대</Text>
                    </View>
                    {/* search */}
                    <View style={styles.searchWrap}>
                        {/*<TextInput style={styles.searchInpt} placeholder='내 친구 검색하기'/>*/}
                        {/*<TouchableOpacity>*/}
                        {/*    <Svg*/}
                        {/*        width={14}*/}
                        {/*        height={14}*/}
                        {/*        fill="none"*/}
                        {/*    >*/}
                        {/*        <Circle cx={6.25} cy={6.25} r={5.25} stroke="#404040"/>*/}
                        {/*        <Path stroke="#404040" strokeLinecap="round" d="m13 13-3-3"/>*/}
                        {/*    </Svg>*/}
                        {/*</TouchableOpacity>*/}
                        <MyFriendSearch
                            srchMyFriend={srchMyFriend}
                            setSrchMyFriend={setSrchMyFriend}
                        />
                    </View>
                    <View style={styles.listWrap}>
                        {/* list */}
                        <FlatList
                            data={searchFriends}
                            renderItem={renderItem}
                            keyExtractor={item => item.code.toString()}
                        />
                    </View>
                </View>
            </>
        )
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <FriendList />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={handleMembersPress}
                >
                    <Text style={styles.sendButtonText}>초대하기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    innerContainer: {
        flex: 1,
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    },
    wrap: {
        width: '100%',
        flex: 1,
    },
    title: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 20
    },
    titleTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10
    },
    searchWrap: {
        width: '100%',
        backgroundColor: '#f8f8f8',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
    },
    searchInpt: {
        flex: 1,
    },
    searchIcon: {
        flex: 0,
        marginLeft: 10
    },
    listWrap: {
        width: width - 40,
        backgroundColor: '#fff',
        margin: 20
    },
    list: {
        width: '100%',
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
        height: 40,
        borderRadius: 20
    },
    friendName: {
        fontWeight: '500',
        fontSize: 16,
    },
    checkbox: {
        width: 30,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButton: {
        backgroundColor: '#007378',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: width - 40,
        marginHorizontal: 20,
        alignSelf: 'center',
        marginBottom: 20
    },
    sendButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff'
    },
});