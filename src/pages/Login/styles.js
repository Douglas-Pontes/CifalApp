import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    logo: {
        height: 115,
        resizeMode: 'contain',
        marginTop: 100
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
    warn: {
        textAlign: 'center',
        color: '#828282',
        fontSize: 16,
        marginVertical: 20
    },
    btnLogin: {
        height: 50,
        backgroundColor: '#11592A',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    btnText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20
    },
    key: {
        width: 29,
        height: 29,
        borderRadius: 30,
        borderWidth: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#11592A'
    }
})

export default styles;