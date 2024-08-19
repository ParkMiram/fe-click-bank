import React, {useEffect, useState} from "react";
import {
    Alert,
    FlatList,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {Circle, Path, Svg} from "react-native-svg";
import axios, {AxiosResponse} from "axios";

export default function FriendRequestList({...props}: any) {

    // props
    const {friendRequestListData, getFriendRequestList, bearerToken} = props;
    // state
    // 새로고침
    const [isRefreshing, setIsRefreshing] = useState(false);

    // event
    // 목록
    const RenderItem = (data: any) => {
        return (
            <View style={styles.list}>
                <View style={styles.friend}>
                    {
                        data.item.img === '' ?
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
                            <Image source={{ uri: data.item.img }} style={ styles.profile } />
                    }
                    <Text style={styles.friendName}>{data.item.name}</Text>
                </View>
                <View style={styles.requestBtnWrap}>
                    <TouchableOpacity
                        style={styles.confirmBtn}
                        onPress={() => confirmRequest(data.item.code)}
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
                        onPress={() => rejectRequest(data.item.code)}
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
        )
    }

    // 친구 요청 수락
    const confirmRequest = async (code: string):Promise<void> => {
        try {
            const response: AxiosResponse<any, any> = await axios.put(`https://just-click.shop/api/v1/friends/request/confirm/${code}`, {}, {
                headers: {
                    Authorization: bearerToken
                }
            });
            Alert.alert("친구 요청", `${response.data}🤝`);
            getFriendRequestList();
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
    // 친구 요청 거절
    const rejectRequest = (code: string): void => {
        Alert.alert("친구 요청", "거절하시겠습니까?",
            [
                { text: "취소", style: "default" },
                { text: "거절", style: "destructive",
                    onPress: async (): Promise<void> => {
                        try {
                            const response: AxiosResponse<any, any> = await axios.delete(`https://just-click.shop/api/v1/friends/request/reject/${code}`, {
                                headers: {
                                    Authorization: bearerToken
                                }
                            });
                            Alert.alert("친구 요청", response.data);
                            getFriendRequestList();
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

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await getFriendRequestList();
        setTimeout(() => {
            setIsRefreshing(false);
        }, 2000);
    };

    useEffect(() => {

    }, []);

    return (
        <>
            {
                friendRequestListData.length > 0 ?
                    <FlatList
                        data={friendRequestListData}
                        keyExtractor={item => item.id}
                        style={styles.listWrap}
                        renderItem={({item}) => {
                            return <RenderItem item={item} />;
                        }}
                        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh}/>}
                    />
                    :
                    <ScrollView
                        style={styles.listWrap}
                        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh}/>}
                    >
                        <View style={styles.noList}>
                            <Text style={styles.noListTxt}>요청이 없습니다.</Text>
                        </View>
                    </ScrollView>
            }
        </>
    )
}

const styles = StyleSheet.create({
    listWrap: {
        height: '100%',
        padding: 20,
        backgroundColor: '#fff',
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
    loading: {
        height: '100%',
        textAlign: 'center',
        color: '#aaaaaa',
        marginTop: 20
    }
})