import React, {useEffect, useState} from "react";
import {
    Platform,
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity, Alert
} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import FriendSearch from "./FriendSearch";
import {Path, Rect, Svg} from "react-native-svg";
import FriendInvite from "./FriendInvite";
import FriendList from "./FriendList";
import FriendRequestList from "./FriendRequestList";
import axios, {AxiosResponse} from "axios";

export default function MyFriend({ navigation, route }: any) {
    const { token } = route.params;
    const bearerToken: string = `Bearer ${token}`;

    // state
    // 내 계좌
    const [myAccount, setMyAccount] = useState('');
    // 친구 목록
    const [friendListData, setFriendListData] = useState([{ id: '', img: '', name: '' }]);
    const [friendLoading, setFriendLoading] = useState(false);
    // 친구 요청 목록
    const [friendRequestListData, setFriendRequestListData] = useState([{ id: '', code: '', img: '', name: '' }]);
    const [tabBarBadge, setTabBarBadge] = useState(0);
    const [friendRequestLoading, setFriendRequestLoading] = useState(false);
    // 친구 추가
    const [isModalVisible, setIsModalVisible] = useState(false);
    // 모임 통장 초대 모달
    const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);

    // event
    // 친구 목록 조회
    const getFriendList = async (): Promise<void> => {
        try {
            const response: AxiosResponse<any, any> = await axios.get('https://just-click.shop/api/v1/friends', {
                headers: {
                    Authorization: bearerToken
                }
            });
            setFriendListData(response.data.friendInfo);
            setFriendLoading(true);
            setMyAccount(response.data.myAccount);
        } catch (error: any) {
            if (error.response) {
                console.log('Error:', error.response.data);
                Alert.alert("내 친구", error.response.data);
            } else {
                console.log('Error:', error.message);
                Alert.alert("내 친구", error.message);
            }
        }
    };

    // 친구 요청 조회
    const getFriendRequestList = async ():Promise<void> => {
        setFriendRequestListData([]);
        try {
            const response: AxiosResponse<any, any> = await axios.get('https://just-click.shop/api/v1/friends/request', {
                headers: {
                    Authorization: bearerToken
                }
            });
            setFriendRequestListData(response.data);
            setTabBarBadge(response.data.length);
            setFriendRequestLoading(true);
        } catch (error: any) {
            if (error.response) {
                console.log('Error:', error.response.data);
                Alert.alert("Error", error.response.data);
            } else {
                console.log('Error:', error.message);
                Alert.alert("Error", error.response);
            }
        }
    }

    // modal
    const toggleModal = (): void => {
        setIsModalVisible(!isModalVisible);
    };
    const toggleInviteModal = (): void => {
        setIsInviteModalVisible(!isInviteModalVisible);
    }

    // useEffect
    useEffect(() => {
        getFriendList();
        getFriendRequestList();
    }, []);

    const Tab = createBottomTabNavigator();

    // 내 친구
    const FriendListComponent = () => {
        return (
            <FriendList
                navigation={navigation}
                myAccount={myAccount}
                friendListData={friendListData}
                getFriendList={getFriendList}
                toggleInviteModal={toggleInviteModal}
                bearerToken={bearerToken}
                friendLoading={friendLoading}
                setFriendLoading={setFriendLoading}
            />
        )
    }

    // 친구 요청
    const FriendRequestListComponent = () => {
        return (
            <FriendRequestList
                friendRequestListData={friendRequestListData}
                getFriendRequestList={getFriendRequestList}
                bearerToken={bearerToken}
                friendRequestLoading={friendRequestLoading}
                setFriendRequestLoading={setFriendRequestLoading}
            />
        )
    }

    return (
        <View style={styles.innerContainer}>
            <Tab.Navigator
                initialRouteName="내 친구"
                screenOptions={{
                    tabBarStyle: {
                        ...styles.tabWrap
                    },
                    tabBarActiveTintColor: '#007378',
                    tabBarInactiveTintColor: 'gray',
                    tabBarIcon: (): null => null,
                }}
            >
                <Tab.Screen
                    name="내 친구"
                    component={FriendListComponent}
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
                />
                <Tab.Screen
                    name="친구 요청"
                    component={FriendRequestListComponent}
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
                        tabBarBadge: tabBarBadge,
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
                />
                <Tab.Screen
                    name="검색"
                    component={FriendRequestListComponent}
                    options={{
                        tabBarIcon: (): null => null,
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
    requestBtnWrap: {
        flexDirection: 'row'
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