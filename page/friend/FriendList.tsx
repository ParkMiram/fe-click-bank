import {
    Platform,
    StatusBar,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity
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

export default function FriendList() {
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
        padding: 20,
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
});