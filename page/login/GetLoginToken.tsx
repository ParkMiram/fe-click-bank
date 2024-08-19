import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { Container } from '../../css/sujin/Container';
import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Defs, G, Path, Svg} from "react-native-svg";
const SERVER_URI = "https://just-click.shop/api/v1/auth";

export default function GetLoginToken({ route, navigation }: any) {
    const { url } = route.params;

    const getToken = async (identity:string, type:string, image:string) => {
        try {
            const response = await axios.get(`${SERVER_URI}/login/token?identity=${identity}&type=${type}&image=${image}`);
            AsyncStorage.setItem("login", response.data);
            navigation.reset({
                index: 0,
                routes: [{name: 'SimpleLogin', params: {token: response.data}}]
            });
        } catch (error) {
            const {response} = error as unknown as AxiosError;
            if (response) alert("STATUS: " + response.status + "\nDATA: " + response.data);
        }
    }
    const getData = async () => {
        try {
            const response = await axios.get(url+"&isFront=true");
            if (response.data.isAlready) {
                getToken(response.data.identity, response.data.type, response.data.image ?? "");
            } else {
                navigation.reset({
                    index: 1,
                    routes: [
                        {name: 'Login'},
                        {name: 'UserTermOfUse', params: {
                            identity: response.data.identity, 
                            type: response.data.type,
                            nickname: response.data.nickname ?? "",
                            image: response.data.image ?? ""
                        }}
                    ]
                });
            }
        } catch (error) {
            const {response} = error as unknown as AxiosError;
            if (response) alert("STATUS: " + response.status + "\nDATA: " + response.data);
        }
    }
    
    useEffect(() => {
        getData();
    },[]);

    return (
        <SafeAreaView style={Container.container}>
            <View style={[Container.innerContainer, { flexDirection: 'row', }]}>
                <Text style={styles.wait}>잠시만 기다려주세요...</Text>
                <Svg
                    width={22}
                    height={23}
                    fill="none"
                    viewBox="0 0 18 19"
                >
                    <G filter="url(#a)">
                        <Path
                            fill="#fff"
                            fillRule="evenodd"
                            d="m6.769 9.47-.64-.876c-.437-.598-1.368-.817-2.08-.489l.166-.076c-.177.081-.262.284-.189.453l.886 2.055c.14.325.5.786.796 1.017 0 0 1.782 1.323 1.782 1.818V14H12.543v-.628c0-.495 1.09-2.057 1.09-2.057.2-.303.367-.838.367-1.193v-2.61c-.013-.579-.561-1.047-1.238-1.047-.338 0-.612.234-.612.523v.21c0-.579-.548-1.047-1.224-1.047-.339 0-.613.234-.613.523v.21c0-.579-.548-1.047-1.224-1.047-.339 0-.613.234-.613.523v.21a.66.66 0 0 0-.032-.226l-.187-2.696C8.232 3.283 7.89 3 7.49 3c-.401 0-.721.29-.721.647V9.47Z"
                            clipRule="evenodd"
                        />
                        <Path
                            stroke="#363B3E"
                            d="m8.877 5.356-.121-1.743C8.709 2.94 8.103 2.5 7.49 2.5c-.626 0-1.221.465-1.221 1.147v4.361c-.592-.533-1.501-.698-2.26-.426l-.004-.007-.165.076.008.018a.846.846 0 0 0-.281 1.011l.886 2.055c.093.215.245.45.404.654.16.205.353.411.544.56l.01.007.003.003.014.01.054.04a15.178 15.178 0 0 1 .787.644c.216.19.42.384.564.553a1.432 1.432 0 0 1 .157.213V14.5H13.043V13.378s.004-.024.022-.08c.021-.064.055-.145.1-.243.092-.194.219-.42.351-.64a16 16 0 0 1 .483-.75l.033-.048.008-.012.002-.003.008-.011c.134-.203.243-.46.319-.705.076-.245.131-.52.131-.764V7.5c-.02-.913-.857-1.535-1.738-1.535-.203 0-.412.055-.593.159a1.858 1.858 0 0 0-1.243-.473c-.204 0-.413.055-.594.159a1.858 1.858 0 0 0-1.243-.473c-.07 0-.142.006-.212.02ZM7 13.44l-.001-.003v.003Z"
                        />
                    </G>
                    <Defs></Defs>
                </Svg>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wait: {
        fontSize: 16,
        color: '#aaa',
        fontWeight: 'bold'
    }
});