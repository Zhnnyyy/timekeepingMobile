import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function EmailAddForm() {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const validateEmail = text => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const handleEmailChange = text => {
    setEmail(text);
    setIsEmailValid(validateEmail(text));
  };

  const handleSendOtp = () => {
    if (isEmailValid && email.length > 0) {
      // Here you would typically send an OTP to the provided email
      Alert.alert('OTP Sent', `An OTP has been sent to ${email}`);
      setIsOtpSent(true);
    } else {
      Alert.alert('Error', 'Please enter a valid email address.');
    }
  };

  const handleSubmit = () => {
    if (isEmailValid && email.length > 0 && otp.length > 0) {
      // Here you would typically verify the OTP and add the email
      Alert.alert(
        'Success',
        `Email ${email} has been verified and added successfully!`,
      );
      setEmail('');
      setOtp('');
      setIsOtpSent(false);
    } else {
      Alert.alert('Error', 'Please enter a valid email address and OTP.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Add Email Address</Text>
        <View style={styles.inputContainer}>
          <Icon
            name="mail-outline"
            size={24}
            color="#006341"
            style={styles.icon}
          />
          <TextInput
            style={[styles.input, !isEmailValid && styles.inputError]}
            placeholder="Enter your email address"
            placeholderTextColor="#999"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        {!isEmailValid && email.length > 0 && (
          <Text style={styles.errorText}>
            Please enter a valid email address
          </Text>
        )}
        <TouchableOpacity
          style={[
            styles.button,
            (!isEmailValid || email.length === 0) && styles.buttonDisabled,
          ]}
          onPress={handleSendOtp}
          disabled={!isEmailValid || email.length === 0}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>

        {isOtpSent && (
          <View>
            <View style={[styles.inputContainer, styles.otpContainer]}>
              <Icon
                name="key-outline"
                size={24}
                color="#006341"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                placeholderTextColor="#999"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
              />
            </View>
            <TouchableOpacity
              style={[styles.button, otp.length === 0 && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={otp.length === 0}>
              <Text style={styles.buttonText}>Verify & Add Email</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    padding: 20,
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#006341',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#006341',
    borderRadius: 8,
    marginBottom: 10,
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#006341',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  otpContainer: {
    marginTop: 20,
  },
});
