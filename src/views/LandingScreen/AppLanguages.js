import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

// ** icons ** //
import AntDesign from 'react-native-vector-icons/AntDesign';

//** utils */
import { commonColors } from '../../utils/colors';

const AppLanguages = (props) => {

    const { selectedLanguage, handleSelectLanguage } = props?.route?.params;
    const { getalllanguagelist } = props;

    const navigation = useNavigation();

    const handleSelect = (lang, index) => {
        handleSelectLanguage(lang, index);
    }

    const renderItem = (language, index) => (
        <TouchableOpacity key={index} style={styles.languageItem} onPressIn={() => handleSelect(language, index)} activeOpacity={1}>
            <RadioButton
                color={commonColors?.teal?.[600]}
                uncheckedColor='#d4d4d4'
                value={language}
                status={selectedLanguage === language?.trans ? 'checked' : 'unchecked'}
            />
            <View style={styles.textview}>
                <Text style={styles.trans}>{language?.trans}</Text>
                <Text style={styles.name}>{language?.name === 'device language' ? `(${language?.name})` : language?.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.iconcontainer}>
                <TouchableOpacity style={styles.close} onPressIn={() => navigation.pop()}>
                    <AntDesign name='close' size={22} color="#a3a3a3" />
                </TouchableOpacity>
                <Text style={styles.title}>App Language</Text>
            </View>
            <FlatList
                data={getalllanguagelist}
                renderItem={({ item, index }) => renderItem(item, index)}
                keyExtractor={item => item?.id?.toString()}
            />
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => {
    const { getalllanguagelist } = state?.global;
    return {
        getalllanguagelist
    }
}

export default connect(mapStateToProps)(AppLanguages);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: commonColors?.commonWhite
    },
    iconcontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 30,
        paddingVertical: 20
    },
    title: {
        fontSize: 18,
        paddingLeft: 15,
        letterSpacing: 1,
        fontWeight: '500',
    },
    languageItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 16,
    },
    textview: { flexDirection: 'column', paddingLeft: 15 },
    trans: { fontSize: 12, fontWeight: '800', letterSpacing: 1 },
    name: { fontSize: 11, color: '#a3a3a3', letterSpacing: 1 },
    close: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
});