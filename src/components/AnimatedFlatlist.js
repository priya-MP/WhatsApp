import React, { useRef, useState } from "react";
import { StyleSheet, Dimensions, Animated, Text, TouchableOpacity, View, FlatList } from "react-native";
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import Modal from 'react-native-modal';

//** icons */
import AntDesign from 'react-native-vector-icons/AntDesign';

//** utils */
import { commonColors } from "../utils/colors";

const AnimatedFlatlist = (props) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const { getalllanguagelist, setPreviewLangs, selectedLanguage, setSelectedLanguage, active } = props;

    const navigation = useNavigation();

    const flatListRef = useRef(null);
    const logoScale = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        // Animate the logo when the component mounts
        Animated.timing(logoScale, {
            toValue: 10,
            duration: 100, // Adjust the duration as needed
            useNativeDriver: true,
        }).start();
    }, []);

    const handlePress = () => {
        setPreviewLangs(false);
    };

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const threshold = 10;
        if (offsetY > threshold) {
            navigation.navigate('AppLanguages',
                {
                    handleSelectLanguage: handleSelectLanguage,
                    selectedLanguage: selectedLanguage,
                });
        }
    };

    const handleSelectLanguage = (language, index) => {
        setSelectedLanguage(language?.trans);
        setSelectedIndex(index);
        setPreviewLangs(false);
        navigation.navigate("AgreeandContinue");
    };

    const reorderedData = selectedIndex !== null ? [getalllanguagelist[selectedIndex], ...getalllanguagelist.slice(0, selectedIndex), ...getalllanguagelist.slice(selectedIndex + 1)] : getalllanguagelist;

    const renderItem = (language, index) => (
        <TouchableOpacity key={index} style={styles.languageItem} onPress={() => handleSelectLanguage(language, index)} activeOpacity={0.8}>
            <RadioButton
                color={commonColors?.teal?.[600]}
                uncheckedColor={commonColors?.blueGray?.[500]}
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
        <Modal
            isVisible={active}
            width={"100%"}
            swipeDirection={['down']}
        >
            <View style={styles.animatedview}>
                <View style={styles.topdivide} />
                <View style={styles.iconconatiner}>
                    <TouchableOpacity style={styles.cancel} onPress={handlePress}>
                        <AntDesign name="close" size={20} color={"#64748b"} />
                    </TouchableOpacity>
                    <Text style={styles.title}>App Language</Text>
                </View>
                <FlatList
                    ref={flatListRef}
                    data={reorderedData}
                    renderItem={({ item, index }) => renderItem(item, index)}
                    keyExtractor={item => item?.id?.toString()}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                />
            </View>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    const { getalllanguagelist } = state?.global;
    return {
        getalllanguagelist
    }
}

export default connect(mapStateToProps)(AnimatedFlatlist);


const styles = StyleSheet.create({
    animatedview: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: commonColors?.commonWhite,
        width: Dimensions.get('screen').width,
        position: 'absolute',
        bottom: -20,
        right: 20,
        height: 350,
    },
    cancel: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    textview: {
        flexDirection: 'column',
        paddingLeft: 15
    },
    trans: {
        fontSize: 14,
        fontWeight: '400',
        letterSpacing: 1
    },
    name: {
        fontSize: 13,
        color: commonColors?.blueGray?.[500],
        letterSpacing: 1
    },
    title: {
        fontSize: 17,
        paddingLeft: 22,
        fontWeight: '500',
        letterSpacing: 1
    },
    iconconatiner: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
        padding: 15,
        marginHorizontal: 16,
    },
    languageItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        // marginVertical: 2,
        marginHorizontal: 16,
    },
    topdivide: {
        width: 20,
        height: 3,
        borderRadius: 10,
        backgroundColor: "#d4d4d4",
        position: 'absolute',
        top: 20,
        justifyContent: 'center',
        alignSelf: 'center'
    }
})