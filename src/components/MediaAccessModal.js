import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import { Checkbox } from 'react-native-paper';

//** icons */
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//** utils */
import { commonColors } from "../utils/colors";

const MediaAccessModal = ({ open, close, onPress, children, type }) => {
    const [checked, setChecked] = React.useState(false);
    return (
        <Modal isVisible={open}>
            <View style={[styles.modalview, { height: type === 'media' ? 170 : 150, marginHorizontal: type === 'media' ? 35 : 40, }]}>
                <View style={styles.content}>
                    <FontAwesome name={type === 'media' ? "folder" : 'phone'} size={25} color={commonColors?.teal?.[600]} />
                    <Text style={styles.description}>{children}</Text>
                </View>
                <View style={styles.checkboxcontainer}>
                    <Checkbox
                        color={commonColors?.teal?.[600]}
                        uncheckedColor={commonColors?.coolGray?.[400]}
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />
                    <Text style={styles.text}>Don't ask again</Text>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => close()}>
                        <Text style={[styles.btntxt, { color: commonColors?.teal?.[600] }]}>DENY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={checked} onPress={onPress}>
                        <Text style={[styles.btntxt, { color: checked ? commonColors?.coolGray?.[200] : commonColors?.teal?.[600] }]}>ALLOW</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default MediaAccessModal;

const styles = StyleSheet.create({
    modalview: {
        display: 'flex',
        backgroundColor: commonColors?.commonWhite,
        borderRadius: 5
    },
    description: {
        fontSize: 17,
        textAlign: 'flex-start',
        letterSpacing: 0.5,
        marginHorizontal: 15
    },
    content: {
        marginHorizontal: 15,
        paddingTop: 15,
        display: "flex",
        flexDirection: 'row',
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    btntxt: {
        fontSize: 12,
        fontWeight: '500',
        marginRight: 20,
    },
    checkboxcontainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingLeft: 10
    },
    text: {
        marginTop: 8,
        fontSize: 12,
    }
})