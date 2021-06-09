import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { word: '', defination: '', phonetics: '' };
  }
  getWord = (word) => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        console.log(response);
        //var responseObject = JSON.parse(response);
        var word = response[0].word;
        console.log(word);
        var defination = response[0].meanings[0].definitions[0].definition;
        console.log(defination);
        this.setState({
          word: word.trim(),
          defination: defination.trim(),
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#7579e7'}
          centerComponent={{
            text: 'Power Prompt',
            style: {
              color: 'black',
              fontSize: 20,
              fontFamily: 'Comic Sans Ms ',
            },
          }}
        />

        <Text style={styles.iAm}>v-2.1</Text>

        <Image
          source={require('./safari-removebg-preview.png')}
          style={styles.imgS}
        />

        <TextInput
          style={styles.inputBox}
          placeholder="Search Prompt"
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchedPressed: false,
              // word: 'loading....',
              lexicalCategory: '',
              examples: [],
              defination: '',
            });
          }}
        />

        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 28,
            textAlign: 'center',
            marginBottom: 10,
            marginTop: 20,
          }}>
        
          {this.state.word}
        </Text>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>
          {this.state.defination}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b9fffc',
  },
  inputBox: {
    marginTop: 40,
    alignSelf: 'center',
    textAlign: 'center',
    outline: 'none',
    backgroundColor: '#9ab3f5',
    color: 'black',
    borderRadius: 100,
    fontFamily: 'Comic Sans MS',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 60,
    paddingRight: 60,
  },
  goButton: {
    height: 55,
    alignSelf: 'center',
    marginTop: 10,
    paddingTop: 6,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    borderRadius: 50,
    backgroundColor: '#9ab3f5',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'cursive',
  },
  imgS: {
    width: 200,
    height: 200,
    marginTop: 10,
    marginBottom: -20,
    alignSelf: 'center',
  },
  iAm: {
    textAlign:'center',
    color:'grey'
  },
});
