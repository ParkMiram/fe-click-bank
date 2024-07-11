import {
    Platform,
    StatusBar,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity, ScrollView
} from "react-native";
import {SwipeListView} from 'react-native-swipe-list-view';

const data = [
    { friend_id: 1, user_nickname: '박성무', profile: null },
    { friend_id: 2, user_nickname: '박분도', profile: null },
];
const renderItem = (data: any, rowWrap: any) => (
    <View style={styles.list}>
        <View style={styles.friend}>
            <Image source={require('../../assets/image/basicProfile.png')} style={styles.profile} />
            <Text style={styles.friendName}>{data.item.user_nickname}</Text>
        </View>
        <TouchableOpacity style={styles.transfer}>
            <Text style={styles.transferTxt}>송금</Text>
        </TouchableOpacity>
    </View>
);

const renderHiddenItem = (data: any, rowMap: any) => (
    <View style={styles.hiddenItemWrap}>
        <TouchableOpacity style={styles.hiddenItem}>
            <Text style={styles.hiddenItemTxt}>삭제</Text>
        </TouchableOpacity>
    </View>
);

export default function FriendList({ navigation }: any) {

    // 요청
    const goFriendRequestList = () => {
        navigation.navigate('FriendRequestList');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                {/* Title */}
                <View style={styles.title}>
                    <Text style={styles.titleTxt}>친구 목록</Text>
                </View>
                <View style={styles.wrap}>
                    {/* search */}
                    <View style={styles.searchWrap}>
                        <TextInput style={styles.searchInpt} placeholder='내 친구 검색하기' />
                        <Image source={require('../../assets/image/search.png')} style={styles.searchIcon} />
                    </View>
                    <ScrollView style={styles.listWrap}>
                        <View style={{marginBottom: 50}}>
                            {/* list */}
                            <SwipeListView
                                style={styles.friendList}
                                data={data}
                                renderItem={renderItem}
                                renderHiddenItem={renderHiddenItem}
                                rightOpenValue={-55}
                            />
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.tabWrap}>
                    <TouchableOpacity style={[styles.tab, styles.on]}>
                        <Text style={styles.tabTxt}>내 친구</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.tab}
                        onPress={goFriendRequestList}
                    >
                        <Text style={styles.tabTxt}>요청</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.add}>
                        <Image source={require('../../assets/image/add.png')} />
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
        // justifyContent: 'center',
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
    },
    friendList: {
        position: 'relative',
        backgroundColor: '#ffffff',
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
        fontWeight: 'bold'
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
    },
    tabWrap: {
        position: 'absolute',
        left: '50%',
        transform: [{translateX: -122.5}],
        bottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
        padding: 5,
        height: 50,
        borderRadius: 25,
        width: 245,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    tab: {
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