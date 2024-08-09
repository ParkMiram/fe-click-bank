import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PayCard(props:any) {
    console.log(props);
    if(props.cardName) {
        return (
            <View style={styles.cardBox}>
                <View style={styles.cardBoxHeader}>
                    <Text style={{fontSize:18}}>결제수단</Text>
                    <TouchableOpacity onPress={() => props.selectCard()}>
                        <View style={styles.changeCardButton}><Text style={{fontSize:14, color:'white'}}>변경</Text></View>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.cardIcon}/>
                    <View style={{marginLeft: 12, marginRight:"10%"}}>
                        <Text style={{fontWeight:'bold', fontSize:17, marginBottom:4}} numberOfLines={1} ellipsizeMode='tail'>
                            {props.cardName}</Text>
                        <Text style={{color:'#aaa'}}>{"딸깍뱅크"}</Text>
                        <Text style={{color:'#aaa'}}>{props.cardNumber}</Text>
                    </View>
                </View>
            </View>
        );
    } else {
        return (
            <TouchableOpacity onPress={() => props.selectCard()}>
                <View style={styles.nonCardBox}>
                    <Text style={styles.nonCardInfoText}>
                        마지막으로 사용한 카드가 없습니다.{"\n"}
                        여기를 눌러 카드를 선택 해주세요.
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    cardBox: {
        width:'80%',
        borderColor: '#B7E1CE',
        borderRadius: 10,
        borderWidth: 4,
        padding: 18,
    },
    cardBoxHeader: {
        width:'100%',
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    changeCardButton: {
        backgroundColor: '#6BC29A',
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    cardIcon: {
        width: 40,
        height: 40,
        backgroundColor: 'lightgray',
        borderColor: 'black',
        borderRadius: 20,
    },
    nonCardBox: {
        width:'80%',
        height: 154,
        borderColor: '#B7E1CE',
        borderRadius: 10,
        borderWidth: 4,
        padding: 34,
    },
    nonCardInfoText: {
        textAlign: 'center',
        fontSize: 16,
    }
});