import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputBox from '../../utils/ui/InputBox';
import Button from '../../utils/ui/Button';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {MYAPI} from '@env'

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };
   
    // send a POST  request to the backend API to register the user
    axios
      .post(`${MYAPI}/register`, user)
      .then(response => {

        Alert.alert(
          'Registration successful',
          'You have been registered Successfully',
        );
        setName('');
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        if (error.response) {
          Alert.alert(
            'Registration Error',
            'An error occurred while registering',
          );
        }
      });
  };

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
            Register to your Account
          </Text>
        </View>

        <View style={{marginTop: 70}}>
          <InputBox
            value={name}
            onChangeText={text => setName(text)}
            icons={
              <MaterialIcons
                style={{marginLeft: 8}}
                name="person"
                size={24}
                color="gray"
              />
            }
            textStyle={{fontSize: name ? 16 : 16}}
            placeholder="Enter your UserName"
          />
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
            textStyle={{fontSize: email ? 16 : 16}}
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
          onPress={handleRegister}
          containStyles={{
            width: 200,
            backgroundColor: '#FEBE10',
            borderRadius: 6,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 15,
          }}
          text="Register"
          textStyles={{
            textAlign: 'center',
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
          }}
        />

        <Button
          onPress={() => navigation.goBack()}
          text="Already have an account? Sign In"
          textStyles={{textAlign: 'center', color: 'gray', fontSize: 16}}
          containStyles={{marginTop: 15}}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
