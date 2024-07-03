import React from "react";
import { StyleSheet, Text } from "react-native";

const WelComeTextLayout = ({ children, type, screen }) => {
    return (
        <Text style={type === "title" ? (screen === "agreeandcontinue" ? styles?.title1 : styles.title) : styles.subtitle}>{children}</Text>
    )
}

export default WelComeTextLayout;

const styles = StyleSheet.create({
    title: {
        position: 'absolute',
        top: 70,
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 1,
        zIndex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    title1: {
        fontSize: 18,
        paddingBottom: 15,
        fontWeight: '500',
        letterSpacing: 1,
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    subtitle: {
        position: 'absolute',
        alignSelf: 'center',
        fontSize: 14,
        zIndex: 1,
        top: 100,
    },
})