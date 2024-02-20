import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { authentication } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const circleSize = 200;
const Login = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onHandleLogin = async () => {
        if(email !== "" && password !== "") {
            setLoading(true);
            await signInWithEmailAndPassword(authentication, email, password)
            .then( () => {
                console.log('Login success');
            })
            .catch( err => alert(err.message))
            .finally(() => {
                setLoading(false);
            })
        }
    }
    
    const handleClick = () => {
        Keyboard.dismiss();
    }

    return(
        <TouchableWithoutFeedback onPress={handleClick}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 32, fontWeight: '600' }}>Login</Text>
                <TextInput value={email} onChangeText={(value) => setEmail(value)} style={styles.textinput} placeholder="E-mail address" />
                <TextInput value={password} onChangeText={(value) => setPassword(value)} style={styles.textinput} placeholder="Password" />
                <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
                    { !loading && <Text style={{ color: '#fff', fontWeight: '600', fontSize: 20}}>Log In</Text> }
                    { loading && <ActivityIndicator size="small" /> }
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text>Don't have an account?</Text>
                    <Text style={{ marginLeft: 3, fontWeight: '600', color: 'rgba(200, 70, 100, 0.5)'}}>Sign up.</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
        
    )
}

const styles = StyleSheet.create({
    textinput: {
        backgroundColor: '#eaeaea',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: "80%",
        marginVertical: 5
    },

    button: {
        marginTop: 40,
        backgroundColor: 'rgba(200, 70, 100, 0.5)',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: "80%",
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Login;