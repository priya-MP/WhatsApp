import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/compat/firestore';

// ** Icons ** //
import { Ionicons } from 'react-native-vector-icons';

// ** components ** //
import { CustomHeader } from '../../components';

// ** utils ** //
import { commonColors } from '../../utils/colors';

// ** Styles ** //
import styles from './styles';

const ChatDetails = (props) => {
    const [isOpponentTyping, setIsOpponentTyping] = useState(false);
    const [input, setInput] = useState('');
    const user =  firebase.auth().currentUser;
    const opponentUserId = props.opponentUserId; // assume you have this prop

    useEffect(() => {
        const typingRef = firebase.database().ref(`typing/${opponentUserId}`);
        typingRef.on('value', (snapshot) => {
            const isTyping = snapshot.val();
            console.log(isTyping, snapshot, "----------------------------isTyping, snapshot,")
            setIsOpponentTyping(isTyping);
        });
        return () => {
            typingRef.off(); // remove listener on unmount
        };
    }, [opponentUserId, user]);

    const handleTyping = (text) => {
        setInput(text);
        console.log(user, "----user")
        // const userTypingRef = firebase.database().ref(`typing/${user.uid}`);
       // userTypingRef.set(true); // set typing indicator for current user
    };

    const handleSend = () => {
        const userTypingRef = firebase.database().ref(`typing/${user.uid}`);
        // send message logic
        userTypingRef.set(false); // reset typing indicator
    };

    return (
        <View style={{ flex: 1 }}>
            <CustomHeader type={'chat'} {...props} />

            {isOpponentTyping ? <Text>Typing...</Text> : null}

            <View style={styles.contentcontainer}>
                <TextInput
                    placeholder="Type a message..."
                    placeholderTextColor={commonColors?.muted?.[300]}
                    value={input}
                    style={[styles.input, { width: input? '85%' : '100%' }]}
                    onChangeText={handleTyping}
                />
               {input && <TouchableOpacity onPress={handleSend} style={styles.sendbtn}>
                    <Ionicons name="send" size={20} color={commonColors?.commonWhite} />
                </TouchableOpacity>}
            </View>
        </View>
    );
};

export default ChatDetails;