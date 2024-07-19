import React, { useLayoutEffect, useCallback, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { connect } from 'react-redux';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import AgoraUIKit from 'agora-rn-uikit';

// ** firebase ** //
import { auth, db } from '../../firebase/config';

// ** actions ** //
import * as callActions from '../../redux/actions/global';

// ** Icons ** //
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// ** components ** //
import { CustomHeader } from '../../components';

// ** Helpers ** //
import { unsubscribeMessages, unsubscribeType, getChatRoomId, updateMessageStatus } from '../../firebase/helpers';

// ** constants ** //
import { contacts } from '../../utils/constants';

// ** styles ** //
import styles from './styles';
import { commonColors } from '../../utils/colors';

const ChatDetails = (props) => {
    const [typingUsers, setTypingUsers] = useState([]);
    const [videoCall, setVideoCall] = useState(false);

    const { setChatHistory, chatHistory, route, navigation, getLoggedUser } = props;

    const selectedUserId = route?.params?.id?.toString(); // Get the selected user ID from route params
    const currentUserId = auth.currentUser.uid;
    const chatRoomId = getChatRoomId(currentUserId, selectedUserId);

    // hooks to fetch messages
    useLayoutEffect(() => {
        if (!selectedUserId) return;
        const unsubscribeMsg = unsubscribeMessages(setChatHistory, chatRoomId, chatHistory); // Reference to messages collection in the specific chat room
        const unsubscribeTyping = unsubscribeType(setTypingUsers, chatRoomId, currentUserId); // typing event handler

        updateMessageStatus(chatRoomId, currentUserId); // Update status to 'delivered' when the user sends a message
        return () => {
            unsubscribeMsg();
            unsubscribeTyping();
        };
    }, [navigation, selectedUserId, currentUserId, chatHistory]);
    
      const startVideoCall = async () => {
            setVideoCall(!videoCall);
      };

    // Send messages
    const onSend = useCallback((messages = []) => {
        messages.forEach(message => {
            const { _id, createdAt, text, user } = message;
            addDoc(collection(db, 'chatRooms', chatRoomId, 'messages'), { _id, createdAt, text, user, status: 'sent', participants: [currentUserId, selectedUserId] })
                .then(() => {
                    console.log('Message sent successfully', message);
                    updateMessageStatus(chatRoomId, currentUserId)
                })
                .catch(error => console.error('Error sending message: ', error));
        });
    }, [currentUserId, selectedUserId]);

    // on input text change handler
    const onInputTextChanged = (text) => {
        // const chatRoomId = route?.params?.id?.toString();
        if (!chatRoomId || !currentUserId) return;
        const typingRef = doc(collection(db, 'chatRooms', chatRoomId, 'typing'), currentUserId);
        setDoc(typingRef, { isTyping: text.length > 0 });
    };


    // render message component
    const renderTicks = (props) => {
        return (
            <View style={{ paddingRight: 8, paddingBottom: 2 }}>
                <Ionicons name={props?.status === 'sent' ? "checkmark" : "checkmark-done"}
                    size={16} color={props?.status === 'read' ? commonColors?.cyanBlue?.[400] : commonColors?.muted?.[400]}
                />
            </View>
        );
    };


    // render bubble component
    const renderBubble = (props) => {
        // backgroundColor: props.currentMessage.user._id === auth.currentUser.uid ? '#dcf8c6' : '#ffffff',
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: styles.wrapperLeftContainer,
                    right: styles.wrapperRightContainer,
                }}
                textStyle={{
                    left: styles.messagetext,
                    right: styles.messagetext,
                }}
                renderTicks={renderTicks}
            />
        );
    };

    // customize input container
    const renderInputToolbar = (props) => {
        return (
            <InputToolbar
                {...props}
                containerStyle={styles.inputToolbar}
                primaryStyle={{ alignItems: 'center' }}
            />
        );
    };

    // customize send button
    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View style={styles.sendingContainer}>
                    <MaterialCommunityIcons name="send" size={24} color={commonColors?.teal?.[600]} />
                </View>
            </Send>
        );
    };

    const connectionData = {
        appId: '1a6aba9dbcfa4bafa9b54487abe97c5e',
        channel: 'test',
    };
    const rtcCallbacks = {
        EndCall: () => setVideoCall(false),
    };

    const onPhoneCall = () => {
        let findObj = (contacts || []).find((contact) => contact.id === parseInt(selectedUserId));

        RNImmediatePhoneCall.immediatePhoneCall(findObj?.phone);
    }


    return (
        <View style={{ flex: 1 }}>
            {videoCall && <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />}
            {!videoCall && <CustomHeader type={'chat'} {...props} onVideoAction={startVideoCall} onPhoneCallAction={onPhoneCall} />}
            {!videoCall && <ImageBackground source={require('../../assets/background.png')} style={{ flex: 1, justifyContent: 'center' }}>
                <GiftedChat
                    messages={(chatHistory || [])}
                    showAvatarForEveryMessage={true}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: auth?.currentUser?.email,
                        name: auth?.currentUser?.displayName,
                        avatar: auth?.currentUser?.photoURL
                    }}
                    onInputTextChanged={onInputTextChanged}
                    isTyping={typingUsers.length > 0}
                    renderInputToolbar={renderInputToolbar}
                    renderSend={renderSend}
                    renderBubble={renderBubble}
                    timeTextStyle={{
                        left: { color: commonColors?.muted?.[400], fontSize: 9, paddingLeft: 30 },
                        right: { color: commonColors?.muted?.[400], fontSize: 9, paddingLeft: 30 },
                    }}
                />
            </ImageBackground>}
        </View>
    );
};

const mapStateToProps = (state) => {
    const { global } = state;
    return {
        chatItem: global?.chatItem,
        chatHistory: global?.chatHistory,
        getLoggedUser: global?.getLoggedUser
    }
};

const mapDispatchToProps = (dispatch) => ({
    setChatItem: (data) => dispatch(callActions?.SetChatItem(data)),
    setChatHistory: (data) => dispatch(callActions?.setChatHistory(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatDetails);
