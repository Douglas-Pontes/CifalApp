import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camera: {
        height: 150
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
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
    btnDelete: {
        flex: 1,
        marginVertical: 10,
        borderRadius: 8,
        width: '15%',
        flexDirection: 'row',
        backgroundColor: '#e32636',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default styles;