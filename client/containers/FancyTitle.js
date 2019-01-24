import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'

import LargeTitle from '../components/LargeTitle'

class FancyTitle extends Component {
  render () {
    return (
      <View pointerEvents='none' style={{marginBottom: '8%'}}>
        {this.props.state.fonts_ready && <Text style={style.title}>{this.props.title}</Text>}
        <Text style={style.subTitle}>{this.props.subTitle}</Text>
      </View>
    )
  }

}

const mapStateToProps = state => ({
  state: state.ui
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FancyTitle)

const style = StyleSheet.create({
  title: {
    fontFamily: 'grand-hotel',
    fontSize: 62,
    textAlign: 'center',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 3
  },
  subTitle: {
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 3,
    margin: '2%',
    marginLeft: '8%',
    marginRight: '8%'
  }
})
