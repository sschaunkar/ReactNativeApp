import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
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
import Message from '../components/Message'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [showAlert, setShowAlert] = useState(false);
  const [msgtitle, setmsgtitle] = useState("");
  const [msgbody, setmsgbody] = useState("");

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    } 

    const user = {
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
  var loginresponse={};

  postData('http://6540-150-129-237-199.ngrok.io/login',user).then(response=>{
      console.log("Message===="+response.message)
      console.log("Status Code===="+response.statuscode)
      if(response.statuscode==200){
        setmsgtitle("Login Alert");
        setmsgbody(response.message);
        setShowAlert(currentstate=>!currentstate);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        })
  } else{
        setmsgtitle("Login Alert")
        setmsgbody(response.message)
        setShowAlert(currentstate=>!currentstate)
         navigation.reset({
          index: 0,
          routes: [{ name: 'StartScreen' }],
        })
  }
  }).catch(err=>{
    console.log(err);
  });
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      {showAlert && <Message msgtitle={msgtitle} msgbody={msgbody}/>}
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
