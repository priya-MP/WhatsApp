import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

// Constants
import { contacts } from '../../utils/constants';

// Styles
import styles from './styles';

const Chats = (props) => {
    const { navigation,getLoggedUser } = props;

    const renderItem = ({ name, location }, index) => (
        <TouchableOpacity key={index} style={styles.item} onPress={() => navigation.navigate('ChatDetails', { name, location  })}>
            <View style={styles.avatar}>
                <Text style={styles.label}>{name[0]}</Text>
            </View>
            <View style={styles.contentView}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.location}>{location}</Text>
            </View>
        </TouchableOpacity>
    );

    const filteredData = !isEmpty(getLoggedUser) ? (contacts || []).filter(item => item.email !== getLoggedUser?.user?.email) : (contacts || []);

    return (
        <FlatList
            data={filteredData}
            renderItem={({item}, index) => renderItem(item, index)}
            keyExtractor={item => item.id}
        />
    );
};

const mapStateToProps  = (state) => {
    const { global } = state;
    return {
        getLoggedUser: global?.getLoggedUser
    }
}

export default connect(mapStateToProps)(Chats);