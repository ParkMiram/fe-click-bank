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
    Alert
} from "react-native";
import {Circle, Path, Svg} from "react-native-svg";
import { getFriends, waitGroupMember } from "../../component/api/NewAccountApi";


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
    id: string,
    code: string,
    img: string,
    name: string
}

interface ToggleButtonProps {
    item: GroupMemberRequset;
    isActive: boolean;
    onToggle: (item: GroupMemberRequset, isActive: boolean) => void;
}

export default function AccountInviteFriends({ navigation, route }: any) {
    const { token, account }: props = route.params;
    const [groupMember, setGroupMember] = useState<GroupMemberInfo[]>([]);
    const [members, setMembers] = useState<GroupMemberRequset[]>([]);

    const ToggleButton = ({ item, isActive, onToggle }: ToggleButtonProps) => {
        const [color, setColor] = useState(isActive ? '#1D9287' : '#6BC29A');
        const [fillColor, setFillColor] = useState(isActive ? '#1D9287' : 'none');
        const [fontColor, setFontColor] = useState(isActive ? '#ffffff' : '#6BC29A');
    
        const handlePress = () => {
            const newColor = color === '#6BC29A' ? '#1D9287' : '#6BC29A';
            setColor(prevColor => (prevColor === '#6BC29A' ? '#1D9287' : '#6BC29A'));
            setFillColor(prevFillColor => (prevFillColor === 'none' ? '#1D9287' : 'none'));
            setFontColor(prevFontColor => (prevFontColor === '#6BC29A' ? '#ffffff' : '#6BC29A'));
            onToggle(item, newColor === '#1D9287');
        };
    
        return (
            <TouchableOpacity style={styles.transfer} onPress={handlePress}>
                <Svg width={24} height={24} fill="none">
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
            navigation.goBack();
        } catch (error) {
            // Handle error
            console.log(members);
            Alert.alert('Error', 'Failed to send invitation');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getFriends(token, account);
                setGroupMember(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
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
                        <Text style={styles.titleTxt}>모임 통장 초대</Text>
                    </View>
                    {/* search */}
                    <View style={styles.searchWrap}>
                        <TextInput style={styles.searchInpt} placeholder='내 친구 검색하기'/>
                        <TouchableOpacity>
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
                    <View style={styles.listWrap}>
                        <View>
                            {/* list */}
                            <FlatList
                                data={groupMember}
                                renderItem={renderItem}
                                keyExtractor={item => item.code.toString()}
                            />
                        </View>
                    </View>
                </View>
            </>
        )
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <FriendList />
                <View style={styles.footer} >
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={handleMembersPress}
                    >
                        <Text style={styles.sendButtonText}>초대하기</Text>
                    </TouchableOpacity>
                </View>
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
        height: '100%',
    },
    title: {
        width: '100%',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee'
    },
    titleTxt: {
        fontSize: 16,
        fontWeight: "500"
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
    listWrap: {
        height: '100%',
        padding: 20,
        backgroundColor: '#fff',
    },
    friendList: {
        position: 'relative',
        backgroundColor: '#ffffff',
        paddingBottom: 120,
        width: '100%'
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
        height: 40,
        borderRadius: 20
    },
    friendName: {
        fontWeight: '500',
        fontSize: 16,
    },
    transfer: {
        width: 50,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    sendButton: {
        marginTop: Platform.OS === 'ios'? 50 : 30,
        backgroundColor: '#B7E1CE',
        padding: 16,
        alignItems: 'center',
        borderRadius: 25,
        width: '60%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 30,
    },
    sendButtonText: {
        fontWeight: '500',
        fontSize: 16,
    },
});