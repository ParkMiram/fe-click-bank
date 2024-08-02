import {Image,TouchableOpacity,Button,TextInput, Text,Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import React, {  useState } from 'react';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { MaterialCommunityIcons } from 'react-native-vector-icons/MaterialCommunityIcons';

import { Icon } from 'react-native-paper';
import ApplicantInformation from './ApplicantInformation';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icon from 'react-native-vector-icons/Ionicons'
interface CardInformation {
    cardName:string;

}

export default function CreateCard( { route, navigation }: any ) {
    const [cardName, setCardName] = useState<string>('');
  const [cardBrand, setCardBrand] = useState('');
  const [applyFeature, setApplyFeature] = useState(false);
 

  const toggleFeature = () => {
    setApplyFeature(!applyFeature);
  };  
  return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.cardText}>카드 생성</Text>
                    </View>
                        {/* <View style={styles.cardContainer}> */}
                        {/* <Text style={styles.title}>카드 생성</Text> */}
                            {/* <View style={styles.cardImageContainer}>
                    <Text style={styles.cardImageText}>카드 이미지</Text>
                    </View> */}
                    <View style = {styles.imgContainer}>
      <Text style ={styles.cardName}>카드명</Text>
      <View style={styles.cardImageContainer}>
        <Image style={styles.cardImage} source={{ uri: 'https://via.placeholder.com/150x250' }} />
     </View>
     </View>
     
   <View style={styles.cardBrand}>
      <RNPickerSelect
        onValueChange={(value) => setCardBrand(value)}
        items={[
          { label: '국내 전용', value: 'domestic' },
          { label: 'VISA (국내외겸용)', value: 'visa' },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: "선택해주세요", value: null }}
      />
    </View>
      <View style={styles.checkboxContainer}>
      
         <TouchableOpacity onPress={toggleFeature}>
         <Icon source={applyFeature ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color='#000'></Icon>
         </TouchableOpacity>
        <Text style={styles.checkboxLabel}>후불교통 기능 신청</Text>
      </View>
      <TouchableOpacity style={styles.applyButton} onPress={() => navigation.navigate('ApplicantInformation')}>
                    <Text style={styles.applyButtonText}>다음</Text>
                </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        width: "100%",
        height:"90%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardName:{
        textAlign:'center'

    },
    imgContainer:{

    },
    cardBrand:{
        width:'85%'

    },
    nameContainer: {
        width: '85%',
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'flex-start',
    },
    cardText: {
        fontSize: 30,
        // marginLeft: 20,
    },
    cardContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
      },
      title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
      },
    //   cardImageContainer: {
    //     height: 200,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderWidth: 1,
    //     borderColor: '#ddd',
    //     marginBottom: 16,
    //   },
    cardImageContainer: {
        alignItems: 'center',
        marginVertical: 20,
      },
      cardImage: {
        width: 120,
        height: 180,
        backgroundColor: '#B7E1CE',
        borderRadius: 10,
      },
      cardImageText: {
        color: '#aaa',
      },
      input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 16,
      },
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        // justifyContent:'space-between'
        
      },
      checkboxLabel: {
        marginLeft: 8,
        // marginBottom:220
      },
      applyButton: {
        backgroundColor: '#B7E1CE',
        padding: 15,
        marginVertical:10,
        borderRadius: 10,
        alignItems: 'center',
        width:'85%',
        // position:'absolute',
        marginTop:185
      },
      applyButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
      },
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        textAlign:'center',
      fontSize: 16,
      paddingVertical: 12,
    // padding:12,
    //   paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#B7E1CE',
      borderRadius: 4,
      color: 'black',
    //   paddingRight: 30,
      marginBottom: 16,
    //   width:'85%'
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
      marginBottom: 16,
    },
  });