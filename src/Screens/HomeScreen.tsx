import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DateHeader from '../Components/DateHeader';
import TaskList from '../Components/TaskList';

import tasks from '../../Data/tasks';
import FloatingButton from '../Components/FloatingButton';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  const groupedTasks = tasks.reduce((acc, task) => {
    const date = task.date.split('T')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(task);
    return acc;
  }, {});

  const formattedData = Object.keys(groupedTasks).map(date => ({
    title: date,
    data: groupedTasks[date],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <DateHeader
        dates={Object.keys(groupedTasks)}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <TaskList
        data={formattedData}
        selectedDate={selectedDate}
        onTaskPress={task => navigation.navigate('Details', {task})}
      />

      <FloatingButton onPress={() => navigation.navigate('CreateTask')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, backgroundColor: '#f5f5f5'},
});

export default HomeScreen;
