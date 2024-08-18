import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity, TouchableWithoutFeedback,
    View
} from "react-native";
import React, {useState} from "react";
import {Path, Svg} from "react-native-svg";
import {updateNewBudget} from "../api/AccountHistoryApi";

export default function BudgetUpdate(props: any) {

    const {account, mbBudget, isModalVisible, toggleModal} = props;
    const [budget, setBudget] = useState<string>(mbBudget)

    const onUpdateBudget = (budget: string): void => {
        setBudget(budget)
    }

    const updateBudget = async (): Promise<void> => {
        const data = {account, budget};
        try {
            await updateNewBudget(data);
            Alert.alert("예산이 수정되었습니다.");
            toggleModal();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.overlay}>
            <Modal
            animationType='slide'
            transparent={true}
            visible={isModalVisible}
            onRequestClose={toggleModal}
            >
                <KeyboardAvoidingView
                    style={styles.updateModal}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{padding: 20}}>
                            {/*<View style={{alignItems:'flex-end'}}>*/}
                            {/*    <TouchableOpacity*/}
                            {/*        style={{width: 24, height: 24, marginBottom: 10}}*/}
                            {/*        onPress={toggleModal}>*/}
                            {/*        <View style={styles.closeBtn}>*/}
                            {/*            <Svg*/}
                            {/*                width={24}*/}
                            {/*                height={24}*/}
                            {/*                fill="none"*/}
                            {/*            >*/}
                            {/*                <Path*/}
                            {/*                    stroke="#33363F"*/}
                            {/*                    strokeLinecap="square"*/}
                            {/*                    strokeLinejoin="round"*/}
                            {/*                    strokeWidth={2}*/}
                            {/*                    d="M18 6 6 18M6 6l12 12"*/}
                            {/*                />*/}
                            {/*            </Svg>*/}
                            {/*        </View>*/}
                            {/*    </TouchableOpacity>*/}
                            {/*</View>*/}
                            <View style={styles.budgetWrap}>
                                <TextInput
                                    style={styles.budgetInput}
                                    placeholder='설정할 예산을 입력하세요.'
                                    value={budget}
                                    onChangeText={onUpdateBudget}
                                    keyboardType="number-pad"
                                />
                                <TouchableOpacity style={styles.okayBtn} onPress={updateBudget}>
                                    <View>
                                        <Svg
                                            width={12}
                                            height={9}
                                            fill="none"
                                        >
                                            <Path
                                                stroke="#007378"
                                                strokeLinecap="round"
                                                d="m1 4.333 3.227 3.228a.15.15 0 0 0 .212 0L11 1"
                                            />
                                        </Svg>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.close} onPress={toggleModal}>
                                <Text>닫기</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    closeBtn:{
        width:24,
        backgroundColor: '#e8e8e8',
        borderRadius: 25,
    },
    updateModal: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    budgetWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    budgetInput: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
    },
    okayBtn: {
        width: 47,
        minHeight: 47,
        marginLeft: 10,
        padding: 15,
        backgroundColor: 'rgba(0, 115, 120, 0.2)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center"
    },
    close: {
        width: '100%',
        backgroundColor: '#ddd',
        borderRadius: 5,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    }
})