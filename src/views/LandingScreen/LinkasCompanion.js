import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View, Text, TouchableOpacity, Linking, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

// ** components ** //
import { HelpCentreDashboard, Popover } from '../../components';

// ** icons ** //
import AntDesign from 'react-native-vector-icons/AntDesign';

//** utils */
import { commonColors } from "../../utils/colors";
import CustomQRCode from "../../components/CustomQRCode";

const LinkasCompanion = () => {
    const [showPopover, setShowPopover] = useState(false);
    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback onPress={() => setShowPopover(false)}>
            <View style={styles.container}>
                {showPopover && <Popover contentHeight={80} >
                    <TouchableOpacity onPress={() => Linking.openURL('https://faq.whatsapp.com/1317564962315842/?cms_platform=android')}>
                        <Text style={styles.popuptext}>Help linking</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('MobileNumber')}>
                        <Text style={styles.popuptext}>Register new account</Text>
                    </TouchableOpacity>
                </Popover>}

                <HelpCentreDashboard title={'Link as companion device'} backgroundColor={commonColors?.white?.[50]} showMore={true} onPress={() => setShowPopover(!showPopover)}>
                    <View style={{ paddingTop: 10 }}>
                        <Text style={styles.subheader}>Scan the code to use WhatsApp on more than one phone.</Text>
                        <Text style={styles.subheader}>Log in to your primary phone every 14 days so this phone</Text>
                        <Text style={styles.subheader}>stays connected.</Text>
                    </View>

                    <CustomQRCode />

                    <View style={styles.steps}>
                        <Text style={styles.text}>1. Open WhatsApp on your primay phone</Text>
                        <Text style={styles.subtext}>2. Tap <Text style={styles.bold}>: Menu</Text> or <Text style={styles.bold}>
                            <AntDesign size={12} name="setting" /> Settings</Text> and select <Text style={styles.bold}>Linked &nbsp;&nbsp;&nbsp;&nbsp;Devices</Text></Text>
                        <Text style={styles.text}>3. Tap on <Text style={styles.bold}>Link a Device</Text></Text>
                        <Text style={styles.text}>4. Point your phone to this screen to capture the &nbsp;&nbsp;&nbsp;&nbsp;code</Text>
                    </View>
                </HelpCentreDashboard>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default LinkasCompanion;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
    },
    subheader: {
        fontSize: 12,
        display: 'flex',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        color: commonColors?.blueGray?.[500],
        letterSpacing: 0.2
    },
    text: {
        fontSize: 12,
        padding: 6,
        letterSpacing: 0.5,
    },
    subtext: {
        fontSize: 12,
        paddingLeft: 6,
        letterSpacing: 0.5,
    },
    bold: {
        fontSize: 12,
        fontWeight: '700',
        color: '#000',
        letterSpacing: 0.5,
    },
    popuptext: {
        fontSize: 14,
        letterSpacing: 1,
        paddingTop: 12,
        paddingLeft: 20,
    },
    steps: {
        height: 200,
        backgroundColor: commonColors?.white?.[50],
        width: Dimensions.get('screen').width - 40,
        marginBottom: 10,
        marginLeft: 20,
        zIndex: 1,
        paddingLeft: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 10,
    }
})