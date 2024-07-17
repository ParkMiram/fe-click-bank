import React, {useState} from "react";
import {
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from "react-native";
import {SwipeListView} from 'react-native-swipe-list-view';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import FriendSearch from "./FriendSearch";
import {Circle, Path, Rect, Svg} from "react-native-svg";

const data: any[] = [
    { friend_id: 1, user_nickname: '박성무', profile: null },
    { friend_id: 2, user_nickname: '박분도', profile: null },
];

const renderItem = (item: any, rowMap: any) => {
    return (
        <View style={[styles.list, item.index === data.length - 1 ? { marginBottom: 110 } : null]}>
            <View style={styles.friend}>
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
                    <Circle cx={15} cy={11.667} r={6.667} fill="#7E869E" fillOpacity={0.5} />
                    <Path
                        fill="#7E869E"
                        fillOpacity={0.5}
                        fillRule="evenodd"
                        d="M25.433 25.52c.057.097.04.22-.042.298A14.95 14.95 0 0 1 15 30a14.95 14.95 0 0 1-10.391-4.182.243.243 0 0 1-.042-.298C6.484 22.247 10.436 20 15 20s8.516 2.246 10.433 5.52Z"
                        clipRule="evenodd"
                    />
                </Svg>
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
                        {/*<Image source={require('../../assets/image/search.png')} style={styles.searchIcon} />*/}
                        <Svg
                            width={14}
                            height={14}
                            fill="none"
                        >
                            <Circle cx={6.25} cy={6.25} r={5.25} stroke="#404040" />
                            <Path stroke="#404040" strokeLinecap="round" d="m13 13-3-3" />
                        </Svg>
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
                        {/*<Image source={require('../../assets/image/basicProfile.png')} style={styles.profile}/>*/}
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
                            <Circle cx={15} cy={11.667} r={6.667} fill="#7E869E" fillOpacity={0.5} />
                            <Path
                                fill="#7E869E"
                                fillOpacity={0.5}
                                fillRule="evenodd"
                                d="M25.433 25.52c.057.097.04.22-.042.298A14.95 14.95 0 0 1 15 30a14.95 14.95 0 0 1-10.391-4.182.243.243 0 0 1-.042-.298C6.484 22.247 10.436 20 15 20s8.516 2.246 10.433 5.52Z"
                                clipRule="evenodd"
                            />
                        </Svg>
                        <Text style={styles.friendName}>임서연</Text>
                    </View>
                    <View style={styles.requestBtnWrap}>
                        <TouchableOpacity style={styles.confirmBtn}>
                            {/*<Image source={require('../../assets/image/confirm.png')}/>*/}
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
                        <TouchableOpacity style={styles.rejectBtn}>
                            {/*<Image source={require('../../assets/image/reject.png')}/>*/}
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
                <View style={styles.list}>
                    <View style={styles.friend}>
                        {/*<Image source={require('../../assets/image/basicProfile.png')} style={styles.profile}/>*/}
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
                            <Circle cx={15} cy={11.667} r={6.667} fill="#7E869E" fillOpacity={0.5} />
                            <Path
                                fill="#7E869E"
                                fillOpacity={0.5}
                                fillRule="evenodd"
                                d="M25.433 25.52c.057.097.04.22-.042.298A14.95 14.95 0 0 1 15 30a14.95 14.95 0 0 1-10.391-4.182.243.243 0 0 1-.042-.298C6.484 22.247 10.436 20 15 20s8.516 2.246 10.433 5.52Z"
                                clipRule="evenodd"
                            />
                        </Svg>
                        <Text style={styles.friendName}>이수진</Text>
                    </View>
                    <View style={styles.requestBtnWrap}>
                        <TouchableOpacity style={styles.confirmBtn}>
                            {/*<Image source={require('../../assets/image/confirm.png')}/>*/}
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
                        <TouchableOpacity style={styles.rejectBtn}>
                            {/*<Image source={require('../../assets/image/reject.png')}/>*/}
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
                <View style={styles.list}>
                    <View style={styles.friend}>
                        {/*<Image source={require('../../assets/image/basicProfile.png')} style={styles.profile}/>*/}
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
                            <Circle cx={15} cy={11.667} r={6.667} fill="#7E869E" fillOpacity={0.5} />
                            <Path
                                fill="#7E869E"
                                fillOpacity={0.5}
                                fillRule="evenodd"
                                d="M25.433 25.52c.057.097.04.22-.042.298A14.95 14.95 0 0 1 15 30a14.95 14.95 0 0 1-10.391-4.182.243.243 0 0 1-.042-.298C6.484 22.247 10.436 20 15 20s8.516 2.246 10.433 5.52Z"
                                clipRule="evenodd"
                            />
                        </Svg>
                        <Text style={styles.friendName}>김재민</Text>
                    </View>
                    <View style={styles.requestBtnWrap}>
                        <TouchableOpacity style={styles.confirmBtn}>
                            {/*<Image source={require('../../assets/image/confirm.png')}/>*/}
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
                        <TouchableOpacity style={styles.rejectBtn}>
                            {/*<Image source={require('../../assets/image/reject.png')}/>*/}
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
                            // <Image source={require('../../assets/image/list.png')} />
                            <Svg
                                width={14}
                                height={17}
                                fill="none"
                            >
                                <Rect width={14} height={17} fill="#7E869E" fillOpacity={0.25} rx={2} />
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
                    component={FriendRequestList}
                    options={{
                        tabBarLabel: '친구 요청',
                        tabBarIcon: () => (
                            // <Image source={require('../../assets/image/send.png')} />
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
                                {/*<Image source={require('../../assets/image/add.png')}/>*/}
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