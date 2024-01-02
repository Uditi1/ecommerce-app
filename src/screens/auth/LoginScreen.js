import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputBox from '../../utils/ui/InputBox';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../../utils/ui/Button';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post('http://192.168.1.10:8000/login', user)
      .then(response => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem('authToken', token);
        navigation.replace('Main');
      })
      .catch(error => {
        Alert.alert('Login Error', 'Invalid Email');
        console.log(error);
      });
  };
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');

        if (token) {
          navigation.replace('Main');
        }
      } catch (err) {
        console.log('error message', err);
      }
    };
    checkLoginStatus();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      <View>
        <Image
          style={{width: 150, height: 100}}
          source={{
            uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png',
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              marginTop: 12,
              color: '#041E42',
            }}>
            Login In to your Account
          </Text>
        </View>

        <View style={{marginTop: 70}}>
          <InputBox
            value={email}
            onChangeText={text => setEmail(text)}
            icons={
              <MaterialIcons
                style={{marginLeft: 8}}
                name="email"
                size={24}
                color="gray"
              />
            }
            textStyle={{fontSize: email ? 16 : 16}}
            placeholder="Enter your Email"
          />
          <InputBox
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            icons={
              <AntDesign
                style={{marginLeft: 8}}
                name="lock"
                size={24}
                color="gray"
              />
            }
            textStyle={{fontSize: password ? 16 : 16}}
            placeholder="Enter your Password"
          />
        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'black'}}>Keep me logged in</Text>

          <Text style={{color: '#007FFF', fontWeight: '500'}}>
            Forgot Password
          </Text>
        </View>

        <View style={{marginTop: 80}} />

        <Button
          onPress={handleLogin}
          containStyles={{
            width: 200,
            backgroundColor: '#FEBE10',
            borderRadius: 6,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 15,
          }}
          text="Login"
          textStyles={{
            textAlign: 'center',
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
          }}
        />

        <Button
          onPress={() => navigation.navigate('Register')}
          text="Don't have an account? Sign Up"
          textStyles={{textAlign: 'center', color: 'gray', fontSize: 16}}
          containStyles={{marginTop: 15}}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
