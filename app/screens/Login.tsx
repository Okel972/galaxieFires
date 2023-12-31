import {
    View,
    TextInput, 
    StyleSheet, 
    ActivityIndicator, 
    Button, 
    KeyboardAvoidingView 
} from 'react-native'

import React, { useState } from 'react'

import { FIREBASE_AUTH } from '../../FirebaseConfig'

import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    fetchSignInMethodsForEmail 
} from 'firebase/auth'

const Separator = () => <View style={styles.separator} />;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    
    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error: any) {
            console.error(error);
            alert('Sign in failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async () => {
        setLoading(true);
        try {
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    
            if (signInMethods.length === 0) {
                const response = await createUserWithEmailAndPassword(auth, email, password);
                console.log(response);
                alert('Check your emails!');
            } else {
                alert('An account already exists with this email. Please sign in.');
            }
        } catch (error: any) {
            console.error(error);
            alert('Sign up failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
                <TextInput value={email} style={styles.input} placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
                <TextInput secureTextEntry={true} value={password} style={styles.input2} placeholder='Password' autoCapitalize='none' onChangeText={(text) => setPassword(text)}></TextInput>

                { loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                <> 
                    < Button  title="Login" onPress={signIn} />
                    <Separator />
                    < Button color="#f194ff" title="Create account" onPress={signUp} />
                </>
                )}
            </KeyboardAvoidingView>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        margin: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
    input2: {
        margin: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 20
    },
    button: {
        backgroundColor: '#fff'
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }
})