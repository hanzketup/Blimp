import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-fontawesome-pro'

import * as uiAction from '../actions/ui'
import * as userAction from '../actions/user'
import CanvasButton from '../components/CanvasButton'
import RoundTopButton from '../components/RoundTopButton'
import Tickers from '../components/Tickers'

class MapInterface extends Component {

  render () {
    return (this.props.state.show_map_interface &&
      <View style={style.container}>
        <Tickers
          coins={this.props.state.me.coins || 0}
          traveled={this.props.state.me.distance_traveled || 0}
          goal={23/* this.props.state.me.level.goal */}
         />

        <View style={style.topButtons}>

          <RoundTopButton color={'#10ac84'} borderColor={'#1dd1a1'} onPress={this.props.actions.toggleFollow}>
            <Icon style={style.icon} name={'backpack'} color='#fff5ea' type='light' size={26} />
          </RoundTopButton>

          <RoundTopButton color={'#546de5'} borderColor={'#778beb'} onPress={this.props.actions.toggleFollow}>
            <Icon style={style.icon} name={this.props.state.follow ? 'location' : 'location-slash'} color='#fff5ea' type='light' size={26} />
          </RoundTopButton>

          <RoundTopButton color={'#e17055'} borderColor={'#fab1a0'} onPress={this.props.actions.toggleFollow}>
            <Icon style={style.icon} name={'compass'} color='#fff5ea' type='light' size={26} />
          </RoundTopButton>

        </View>

        {!this.props.state.feed_open && <CanvasButton onPress={this.props.actions.toggleEditor} placement='left' icon='plus-circle' />}
        {!this.props.state.feed_open && <CanvasButton onPress={this.props.navigation.toggleDrawer} placement='right' icon='user-circle' />}

      </View>
    )
  }

}

const mapStateToProps = state => ({
  state: {
    ...state.user,
    ...state.ui,
    ...state.clouds
  }
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
    top: '2%',
    right: '2.5%'
  }
})
