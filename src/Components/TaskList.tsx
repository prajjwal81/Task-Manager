import React, {useRef, useEffect} from 'react';
import {SectionList, Text, StyleSheet, View} from 'react-native';
import TaskItem from './TaskItem';

const TaskList = ({data, onTaskPress, selectedDate}) => {
  const sectionListRef = useRef(null);

  useEffect(() => {
    const sectionIndex = data.findIndex(
      section => section.title === selectedDate,
    );
    if (sectionIndex !== -1 && sectionListRef.current) {
      setTimeout(() => {
        sectionListRef.current.scrollToLocation({
          sectionIndex,
          itemIndex: 0,
          viewOffset: 30, // ⚡ Isko tune karo (10-30 tak) to adjust exact scroll
          animated: true,
        });
      }, 300);
    }
  }, [selectedDate]);

  return (
    <SectionList
      ref={sectionListRef}
      sections={data}
      keyExtractor={item => item.id}
      renderItem={({item}) => <TaskItem task={item} onPress={onTaskPress} />}
      renderSectionHeader={({section: {title}}) => (
        <View style={{backgroundColor: 'black'}}>
          <Text style={styles.sectionHeader}>
            {new Date(title).toDateString()}
          </Text>
        </View>
      )}
      getItemLayout={(data, index) => ({
        length: 90, // 🔥 Isko adjust karo (70-90 tak) for exact positioning
        offset: 63.5 * index,
        index,
      })}
      onScrollToIndexFailed={info => {
        sectionListRef.current?.scrollToLocation({
          sectionIndex: info.highestMeasuredFrameIndex || 0,
          itemIndex: 0,
          viewOffset: 0,
          animated: true,
        });
      }}
    />
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
    color: 'white',
  },
});

export default TaskList;
