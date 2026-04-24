import Button from '@/components/Button';
import { globalStyles } from '@/styles/globalStyles';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function miAppIndex(){
    
    const [cedula,setCedula] = useState("");
    const [nombre,setNombre] = useState("");

    const [nota1,setNota1] = useState("");
    const [nota2,setNota2] = useState("");
    const [nota3,setNota3] = useState("");
    const [nota4,setNota4] = useState("");

    const [nombreUsuarioConsulta, setNombreUsuarioConsulta] = useState("");
    const [alumno_id, setAlumno_id] = useState("");
    const [error, setError] = useState("");

    type notasEstudiante = {
        nota1 : string,
        nota2 : string,
        nota3 : string,
        nota4 : string,
        materia: string,
    };
    const [notasDefinitiva, setNotasDefinitiva] = useState(0);
    const [notasObtenidas, setNotasObtenidas] = useState<notasEstudiante | null>(null);
    const [guardarNotas, setGuardarNotas] = useState("");
    type students = {
        id: number;
        nombre: string;
        cedula: string;
        correo: string;
        celular: string;
    };
    //respuesta
    const [student, setStudent] = useState<students | null>(null);

    const consultarUsuario = async() => {
        if (!nombre.trim() && !cedula.trim()){
            setError("Llene alguno de los campos para consultar");
            return;
        }
        const params = new URLSearchParams();
        const name = nombre.trim();
        const cedul = cedula.trim()

        if (nombre) params.append("nombre", name);
        if (cedula) params.append("cedula", cedul);

        const response = await fetch(`${process.env.EXPO_PUBLIC_STUDENTS_API}/students?${params.toString()}`);

        const data = await response.json();
        setStudent(data); 
        setNombreUsuarioConsulta(data.nombre);
        setAlumno_id(data.id);

        const obtenerNotas = await fetch(`${process.env.EXPO_PUBLIC_NOTAS_API}/notas?alumno_id=${data.id}`);
        const notas = await obtenerNotas.json();

        const nota = notas[0];
        setNotasObtenidas(nota);

        setNota1(nota.nota1);
        setNota2(nota.nota2);
        setNota3(nota.nota3);
        setNota4(nota.nota4);
        
        
    }

    const calcularDefinitiva = () => {
        if (!nota1 || !nota2 || !nota3 || !nota4){
            setError("Para obtener la definitiva primero consulte un usuario y verifique que tiene todas las notas");
        }
        setError("");
        const n1 = parseFloat(nota1);
        const n2 = parseFloat(nota2);
        const n3 = parseFloat(nota3);
        const n4 = parseFloat(nota4);
        
        const suma = n1+n2+n3+n4;
        const definitiva = suma/4

        setNotasDefinitiva(definitiva);

    }

    const guardarNotasEstudiante = async() => {

        const n1 = parseFloat(nota1);
        const n2 = parseFloat(nota2);
        const n3 = parseFloat(nota3);
        const n4 = parseFloat(nota4);

        if (!n1 || !n2 || !n3 || !n4){
            setError("Complete Todos las notas antes de guardar");
            return;
        }

        const response = await fetch(`${process.env.EXPO_PUBLIC_NOTAS_API}/notas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                nota1 : n1,
                nota2 : n2,
                nota3 : n3,
                nota4 : n4,
                alumno_id : alumno_id,
            }) 
        })
        const data = await response.json();
        if (response.ok) {
            setGuardarNotas("Notas guardadas exitosamente");
            setError("");

            setTimeout(() => {
                setGuardarNotas("");
            }, 5000);
            setNota1("");
            setNota2("");
            setNota3("");
            setNota4("");
        }
    }

    return(
        <View style={globalStyles.container}>
            <View style={globalStyles.Text}>
                <Text style={globalStyles.Text}> Cedula</Text>
                <TextInput 
                style={globalStyles.input}
                value={cedula}
                onChangeText={setCedula}
                />
                </View>

            <View style={globalStyles.Text}>
                <Text style={globalStyles.Text}> Nombre</Text>
                <TextInput 
                style={globalStyles.input}
                value={nombre}
                onChangeText={setNombre}
                />
                </View>

                <View style={globalStyles.buttonContainer}>
                    <Button theme='primary' label='Consultar' onPress={consultarUsuario}/>
                </View>
                <View style={globalStyles.Text}>
                    <Text> Usuario: {nombreUsuarioConsulta}</Text>
                </View>
                <View style={[globalStyles.CuadroNotas, styles.cuadroNotas]}>
                    <View style={styles.formNotas}> 
                        <View style={styles.filaNota }>
                            <Text style={styles.label}> Nota 1</Text>
                            <TextInput 
                            style={styles.inputNota}
                            value={nota1}
                            onChangeText={(text) => {
                                if (/^\d*\.?\d*$/.test(text)) {
                                    setNota1(text);
                                }
                            }}
                            />
                        </View>
                        <View style={styles.filaNota }>
                            <Text style={styles.label}> Nota 2</Text>
                            <TextInput 
                            style={styles.inputNota}
                            value={nota2}
                            onChangeText={(text2) => {
                                if (/^\d*\.?\d*$/.test(text2)) {
                                    setNota2(text2);
                                }
                            }}
                            />
                        </View>
                        <View style={styles.filaNota }>
                            <Text style={styles.label}> Nota 3</Text>
                            <TextInput 
                            style={styles.inputNota}
                            value={nota3}
                            onChangeText={(text3) => {
                                if (/^\d*\.?\d*$/.test(text3)) {
                                    setNota3(text3);
                                }
                            }}
                            />
                        </View>
                        <View style={styles.filaNota }>
                            <Text style={styles.label}> Nota 4</Text>
                            <TextInput 
                            style={styles.inputNota}
                            value={nota4}
                            onChangeText={(text4) => {
                                if (/^\d*\.?\d*$/.test(text4)) {
                                    setNota4(text4);
                                }
                            }}
                            />
                        </View>
                    </View>
                    <View style={styles.botones}>
                        <View>
                    <Button theme='primary' label="nota definitiva:" style={styles.BotonesTm} />
                    <Text> {notasDefinitiva}</Text>
                    </View>
                    <Button theme='primary' label='Definitiva' style={styles.BotonesTm} onPress={calcularDefinitiva}/>
                    <Button theme='primary' label='Guardar' style={styles.BotonesTm} onPress={guardarNotasEstudiante}/>
                    </View>
                    <View>
                        {error !== '' && <Text style={{ color: 'red' }}>{error}</Text>}
                        {guardarNotas !== '' && <Text style={{ color: 'green' }}>{guardarNotas}</Text>}
                    </View>
                </View>


        </View>
    );
}

const styles=StyleSheet.create({
    botones: {
        flexDirection: 'row',
    },
    BotonesTm: {
        width: 100,
        height: 50,
        marginTop: 20,
        marginLeft: 1.5,
    },
    cuadroNotas: {
        width: 400,
        height: 350
    },
    formNotas: {
        gap: 15,
    },

    filaNota: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    label: {
        fontSize: 16,
        width: 80,
    },

    inputNota: {
        flex: 1,
        height: 45,
        borderWidth: 1,
        borderColor: "#00bcd4",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginLeft: 10,
    },
});
