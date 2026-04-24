import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';


export default function myApp(){
    return(
        <View style={styles.container}>
        <Tabs screenOptions={{
        tabBarActiveTintColor: '#0c0c0c',
        headerShown: false, 
        tabBarStyle: {
          backgroundColor: '#b0b0b0'
        }
      }}>
            <Tabs.Screen  name='index' options={{title: 'Consulta'}}/>
            <Tabs.Screen  name='regEstudiante' options={{title: 'Reg. Estudiante'}}/>
            <Tabs.Screen  name='regNotas' options={{title: 'Reg. Notas'}}/>
        </Tabs>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7c8210'
  }
});
