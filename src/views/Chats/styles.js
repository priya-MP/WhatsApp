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
        // margin: 12,
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
    sendbtn:{
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: commonColors?.teal?.[600],
        alignItems: 'center',
        justifyContent: 'center',
    },
    messagescontainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginHorizontal: 10,
        marginBottom: 10
    },
    message: {
        backgroundColor: commonColors?.muted?.[300],
        width: 150,
        // height: 40,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        display: 'flex',
        justifyContent: 'center',
        margin: 5
    },
    messagetext: {
        fontSize: 14,
        color: commonColors?.commonWhite,
        fontWeight: '500',
        textAlign: 'left',
    }
});

export default styles;