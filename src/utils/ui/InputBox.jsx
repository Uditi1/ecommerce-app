import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const InputBox = ({icons, onChangeText, value, placeholder, textStyle}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#D0D0D0',
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 30,
      }}>
      {icons}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={{
          color: 'gray',
          width: 300,
          color: 'gray',
          fontSize: 16,
          ...textStyle
        }}
        placeholder={placeholder}
        placeholderTextColor="gray"
      />
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({});
