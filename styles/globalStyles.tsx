import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    input: {
        width: 250,
        height: 40,
        borderWidth: 2,
        borderColor: '#3de5ff',
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',

    },

    buttonContainer: {
        marginTop: 10,
        width: 150,
        marginLeft: 50,
    },
    Text: {
        flexDirection: 'row',
        marginTop: 8,
        marginRight: 15,
    },
    CuadroNotas: {
        width: 350,
        height: 300,
        borderColor: '#3de5ff',
        borderWidth: 2,
        marginTop: 15,
        alignContent: 'center',
        justifyContent: 'center',
    },
    centrarNotas: {
        alignContent: 'center',
        justifyContent: 'center',
        marginLeft: '30%',
    },
});