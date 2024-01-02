import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Button = ({onPress, text, containStyles, textStyles}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{...containStyles}}>
      <Text style={{textAlign: 'center', fontSize: 16, ...textStyles}}>
       {text}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({});
