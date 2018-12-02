import React, {Component} from "react"
import { Text, TouchableOpacity, StyleSheet } from "react-native"
import Icon from "react-native-fontawesome-pro"

import Editor from '../containers/Editor'

class EditorScreen extends Component {
  static defaultNavigationOptions = ({ navigate, navigation }) => ({
    title: 'Editor',
    headerLeft: <TouchableOpacity onPress={() => navigation.navigate('Main')} style={{height: '100%', justifyContent: 'center', marginTop: 2, paddingLeft: 23}}>
                  <Icon name="arrow-left" color="#333" type="light" size={26} />
                </TouchableOpacity>,
    headerRight:<TouchableOpacity onPress={() => navigation.state.params.postAction()} style={{height: '100%', justifyContent: 'center', marginRight: 15}}>
                  <Text style={{padding: 25, paddingTop: 8, paddingBottom: 8, backgroundColor: '#ffca90', borderRadius: 5, color: '#fff', fontSize: 18, fontWeight: 'normal'}}>Post</Text>
                </TouchableOpacity>
  })

  render(){
    return(
      <Editor navigation={this.props.navigation} />
    )
  }

}

export default EditorScreen


const style = StyleSheet.create({
  icon: {height: '100%', justifyContent: 'center', marginLeft: 15}
})
