import React from 'react';
import {FloatingAction} from 'react-native-floating-action';

const FloatingButton = ({onPress}) => {
  return (
    <FloatingAction
      onPressMain={onPress}
      color="blue"
      position="right"
      showBackground={false}
    />
  );
};

export default FloatingButton;
