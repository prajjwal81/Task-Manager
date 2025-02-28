import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const CreateTaskScreen = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);

  const pickMedia = () => {
    if (mediaFiles.length >= 5) {
      Alert.alert('Limit Reached', 'You can only attach up to 5 media files.');
      return;
    }

    ImagePicker.launchImageLibrary(
      {mediaType: 'mixed', selectionLimit: 5 - mediaFiles.length},
      response => {
        if (response.assets) {
          setMediaFiles(prev => [
            ...prev,
            ...response.assets.map(asset => asset.uri),
          ]);
        }
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Task Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task name"
        value={taskName}
        onChangeText={setTaskName}
      />

      <Text style={styles.label}>Task Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={taskDescription}
        onChangeText={setTaskDescription}
        multiline
      />

      <TouchableOpacity style={styles.attachButton} onPress={pickMedia}>
        <Text style={styles.attachText}>
          Attach Media ({mediaFiles.length}/5)
        </Text>
      </TouchableOpacity>

      <FlatList
        data={mediaFiles}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({item}) => (
          <Image source={{uri: item}} style={styles.mediaPreview} />
        )}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => Alert.alert('Task Created')}>
        <Text style={styles.submitText}>Create Task</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#f5f5f5'},
  label: {fontSize: 16, fontWeight: 'bold', marginTop: 10},
  input: {backgroundColor: '#fff', padding: 10, borderRadius: 5, marginTop: 5},
  attachButton: {
    backgroundColor: '#007bff',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  attachText: {color: '#fff', fontWeight: 'bold'},
  mediaPreview: {width: 100, height: 100, margin: 5, borderRadius: 5},
  submitButton: {
    backgroundColor: '#28a745',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitText: {color: '#fff', fontWeight: 'bold'},
});

export default CreateTaskScreen;
