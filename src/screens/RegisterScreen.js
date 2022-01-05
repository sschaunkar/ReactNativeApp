import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import Message from '../components/Message'


export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [showAlert, setShowAlert] = useState(false);
  const [msgtitle, setmsgtitle] = useState("");
  const [msgbody, setmsgbody] = useState("");
  

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
console.log("name :",name,"Email", email, "Password",password)
    const user={
      "name":name.value,
      "email":email.value,
      "password":password.value
    }
    async function postData(url,data){
      const requestOp = {
          method:'POST',
          mode:'cors',
          cache:'no-cache',
          credentials: 'same-origin',
          headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body:JSON.stringify(data)
        
      }
      const response =  await fetch(url,requestOp)
  
      return response.json();
  };

  postData('http://6540-150-129-237-199.ngrok.io/register',user)
  .then(response => {
    console.log(response); // JSON data parsed by `data.json()` call
    if(response.statuscode==200){
      setmsgtitle("Register Alert");
      setmsgbody(response.message);
      setShowAlert(currentstate=>!currentstate);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      })
    } else{
      setmsgtitle("Register Alert");
      setmsgbody(response.message);
      setShowAlert(currentstate=>!currentstate);
      navigation.reset({
        index: 0,
        routes: [{ name: 'StartScreen' }],
      })
    }
  });
    
   
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Register User</Header>
      {showAlert && <Message msgtitle={msgtitle} msgbody={msgbody}/>}
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
