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
      <View style={style.container} pointerEvents='box-none'>
        <Tickers
          coins={this.props.state.me.coins}
          traveled={this.props.state.me.distance_traveled && (this.props.state.me.distance_traveled / 1000).toFixed(1)}
          goal={this.props.state.me.level && (this.props.state.me.level.goal / 1000).toFixed(1)}
        />

        <View style={style.topButtons}>

          <RoundTopButton style={{opacity: 0.5}} color={'#10ac84'} borderColor={'#1dd1a1'} onPress={() => null}>
            <Icon style={style.icon} name={'backpack'} color='#fff5ea' type='light' size={26} />
          </RoundTopButton>

          <RoundTopButton color={'#546de5'} borderColor={'#778beb'} onPress={this.props.actions.toggleFollow}>
            <Icon style={style.icon} name={this.props.state.follow ? 'location' : 'location-slash'} color='#fff5ea' type='light' size={26} />
          </RoundTopButton>

          <RoundTopButton style={{opacity: 0.5}} color={'#e17055'} borderColor={'#fab1a0'} onPress={() => null}>
            <Icon style={style.icon} name={'satellite'} color='#fff5ea' type='light' size={23} />
          </RoundTopButton>

          <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            {this.props.state.low_accuracy && <Icon containerStyle={{padding: 3}} name='map-marker-slash' color='rgba(0, 0, 0, 0.2)' type='solid' size={17} />}
            {this.props.state.overspeed && <Icon containerStyle={{padding: 3, paddingTop: 5}} name='car-side' color='rgba(0, 0, 0, 0.2)' type='solid' size={19} />}
          </View>

        </View>

        {!this.props.state.feed_open && <CanvasButton onPress={this.props.navigation.toggleDrawer} placement='left' icon='user-circle' />}
        {!this.props.state.feed_open && <CanvasButton onPress={this.props.actions.toggleEditor} placement='right' icon='plus-circle' />}

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
    left: 0,
    zIndex: 30
  },
  topButtons: {
    position: 'absolute',
    top: '2%',
    right: '2.5%'
  }
})
