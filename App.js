import React from 'react';
import {Platform, StyleSheet, Text, View,StatusBar } from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {FontAwesome,Ionicons} from '@expo/vector-icons';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {Constants} from 'expo';

import ListaDeBaralhos from './components/ListaDeBaralhos';
import NovoBaralho from './components/NovoBaralho';
import Baralho from './components/Baralho';
import Quiz from './components/Quiz';
import Pergunta from  './components/Pergunta';

import {setLocalNotification} from './utils/helpers'
import middleware from './middleware';
import reducer from './reducers';

function FlashStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  ListaDeBaralhos: {
    screen: ListaDeBaralhos,
    navigationOptions:{
      tabBarLabel:'Baralhos'
    }
  },
  NovoBaralho: {
    screen: NovoBaralho,
    navigationOptions:{
      tabBarLabel:'Novo'
    }
  },
},{
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: 'white',
    style: {
      height: 56,
      backgroundColor: 'black',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

const MainNavigator = StackNavigator({
  Home:{
    screen: Tabs,
  },
  Baralho:{
    screen: Baralho,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  },
  Quiz:{
    screen: Quiz,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  },
  Pergunta:{
    screen: Pergunta,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  }
});


export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer,middleware)}>
        <View style={{flex: 1}}>
          <FlashStatusBar backgroundColor={'black'} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
