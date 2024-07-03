import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground, Dimensions, SafeAreaView, Image } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

// ** icons ** //
import AntDesign from 'react-native-vector-icons/AntDesign';

//** utils */
import { commonColors } from '../../utils/colors';
import WelComeTextLayout from '../../components/WelComeTextLayout';



const LandingScreen = (props) => {
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [selectedIndex, setSelectedIndex] = useState(null);

    const navigation = useNavigation();
    const flatListRef = React.useRef(null);

    const { getalllanguagelist } = props;

    const handleSelectLanguage = (language, index) => {
        setSelectedLanguage(language?.trans);
        setSelectedIndex(index);
        navigation.pop();
    };

    const reorderedData = selectedIndex !== null ? [getalllanguagelist[selectedIndex], ...getalllanguagelist.slice(0, selectedIndex), ...getalllanguagelist.slice(selectedIndex + 1)] : getalllanguagelist;

    const renderItem = (language, index) => (
        <TouchableOpacity key={index} style={styles.languageItem} onPress={() => handleSelectLanguage(language, index)} activeOpacity={1}>
            <RadioButton
                color={commonColors?.teal?.[600]}
                uncheckedColor={commonColors?.blueGray?.[500]}
                onPress={() => handleSelectLanguage(language, index)}
                value={language}
                status={selectedLanguage === language?.trans ? 'checked' : 'unchecked'}
            />
            <View style={styles.textview}>
                <Text style={styles.trans}>{language?.trans}</Text>
                <Text style={styles.name}>{language?.name === 'device language' ? `( device's language )` : language?.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.imagecontainer}>
                <Image source={require('../../assets/landing.png')} resizeMode="cover" style={styles.image} />
                <WelComeTextLayout type="title">Welcome to WhatsApp</WelComeTextLayout>
                <WelComeTextLayout type="subtitle">Choose your language to get started</WelComeTextLayout>
                <View style={styles.overlay} >
                    <View style={styles.suboverlay} />
                </View>
            </View>
            <View style={styles.flatlist}>
                <FlatList
                    data={reorderedData}
                    renderItem={({ item, index }) => renderItem(item, index)}
                    keyExtractor={item => item?.id?.toString()}
                />
            </View>

            <TouchableOpacity style={styles.add} onPress={() => navigation.navigate('AgreeandContinue', { lang: selectedLanguage })}>
                <AntDesign name='arrowright' size={30} color={commonColors?.commonWhite} />
            </TouchableOpacity>
        </View>
    );
};

const mapStateToProps = (state) => {
    const { getalllanguagelist } = state?.global;
    return {
        getalllanguagelist
    }
}

export default connect(mapStateToProps)(LandingScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: commonColors?.commonWhite
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        marginTop: 100,
        opacity: 0.6,
        height: 150,
        backgroundColor: '#FFFFFF',
    },
    image: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: Dimensions.get('screen').width * 1,
        height: '60%',
        opacity: 0.9
    },
    imagecontainer: {
        display: 'flex'
    },
    languageItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        marginVertical: 2,
        marginHorizontal: 16,
    },
    add: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: commonColors?.teal?.[600],
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 20,
        bottom: 20,
        zIndex: 1
    },
    selectedLanguage: {
        marginTop: 16,
        fontSize: 16,
    },
    flatlist: {
        backgroundColor: commonColors?.commonWhite,
        position: 'absolute',
        bottom: 20,
        width: Dimensions.get('screen').width,
        height: 400,
        zIndex: 1,
    },
    suboverlay: {
        backgroundColor: '#FFFFFF',
        height: 200
    },
    textview: {
        flexDirection: 'column',
        paddingLeft: 15
    },
    trans: {
        fontSize: 14,
        fontWeight: '400'
    },
    name: {
        fontSize: 13,
        color: commonColors?.blueGray?.[500]
    }
});