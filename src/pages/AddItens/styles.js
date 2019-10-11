import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 10
    },
    camera: {
        flex: 1,
    },
    input: {
        borderWidth: 3,
        borderColor: '#F2F2F2',
        borderRadius: 10,
        width: "100%",
        height: 45,
        marginBottom: 10,
        paddingLeft: 11
    },
    cardItem: {
        marginVertical: 10,
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
        marginHorizontal: 10,
        borderRadius: 8,
        width: '15%',
        flexDirection: 'row',
        backgroundColor: '#e32636',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        height: 50,
        backgroundColor: '#11592A',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row'
    },
    btnText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20,
        marginLeft: 10
    },
})

export default styles;