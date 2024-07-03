import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Animated, TouchableWithoutFeedback, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// ** icons ** //
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

// ** components ** //
import { Popover, AnimatedFlatlist } from '../../components';

//** utils */
import { commonColors } from '../../utils/colors';
import WelComeTextLayout from '../../components/WelComeTextLayout';

const AngreeandContinue = (props) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [previewLangs, setPreviewLangs] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(props?.route?.params?.lang);

    const navigation = useNavigation();

    const handlePress = () => {
        setPreviewLangs(true);
    };

    const handleClose = () => {
        setVisiblePopup(false);
        setPreviewLangs(false);
    }

    const handleNavigateScreen = () => {
        setVisiblePopup(false);
        navigation.navigate('ContactSupport');
    }

    return (
        <TouchableWithoutFeedback onPress={() => handleClose()}>
            <View style={styles.container}>

                <TouchableOpacity style={styles.morebtn} onPress={() => setVisiblePopup(true)}>
                    <MaterialIcons name="more-vert" size={20} color={commonColors?.blueGray?.[500]} />
                </TouchableOpacity>

                {visiblePopup && <Popover contentHeight={50}>
                    <TouchableOpacity onPress={() => handleNavigateScreen()} >
                        <Text style={styles.popuptext}>Help</Text>
                    </TouchableOpacity>
                </Popover>}

                <Image source={require('../../assets/landing.png')} resizeMode="cover" style={styles.image}>
                </Image>

                <WelComeTextLayout type="title" screen="agreeandcontinue">Welcome to WhatsApp</WelComeTextLayout>
                <Text style={styles.subheader}>Read our <Text onPress={() => Linking.openURL('https://www.whatsapp.com/legal/privacy-policy?lg=en&lc=IN&eea=0')} style={{ color: commonColors?.lightBlue?.[600] }}>Privacy Policy</Text>. Tap "Agree and continue" to</Text>
                <Text style={styles.subheader2}>accept the <Text onPress={() => Linking.openURL('https://www.whatsapp.com/legal/terms-of-service?lg=en&lc=IN&eea=0')} style={{ color: commonColors?.lightBlue?.[600] }}>Terms of Service</Text>.</Text>

                <TouchableOpacity style={styles.button1} onPress={handlePress}>
                    <Entypo name="network" size={18} color={commonColors?.teal?.[600]} />
                    <Text style={styles.text} >{selectedLanguage ? selectedLanguage : props?.route?.params?.lang}</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={22} color={commonColors?.teal?.[600]} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MobileNumber')}>
                    <Text style={styles.agreeandcontinue} >Agree and continue</Text>
                </TouchableOpacity>

                {previewLangs &&
                    <AnimatedFlatlist
                        setSelectedLanguage={setSelectedLanguage}
                        selectedLanguage={selectedLanguage}
                        active={previewLangs}
                        setPreviewLangs={setPreviewLangs}
                    />
                }
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('screen').height,
        justifyContent: 'center',
        backgroundColor: commonColors?.commonWhite
    },
    image: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: Dimensions.get('screen').width * 1,
        display: 'flex',
        height: '40%'
    },
    popuptext: {
        fontSize: 14,
        letterSpacing: 1,
        paddingTop: 12,
        paddingLeft: 20,
    },
    text: { color: commonColors?.teal?.[600], fontSize: 13, paddingHorizontal: 15 },
    agreeandcontinue: { color: commonColors?.commonWhite, fontSize: 14, fontWeight: '400' },
    header: {
        fontSize: 18,
        paddingBottom: 15,
        fontWeight: '500',
        letterSpacing: 1,
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    subheader: {
        fontSize: 13,
        display: 'flex',
        letterSpacing: 0.5,
        justifyContent: 'center',
        alignSelf: 'center',
        color: commonColors?.blueGray?.[500]
    },
    subheader2: {
        display: 'flex',
        letterSpacing: 0.5,
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 14,
        color: commonColors?.blueGray?.[500]
    },
    button: {
        width: Dimensions.get('screen').width - 60,
        height: 40,
        borderRadius: 30,
        backgroundColor: commonColors?.teal?.[600],
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 30,
        bottom: 30,
    },
    morebtn: {
        width: 30,
        height: 30,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 5,
        top: 20,
    },
    button1: {
        width: 150,
        height: 40,
        marginTop: 10,
        borderRadius: 30,
        paddingTop: 10,
        backgroundColor: commonColors?.coolGray?.[200],
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
    },
});

export default AngreeandContinue;