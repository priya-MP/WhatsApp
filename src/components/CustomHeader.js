import React from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, TouchableOpacity } from 'react-native';

//** icons */
import { Feather, MaterialCommunityIcons, Ionicons } from 'react-native-vector-icons';

//** utils */
import { commonColors } from '../utils/colors';
import { connect } from 'react-redux';


const CustomHeader = (props) => {
    const { route, chatItem, onVideoAction, onPhoneCallAction } = props;
    return (
        <>
            <StatusBar hidden={false} />
            <View style={styles.header}>
                <View style={styles.container}>
                    <View style={styles.namecontainer}>
                        {route?.params?.name && <>
                            <TouchableOpacity onPress={() => props.navigation.goBack()} >
                                <Ionicons name="arrow-back" size={24} color={commonColors?.commonWhite} />
                            </TouchableOpacity>
                            <View style={styles.avatar}>
                                <Text style={styles.label}>{route?.params?.name[0]}</Text>
                            </View>
                        </>}
                        <View style={styles.content}>
                            <Text style={[styles.name, { color: commonColors?.commonWhite }]}>{route?.params?.name ? route?.params?.name : 'WhatsApp'}</Text>
                            {route?.params?.name && chatItem?.isTyping && <Text style={styles.subcontent}>{'typing...'}</Text>}
                        </View>
                    </View>
                    <View style={styles.iconCointainer}>
                        <TouchableOpacity onPress={() => {
                            if (route?.params?.name) {
                                onVideoAction();
                            }
                        }}>
                            <Feather name={route?.params?.name ? 'video' : "search"} size={22} color={commonColors?.commonWhite} />
                        </TouchableOpacity>
                        {route?.params?.name ? <TouchableOpacity onPress={() => onPhoneCallAction()} >
                            <MaterialCommunityIcons name="phone-outline" size={22} color={commonColors?.commonWhite} />
                        </TouchableOpacity>
                            : <Feather name="camera" size={22} color={commonColors?.commonWhite} />}


                        <Feather name="more-vertical" size={22} color={commonColors?.commonWhite} />
                    </View>
                </View>
            </View>
        </>
    );
}

const mapStateToProps = (state) => {
    const { global } = state;
    return {
        chatItem: global?.chatItem
    }
};


export default connect(mapStateToProps, null)(CustomHeader);


const styles = StyleSheet.create({
    header: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: commonColors?.teal?.[600],
        height: 80,
        width: Dimensions.get('screen').width,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: commonColors?.muted[300]
    },
    name: {
        fontSize: 16,
        textAlign: 'left',
        fontWeight: '800'
    },
    namecontainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: commonColors?.muted?.[300],
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
    },
    subcontent: {
        fontSize: 10,
        textAlign: 'left',
        fontWeight: '800',
        color: commonColors?.muted[300]
    },
    label: {
        fontSize: 16,
        fontWeight: '800',
        color: commonColors?.commonWhite,
        textAlign: 'center',
    },
    iconCointainer: {
        width: 120,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
});