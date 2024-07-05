import React, { useLayoutEffect, useCallback } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { auth, db } from '../../firebase/config';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat';

// ** actions ** //
import * as callActions from '../../redux/actions/global';

// ** components ** //
import { CustomHeader } from '../../components';

const ChatDetails = (props) => {
    const { setChatHistory, chatHistory, navigation } = props;

    useLayoutEffect(() => {
        const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map(doc => {
                const data = doc.data();
                if (data) {
                    return {
                        _id: doc.id, // Use doc.id as _id if necessary
                        createdAt: data.createdAt.toDate(),
                        text: data.text,
                        user: data.user,
                    };
                } else {
                    return null; // Handle null or undefined case
                }
            }).filter(Boolean); // Filter out any null values
    
            setChatHistory(!isEmpty(messages) ? messages : []);

        }, (error) => {
            console.error('Error fetching messages:', error);
            // Handle error condition
            setChatHistory(chatHistory)
        });
    
        return () => {
            unsubscribe();
        };
    
    }, [navigation]);

    const onSend = useCallback((messages = []) => {
        messages.forEach(message => {
            const { _id, createdAt, text, user } = message;
            addDoc(collection(db, 'chats'), { _id, createdAt, text, user })
                .then(() => console.log('Message sent: ', messages[0]))
                .catch(error => console.error('Error sending message: ', error));
        });
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <CustomHeader type={'chat'} {...props} />

            <View style={{ flex: 1 }}>
                <GiftedChat
                    messages={(chatHistory || [])}
                    showAvatarForEveryMessage={true}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: auth?.currentUser?.email,
                        name: auth?.currentUser?.displayName,
                        avatar: auth?.currentUser?.photoURL
                    }}
                />
            </View>
        </View>
    );
};

const mapStateToProps = (state) => {
    const { global } = state;
    return {
        chatItem: global?.chatItem,
        chatHistory: global?.chatHistory
    }
};

const mapDispatchToProps = (dispatch) => ({
    setChatItem: (data) => dispatch(callActions?.SetChatItem(data)),
    setChatHistory: (data) => dispatch(callActions?.setChatHistory(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatDetails);
