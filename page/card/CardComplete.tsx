import {Image,Text,TouchableOpacity, Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import CardList from './CardList';

export default function CardComplete( { route, navigation }: any ) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
              
            <Image
            source={require('../../assets/image/Click_logo.png')}
            style={styles.imageStyle} resizeMode="contain"/>
            <Text style = {styles.textcontainer}>축! 개설완료!</Text>  
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CardList')}>
                <Text style={styles.buttonText}>카드 목록</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    imageStyle:{
        alignSelf: 'auto',
        alignItems:'center',
        width: 300, 
        height: 300, 
    },
    textcontainer:{
        // height: 100,
        // width: 500,
        textAlign:'center',
        fontSize: 25,
        marginBottom:100,
        },
        button: {
            // paddingHorizontal: 100,
            // paddingVertical: 20,
            // backgroundColor: '#B7E1CE',
            // borderRadius: 5,
            // position:"static"
            marginTop: 16,
            marginBottom: 30,
            backgroundColor: '#B7E1CE',
            padding: 16,
            alignItems: 'center',
            borderRadius: 8,
            width: '100%',
            maxWidth: 325,
            alignSelf: 'center',
            },
            buttonText: {
            fontSize: 20,
            color: 'black',
            },

});