import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PerfilScreen } from '../screens/PerfilScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { CampeonatoStack } from './CampeonatoStack';
import { HomeScreen } from '../screens/time/HomeScreen';
import { CadastroScreen } from '../screens/campeonato/CadastroScreen';
import { TimeStack } from './TimeStack';
import { UploadFileScreen } from '../screens/campeonato/UploadFileScreen';
import { CampeonatoScreen } from '../screens/campeonato/listar/CampeonatoScreen';
import { MenuStack } from './MenuStack';
import { FormControl, Input, Modal, Text, Button, VStack } from 'native-base';
import { MenuAddScreen } from '../screens/MenuAddScreen';

function Example(props: any) {
  const [modalVisible, setModalVisible] = React.useState(true);
  return <>
    <Modal isOpen={modalVisible}
      onClose={() => setModalVisible(false)} avoidKeyboard
      justifyContent="flex-end" bottom="4" size="lg">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Forgot Password?</Modal.Header>
        <Modal.Body>
          Enter email address and we'll send a link to reset your password.
          <FormControl mt="3">
            <FormControl.Label>Email</FormControl.Label>
            <Input />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button flex="1" onPress={() => {
            setModalVisible(false);
          }}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  </>;
}


const Tab = createBottomTabNavigator();

export function AppStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          backgroundColor: '#004AAD',
          padding: 10,
        },
        tabBarActiveTintColor: '#83e2f6',
        tabBarInactiveTintColor: '#fff',
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Time"
        component={TimeStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuStack}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
        options={({ navigation }) => ({
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <MenuAddScreen navigation={navigation} />
          ),
        })}
      />
      <Tab.Screen
        name="Perfil"
        component={CampeonatoStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle-o" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
