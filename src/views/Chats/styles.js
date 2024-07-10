import { StyleSheet, StatusBar } from "react-native";

// ** utils
import { commonColors } from "../../utils/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: commonColors?.muted?.[300],
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentView: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '800',
        color: commonColors?.black,
        textAlign: 'center',
    },
    name: {
        fontSize: 15,
        fontWeight: '800',
        color: commonColors?.black,
    },
    location: {
        fontSize: 10,
        color: commonColors?.muted?.[500],
    },

    // ChatDetails styles
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        borderColor: commonColors?.muted?.[300],
    },
    contentcontainer: {
        position: 'absolute',
        bottom: 10,
        width: '100%', 
        paddingHorizontal: 10,
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center'
    },
    wrapperLeftContainer: {
        backgroundColor: '#ffffff',
        maxWidth: '80%',
        marginVertical: 10,
        width: 'auto',
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
    },
    wrapperRightContainer: {
        backgroundColor: commonColors?.green?.[200],
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 2,
        maxWidth: '80%',
        width: 'auto',
        marginVertical: 10
    },
    messagetext: {
        color: commonColors?.black,
        fontSize: 13,
        paddingLeft: 5
    },
    inputToolbar: {
        borderTopWidth: 0,
        backgroundColor: commonColors?.commonWhite,
        borderRadius: 25,
        marginHorizontal: 10,
        marginBottom: 5,
        fontSize: 14, paddingTop:5
    },
    sendingContainer: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center', 
        paddingBottom:5
    },
});

export default styles;