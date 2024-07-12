import {
    Platform,
    StatusBar,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity, ScrollView, useWindowDimensions
} from "react-native";

export default function FriendRequestList({ navigation }: any) {

    // 내 친구
    const goFriendList = () => {
        navigation.navigate('FriendList');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                {/* Title */}
                <View style={styles.title}>
                    <Text style={styles.titleTxt}>친구 요청 대기</Text>
                </View>
                <ScrollView style={styles.wrap}>
                    <View style={styles.listWrap}>
                        {/* list */}
                        <View style={styles.list}>
                            <View style={styles.friend}>
                                <Image source={require('../../assets/image/basicProfile.png')} style={styles.profile} />
                                <Text style={styles.friendName}>임서연</Text>
                            </View>
                            <View style={styles.requestBtnWrap}>
                                <TouchableOpacity style={styles.confirmBtn}>
                                    <Image source={require('../../assets/image/confirm.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.rejectBtn}>
                                    <Image source={require('../../assets/image/reject.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.list}>
                            <View style={styles.friend}>
                                <Image source={require('../../assets/image/basicProfile.png')} style={styles.profile} />
                                <Text style={styles.friendName}>이수진</Text>
                            </View>
                            <View style={styles.requestBtnWrap}>
                                <TouchableOpacity style={styles.confirmBtn}>
                                    <Image source={require('../../assets/image/confirm.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.rejectBtn}>
                                    <Image source={require('../../assets/image/reject.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.list}>
                            <View style={styles.friend}>
                                <Image source={require('../../assets/image/basicProfile.png')} style={styles.profile} />
                                <Text style={styles.friendName}>김재민</Text>
                            </View>
                            <View style={styles.requestBtnWrap}>
                                <TouchableOpacity style={styles.confirmBtn}>
                                    <Image source={require('../../assets/image/confirm.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.rejectBtn}>
                                    <Image source={require('../../assets/image/reject.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.tabWrap}>
                    <TouchableOpacity
                        style={styles.tab}
                        onPress={goFriendList}
                    >
                        <Text style={styles.tabTxt}>내 친구</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tab, styles.on]}>
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
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        position: 'relative',
    },
    wrap: {
        width: '100%',
        height: '100%',
        padding: 20,
    },
    listWrap: {
        height: '100%',
        marginBottom: 50
    },
    title: {
        width: '100%',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
    },
    titleTxt: {
        fontSize: 16,
        fontWeight: "500"
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
        bottom: 70,
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