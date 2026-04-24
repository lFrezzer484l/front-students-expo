import Button from '@/components/Button';
import { globalStyles } from '@/styles/globalStyles';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function miAppIndex(){
    const [cedulaReg, setCedulaReg] = useState("");
    const [nombreReg, setNombreReg] = useState("");
    const [correoReg,setCorreoReg] = useState("");
    const [celularReg,setCelularReg] = useState("");
    const [materiaReg, setMateriaReg] = useState("");

    const [error, setError] = useState("");
    const [registrado, setRegistrado] = useState("");

    const AgregarUsuario = async() => {
        if (!cedulaReg.trim() || !nombreReg.trim() || !correoReg.trim() || !celularReg.trim() || !materiaReg.trim() ){
            setError("Complete todos los campos antes de agregar un usuario");
            return;
        }
        setError("");
        const response = await fetch(`${process.env.EXPO_PUBLIC_STUDENTS_API}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cedula: cedulaReg,
                nombre: nombreReg,
                correo: correoReg,
                celular: celularReg,
                materia: materiaReg
            })
        });

        const data = await response.json();
        if (response.ok) {
            setRegistrado("Usuario registrado exitosamente");

            setTimeout(() => {
                setRegistrado("");
            }, 5000);
            setCedulaReg("");
            setNombreReg("");
            setCorreoReg("");
            setCelularReg("");
            setMateriaReg("");
        }
    };

    return(
        <View style={globalStyles.container}>
            
            <View style={globalStyles.Text}>
                <Text style={globalStyles.Text}> Cedula</Text>
                <TextInput 
                style={globalStyles.input}
                value={cedulaReg}
                onChangeText={setCedulaReg}
                />
                </View>
            <View style={globalStyles.Text}>
                <Text style={globalStyles.Text}> Nombre </Text>
                <TextInput 
                style={globalStyles.input}
                value={nombreReg}
                onChangeText={setNombreReg}
                />
                </View>
            <View style={globalStyles.Text}>
                <Text style={globalStyles.Text}> Correo</Text>
                <TextInput 
                style={globalStyles.input}
                value={correoReg}
                onChangeText={setCorreoReg}
                />
                </View>
            <View style={globalStyles.Text}>
                <Text style={globalStyles.Text}> Celular</Text>
                <TextInput 
                style={globalStyles.input}
                value={celularReg}
                onChangeText={setCelularReg}
                />
                </View>
            <View style={globalStyles.Text}>
                <Text style={globalStyles.Text}> Materia</Text>
                <TextInput 
                style={globalStyles.input}
                value={materiaReg}
                onChangeText={setMateriaReg}
                />
                </View>
                
            <View style={globalStyles.buttonContainer}>
                <Button theme="primary" label="Registrar" onPress={AgregarUsuario}/>
            </View>
            <View>
                {error !== '' && <Text style={{ color: 'red' }}>{error}</Text>}
                {registrado !== '' && <Text style={{ color: 'green' }}>{registrado}</Text>}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
   
});
