import React from "react";
import { View, Text, StyleSheet, Dimensions } from 'react-native';

//** components */
import { HelpCentreDashboard } from "../../components";

//** utils */
import { commonColors } from "../../utils/colors";

const Help = () => {
    return (
        <HelpCentreDashboard title="Problem detected" showFooter={true} >
            <View style={styles.contentcontainer}>
                <Text style={styles.content}>We didn't detect a valid phone number.</Text>
                <Text style={styles.content}>Please go back to the previous screen and enter your phone number in full international format:</Text>
                <View style={{ marginLeft: 60 }}>
                    <Text style={styles.subcontent}>1. Choose your country from country list. This will automatically fill the country code.</Text>
                    <Text style={styles.subcontent}>2. Enter your phone number. Omit any leading 0s before the phone number.</Text>
                </View>
                <Text style={styles.content}>For example, a correct United States phone number will appear as +1 (408) 555-1234 after being entered.</Text>
                <Text style={styles.content}>For more information, please read our <Text style={{ color: 'skyblue' }}>FAQ</Text>.</Text>
            </View>
        </HelpCentreDashboard>
    )
}

export default Help;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titlecontainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: commonColors?.teal?.[600],
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    leftbtn: {
        width: 30,
        height: 30,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 20,
        top: 20,
    },
    button: {
        width: Dimensions.get('screen').width,
        height: 50,
        backgroundColor: commonColors?.teal?.[600],
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 30,
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        color: commonColors?.commonWhite,
        fontSize: 20,
        fontWeight: '800',
    },
    content: {
        fontSize: 14,
        display: 'flex',
        justifyContent: 'center',
        padding: 10,
        marginLeft: 20
    },
    subcontent: {
        fontSize: 14,
        paddingTop: 10
    },
    text: { color: commonColors?.commonWhite, fontSize: 16 }
})