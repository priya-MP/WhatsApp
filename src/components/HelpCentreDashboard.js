import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Linking } from 'react-native';
import { useNavigation } from "@react-navigation/native";

// ** icons ** //
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//** utils */
import { commonColors } from "../utils/colors";
import Popover from "./Popover";
import CustomSearch from "./CustomSearch";

const HelpCentreDashboard = ({ children, title, showFooter, showSearch, transparent, showMore, onPress, backgroundColor }) => {
    const [isSearch, setIsSearch] = useState(false);

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {!isSearch ? <View style={[styles.headercontainder, { backgroundColor: transparent ? "transparent" : (backgroundColor ? backgroundColor : commonColors?.teal?.[600]) }]}>

                <View style={styles.titlecontainer}>
                    <TouchableOpacity style={styles.leftbtn} onPress={() => navigation.pop()}>
                        <AntDesign name="arrowleft" size={20} color={(transparent || backgroundColor) ? commonColors?.blueGray?.[400] : commonColors?.commonWhite} />
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: (transparent || backgroundColor) ? commonColors?.teal?.[600] : commonColors?.commonWhite }]}>{title}</Text>
                </View>

                {showSearch && <TouchableOpacity style={styles.searchbtn} onPress={() => setIsSearch(!isSearch)}>
                    <Ionicons name="search" size={20} color={commonColors?.blueGray?.[400]} />
                </TouchableOpacity>}

                {showMore && <TouchableOpacity style={styles.searchbtn} onPress={onPress}>
                    <MaterialIcons name="more-vert" size={20} color={commonColors?.blueGray?.[400]} />
                </TouchableOpacity>}
            </View>
                : <CustomSearch onPress={onPress} onClose={()=> setIsSearch(false)} />}

            <View >
                {children}
            </View>

            {showFooter && <View style={styles.button} >
                <Text style={styles.text} >This doesn't answer my question</Text>
            </View>}
        </View>
    )
}

export default HelpCentreDashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headercontainder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.7,
        borderBottomColor: commonColors?.blueGray?.[200],
        height: 60
    },
    popuptext: {
        fontSize: 14,
        letterSpacing: 1,
        paddingTop: 12,
        paddingLeft: 20,
    },
    titlecontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftbtn: {
        width: 30,
        height: 30,
        display: 'flex',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10
    },
    searchbtn: {
        width: 30,
        height: 30,
        borderRadius: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        display: 'flex',
        paddingRight: 10
    },
    button: {
        width: Dimensions.get('screen').width,
        height: 50,
        backgroundColor: commonColors?.teal?.[600],
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingTop: 2,
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.5,
        paddingHorizontal: 30
    },
    text: {
        color: commonColors?.commonWhite,
        fontSize: 12,
        letterSpacing: 0.3
    }
})