import { Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Circle, Path, Svg } from "react-native-svg";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { getGroupAccount } from "../../component/api/NewAccountApi";

interface Props {
    token: string;
    account: string;
}

interface GroupMemberInfo {
    userCode: string;
    userName: string;
    userImg: string;
    admin: boolean;
}

export const AccountInvitedUser = ({ navigation, route}: any) => {
    const { token, account }: Props = route.params;
    const [members, setMembers] = useState<GroupMemberInfo[]>([])
    console.log(account)

    useEffect(() => {
        const fetchGroupAccount = async () => {
            try {
                console.log(`usertap/ token: ${token}, account: ${account}`);
                const response = await getGroupAccount(token, account);
                const groupMembers: GroupMemberInfo[] = response.data.userResponses;
                setMembers(groupMembers);
            } catch (error) {
                console.error("Failed to fetch group account data", error);
            }
        };

        fetchGroupAccount();
    }, [token, account]);

    const ProfileComponent = ({ userImg }: any) => {
        return (
            <View style={styles.profileContainer}>
                {userImg ? (
                    <Image
                        source={{ uri: userImg }}
                        style={styles.profileImage}
                    />
                ) : (
                    <Svg
                        width={55}
                        height={55}
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
                )}
            </View>
        );
    };



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('AccountDetail', { token })}
                    >
                        <Svg
                            width={31}
                            height={24}
                            fill="none"
                            style={{marginLeft: 40}}
                        >
                            <Path stroke="#33363F" strokeWidth={2} d="m19.375 6-7.75 6 7.75 6" />
                        </Svg>
                    </TouchableOpacity>
                    <View style={styles.bellContainer}>
                        <Ionicons name="notifications" size={24} color="green" />
                    </View>
                </View>
                <View style={styles.accountNameContainer}>
                    <Text style={styles.accountName}>참여 멤버</Text>
                </View>
                <View style={[styles.line, {width: '90%'}]} />
                <View style={styles.settingsContainer}>
                    {members.map(member => (
                        <View key={member.userCode} style={styles.row}>
                            <ProfileComponent userImg={member.userImg} />
                            <Text style={styles.profileName}>{member.userName}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    innerContainer: {
        flex: 1,
        height: '100%',
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        alignItems: 'center',
        backgroundColor: '#B7E1CE'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
        marginTop: 20
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 25
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 25,
    },
    profileName: {
        fontSize: 25,
        fontWeight: '500',
        textAlign: 'left',
        marginLeft: 15
    },
    bellContainer: {
        position: 'absolute',
        right: 40,
    },
    accountNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
        marginTop: 30,
        marginLeft: 100,
    },
    accountName: {
        fontSize: 35,
        fontWeight: 'bold',
        marginRight: 10,
    },
    line: {
        borderTopColor: '#fff',
        borderTopWidth: 1,
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 15,
    },
    settingsContainer: {
        width: '80%',
        marginTop: 100,
        flex: 1
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 30,
        height: 50
    },
})