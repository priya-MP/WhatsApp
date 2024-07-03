import React from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions } from 'react-native';

//** icons */
import { Feather, MaterialCommunityIcons, Ionicons } from 'react-native-vector-icons';

//** utils */
import { commonColors } from '../utils/colors';


const CustomHeader = (props) => {
    const { route } = props
    return (
        <>
            <StatusBar hidden={false} />
            <View style={styles.header}>
                <View style={styles.container}>
                    <View style={styles.namecontainer}>
                        {route?.params?.name && <Ionicons name="arrow-back" size={22} color={commonColors?.commonWhite} />}
                        <Text style={[styles.name, { marginLeft: route?.params?.name ? 10 : 0 }]}>{route?.params?.name ? route?.params?.name : 'WhatsApp'}</Text>
                    </View>
                    <View style={styles.iconCointainer}>
                        <Feather name={route?.params?.name ? 'video' : "search"} size={22} color={commonColors?.commonWhite} />
                        {route?.params?.name ? <MaterialCommunityIcons name="phone-outline" size={22} color={commonColors?.commonWhite} />
                            : <Feather name="camera" size={22} color={commonColors?.commonWhite} />}
                        <Feather name="more-vertical" size={22} color={commonColors?.commonWhite} />
                    </View>
                </View>
            </View>
        </>
    );
}

export default CustomHeader;


const styles = StyleSheet.create({
    header: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: commonColors?.teal?.[600],
        height: 80,
        width: Dimensions.get('screen').width,
        paddingHorizontal: 20
    },
    name: {
        fontSize: 16,
        textAlign: 'left',
        fontWeight: '800',
        color: commonColors?.commonWhite
    },
    namecontainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconCointainer: {
        width: 120,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
});