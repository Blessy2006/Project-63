import React, { Component } from 'react';
import { StyleSheet, Text, View ,TouchableOpacity, TextInput} from 'react-native';
import {Header} from 'react-native-elements';
export defalt class HomeScreen extends Component{
<TextInput
style={styles.inputBox}
onChangeText={text => {
  this.setState({
    text:text,
    isSearchPressed: false,
    word: "Loading...",
    lexicalCategory:'',
    example:[],
    defination:""
  });
}}
value={this.state.text}
/>

<TouchableOpacity
style={styles.searchButton}
onPress={() => {
  this.setState({isSearchPressed: true});
  this.getWord(this.state.text)
}}></TouchableOpacity>
getWord=(word)=>{
  var searchKeyWord=word.toLowerCase()
  var url = "https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22.json"
  +searchKeyWord+".json"
  return fetch(url)
  .then((data)=>{
    if(data.status===200){
      return data.json()
    }else{
      return null
    }
  })
  .then((response)=>{
    var responseObject = response
    if(responseObject){
      var wordData = responseObject.definitions[0]
      var definitions = wordData.description
      var lexicalCategory = wordData.wordtype
      this.setState({
        "word": this.state.text,
        "definition": lexicalCategory
      })
    }else{
      this.setState({
        "word": this.state.text,
        "definition": "Not Found",
      })
    }
  })
}
render(){
  return(
    <View style={styles.detailsContainer}>
<Text style={styles.detailsTitle}>
Word:{""}
</Text>
<Text style={{fontSize:18}}>
{this.state.word}
</Text>

<View style={styles.detailsContainer}>
<Text style={styles.detailsTitle}>
Type:{""}
</Text>
<Text style={{fontSize:18}}>
{this.state.lexicalCategory}
</Text>

<View style={{flexDirection:'row',flexWrap:'wrap'}}>
<Text style={styles.detailsTitle}>
Definition:{""}
</Text>
<Text style={{fontSize:18}}>
{this.state.defination}
</Text>
    </View>
    </View>
    </View>


  )
}
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputBoxContainer: {
    flex:0.3,
    alignItems:'center',
    justifyContent:'center'
  },
  inputBox: {
    width: '80%',
    alignSelf: 'center',
    height: 40
  }
});
