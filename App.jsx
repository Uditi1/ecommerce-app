import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import StackNavigator from './src/navigation/StackNavigator';
import {Provider} from 'react-redux';
import store from './src/store';
import {ModalPortal} from 'react-native-modals';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StackNavigator />
        <ModalPortal />
      </Provider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
