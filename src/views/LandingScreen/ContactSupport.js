import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking, TextInput, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from "@react-navigation/native";

// ** icons ** //
import AntDesign from 'react-native-vector-icons/AntDesign';

// ** components ** //
import { MediaAccessModal, CustomModal, MediaSelector } from '../../components';

//** utils */
import { commonColors } from "../../utils/colors";

const ContactSupport = () => {
    const [description, setDescription] = useState("");
    const [isPreviewModal, setIsPreviewModal] = useState(false);
    const [showMediaAccessModal, setShowMediaAccessModal] = useState(false);
    const [acceptedPermission, setAcceptedPermission] = useState(false);
    const [error, setError] = useState("");
    const [activeInput, setActiveInput] = useState(false);
    const [updateColor, setUpdateColor] = useState({
        background: '#d4d4d4',
        color: '#a3a3a3'
    });

    const navigation = useNavigation();

    const handleChangeText = (e) => {
        setDescription(e.nativeEvent.text);
        if (e.nativeEvent.text !== "") {
            setUpdateColor({ background: commonColors?.teal?.[600], color: commonColors?.commonWhite })
        } else {
            setUpdateColor({ background: commonColors?.coolGray?.[200], color: commonColors?.coolGray?.[400] });
            setActiveInput(false)
        }
    }

    const onClose = () => {
        setIsPreviewModal(false);
        setShowMediaAccessModal(false);
    }

    const handleContinue = () => {
        setIsPreviewModal(false);
        setShowMediaAccessModal(true);
    }

    const onRequestPermission = () => {
        setAcceptedPermission(true);
        setShowMediaAccessModal(false);
        setIsPreviewModal(false);
    }

    const handleSubmit = () => {
        if (description !== "" && description?.length < 10) {
            setError("Describe your problem further");
        } else {
            setError("");
            navigation.navigate("SearchHelpCentre");
        }
    }

    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <View style={styles.titlecontainer}>
                    <TouchableOpacity style={styles.leftbtn} onPress={() => navigation.pop()}>
                        <AntDesign name="arrowleft" size={25} color={commonColors?.commonWhite} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Contact support</Text>
                </View>

                <TextInput style={[
                    styles.input, {
                        borderBottomColor: error ? commonColors?.red?.[500] : (activeInput ? commonColors?.teal?.[600] : commonColors?.coolGray?.[400]),
                    }]}
                    keyboardType="default"
                    numberOfLines={8}
                    onFocus={() => setActiveInput(true)}
                    multiline={true}
                    backgroundColor={commonColors?.coolGray?.[200]}
                    placeholder="Describe your problem"
                    placeholderTextColor={commonColors?.coolGray?.[400]}
                    value={description}
                    onChange={(e) => handleChangeText(e)}
                />
                {error && <Text style={styles.error}>{error}</Text>}

                <MediaSelector setIsPreviewModal={setIsPreviewModal} acceptedPermission={acceptedPermission} />

                <View style={styles.btncontainer}>
                    <Text onPress={() => Linking.openURL('https://www.whatsapp.com/legal/privacy-policy?lg=en&lc=IN&eea=0')} style={styles.helpcenter}>Visit our Help Centre</Text>
                    <TouchableOpacity style={[styles.nextbtn, { backgroundColor: updateColor?.background }]} onPress={() => handleSubmit()}>
                        <Text style={[styles.btntext, { color: updateColor?.color }]}>Next</Text>
                    </TouchableOpacity>
                </View>

                {isPreviewModal && <CustomModal open={isPreviewModal} close={onClose} onPress={handleContinue} type="media">
                    <Text>Allow WhatsApp access to your device's photos, media, and files and try again.</Text>
                </CustomModal>}
                {showMediaAccessModal && <MediaAccessModal open={showMediaAccessModal} close={onClose} onPress={onRequestPermission} type="media" >
                    <Text>Allow <Text style={styles.bold}>WhatsApp</Text> to access your device's photos, media, and files on your device?</Text>
                </MediaAccessModal>}

            </View>
        </TouchableWithoutFeedback>
    )
}

export default ContactSupport;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    nextbtn: {
        width: 70,
        height: 35,
        borderRadius: 30
    },
    btntext: {
        fontSize: 14,
        textAlign: 'center',
        letterSpacing: 0.5,
        paddingVertical: 7
    },
    btncontainer: {
        position: 'absolute',
        paddingHorizontal: 15,
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titlecontainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: commonColors?.teal?.[600],
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 10,
    },
    leftbtn: {
        width: 30,
        height: 30,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: commonColors?.commonWhite,
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 0.5,
        paddingHorizontal: 40
    },
    input: {
        height: 80,
        width: Dimensions.get('screen').width * 0.9,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        marginTop: 10,
        marginLeft: 20,
        borderWidth: 1,
        padding: 10,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingBottom: 50,
        borderBottomWidth: 1
    },
    bold: {
        fontWeight: '600'
    },
    error: {
        fontSize: 10,
        color: commonColors?.red?.[500],
        fontWeight: '400',
        marginLeft: 20,
    },
    helpcenter: {
        color: commonColors?.lightBlue?.[600],
        letterSpacing: 0.2,
        fontSize: 13
    }
})