import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import InicioScreen from './screens/InicioScreen';
import DetalleScreen from './screens/DetalleScreen';
import FormularioScreen from './screens/FormularioScreen';
import PerfilScreen from './screens/PefilScreen';
import LicenciaScreen from './screens/LicenciaScreen';
import TareasScreen from './screens/TareasScreen';
import PokedexScreen from './screens/pokedex/PokedexScreen';
import PokemonDetalleScreen from './screens/pokedex/PokemonDetalleScreen';
import RecetarioScreen from './screens/recetario/RecetarioScreen';
import CategoriaScreen from './screens/recetario/CategoriaScreen';
import BuscarRecetaScreen from './screens/recetario/BuscarRecetaScreen';
import RecetaDetalleScreen from './screens/recetario/RecetaDetalleScreen';
import { ROJO_POKEDEX } from './screens/pokedex/colores';
import { ROJO_RECETARIO } from './screens/recetario/estilos';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Encabezado de color con texto blanco (como en el diseño)
function encabezado(color) {
  return {
    headerStyle: { backgroundColor: color },
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: 'bold' },
  };
}

// Pokédex: lista -> detalle
function PokedexStack() {
  return (
    <Stack.Navigator screenOptions={encabezado(ROJO_POKEDEX)}>
      <Stack.Screen name="PokedexLista" component={PokedexScreen} options={{ title: 'Pokédex' }} />
      <Stack.Screen name="PokemonDetalle" component={PokemonDetalleScreen} options={{ title: '' }} />
    </Stack.Navigator>
  );
}

// Recetario: categorías -> recetas de la categoría -> detalle
function RecetarioStack() {
  return (
    <Stack.Navigator screenOptions={encabezado(ROJO_RECETARIO)}>
      <Stack.Screen name="RecetarioInicio" component={RecetarioScreen} options={{ title: 'Recetario' }} />
      <Stack.Screen name="Categoria" component={CategoriaScreen} options={({ route }) => ({ title: route.params.categoria })} />
      <Stack.Screen name="BuscarReceta" component={BuscarRecetaScreen} options={{ title: 'Buscar' }} />
      <Stack.Screen name="RecetaDetalle" component={RecetaDetalleScreen} options={({ route }) => ({ title: route.params.titulo })} />
    </Stack.Navigator>
  );
}

export default function APP(){
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({color,size}) => {
            let iconName;
            if(route.name === 'Inicio')
              iconName = 'home';
            else if (route.name === 'Detalle')
              iconName = 'information-circle';
            else if (route.name === 'Formulario')
              iconName = 'create';
            else if (route.name === 'Perfil')
              iconName = 'person';
            else if (route.name === 'Licencia')
              iconName = 'document';
            else if (route.name === 'Tareas')
              iconName = 'list';
            else if (route.name === 'Pokédex')
              iconName = 'game-controller';
            else if (route.name === 'Recetario')
              iconName = 'restaurant';
            return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
       }
       )}>
        <Tab.Screen name = 'Inicio' component = {InicioScreen } />
        <Tab.Screen name = 'Detalle' component = {DetalleScreen } />
        <Tab.Screen name = 'Formulario' component = {FormularioScreen } />
        <Tab.Screen name = 'Perfil' component = {PerfilScreen } />
        <Tab.Screen name = 'Licencia' component = {LicenciaScreen } />
        <Tab.Screen name = 'Tareas' component = {TareasScreen } />
        {/* headerShown: false porque cada pila ya tiene su propio encabezado */}
        <Tab.Screen name = 'Pokédex' component = {PokedexStack } options={{ headerShown: false }} />
        <Tab.Screen name = 'Recetario' component = {RecetarioStack } options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
