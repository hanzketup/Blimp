import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BackHandler } from 'react-native'

import * as editorActions from '../actions/editor'
import * as uiActions from '../actions/ui'
import * as cloudConstants from '../constants/clouds'
import DarkenOverlay from '../components/DarkenOverlay'

class NewDialog extends Component {
  constructor (props) {
    super(props)
    this.handleBackPress = this.handleBackPress.bind(this)
  }

  componentDidUpdate () {
    this.props.state.show_new_dialog
    ? BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    : BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress () {
    this.props.actions.toggleNewDialog(false)
    return true
  }

  start_editor (mode) {
    this.props.actions.changeEditorMode(mode)
    this.props.navigation.navigate('Editor')
    this.props.actions.toggleNewDialog(false)
  }

  render () {
    return (
      <DarkenOverlay visible={this.props.state.show_new_dialog} onPress={() => this.props.actions.toggleNewDialog(false)}>

        <TouchableOpacity style={style.container} onPress={() => this.start_editor('Message')}>
          <View style={style.item} backgroundColor={cloudConstants.msg.color}>
            <View style={style.iconWrap}><Image style={style.icon} source={cloudConstants.msg.icon} /></View>
          </View>
          <Text style={style.label}>Message</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.container} onPress={() => this.start_editor('Deal')}>
          <View style={style.item} backgroundColor={cloudConstants.deal.color}>
            <View style={style.iconWrap}><Image style={style.icon} source={cloudConstants.deal.icon} /></View>
          </View>
          <Text style={style.label}>Deal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.container} onPress={() => this.start_editor('Review')}>
          <View style={style.item} backgroundColor={cloudConstants.review.color}>
            <View style={style.iconWrap}><Image style={style.icon} source={cloudConstants.review.icon} /></View>
          </View>
          <Text style={style.label}>Review</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.container} onPress={() => this.start_editor('Warning')}>
          <View style={style.item} backgroundColor={cloudConstants.warn.color}>
            <View style={style.iconWrap}><Image style={style.icon} source={cloudConstants.warn.icon} /></View>
          </View>
          <Text style={style.label}>Warning</Text>
        </TouchableOpacity>

      </DarkenOverlay>
    )
  }

}

const mapStateToProps = state => ({
  state: state.ui
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...uiActions, ...editorActions}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDialog)

const style = StyleSheet.create({
  container: {
    elevation: 10,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#fafafa',
    borderRadius: 8,
    margin: 12
  },
  item: {
    height: 70,
    width: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 0,
    marginRight: 8
  },
  iconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    borderRadius: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },
  icon: {
    height: 58,
    resizeMode: 'contain'
  },
  label: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})
