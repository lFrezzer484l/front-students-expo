import Button from '@/components/Button';
import { globalStyles } from '@/styles/globalStyles';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function miAppIndex() {
    const [cedulaIndex, setCedulaIndex] = useState("");
    const [nombreIndex, setNombreIndex] = useState("");
    const [error, setError] = useState("");
    const [id_alumno, setAlumno_id] = useState("");

    type students = {
        id: number;
        nombre: string;
        cedula: string;
        correo: string;
        celular: string;
    };
    type notasEstudiante = {
        nota1 : string,
        nota2 : string,
        nota3 : string,
        nota4 : string,
        materia: string,
    };

    //respuesta
    const [notas, setNotas] = useState<notasEstudiante | null>(null);
    const [student, setStudent] = useState<students | null>(null);

    const ConsultarUsuario = async() => {

        if (!nombreIndex.trim() && !cedulaIndex.trim()){
            setError("Digite informacion en alguno de los campos");
            setStudent(null);
            return;
        }
        setError("");
        const params = new URLSearchParams();
        const nombre = nombreIndex.trim();
        const cedula = cedulaIndex.trim()

        if (nombreIndex) params.append("nombre", nombre);
        if (cedulaIndex) params.append("cedula", cedula);

        const response = await fetch(`${process.env.EXPO_PUBLIC_STUDENTS_API}/students?${params.toString()}`);

        const data = await response.json();
        setStudent(data);
        
        const responseNotas = await fetch(`${process.env.EXPO_PUBLIC_NOTAS_API}/notas?alumno_id=${data.id}`);
        const notas = await responseNotas.json();
        console.log("notas estructura", notas);
        setNotas(notas[0]);
}
    
    
    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.Text}>
            <Text style={globalStyles.Text }> Cedula</Text>
            <TextInput 
                style={globalStyles.input}
                value={cedulaIndex}
                onChangeText={setCedulaIndex}
            />
            </View>

            <View style={globalStyles.Text}>
            <Text style={globalStyles.Text}> Nombre</Text>
            <TextInput 
                style={globalStyles.input}
                value={nombreIndex}
                onChangeText={setNombreIndex}
            />
            </View>

            <View style={globalStyles.buttonContainer}>
                <Button theme="primary" label='Consultar' onPress={ConsultarUsuario}/>
            </View>

            <View>
                <View style={globalStyles.CuadroNotas}>
                    {!student ? (
                        <Text>No hay resultados</Text>
                    ) : (
                    <View style={globalStyles.centrarNotas}>
                        <Text>Nombre: {student.nombre}</Text>
                        <Text>Nota 1: {notas?.nota1}</Text>
                        <Text>Nota 2: {notas?.nota2}</Text>
                        <Text>Nota 3: {notas?.nota3}</Text>
                        <Text>Nota 4: {notas?.nota4}</Text>
                        <Text>Materia: {notas?.materia}</Text>

                        </View>
                    )}
                    </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});
