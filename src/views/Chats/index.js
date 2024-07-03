import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';

// Constants
import { contacts } from '../../utils/constants';

// Styles
import styles from './styles';

const Chats = (props) => {
    const { navigation } = props;

    const renderItem = ({ name, location }) => (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ChatDetails', { name, location  })}>
            <View style={styles.avatar}>
                <Text style={styles.label}>{name[0]}</Text>
            </View>
            <View style={styles.contentView}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.location}>{location}</Text>
            </View>
        </TouchableOpacity>
    );


    return (
        <FlatList
            data={contacts}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={item => item.id}
        />
    );
};

export default Chats;