import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";

import { auth } from '../../firebase/config';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';

// ** actions ** //
import * as callActions from '../../redux/actions/global';
// ** components ** //
import { CustomModal, Popover, MediaAccessModal, ErrorModal } from '../../components';
// ** icons ** //
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//** utils */
import { commonColors } from "../../utils/colors";

// ** constants ** //
import { contacts } from '../../utils/constants';


const MobileNumber = (props) => {
    const [showPopover, setShowPopover] = useState(false);
    const [requestedPermission, setRequestedPermission] = useState(false);
    const [showAccessModal, setShowAccessModal] = useState(false);
    const [isAccessPhoneCallModal, setIsAccessPhoneCallModal] = useState(false);
    const [error, setError] = useState("");
    const [mobilenumber, setMobilenumber] = useState("");

    const { setCountryItem, countryItem, setLoggedUser } = props;

    const navigation = useNavigation();
    const inputRef = useRef(null);

    const handleNavigation = (route) => {
        setShowPopover(false);
        navigation.navigate(route);
    }

    const handleClose = () => {
        setShowAccessModal(false);
        setIsAccessPhoneCallModal(false);
    }

    const handleContinueAccess = () => {
        setIsAccessPhoneCallModal(true);
        setShowAccessModal(false);
    }

    const onRequestPermission = () => {
        inputRef?.current?.focus();
        setRequestedPermission(true);
        setIsAccessPhoneCallModal(false);
        setShowAccessModal(false);
    }

    const register = (userObj) => {
        createUserWithEmailAndPassword(auth, userObj?.email, userObj?.password)
            .then((userCredential) => {
                // Registered
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: userObj?.name,
                    photoURL: 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
                })
                    .then(() => {
                        console.log('Registered, please login.');
                        signin(userObj);
                    })
                    .catch((error) => {
                        console.log(error.message, ":: register error");
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    setError('Incorrect password.');
                } else if (errorCode === 'auth/user-not-found') {
                    setError('No user found with this email.');
                } else if (errorCode === 'auth/missing-email') {
                    setError('Email is missing.');
                } else if(errorCode === 'auth/email-already-in-use') {
                   signin(userObj);
                }else {
                    setError(error.message);
                }
                console.log(errorMessage, ":: register request failed ");
            });
    }

    const signin = (userObj) => {
        signInWithEmailAndPassword(auth, userObj?.email, userObj?.password)
            .then((userCredential) => {
                console.log(userCredential, "---userCredential")
                setLoggedUser(userCredential);
                navigation.navigate("Chats");
                setError("");
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/wrong-password') {
                    setError('Incorrect password.');
                } else if (errorCode === 'auth/user-not-found') {
                    setError('No user found with this email.');
                } else if (errorCode === 'auth/missing-email') {
                    setError('Email is missing.');
                } else {
                    setError(error.message);
                }
            });
    };

    const handleSubmit = async () => {
        if (mobilenumber === "") {
            setError("Please enter your phone number.")
        } else {
            let findUserByPhone = (contacts || []).find((contact) => contact.phone === mobilenumber);

            console.log(findUserByPhone, "findUserByPhone")
            register(findUserByPhone);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => setShowPopover(false)}>
            <View style={styles.container}>

                <TouchableOpacity style={styles.morebtn} onPressIn={() => setShowPopover(true)}>
                    <MaterialIcons name="more-vert" size={20} color={commonColors?.blueGray?.[500]} />
                </TouchableOpacity>

                <Text style={styles.title}>Enter your phone number</Text>
                <Text style={[styles.subtitle, { paddingTop: 20, }]}>WhatsApp will need to verify your account.<Text onPress={() => setShowAccessModal(true)} style={{ color: commonColors?.teal?.[600] }}> What's my</Text></Text>
                <Text style={[styles.subtitle, { color: commonColors?.teal?.[600] }]}>number?</Text>

                <TouchableOpacity style={styles.inputcontainer1} onPress={() => navigation?.navigate('CountryQueve')}>
                    <Text style={styles.select}>{countryItem?.name}</Text>
                    <MaterialIcons name="arrow-drop-down" size={25} color={commonColors?.teal?.[600]} style={{ right: 10, top: 0 }} />
                </TouchableOpacity>

                <View style={styles.inputcontainer}>
                    <View style={styles.countrycode}>
                        <TextInput
                            style={styles.input1}
                            value={countryItem?.dial_code}
                            onChange={(e) => setCountryItem({ ...countryItem, dial_code: e.target?.value })}
                        />
                    </View>

                    <TextInput
                        ref={inputRef}
                        autoFocus={requestedPermission}
                        style={styles.input}
                        keyboardType="phone-pad"
                        placeholder="phone number"
                        placeholderTextColor={commonColors?.blueGray?.[500]}
                        value={mobilenumber}
                        onChange={(e) => {
                            setMobilenumber(e.nativeEvent.text)
                        }}
                    />
                </View>

                <Text style={styles.txt} >International Carrier charges may apply</Text>

                <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                    <Text style={styles.next} >Next</Text>
                </TouchableOpacity>

                {showPopover && <Popover contentHeight={90} >
                    <TouchableOpacity onPress={() => handleNavigation('LinkasCompanion')}>
                        <Text style={styles.popuptext}>Link as companion device</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleNavigation('Help')}>
                        <Text style={styles.popuptext}>Help</Text>
                    </TouchableOpacity>
                </Popover>}

                {showAccessModal && <CustomModal open={showAccessModal} close={handleClose} onPress={handleContinueAccess} type="phone">
                    <Text>To retrieve your phone number, WhatsApp needs permissions to make and manage your calls, without this permission, WhatsApp will be unable to retrieve your phone number from the SIM.</Text>
                </CustomModal>}

                {isAccessPhoneCallModal && <MediaAccessModal open={isAccessPhoneCallModal} close={handleClose} onPress={onRequestPermission} type="phone" >
                    <Text>Allow <Text style={styles.bold}>WhatsApp</Text> to make and manage phone calls?</Text>
                </MediaAccessModal>}

                {error && <ErrorModal open={error !== ""} close={setError} >
                    <Text>{error}</Text>
                </ErrorModal>}

            </View>
        </TouchableWithoutFeedback>
    )
};

const mapStateToProps = (state) => {
    const { countryItem } = state?.global;
    return {
        countryItem
    }
}

const mapDispatchToProps = (dispatch) => ({
    setCountryItem: (data) => dispatch(callActions?.SetCountryItem(data)),
    setLoggedUser: (data) => dispatch(callActions?.setLoggedUser(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(MobileNumber);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        paddingTop: 30
    },
    bold: {
        fontWeight: '600'
    },
    inputcontainer: {
        width: 200,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
    },
    addtext: {
        color: commonColors?.blueGray?.[400],
        fontSize: 15,
        top: 3,
        left: 10
    },
    inputcontainer1: {
        height: 40,
        width: 200,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: commonColors?.teal?.[600],
        borderWidth: 1,
        paddingTop: 15,
    },
    select: {
        height: 40,
        width: 180,
        textAlign: 'center',
        letterSpacing: 0.5,
        fontSize: 14,
    },
    input: {
        height: 40,
        width: 130,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: commonColors?.teal?.[600],
        marginLeft: 20,
        borderWidth: 1,
        fontSize: 14,
        top: 3,
        paddingTop: 10,
    },
    next: {
        color: commonColors?.commonWhite,
        fontSize: 14,
        fontWeight: '500'
    },
    input1: {
        height: 40,
        width: 50,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: commonColors?.teal?.[600],
        // marginLeft: 20,
        top: 3,
        borderWidth: 1,
        fontSize: 14,
        // paddingLeft: 20,
    },
    countrycode: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: 50
    },
    popuptext: {
        fontSize: 14,
        letterSpacing: 0.5,
        paddingTop: 15,
        paddingLeft: 15,
    },
    morebtn: {
        width: 30,
        height: 30,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 5,
        top: 25,
    },
    txt: {
        color: commonColors?.blueGray?.[500],
        fontSize: 11,
        letterSpacing: 0.5,
        marginTop: 15
    },
    subtitle: {
        fontSize: 12,
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        letterSpacing: 0.2
    },
    button: {
        width: 70,
        height: 35,
        borderRadius: 30,
        backgroundColor: commonColors?.teal?.[600],
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 30,
    },
})