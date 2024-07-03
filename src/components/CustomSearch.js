import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';

// ** redux ** //
import * as callActions from '../redux/actions';
// ** icons ** //
import AntDesign from 'react-native-vector-icons/AntDesign';

// ** utils ** //
import { commonColors } from "../utils/colors";
import { connect } from "react-redux";

const CustomSearch = (props) => {
    const { searchCountry, onPress, SetSearchCountry, onClose } = props;

    return (
        <View style={styles.container}>
            <View style={styles.searchBar__clicked} >
                <TouchableOpacity style={[styles.leftbtn, { paddingLeft: 10 }]} onPress={onClose}>
                    <AntDesign name="arrowleft" size={20} color={'#000'} />
                </TouchableOpacity>
                <TextInput
                    autoFocus={true}
                    style={styles.input}
                    placeholder="Search countries"
                    value={searchCountry}
                    onChangeText={(e) => onPress(e)}
                />
                <TouchableOpacity style={[styles.leftbtn, { paddingRight: 10 }]} onPress={()=> SetSearchCountry("")}>
                    <AntDesign name="close" size={20} color={'#000'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    const { searchCountry } = state?.global;
    return {
        searchCountry
    }
};

const mapDispatchToProps = (dispatch) => ({
    SetSearchCountry: (data) => dispatch(callActions?.SetSearchCountry(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(CustomSearch);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 5,
        width: Dimensions.get('window').width,
        height: 50
    },
    leftbtn: {
        width: 30,
        height: 30,
        display: 'flex',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchBar__clicked: {
        flexDirection: "row",
        width: "95%",
        backgroundColor: commonColors?.white?.[50],
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    input: {
        fontSize: 14,
        marginLeft: 10,
        width: "90%",
        color: commonColors?.blueGray?.[500]
    },
})