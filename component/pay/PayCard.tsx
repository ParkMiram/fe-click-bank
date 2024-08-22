import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Circle, Defs, G, Path, Svg} from "react-native-svg";
import React from "react";

export default function PayCard(props:any) {
    if(props.cardData?.cardName != null) {
        return (
            <View style={styles.cardBox}>
                <View style={styles.cardBoxHeader}>
                    <Text style={{fontSize:16, color: '#888'}}>결제 수단</Text>
                    <TouchableOpacity onPress={() => props.selectCard()} style={styles.changeCardButton}>
                        <Text style={{fontSize:14, color:'#555'}}>변경</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Svg
                        width={50}
                        height={50}
                        fill="none"
                        viewBox="0 0 26 26"
                    >
                        <Circle cx={13} cy={13} r={13} fill="#007378" />
                        <G filter="url(#a)">
                            <Path
                                fill="#fff"
                                fillRule="evenodd"
                                d="m10.769 13.47-.64-.876c-.437-.598-1.368-.817-2.08-.489l.166-.076c-.177.081-.262.284-.189.453l.886 2.055c.14.325.5.786.796 1.017 0 0 1.783 1.323 1.783 1.818V18h5.052v-.628c0-.495 1.09-2.057 1.09-2.057.2-.303.367-.838.367-1.193v-2.61c-.013-.579-.561-1.047-1.238-1.047-.338 0-.612.234-.612.523v.21c0-.579-.548-1.047-1.224-1.047-.339 0-.613.234-.613.523v.21c0-.579-.548-1.047-1.224-1.047-.338 0-.613.234-.613.523v.21a.66.66 0 0 0-.032-.226l-.187-2.696C12.232 7.283 11.89 7 11.491 7c-.402 0-.722.29-.722.647v5.824Z"
                                clipRule="evenodd"
                            />
                            <Path
                                stroke="#363B3E"
                                d="M10.269 12.008c-.592-.532-1.501-.698-2.26-.426l-.004-.007-.165.076.008.018a.846.846 0 0 0-.281 1.01l.886 2.056c.093.215.245.45.404.654.16.205.353.411.544.56l.01.007.003.003.014.01.054.04a15.178 15.178 0 0 1 .787.644c.216.19.42.384.564.553.073.084.122.15.149.198l.009.015V18.5h6.052V17.378s.004-.024.022-.08c.021-.064.055-.145.1-.243.092-.194.219-.42.351-.64a16 16 0 0 1 .483-.75l.033-.048.008-.012.002-.003.008-.011c.134-.203.243-.46.319-.705.076-.245.131-.52.131-.764V11.5c-.02-.913-.858-1.535-1.738-1.535-.203 0-.412.055-.593.159a1.858 1.858 0 0 0-1.243-.473c-.204 0-.413.055-.594.159a1.858 1.858 0 0 0-1.243-.473c-.07 0-.142.006-.212.02l-.121-1.744c-.047-.673-.654-1.113-1.265-1.113-.627 0-1.222.465-1.222 1.147v4.361Zm.73 5.43v-.002a.01.01 0 0 1 0 .003Z"
                            />
                        </G>
                        <Defs></Defs>
                    </Svg>
                    <View style={{marginLeft: 12, marginRight:"10%"}}>
                        <Text style={{fontWeight:'bold', fontSize:17, marginBottom:4}} numberOfLines={1} ellipsizeMode='tail'>
                            {props.cardData.cardName}</Text>
                        <Text style={{color:'#555'}}>{props.cardData.cardNumber}</Text>
                    </View>
                </View>
            </View>
        );
    } else {
        return (
            <TouchableOpacity onPress={() => props.selectCard()}>
                <View style={styles.nonCardBox}>
                    <Text style={styles.nonCardInfoText}>
                        카드를 선택 해주세요.
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    cardBox: {
        backgroundColor: '#eee',
        borderRadius: 10,
        width: '90%',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 20,
        justifyContent: 'center'
    },
    cardBoxHeader: {
        width:'100%',
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
    },
    changeCardButton: {
        backgroundColor: '#ccc',
        borderRadius: 10,
        height: 30,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardIcon: {
        width: 40,
        height: 40,
        backgroundColor: 'lightgray',
        borderColor: 'black',
        borderRadius: 20,
    },
    nonCardBox: {
        borderRadius: 10,
        backgroundColor: '#eee',
        width: '100%',
        paddingHorizontal: 50,
        height: 140,
        justifyContent: 'center'
    },
    nonCardInfoText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888'
    }
});