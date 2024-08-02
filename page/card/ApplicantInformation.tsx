import { TouchableOpacity,TextInput,Text,Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, View, Alert } from 'react-native';
import React, {  useState } from 'react';
import { Icon } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

interface CardResponse{
    userName:string;
}
export default function ApplicantInformation( { route, navigation }: any ) {
    const [name, setName] = useState('홍길동');
    const [applyFeature, setApplyFeature] = useState(false);
    const [applyFeature1, setApplyFeature1] = useState(false);
    const [applyFeature2, setApplyFeature2] = useState(false);
    const [account, setAccount] = useState('');

    //동의사항 전체 체크
    const handleNextPress = () => {
        if(applyFeature && applyFeature1 && applyFeature2){
            navigation.navigate('CardPassword');
        }else{
            Alert.alert("모든 동의사항에 체크해 주세요.");
        }
    }
    const toggleFeature = () => {
      setApplyFeature(!applyFeature);
    };  
    const toggleFeature1 = () => {
        setApplyFeature1(!applyFeature1);
      };  
      const toggleFeature2 = () => {
        setApplyFeature2(!applyFeature2);
      };  

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
            <View style={styles.nameContainer}>
                        <Text style={styles.cardText}>카드 생성</Text>
                        {/* <Icon source="close" type="ionicon" size={24} /> */}
            </View>
            <View style ={styles.userContainer}>
            <Text style={styles.label}>신청인 정보</Text>
            <View style={styles.username}>
      <Text style={styles.user}>이름</Text>
      <Text style={styles.usename}>홍길동</Text>
      <View style={styles.underline} />
      </View>
      </View>
      {/* <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      /> */}

{/* <Text style={styles.subLabel}>계좌 선택</Text> */}
<View style={styles.account}>
      <RNPickerSelect
        onValueChange={(value) => setAccount(value)}
        items={[
          { label: '국내 전용', value: 'domestic' },
          { label: 'VISA (국내외겸용)', value: 'visa' },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: "계좌 선택", value: null }}
      />
    </View>
    
<View style={styles.checkCard}>
<Text style={styles.label}>카드발급 관련 동의사항</Text>
    
         <View style={styles.checkboxContainer}>
      <TouchableOpacity onPress={toggleFeature}>
        <Icon source={applyFeature ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color='#000'></Icon>
    </TouchableOpacity>
    <Text style={styles.checkboxLabel}>개인(신용)정보 필수적 동의</Text>
      </View>
      

      <View style={styles.checkboxContainer}>
      <TouchableOpacity onPress={toggleFeature1}>
        <Icon source={applyFeature1 ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color='#000'></Icon>
    </TouchableOpacity>
    <Text style={styles.checkboxLabel}>카드발급 관련 개인(신용)정보 동의</Text>
      </View>


      <View style={styles.checkboxContainer}>
      <TouchableOpacity onPress={toggleFeature2}>
        <Icon source={applyFeature2 ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color='#000'></Icon>
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>카드신청 미완료 시 연락을 위한 동의</Text>
      </View>

      </View>
      <TouchableOpacity style={styles.applyButton} onPress={(handleNextPress)}>
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
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    account:{
         width:'85%'
    },
    nameContainer: {
        width: '85%',
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'flex-start',
    },
    userContainer:{
        width:'85%',
        justifyContent:'flex-start',
    },
    cardText: {
        fontSize: 30,
        // marginLeft: 20,
    },
    label: {
        marginTop: 24,
        fontSize: 16,
        fontWeight: 'bold',
      },
      subLabel: {
        marginTop: 16,
        fontSize: 14,
      },
      user:{
        marginTop: 16,
        fontSize: 14,
        textAlign:'left'
      },
      usename:{
        marginTop: 16,
        fontSize: 14,
        textAlign:'left'
      },
      input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 8,
        marginTop: 8,
      },
      underline: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        width: '100%',
        marginTop: 8,
    },
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
      },
      checkboxLabel: {
        fontSize: 14,
      },
      applyButton: {
        backgroundColor: '#B7E1CE',
        padding: 15,
        marginVertical:10,
        borderRadius: 10,
        alignItems: 'center',
        width:'85%',
        // position:'absolute',
        marginTop:120
      },
      applyButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
      },
      checkCard:{
       justifyContent:'flex-start',
       width:'85%',
       marginTop:60
      },
      username:{
        // marginLeft:10
      }
      
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
      marginTop:30
    //   width:'85%',

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