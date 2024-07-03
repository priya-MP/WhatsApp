import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { commonColors } from "../utils/colors";

// ** icons ** //
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomQRCode = () => {
    const [activeQR, setActiveQR] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setActiveQR(true);
        }, 30000)
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setActiveQR(false)
        }, 2000);
    }, []);

    const handlePressLoader = () => {
        setActiveQR(false);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }

    return (
        <View style={styles.qr}>
            {activeQR ? <View style={styles.qrloader}>
                <Text style={styles.text}>QR code timed out</Text>
                <TouchableOpacity style={styles.reloadbtn} onPress={() => handlePressLoader()}>
                    <Ionicons name="reload" size={12} color={commonColors?.commonWhite} />
                    <Text style={styles.reloadtext}>Reload</Text>
                </TouchableOpacity>
            </View>
                : (loading ?
                    <ActivityIndicator size="large" color={commonColors?.teal?.[600]} />
                    : <Image source={require('../assets/qr.png')} style={styles.image} />)}
        </View>
    )
}

export default CustomQRCode;

const styles = StyleSheet.create({
    qr: {
        width: Dimensions.get('window').width * 0.6,
        marginVertical: 50,
        height: 230,
        borderWidth: 1.5,
        borderColor: commonColors?.blueGray?.[200],
        borderRadius: 20,

        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    image: {
        width: Dimensions.get('window').width * 0.6,
        borderRadius: 20,
        height: 230
    },
    qrloader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    text: {
        fontSize: 12,
        letterSpacing: 0.5,
        color: commonColors?.blueGray?.[500],
        paddingVertical: 12
    },
    reloadbtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: 100,
        height: 35,
        borderRadius: 20,
        backgroundColor: commonColors?.teal?.[600]
    },
    reloadtext: {
        fontSize: 12,
        letterSpacing: 0.5,
        color: commonColors?.commonWhite,
        paddingLeft: 10
    }
})