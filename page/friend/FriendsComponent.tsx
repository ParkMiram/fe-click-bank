import React, {useEffect, useState} from "react";
import {
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity, Image, FlatList, Alert
} from "react-native";
import {SwipeListView} from 'react-native-swipe-list-view';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import FriendSearch from "./FriendSearch";
import {Circle, Path, Rect, Svg} from "react-native-svg";
import axios, {AxiosResponse} from "axios";
import FriendInvite from "./FriendInvite";

export default function FriendsComponent({ route }: any) {
    const { token } = route.params;
    const bearerToken: string = `Bearer ${token}`;

    // state
    // 친구 목록
    const [friendListData, setFriendListData] = useState([{
        id: '',
        img: '',
        name: ''
    }]);
    // 친구 요청 목록
    const [friendRequestListData, setFriendRequestListData] = useState([{
        id: '',
        code: '',
        img: '',
        name: ''
    }]);
    // 친구 추가
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isInviteModalVisible, setisInviteModalVisible] = useState(false);

    // 친구 목록 조회
    const getFriendList = async (): Promise<void> => {
        try {
            const response: AxiosResponse<any, any> = await axios.get('http://34.135.133.145:30000/api/v1/friends', {
                headers: {
                    Authorization: bearerToken
                }
            });
            setFriendListData(response.data);
        } catch (error: any) {
            if (error.response) {
                console.log('Error:', error.response.data);
                Alert.alert(
                    "내 친구",
                    error.response.data
                );
            } else {
                console.log('Error:', error.message);
                Alert.alert(
                    "내 친구",
                    error.message
                );
            }
        }
    };
    // 친구 요청 목록 조회
    const getFriendRequestList = async ():Promise<void> => {
        setFriendRequestListData([]);
        try {
            const response: AxiosResponse<any, any> = await axios.get('http://34.135.133.145:30000/api/v1/friends/request', {
                headers: {
                    Authorization: bearerToken
                }
            });
            setFriendRequestListData(response.data);
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
    // 친구 요청 수락
    const confirmRequest = async (code: string):Promise<void> => {
        try {
            const response: AxiosResponse<any, any> = await axios.put(`http://34.135.133.145:30000/api/v1/friends/request/confirm/${code}`, {}, {
                headers: {
                    Authorization: bearerToken
                }
            });
            Alert.alert(
                "친구 요청",
                `${response.data}🤝`
            );
            getFriendRequestList();
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
                    error.message
                );
            }
        }
    }
    // 친구 요청 거절
    const rejectRequest = (code: string): void => {
        Alert.alert(
            "친구 요청",
            "거절하시겠습니까?",
            [
                {
                    text: "취소",
                    style: "default"
                },
                {
                    text: "거절",
                    style: "destructive",
                    onPress: async (): Promise<void> => {
                        try {
                            const response: AxiosResponse<any, any> = await axios.delete(`http://34.135.133.145:30000/api/v1/friends/request/reject/${code}`, {
                                headers: {
                                    Authorization: bearerToken
                                }
                            });
                            Alert.alert(
                                "친구 요청",
                                response.data
                            );
                            getFriendRequestList();
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
                                    error.message
                                );
                            }
                        }
                    }
                }
            ]
        );
    }
    // 친구 삭제
    const deleteFriend = (code: string): void => {
        Alert.alert(
            "친구 삭제",
            "친구를 정말 삭제하시겠습니까?",
            [
                {
                    text: "취소",
                    style: "default"
                },
                {
                    text: "삭제",
                    style: "destructive",
                    onPress: async (): Promise<void> => {
                        try {
                            const response: AxiosResponse<any, any> = await axios.delete(`http://34.135.133.145:30000/api/v1/friends/${code}`, {
                                headers: {
                                    Authorization: bearerToken
                                }
                            });
                            Alert.alert(
                                "친구 요청",
                                response.data
                            );
                            getFriendList();
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
                                    error.message
                                );
                            }
                        }
                    }
                }
            ]
        );
    }

    const toggleModal = (): void => {
        setIsModalVisible(!isModalVisible);
    };

    const toggleInviteModal = (): void => {
        setisInviteModalVisible(!isInviteModalVisible);
    }

    // useEffect
    useEffect(() => {
        getFriendList();
        getFriendRequestList();
    }, []);

    const renderItem = (data: any) => {
        return (
            <View style={[styles.list, data.index === friendListData.length - 1 ? { marginBottom: 110 } : null]}>
                <View style={styles.friend}>
                    {
                        data.item.img === '' ?
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
                            <Image source={{ uri: data.item.img }} style={ styles.profile } />
                    }
                    <Text style={styles.friendName}>{data.item.name}</Text>
                </View>
                <TouchableOpacity style={styles.transfer}>
                    <Text style={styles.transferTxt}>송금</Text>
                </TouchableOpacity>
            </View>
        )
    };

    const renderHiddenItem = (data: any, rowMap: any) => (
        <View style={styles.hiddenItemWrap}>
            <TouchableOpacity
                style={styles.hiddenItem}
                onPress={() => deleteFriend(data.item.code)}
            >
                <Text style={styles.hiddenItemTxt}>삭제</Text>
            </TouchableOpacity>
        </View>
    );

    const FriendList = () => {
        return (
            <>
                <View style={styles.wrap}>
                    {/* search */}
                    <View style={styles.searchWrap}>
                        <TouchableOpacity
                            style={styles.bell}
                            onPress={toggleInviteModal}
                        >
                            <Svg
                                width={18}
                                height={18}
                                fill="none"
                            >
                                <Path
                                    fill="#FF9318"
                                    d="M3 6a6 6 0 0 1 12 0v1.83a7.83 7.83 0 0 0 1.116 4.03l.553.922c.367.612.551.918.564 1.168a1 1 0 0 1-.529.932c-.22.118-.577.118-1.29.118H2.586c-.713 0-1.07 0-1.29-.118a1 1 0 0 1-.529-.932c.013-.25.197-.556.564-1.168l.553-.922A7.83 7.83 0 0 0 3 7.83V6ZM11.35 16a.14.14 0 0 1 .143.15c-.045.475-.3.925-.725 1.264C10.298 17.79 9.663 18 9 18s-1.299-.21-1.768-.586c-.424-.34-.68-.789-.725-1.264A.14.14 0 0 1 6.65 16h4.7Z"
                                />
                            </Svg>
                            <Text style={styles.inviteTxt}>모임통장</Text>
                        </TouchableOpacity>
                        <TextInput style={styles.searchInpt} placeholder='내 친구 검색하기'/>
                        <TouchableOpacity
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
                    <View style={styles.listWrap}>
                        <View>
                            {/* list */}
                            {
                                friendListData.length > 0 ?
                                    <SwipeListView
                                        style={styles.friendList}
                                        data={friendListData}
                                        renderItem={renderItem}
                                        renderHiddenItem={renderHiddenItem}
                                        rightOpenValue={-55}
                                    />
                                    :
                                    <View style={styles.noList}>
                                        <Text style={styles.noListTxt}>친구가 없습니다.</Text>
                                    </View>
                            }
                        </View>
                    </View>
                </View>
            </>
        )
    };

    const FriendRequestList = () => {
        return (
            <>
                {
                    friendRequestListData.length > 0 ?
                        <FlatList
                            data={friendRequestListData}
                            keyExtractor={item => item.id}
                            style={styles.listWrap}
                            renderItem={({item}) => {
                                return (
                                    <View style={styles.list}>
                                        <View style={styles.friend}>
                                            {
                                                item.img === '' ?
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
                                                    <Image source={{ uri: item.img }} style={ styles.profile } />
                                            }
                                            <Text style={styles.friendName}>{item.name}</Text>
                                        </View>
                                        <View style={styles.requestBtnWrap}>
                                            <TouchableOpacity
                                                style={styles.confirmBtn}
                                                onPress={() => confirmRequest(item.code)}
                                            >
                                                <Svg
                                                    width={12}
                                                    height={9}
                                                    fill="none"
                                                >
                                                    <Path
                                                        stroke="#007378"
                                                        strokeLinecap="round"
                                                        d="m1 4.333 3.227 3.228a.15.15 0 0 0 .212 0L11 1"
                                                    />
                                                </Svg>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.rejectBtn}
                                                onPress={() => rejectRequest(item.code)}
                                            >
                                                <Svg
                                                    width={10}
                                                    height={10}
                                                    fill="none"
                                                >
                                                    <Path
                                                        stroke="#5F5F5F"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M9 1 1 9M1 1l8 8"
                                                    />
                                                </Svg>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            }
                        />
                        :
                        <View style={styles.listWrap}>
                            <View style={styles.noList}>
                                <Text style={styles.noListTxt}>요청이 없습니다.</Text>
                            </View>
                        </View>
                }
            </>
        )
    };

    const Tab = createBottomTabNavigator();

    return (
        // <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
            <Tab.Navigator
                initialRouteName="내 친구"
                screenOptions={{
                    tabBarStyle: {
                        ...styles.tabWrap
                    },
                    tabBarActiveTintColor: '#007378',
                    tabBarInactiveTintColor: 'gray',
                    tabBarIcon: () => null,
                }}
            >
                <Tab.Screen
                    name="내 친구"
                    component={FriendList}
                    options={{
                        tabBarLabel: '내 친구',
                        tabBarIcon: () => (
                            <Svg
                                width={14}
                                height={17}
                                fill="none"
                            >
                                <Rect width={14} height={17} fill="#7E869E" fillOpacity={0.25} rx={2}/>
                                <Path
                                    stroke="#007378"
                                    strokeLinecap="round"
                                    strokeWidth={1.2}
                                    d="M4 5h6M4 9h6M4 13h4"
                                />
                            </Svg>
                        ),
                        tabBarButton: (props: any) => (
                            <TouchableOpacity
                                {...props}
                                style={{
                                    backgroundColor: props.accessibilityState.selected ? 'white' : 'transparent',
                                    ...styles.tab
                                }}
                            />
                        ),
                    }}
                    listeners={{
                        tabPress: e => {
                            getFriendList();
                        }
                    }}
                />
                <Tab.Screen
                    name="친구 요청"
                    component={FriendRequestList}
                    options={{
                        tabBarLabel: '친구 요청',
                        tabBarIcon: () => (
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
                        ),
                        tabBarBadge: friendRequestListData.length,
                        tabBarButton: (props: any) => (
                            <TouchableOpacity
                                {...props}
                                style={{
                                    backgroundColor: props.accessibilityState.selected ? 'white' : 'transparent',
                                    ...styles.tab
                                }}
                            />
                        ),
                    }}
                    listeners={{
                        tabPress: e => {
                            getFriendRequestList();
                        }
                    }}
                />
                <Tab.Screen
                    name="검색"
                    component={FriendRequestList}
                    options={{
                        tabBarIcon: () => null,
                        tabBarButton: (props: any) => (
                            <TouchableOpacity
                                {...props}
                                style={{
                                    ...styles.add
                                }}
                                onPress={toggleModal}
                            >
                                <Svg
                                    width={14}
                                    height={14}
                                    fill="none"
                                >
                                    <Path
                                        stroke="#222"
                                        strokeLinecap="round"
                                        strokeWidth={1.2}
                                        d="M7 1v12M13 7H1"
                                    />
                                </Svg>
                            </TouchableOpacity>
                        ),
                    }}
                />
            </Tab.Navigator>
            {
                isModalVisible &&
                <FriendSearch
                    isModalVisible={isModalVisible}
                    toggleModal={toggleModal}
                    bearerToken={bearerToken}
                />
            }
            {
                isInviteModalVisible &&
                <FriendInvite
                    isInviteModalVisible={isInviteModalVisible}
                    toggleInviteModal={toggleInviteModal}
                    bearerToken={bearerToken}
                />
            }
        </View>
        // </SafeAreaView>
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
    },
    bell: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50
    },
    inviteTxt: {
        fontSize: 10,
        marginTop: 5,
        color: '#888888'
    },
    searchInpt: {
        flex: 1,
    },
    searchIcon: {
        flex: 0,
        marginLeft: 10,
        paddingHorizontal: 15,
        paddingVertical: 20
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
    noList: {
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',
    },
    noListTxt: {
        color: '#aaa',
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
    requestBtnWrap: {
        flexDirection: 'row'
    },
    confirmBtn: {
        width: 60,
        height: 30,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 115, 120, 0.2)',
        marginRight: 5,
    },
    rejectBtn: {
        width: 30,
        height: 30,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(95, 95, 95, 0.2)',
    },
    transfer: {
        width: 50,
        height: 30,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 115, 120, 0.2)',
    },
    transferTxt: {
        color: '#007378',
        fontWeight: 'bold',
        lineHeight: 18,
    },
    hiddenItemWrap: {
        height: 40,
        position: 'absolute',
        right: 0,
        justifyContent: 'center',
    },
    hiddenItem: {
        width: 50,
        height: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    hiddenItemTxt: {
        color: 'white',
        lineHeight: 18
    },
    tabWrap: {
        position: 'absolute',
        left: '50%',
        transform: [{translateX: -125}],
        bottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
        padding: 5,
        paddingBottom: 5,
        height: 50,
        borderRadius: 25,
        borderTopWidth: 0,
        width: 250,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    tab: {
        marginLeft: 5,
        width: 95,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    on: {
        backgroundColor: '#ffffff',
    },
    add: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d5d5d5',
        borderRadius: 20,
        marginLeft: 5
    }
});