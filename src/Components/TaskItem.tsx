import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const TaskItem = ({task, onPress}) => {
  console.log('🚀 ~ TaskItem ~ task:', task);
  return (
    <TouchableOpacity style={styles.taskItem} onPress={() => onPress(task)}>
      <Text style={styles.taskTitle}>{task.name}</Text>
      <Text style={styles.taskDescription}>{task.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  taskTitle: {fontSize: 16, fontWeight: 'bold'},
  taskDescription: {fontSize: 14, color: '#666'},
});

export default TaskItem;
