import React from "react";
import { View, StyleSheet } from "react-native";

//** utils */
import { commonColors } from "../utils/colors";

const Popover = ({ children, contentHeight, onPress }) => {
    return (
        <View style={[styles.popup, { height: contentHeight }]} >
            {children}
        </View>
    )
}

export default Popover;

const styles = StyleSheet.create({
    popup: {
        position: 'absolute',
        zIndex:1,
        top: 10,
        width: 200,
        borderRadius: 5,
        backgroundColor: commonColors?.commonWhite,
        right: 5,
        elevation: 15,
        shadowColor: '#000'
    }
});