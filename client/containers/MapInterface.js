import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as uiAction from '../actions/ui'
import * as userAction from '../actions/user'
import CanvasButton from '../components/CanvasButton'
import RoundTopButton from '../components/RoundTopButton'
import CreditTicker from '../components/CreditTicker'

class MapInterface extends Component {

  render () {
    return (this.props.state.show_map_interface &&
      <View style={style.container}>
        <CreditTicker />

        <View style={style.topButtons}>
          <RoundTopButton icon={'backpack'} onPress={this.props.actions.toggleFollow} />
          <RoundTopButton icon={this.props.state.follow ? 'location' : 'location-slash'} onPress={this.props.actions.toggleFollow} />
          <RoundTopButton icon={'compass'} onPress={this.props.actions.toggleFollow} />
        </View>

        <CanvasButton onPress={this.props.actions.toggleNewDialog} placement='left' icon='plus-circle' />
        <CanvasButton onPress={this.props.navigation.toggleDrawer} placement='right' icon='user-circle' />
      </View>
    )
  }

}

const mapStateToProps = state => ({
  state: {...state.user, ...state.ui}
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...userAction, ...uiAction}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapInterface)

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  topButtons: {
    position: 'absolute',
    top: '5%',
    right: '2.5%'
  }
})
