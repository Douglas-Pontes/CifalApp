import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center'
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
    btn: {
        height: 50,
        backgroundColor: '#11592A',
        width: '100%',
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