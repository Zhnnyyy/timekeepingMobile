import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  StatusBar,
  Dimensions,
  Switch,
  TouchableOpacity,
  BackHandler,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import RNFS from 'react-native-fs';
const logo = require('../assets/lbrdc-logo-rnd.webp');
const {width, height} = Dimensions.get('window');

//Components
import InputText from '../components/InputText';
import Button from '../components/Button';
import Loader from '../components/Loader';
const databaseFilePath = `${RNFS.DocumentDirectoryPath}/addresses.db`;
const fileUrl =
  'https://www.dropbox.com/scl/fi/hi6ccj976fcu3sjhpwf1c/addresses.db?rlkey=ypcstye9njd2u3da4le8dvbcy&st=tjk2anyl&dl=1';
const LoginScreen = ({navigation, setIsAuthenticated}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  // USEEFFECT
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const dbExist = await checkDatabaseExists();
    if (!dbExist) {
      Alert.alert(
        'Notice',
        'We need to sync dataset in order to use this app.',
        [
          {text: 'OK', onPress: () => checkConnectivity(), style: 'default'},
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
        ],
      );
    }
  };

  const checkDatabaseExists = async () => {
    try {
      const fileExists = await RNFS.exists(databaseFilePath);
      return fileExists;
    } catch (error) {
      console.error('Error checking database existence:', error);
      return false;
    }
  };

  const login = async () => {
    const dbExist = await checkDatabaseExists();
    if (!dbExist) {
      init();
      return;
    }
    setIsAuthenticated(true);
    // await RNFS.unlink(databaseFilePath);
  };

  const checkConnectivity = async () => {
    try {
      const req = await fetch('https://www.google.com');
      if (req.ok) {
        downloadDB();
      }
    } catch (error) {
      Alert.alert(
        'No Internet',
        'You need an internet connection to download dataset.',
      );
    }
  };

  const downloadDB = async () => {
    try {
      setIsDownloading(true);
      const downloadResult = await RNFS.downloadFile({
        fromUrl: fileUrl,
        toFile: databaseFilePath,
      }).promise;

      if (downloadResult.statusCode === 200) {
        setIsDownloading(false);
        Alert.alert('Success', 'Dataset downloaded successfully!');
      } else {
        setIsDownloading(false);
        console.error(
          'Download failed with status code:',
          downloadResult.statusCode,
        );
        Alert.alert('Error', 'Download failed!');
      }
    } catch (error) {
      setIsDownloading(false);
      console.error('Error downloading database:', error);
      Alert.alert('Error', 'Error downloading database!');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={'dark-content'} />
      <Loader loading={isDownloading} />
      <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.img} source={logo} />
          <Text style={styles.appTitle}>LBRDC Timekeeper</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.wctxt}>Welcome Back</Text>
          <InputText placeholder={'Username'} />
          <InputText placeholder={'Password'} />

          <View style={styles.rememberForgotContainer}>
            <View style={styles.rememberMeContainer}>
              <Switch
                value={rememberMe}
                onValueChange={setRememberMe}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={rememberMe ? '#4CAF50' : '#f4f3f4'}
              />
              <Text style={styles.rememberMeText}>Remember Me</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <Button onClick={login} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 50,
  },
  img: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: width * 0.9,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  wctxt: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 8,
    color: '#666',
  },
  forgotPasswordText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
