import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const InputText = ({placeholder}) => {
  return (
    <View style={{width: '100%'}}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        autoCapitalize="none"
      />
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
  },
});
