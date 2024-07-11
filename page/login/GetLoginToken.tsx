import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { Container } from '../../css/sujin/Container';
import axios from 'axios';
import { useEffect } from 'react';

const SERVER_URI = "http://192.168.0.16:8080/api/v1/auth";

export default function GetLoginToken({ route, navigation }: any) {
    const { url } = route.params;

    const getToken = async (identity:string, type:string) => {
        try {
            const response = await axios.get(`${SERVER_URI}/login/token?identity=${identity}&type=${type}`);
            navigation.reset({
                index: 0,
                routes: [{name: 'SimpleLogin', params: {token: response.data}}]
            });
        } catch (error) {
            alert(error);
        }
    }
    const getData = async () => {
        try {
            const response = await axios.get(url+"&isFront=true");
            if (response.data.isAlready) {
                getToken(response.data.identity, response.data.type);
            } else {
                navigation.reset({
                    index: 1,
                    routes: [
                        {name: 'Login'},
                        {name: 'UserTermOfUse', params: {identity: response.data.identity, type: response.data.type}}
                    ]
                });
            }
        } catch (error) {
            alert(error);
        }
    }
    
    useEffect(() => {
        getData();
    },[]);

    return (
        <SafeAreaView style={Container.container}>
            <View style={Container.innerContainer}>
                <Text>잠시만 기다려주세요...</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
});