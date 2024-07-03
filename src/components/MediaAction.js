import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";

//** icons */
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//** utils */
import { commonColors } from "../utils/colors";

const MediaAction = (props) => {
    return (
        <Modal isVisible={props?.open} swipeDirection="down">
            <View style={styles.modalview}>
                <Text style={styles.title}>Choose an action</Text>

                <View style={styles.iconcontainer}>
                    <TouchableOpacity style={[styles.icon, { backgroundColor: commonColors?.red?.[500] }]} onPress={() => props.onPress('remove')}>
                        <MaterialIcons name="delete" size={18} color={commonColors?.commonWhite} />
                    </TouchableOpacity>
                    <Text style={styles.btntext}>Remove</Text>
                </View>


                <View style={styles.iconcontainer}>
                    <TouchableOpacity style={[styles.icon, { backgroundColor: commonColors?.commonWhite, elevation: 1.5 }]} onPress={() => props.onPress('photos')}>
                        <Image source={require('../assets/photos.png')} style={styles.img} />
                    </TouchableOpacity>
                    <Text style={styles.btntext}>Photos</Text>
                </View>

            </View>
        </Modal>
    )
}

export default MediaAction;

const styles = StyleSheet.create({
    modalview: {
        position: 'absolute',
        bottom: -20,
        backgroundColor: commonColors?.commonWhite,
        width: Dimensions?.get('window').width,
        left: -20,
        height: '42%'
    },
    title: {
        fontSize: 12,
        letterSpacing: 0.5,
        color: commonColors?.blueGray?.[500],
        margin: 15
    },
    iconcontainer: {
        marginLeft: 40,
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    icon: {
        width: 38,
        height: 38,
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btntext: {
        fontSize: 10,
        letterSpacing: 0.5,
        marginVertical: 5
    },
    img: {
        width: 26,
        height: 26
    }
})