import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

//** components */
import { HelpCentreDashboard } from '../../components';
import { commonColors } from "../../utils/colors";

const SearchHelpCentre = (props) => {
    const { getallquestions } = props;

    const renderItem = (item, index) => (
        <TouchableOpacity key={index} style={[styles.renderitem, { borderTopColor: index === 0 ? 'transparent' : commonColors?.blueGray?.[200] }]} onPressIn={() => { }}>
            <View style={styles.textview}>
                <Text style={styles.question}>{item?.question}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <HelpCentreDashboard title="Search Help Centre" showFooter={true}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Is this your question?</Text>
                <FlatList
                    data={getallquestions}
                    renderItem={({ item, index }) => renderItem(item, index)}
                    keyExtractor={item => item?.id?.toString()}
                    scrollEnabled={true}
                />
            </SafeAreaView>
        </HelpCentreDashboard>
    )
}

const mapStateToProps = (state) => {
    const { getallquestions } = state?.global;
    return {
        getallquestions
    }
}

export default connect(mapStateToProps)(SearchHelpCentre);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        height: '90%'
    },
    renderitem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.3,
        borderColor: commonColors?.blueGray?.[200],
        paddingLeft: 20,
        height: 60
    },
    title: {
        fontSize: 12,
        color: commonColors?.blueGray?.[500],
        fontWeight: '500',
        paddingTop: 20,
        paddingLeft: 20,
    },
    question: {
        fontSize: 14,
    }
})