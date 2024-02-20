import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createContext } from 'react';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { authentication } from './config/firebase';
import Home from './screens/Home';
import Chat from './screens/Chat';
import Login from './screens/Login';
import Register from './screens/Register';

const Stack = createStackNavigator();
export const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ( { children } ) => {
  const [user, setUser] = useState(null);

  const logOut = async () => {
    await signOut(authentication)
    .then(() => {
      setUser(null);
    })
  }

  return(
    <AuthenticatedUserContext.Provider value={{ user, setUser, logOut}}>
      {children}
    </AuthenticatedUserContext.Provider>
  )
}

function ChatStack() {
  return(
    <Stack.Navigator defaultScreenOptions={Home}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  )
}

function AuthStack() {
  return(
    <Stack.Navigator defaultScreenOptions={Login}>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  )
}

function RootNavigator() {
  const [user, setUser] = useState(AuthenticatedUserContext);
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    console.log(user);
    const unsubscribe = onAuthStateChanged(authentication,
      async authUser => {
        authUser ? setUser(authUser) : setUser(null);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user])

  if(loading) {
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return(
    <NavigationContainer>
      {user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default function App() {
  return(
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
