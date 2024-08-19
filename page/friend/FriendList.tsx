import {
    Alert,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {Circle, Path, Svg} from "react-native-svg";
import {SwipeListView} from "react-native-swipe-list-view";
import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import MyFriendSearch from "./MyFriendSearch";

// 내 친구 목록
export default function FriendList({ navigation, ...props }: any) {

    // props
    const {myAccount, friendListData, getFriendList, toggleInviteModal, bearerToken, friendLoading} = props;

    // state
    // 새로고침
    const [isRefreshing, setIsRefreshing] = useState(false);
    // 내 친구 검색
    const [srchMyFriend, setSrchMyFriend] = useState('');

    // event
    // 친구 삭제
    const deleteFriend = (code: string): void => {
        Alert.alert("친구 삭제", "친구를 정말 삭제하시겠습니까?", [
                { text: "취소", style: "default" },
                { text: "삭제", style: "destructive",
                    onPress: async (): Promise<void> => {
                        try {
                            const response: AxiosResponse<any, any> = await axios.delete(`https://just-click.shop/api/v1/friends/${code}`, {
                                headers: {
                                    Authorization: bearerToken
                                }
                            });
                            Alert.alert("친구 요청", response.data);
                            getFriendList();
                        } catch (error: any) {
                            if (error.response) {
                                console.log('Error:', error.response.data);
                                Alert.alert("친구 요청", error.response.data);
                            } else {
                                console.log('Error:', error.message);
                                Alert.alert("친구 요청", error.message);
                            }
                        }
                    }
                }
            ]
        );
    }

    // 내 친구 내 검색
    const searchFriends = friendListData.filter((friend: { name: string | string[]; }) =>
        friend.name.includes(srchMyFriend)
    );

    // 친구 목록
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
                <TouchableOpacity
                    style={styles.transfer}
                    onPress={() => transferFriend(data.item.account)}
                >
                    <Text style={styles.transferTxt}>송금</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // 송금
    const transferFriend = async (data: string): Promise<void> => {
        const token = bearerToken.split(' ')[1];

        navigation.navigate('SendingTransfer', {
            bank: "click",
            accountNumber: data,
            account: myAccount,
            category: 10,
            token: token
        });
    }

    // 친구 삭제
    const renderHiddenItem = (data: any) => {
        return (
            <View style={styles.hiddenItemWrap}>
                <TouchableOpacity
                    style={styles.hiddenItem}
                    onPress={() => deleteFriend(data.item.code)}
                >
                    <Text style={styles.hiddenItemTxt}>삭제</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // pull to refresh
    const handleRefresh = async () => {
        setIsRefreshing(true);
        await getFriendList();
        setTimeout(() => {
            setIsRefreshing(false);
        }, 2000);
    };

    // useEffect
    useEffect(() => {

    }, []);

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
                    <MyFriendSearch
                        srchMyFriend={srchMyFriend}
                        setSrchMyFriend={setSrchMyFriend}
                    />
                </View>
                <View style={styles.listWrap}>
                    <View>
                        {/* list */}
                        {
                            friendLoading ?
                                friendListData.length > 0 ?
                                    <SwipeListView
                                        style={styles.friendList}
                                        data={searchFriends}
                                        renderItem={renderItem}
                                        renderHiddenItem={renderHiddenItem}
                                        rightOpenValue={-55}
                                        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh}/>}
                                    />
                                    :
                                    <ScrollView
                                        style={styles.listWrap}
                                        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh}/>}
                                    >
                                        <View style={styles.noList}>
                                            <Text style={styles.noListTxt}>친구가 없습니다.</Text>
                                        </View>
                                    </ScrollView>
                                :
                                <Text style={styles.loading}>불러오는 중...</Text>
                        }
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    wrap: {
        width: '100%',
        height: '100%',
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
    loading: {
        textAlign: 'center',
        color: '#aaaaaa',
        marginTop: 20
    }
})