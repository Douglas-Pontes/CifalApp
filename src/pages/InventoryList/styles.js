import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerFilter: {
        backgroundColor: '#11592A',
        display: 'flex',
        flexDirection: 'row'
    },
    picker: {
        flex: 1,
        height: 23,
        marginLeft: 5,
        color: 'white',
        backgroundColor: '#11592A'
    },
    arrowDown: {
        flex: 1,
        justifyContent: 'center'
    },
    cardItem: {
        margin: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        borderColor: '#d0d0d0',
        borderWidth: 1
    },
    txtNome: {
        fontSize: 17,
        fontWeight: '700',
        color: '#333333',
    },
    txtData: {
        marginTop: 5,
        fontSize: 14,
        color: '#828282'
    },
    newInventoryButton: {

        bottom: 10,
        right: 12,
        alignSelf: 'flex-end',
        backgroundColor: '#11592A',
        height: 50,
        width: 50,
        borderRadius: 80,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default styles;