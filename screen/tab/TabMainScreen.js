import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import TabLayout from '../../components/layout/TabLayout';
import {useNavigation} from '@react-navigation/native';

const TabMainScreen = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setUsername(parsedUser.username);
        setImageUri(parsedUser.imageUri);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const saveUserData = async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Please enter a username');
      return;
    }

    try {
      const userData = {
        username: username.trim(),
        imageUri: imageUri,
        createdAt: user?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setUser(userData);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  const deleteUserData = async () => {
    Alert.alert(
      'Delete Profile',
      'Are you sure you want to delete your profile?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userData');
              setUser(null);
              setUsername('');
              setImageUri(null);
              setIsEditing(false);
            } catch (error) {
              console.error('Error deleting user data:', error);
              Alert.alert('Error', 'Failed to delete profile');
            }
          },
        },
      ],
    );
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      }
      if (response.error) {
        console.error('ImagePicker Error:', response.error);
        return;
      }
      if (response.assets && response.assets[0]) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const navigateToStories = () => {
    navigation.navigate('StackSurviveStories');
  };

  const renderProfile = () => (
    // <TabLayout>
    <View style={styles.profileContainer}>
      <TouchableOpacity onPress={selectImage} style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      {isEditing ? (
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
          placeholderTextColor="#666"
        />
      ) : (
        <Text style={styles.username}>{user?.username || 'New User'}</Text>
      )}

      <View style={styles.buttonContainer}>
        {isEditing ? (
          <>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={saveUserData}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                setIsEditing(false);
                setUsername(user?.username || '');
                setImageUri(user?.imageUri || null);
              }}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={() => setIsEditing(true)}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={deleteUserData}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {user && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Created: {new Date(user.createdAt).toLocaleDateString()}
          </Text>
          <Text style={styles.infoText}>
            Last Updated: {new Date(user.updatedAt).toLocaleDateString()}
          </Text>
        </View>
      )}

      {/* {user ? (
        <TouchableOpacity
          style={styles.storiesButton}
          onPress={navigateToStories}>
          <Text style={styles.storiesButtonText}>🐯 Tiger Stories</Text>
        </TouchableOpacity>
      ) : null} */}
    </View>
    // </TabLayout>
  );

  return (
    <TabLayout>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        {renderProfile()}
        {user ? (
          <TouchableOpacity
            style={styles.storiesButton}
            onPress={navigateToStories}>
            <Text style={styles.storiesButtonText}>🐯 Tiger Stories</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </TabLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1A1A1A',
    padding: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF8C00',
    textAlign: 'center',
    marginBottom: 30,
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF8C00',
  },
  imageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#FF8C00',
  },
  placeholderImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FF8C00',
  },
  placeholderText: {
    color: '#FF8C00',
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FF8C00',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    minWidth: 120,
  },
  editButton: {
    backgroundColor: '#FF8C00',
  },
  deleteButton: {
    backgroundColor: 'rgba(255, 140, 0, 0.3)',
    borderWidth: 1,
    borderColor: '#FF8C00',
  },
  saveButton: {
    backgroundColor: '#FF8C00',
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 140, 0, 0.3)',
    borderWidth: 1,
    borderColor: '#FF8C00',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoContainer: {
    alignItems: 'center',
  },
  infoText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  storiesButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#FF8C00',
  },
  storiesButtonText: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TabMainScreen;
