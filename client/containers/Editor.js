import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Alert, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as editorActions from '../actions/editor'
import DarkenOverlay from '../components/DarkenOverlay'
import EditorText from '../components/EditorText'
import EditorControls from '../components/EditorControls'

class Editor extends Component {
  constructor (props) {
    super(props)
    this.onPost = this.onPost.bind(this)
  }

  componentDidMount () {
  }

  onPost () {
    if (this.props.state.char_count > 5) {
      this.props.navigation.navigate('Main')
    } else {
      Alert.alert('Message too short!', 'please write something more intresting.')
    }
  }

  render () {
    return (
      <DarkenOverlay visible>
        <KeyboardAvoidingView style={style.container} behavior='padding'>
          <EditorText />
          <EditorControls />
        </KeyboardAvoidingView>
      </DarkenOverlay>
    )
  }

}

const mapStateToProps = state => ({
  state: state.editor
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...editorActions}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)

const style = StyleSheet.create({
  container: {
    width: '95%',
    alignItems: 'flex-end'
  }
})

