import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {DrawerItems, DrawerNavigation} from 'react-navigation'

import { avatarIcons } from '../constants/avatars'
import * as userAction from '../actions/user'

class CustomDrawer extends Component {

  async componentDidMount () {
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <View style={style.headerWrap}>
          <View style={style.imgWrap}><Image style={style.img} resizeMode='contain' source={avatarIcons[this.props.state.me.avatar || 0]} /></View>
          {this.props.state.fonts_ready && <Text style={style.username}>{this.props.state.me.username}</Text>}

          <View style={style.ticker}>
            <Image style={{height: 28, width: 28, marginRight: 'auto'}} resizeMode='contain' source={require('../assets/icons/coin.png')} />
            <Text style={style.tickerValue}>{this.props.state.me.coins || 0}</Text>
          </View>

          <View style={style.ticker}>
            <Image style={{height: 25, width: 25, marginRight: 'auto'}} resizeMode='contain' source={require('../assets/icons/level.png')} />
            <Text style={style.tickerValue}>
              {(this.props.state.me.distance_traveled / 1000).toFixed(1)}km
            </Text>
          </View>

        </View>
        <ScrollView>
          <DrawerItems {...this.props} />
        </ScrollView>
      </View>
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
  actions: bindActionCreators({...userAction}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomDrawer)

const style = StyleSheet.create({
  headerWrap: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffbe76'
  },
  imgWrap: {
    height: 160,
    width: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: '50%',
    transform: [{rotate: '-10deg'}]
  },
  username: {
    fontSize: 55,
    fontFamily: 'grand-hotel',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 3,
    fontWeight: 'normal',
    marginTop: -5,
    marginBottom: -5
  },
  ticker: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 12
  },
  tickerValue: {
    color: '#fff5ea',
    fontWeight: '700',
    fontSize: 20,
    marginLeft: 15
  }
})

/*
<View style={style.ticker}>
  <Image style={{height: 25, width: 25, marginRight: 'auto'}} resizeMode='contain' source={require('../assets/icons/total.png')} />
  <Text style={style.tickerValue}>48 km</Text>
</View>
*/
