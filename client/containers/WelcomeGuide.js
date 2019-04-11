import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

import * as cloudAction from '../actions/clouds'
import * as uiAction from '../actions/ui'
import LargeModal from '../components/LargeModal'
import * as cloudConstants from '../constants/clouds'
import { steps } from '../constants/welcome'

class welcomeGuide extends Component {

  render () {
    return (
      <LargeModal style={{flex: 1}}>

        <Image style={{width: 120, height: 120, marginTop: 20}} resizeMode='contain' source={steps[this.props.state.welcome_step].image} />
        <Text style={style.title}>{steps[this.props.state.welcome_step].title}</Text>
        <Text style={style.desc}>{steps[this.props.state.welcome_step].body}</Text>

        <View style={{flexDirection: 'row'}}>

          <TouchableOpacity style={style.button} onPress={() => this.props.actions.setWelcomeActive(false)}>
            <Text style={[style.buttonText, {color: '#2bcbba'}]}>Close</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[style.button, {backgroundColor: '#2bcbba'}]} onPress={() =>
            steps[this.props.state.welcome_step].next !== null
              ? this.props.actions.setWelcomeStep(steps[this.props.state.welcome_step].next)
              : this.props.actions.setWelcomeActive(false)
          }>
            <Text style={[style.buttonText, {color: '#fff'}]}>{steps[this.props.state.welcome_step].next === null ? 'Done!' : 'Next'}</Text>
          </TouchableOpacity>

        </View>

      </LargeModal>
    )
  }

}

const mapStateToProps = state => ({
  state: {
    ...state.user,
    ...state.ui
  }
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...cloudAction, ...uiAction}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(welcomeGuide)

const style = StyleSheet.create({
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    paddingTop: -2
  },
  desc: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.6)',
    paddingTop: 4,
    paddingBottom: 18,
    textAlign: 'center'
  },
  button: {
    height: 52,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#2bcbba',
    marginRight: 8,
    marginLeft: 8
  },
  buttonText: {
    fontSize: 17
  }
})
