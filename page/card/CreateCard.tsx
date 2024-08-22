import {
    Alert,
    Image,
    TouchableOpacity,
    Text,
    Dimensions,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import React, {useEffect, useState} from 'react';
import {Icon} from 'react-native-paper';
import {getCardProduct} from "../../component/api/CardListApi";
import {Path, Svg} from "react-native-svg";


type CardCheck = 'CREDIT' | 'CHECK';
type CardTransportation = 'POSTPAID' | 'PREPATMENT';

type data = {
    cardCheck: CardCheck;
    cardTransportation: CardTransportation;
    cardProductId: number;
}

interface CardProductResponse {
    cardImg: string;
    cardProductName: String;
}

const {width, height} = Dimensions.get('window');

export default function CreateCard({route, navigation}: any) {
    const [cardBrand, setCardBrand] = useState<CardCheck | null>(null);
    const [cardTransportation, setCardTransportation] = useState<CardTransportation | null>(null);
    const [applyFeature, setApplyFeature] = useState(false);

    const {token} = route.params;
    const id: number = route.params?.id;
    const cardProductId: number = route.params?.id;
    console.log("카드 프로덕트 아이디: " + cardProductId);
    const [cardProduct, setCardProduct] = useState<CardProductResponse>();
    const toggleFeature = () => {
        setApplyFeature(!applyFeature);
        setCardTransportation(applyFeature ? 'PREPATMENT' : 'POSTPAID');
    };
    useEffect(() => {
        getCardProductInfo();
    }, [])

    const getCardProductInfo = async () => {
        try {
            const res = await getCardProduct(id);
            setCardProduct(res.data.data.getCardProduct);
        } catch (error) {
            console.log(error);
        }
    }

    const handleNextPress = () => {
        if (cardBrand) {
            if (cardBrand === 'CREDIT') {
                navigation.navigate('ApplicantInformation', {
                    cardCheck: cardBrand,
                    cardTransportation,
                    cardProductId,
                    token
                });
            } else if (cardBrand === 'CHECK') {
                navigation.navigate('ApplicantInformationCheck', {
                    cardCheck: cardBrand,
                    cardTransportation,
                    cardProductId,
                    token
                });
            }
        } else {
            Alert.alert("필드를 선택해 주세요.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity style={styles.nameContainer} onPress={() => navigation.goBack()}>
                    <Svg
                        width={10}
                        height={16}
                        fill="none"
                        viewBox="0 0 8 14"
                    >
                        <Path stroke="#222" d="M7 1 1 7l6 6"/>
                    </Svg>
                    <Text style={styles.cardText}>{cardProduct?.cardProductName}</Text>
                </TouchableOpacity>
                <View style={styles.imgContainer}>
                    {/*<Text style={styles.cardName}>{cardProduct?.cardProductName}</Text>*/}
                    <View style={styles.cardImageContainer}>
                        <Image style={styles.cardImage} source={{uri: cardProduct?.cardImg}}/>
                    </View>
                </View>
                <View style={styles.cardBrand}>
                    <RNPickerSelect
                        onValueChange={(value) => setCardBrand(value as CardCheck)}
                        items={[
                            {label: '신용', value: 'CREDIT'},
                            {label: '체크', value: 'CHECK'},
                        ]}
                        style={pickerSelectStyles}
                        placeholder={{label: "선택해주세요", value: null}}
                    />
                </View>
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity onPress={toggleFeature}>
                        <Icon source={applyFeature ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24}
                              color='#000'/>
                    </TouchableOpacity>
                    <Text style={styles.checkboxLabel}>후불교통 기능 신청</Text>
                </View>
                <TouchableOpacity style={styles.applyButton} onPress={handleNextPress}>
                    <Text style={styles.applyButtonText}>다음</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    innerContainer: {
        flex: 1,
        width: "100%",
        height: "90%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    },
    cardName: {
        textAlign: 'center'
    },
    imgContainer: {},
    cardBrand: {
        width: '85%'
    },
    nameContainer: {
        width: width - 40,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10
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
    },
    checkboxLabel: {
        marginLeft: 8,
    },
    applyButton: {
        backgroundColor: '#B7E1CE',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: '85%',
        marginTop: 185
    },
    applyButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        textAlign: 'center',
        fontSize: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#B7E1CE',
        borderRadius: 4,
        color: 'black',
        marginBottom: 16,
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
