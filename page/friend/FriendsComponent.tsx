import React, {useState} from "react";
import {
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity, ScrollView
} from "react-native";
import {SwipeListView} from 'react-native-swipe-list-view';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import FriendSearch from "./FriendSearch";

const data: any[] = [
    { friend_id: 1, user_nickname: '박성무', profile: null },
    { friend_id: 2, user_nickname: '박분도', profile: null },
];
const renderItem = (item: any, rowMap: any) => {
    return (
        <View style={[styles.list, item.index === data.length - 1 ? { marginBottom: 110 } : null]}>
            <View style={styles.friend}>
                <Image source={require('../../assets/image/basicProfile.png')} style={styles.profile} />
                <Text style={styles.friendName}>{item.item.user_nickname}</Text>
            </View>
            <TouchableOpacity style={styles.transfer}>
                <Text style={styles.transferTxt}>송금</Text>
            </TouchableOpacity>
        </View>
    )
};

const renderHiddenItem = (data: any, rowMap: any) => (
    <View style={styles.hiddenItemWrap}>
        <TouchableOpacity style={styles.hiddenItem}>
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
                    <TextInput style={styles.searchInpt} placeholder='내 친구 검색하기' />
                    <TouchableOpacity>
                        <Image source={require('../../assets/image/search.png')} style={styles.searchIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.listWrap}>
                    <View style={styles.listMap}>
                        {/* list */}
                        <SwipeListView
                            style={styles.friendList}
                            data={data}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem}
                            rightOpenValue={-55}
                        />
                    </View>
                </View>
            </View>
            {/*<FriendTab />*/}
        </>
    )
};

const FriendRequestList = () => {
    return (
        <>
            <View style={styles.listWrap}>
                {/* list */}
                <View style={styles.list}>
                    <View style={styles.friend}>
                        <Image source={require('../../assets/image/basicProfile.png')} style={styles.profile}/>
                        <Text style={styles.friendName}>임서연</Text>
                    </View>
                    <View style={styles.requestBtnWrap}>
                        <TouchableOpacity style={styles.confirmBtn}>
                            <Image source={require('../../assets/image/confirm.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.rejectBtn}>
                            <Image source={require('../../assets/image/reject.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.list}>
                    <View style={styles.friend}>
                        <Image source={require('../../assets/image/basicProfile.png')} style={styles.profile}/>
                        <Text style={styles.friendName}>이수진</Text>
                    </View>
                    <View style={styles.requestBtnWrap}>
                        <TouchableOpacity style={styles.confirmBtn}>
                            <Image source={require('../../assets/image/confirm.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.rejectBtn}>
                            <Image source={require('../../assets/image/reject.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.list}>
                    <View style={styles.friend}>
                        <Image source={require('../../assets/image/basicProfile.png')} style={styles.profile}/>
                        <Text style={styles.friendName}>김재민</Text>
                    </View>
                    <View style={styles.requestBtnWrap}>
                        <TouchableOpacity style={styles.confirmBtn}>
                            <Image source={require('../../assets/image/confirm.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.rejectBtn}>
                            <Image source={require('../../assets/image/reject.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
};

const Tab = createBottomTabNavigator();

export default function FriendsComponent() {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        // <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
            <Tab.Navigator
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
                            <Image source={require('../../assets/image/list.png')} />
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
                    component={FriendRequestList}
                    options={{
                        tabBarLabel: '친구 요청',
                        tabBarIcon: () => (
                            <Image source={require('../../assets/image/send.png')} />
                        ),
                        tabBarBadge: 3,
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
                                <Image source={require('../../assets/image/add.png')}/>
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
        paddingHorizontal: 20,
        paddingVertical: 15,
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
    listMap: {

    },
    friendList: {
        position: 'relative',
        backgroundColor: '#ffffff',
        paddingBottom: 120
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
        height: 40
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
    tabTxt: {

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