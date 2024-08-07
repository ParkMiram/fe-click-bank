import React, { useState } from 'react';
import { TouchableOpacity, Image, TextInput, Text, Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
interface CardResponse {
    cardImg:string;
    annualFee:number;
    cardEvent:string;

}
export default function CardInformation({ route, navigation }:any) {
    const [cardImg, setCardImg] = useState<string>('');
    const [cardEvent,setCardEvent] = useState<string>('');
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.cardText}>카드 상품
                    </Text>
                </View>
                <View style={styles.header}>
                    <View style={styles.cardImageContainer}>
                        <Image style={styles.cardImage} source={{ uri: 'https://via.placeholder.com/150x250' }} />
                    </View>
                    <View style={styles.cardInformation}>
                        <View style={styles.cardContainer}>
                            <Text style={styles.cardName}>카드명</Text>
                            <Text style={styles.cardDescription}>카드 설명</Text>
                        </View>
                        <View style={styles.cardBenefits}>
                            <Text style={styles.cardBenefitsText}>카드 혜택</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.feeContainer}>
                    <Text style={styles.feeText}>연회비</Text>
                    <TextInput
                        style={styles.feeInput}
                        value="50,000 원"
                        editable={false}
                    />
                </View>
                <TextInput
                    style={styles.cardDetailDescription}
                    multiline
                    editable={false}
                    value="카드 상세 설명"
                />
                <TouchableOpacity style={styles.applyButton} onPress={() => navigation.navigate('CreateCard')}>
                    <Text style={styles.applyButtonText}>신청하기</Text>
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
    nameContainer: {
        width: '85%',
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'flex-start',
    },
    cardText: {
        fontSize: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85%'
      },
      headerText: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      closeButton: {
        padding: 5,
      },
      closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      cardImageContainer: {
        alignItems: 'center',
        marginVertical: 20,
      },
      cardImage: {
        width: 100,
        height: 150,
        backgroundColor: '#B7E1CE',
        borderRadius: 10,
      },
      cardDetails: {
        alignItems: 'center',
        marginVertical: 10,
        justifyContent:'space-between',
      },
      cardInformation: {
        marginLeft: 20,
        flex: 1,
        justifyContent: 'space-between'
      },
      cardName: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      cardDescription: {
        fontSize: 16,
        color: '#666',
      },
      cardBenefits: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#B7E1CE',
        borderRadius: 10,
        height: 100,
      },
      cardBenefitsText: {
        fontSize: 16,
      },
      feeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#B7E1CE',
        borderRadius: 10,
        padding: 10,
        width:'85%'
      },
      feeText: {
        fontSize: 16,
      },
      feeInput: {
        fontSize: 16,
        color: '#000',
      },
      cardDetailDescription: {
        borderWidth: 1,
        borderColor: '#B7E1CE',
        borderRadius: 10,
        padding: 10,
        height: 250,
        marginVertical: 10,
        textAlignVertical: 'top',
        width:'85%'
      },
      applyButton: {
        backgroundColor: '#B7E1CE',
        padding: 15,
        marginVertical:10,
        borderRadius: 10,
        alignItems: 'center',
        width:'85%'
      },
      applyButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
      },
      cardContainer: {}
});
