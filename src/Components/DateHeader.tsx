import React from 'react';
import {ScrollView, TouchableOpacity, Text, StyleSheet} from 'react-native';

const DateHeader = ({dates, selectedDate, onSelectDate}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.dateScroll}>
      {dates.map(date => (
        <TouchableOpacity
          key={date}
          style={[
            styles.dateItem,
            selectedDate === date && styles.selectedDate,
          ]}
          onPress={() => onSelectDate(date)}>
          <Text style={styles.dateText}>{new Date(date).toDateString()}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dateScroll: {flexDirection: 'row', paddingVertical: 10},
  dateItem: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#ddd',
    borderRadius: 10,
  },
  selectedDate: {backgroundColor: 'blue'},
  dateText: {color: '#fff', fontWeight: 'bold'},
});

export default DateHeader;
