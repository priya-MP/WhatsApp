import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, FlatList, StyleSheet, Dimensions, Image } from 'react-native';
import { connect } from "react-redux";
import { SvgUri } from 'react-native-svg';

// ** actions ** //
import * as callActions from '../../redux/actions/global';
// ** components ** /
import { HelpCentreDashboard } from '../../components';
// ** utils ** //
import { commonColors } from "../../utils/colors";
// ** icons ** //
import AntDesign from 'react-native-vector-icons/AntDesign';
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";

const CountryQueve = (props) => {
    const [reorderedData, setReorderedData] = useState([]);

    const { GetAllCountries, setCountryItem, getallcountries, countryItem, SetSearchCountry } = props;

    const navigation = useNavigation();


    useEffect(() => {
        GetAllCountries();
    }, []);

    useEffect(() => {
        if (!isEmpty(getallcountries)) {
            const reorderedlist = !isEmpty(countryItem) ? moveItemToTop(getallcountries, countryItem) : getallcountries;
            setReorderedData(reorderedlist);
        }
    }, [getallcountries, countryItem]);

    const moveItemToTop = (array, selectedItem) => {
        const index = array.indexOf(selectedItem);
        if (index !== -1) {
            // Create a new array with the selected item moved to the top
            return [selectedItem, ...array.slice(0, index), ...array.slice(index + 1)];
        }
        return array;
    }

    const handleSelectCountry = (item) => {
        setCountryItem(item);
        console.log(item, "-------item")
        const reorderedlist = moveItemToTop(getallcountries, item);
        setReorderedData(reorderedlist);
        navigation.navigate('MobileNumber');
    }

    const handleSearch = (val) =>{
        SetSearchCountry(val);
        const filteredCountries = getallcountries?.filter((item) => item?.name?.toLowerCase()?.includes(val?.toLowerCase()));
        setReorderedData(!isEmpty(filteredCountries) ? filteredCountries : reorderedData);
    }

    const renderItem = (country, index) => {
        const renderANFlag = 'https://upload.wikimedia.org/wikipedia/commons/6/69/Flag_of_the_Netherlands_Antilles_1959-1986.png'
        return (
            <TouchableOpacity key={index} style={styles.countryItem} onPress={() => handleSelectCountry(country)} >
                <View style={styles.contentcontainer}>
                    <View style={styles.svgcontainer}>
                        {country?.code === "AN" ?
                            <Image source={{ uri: renderANFlag }} resizeMode="cover" style={styles.image} />
                            : <SvgUri
                                width={25}
                                height={25}
                                uri={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${country?.code}.svg`}
                            />}
                        <Text style={[styles.name, { color: (!isEmpty(countryItem) && countryItem?.name === country?.name) ? commonColors?.teal?.[600] : '#000' }]}>{country?.name}</Text>
                    </View>
                    <View style={styles.iconcontainer}>
                        <Text style={styles.dial_code}>{country?.dial_code}</Text>
                        {(!isEmpty(countryItem) && countryItem?.name === country?.name) ? <AntDesign name="check" size={18} color={commonColors?.teal?.[600]} />
                            : <View style={{ width: 20 }} />}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <HelpCentreDashboard title="Choose a country" transparent={true} showFooter={false} showSearch={true} onPress={handleSearch}>
            <FlatList
                data={reorderedData}
                renderItem={({ item, index }) => renderItem(item, index)}
                keyExtractor={(item, index) => index?.toString()}
            />
        </HelpCentreDashboard>
    )
}

const mapStateToProps = (state) => {
    const { getallcountries, countryItem } = state?.global;
    return {
        getallcountries,
        countryItem
    }
};

const mapDispatchToProps = (dispatch) => ({
    setCountryItem: (data) => dispatch(callActions?.SetCountryItem(data)),
    GetAllCountries: () => dispatch(callActions?.getAllCountries()),
    SetSearchCountry: (data) => dispatch(callActions?.SetSearchCountry(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryQueve);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: commonColors?.commonWhite
    },
    contentcontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        width: Dimensions?.get('screen').width * 0.9,
    },
    iconcontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: 5,
        width: 70
    },
    svgcontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    countryItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        marginVertical: 5,
        paddingHorizontal: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: commonColors?.blueGray?.[200],
    },
    name: {
        fontSize: 14,
        letterSpacing: 0.2,
        marginLeft: 10,
        fontWeight: '500',
        width: 250
    },
    dial_code: {
        fontSize: 15,
        letterSpacing: 0.2,
        marginRight: 5,
        fontWeight: '600',
        color: commonColors?.blueGray?.[500]
    },
    image: {
        width: 20,
        height: 20
    }
});