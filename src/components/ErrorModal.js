import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from "react-native-modal";

//** utils */
import { commonColors } from "../utils/colors";

const CustomModal = ({ open, close, children }) => {
    return (
        <Modal isVisible={open}>
            <View style={styles.modalview}>
                <View style={styles.content}>
                    <Text style={styles.description}>{children}</Text>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => close("")}>
                        <Text style={styles.btntxt}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default CustomModal;

const styles = StyleSheet.create({
    modalview: {
        display: 'flex',
        backgroundColor: commonColors?.commonWhite,
        marginHorizontal: 20,
        height: 80,
        borderRadius: 3
    },
    header: {
        backgroundColor: commonColors?.teal?.[600],
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 90
    },
    description: {
        fontSize: 13,
        textAlign: 'flex-start',
        marginVertical: 15,
        color: commonColors?.blueGray?.[500],
        lineHeight: 16,
        letterSpacing: 0.5,
    },
    content: {
        marginHorizontal: 20
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 10,
        marginBottom: 20
    },
    btntxt: {
        fontSize: 12,
        color: commonColors?.teal?.[600],
        fontWeight: '500',
        marginRight: 20
    }
})