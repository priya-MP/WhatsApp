import React from 'react';
import { db } from './config';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, where, getDocs } from 'firebase/firestore';
import { isEmpty } from 'lodash';
const unsubscribeMessages = (setChatHistory, chatRoomId, chatHistory) => {
    // Reference to messages collection in the specific chat room
    const messagesRef = collection(db, 'chatRooms', chatRoomId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => {
            const data = doc.data();
            if (data) {
                return {
                    _id: doc.id, // Use doc.id as _id if necessary
                    createdAt: data.createdAt.toDate(),
                    text: data.text,
                    user: data.user,
                    status: data.status || 'sent',
                };
            } else {
                return null; // Handle null or undefined case
            }
        }).filter(Boolean); // Filter out any null values
        setChatHistory(!isEmpty(messages) ? messages : []);

    }, (error) => {
        console.error('Error fetching messages:', error);
        setChatHistory(chatHistory)
    });

    return unsubscribe;
}

// Typing Event handler
const unsubscribeType = (setTypingUsers, chatRoomId, currentUserId) => {
    const typingRef = collection(db, 'chatRooms', chatRoomId, 'typing');
    const unsubscribeTyping = onSnapshot(typingRef, (snapshot) => {
        let typingUsers = [];
        snapshot.forEach((doc) => {
            if (doc.id !== currentUserId && doc.data().isTyping) {
                typingUsers.push(doc.id);
            }
        });
        setTypingUsers(typingUsers);
    });

    return unsubscribeTyping;
}

    // Update status to 'delivered' when the user sends a message
    const updateMessageStatus = (chatRoomId, userId) => {
        const messagesRef = collection(db, 'chatRooms', chatRoomId, 'messages');
        onSnapshot(doc(db, 'users', userId), (doc) => {
            const isOnline = doc.data()?.online;
            if (isOnline) {
                const q = query(messagesRef, where('status', '==', 'sent'));
                getDocs(q).then((snapshot) => {
                    snapshot.forEach((messageDoc) => {
                        updateDoc(messageDoc.ref, { status: 'delivered' });
                    });
                });
            }
        });
    };


// Function to generate a unique chat room ID
const getChatRoomId = (userId1, userId2) => {
    return [userId1, userId2].sort().join('_');
};

export {
    unsubscribeMessages,
    unsubscribeType,
    getChatRoomId,
    updateMessageStatus
}