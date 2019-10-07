import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center'
    },
    cardItem: {
        margin: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        borderColor: '#d0d0d0',
        borderWidth: 1
    },
    btn: {
        height: 50,
        backgroundColor: '#333333',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 8,
        flexDirection: 'row',
    },
    btnGreen: {
        backgroundColor: '#11592A',
        height: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 8,
        flexDirection: 'row',
    },
    btnText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20,
        marginLeft: 10
    },
})

export default styles;