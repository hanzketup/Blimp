import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { StyleSheet, View, Image, Text, ScrollView, Dimensions } from 'react-native'
import Icon from 'react-native-fontawesome-pro'
import { LinearGradient } from 'expo'
import SlidingUpPanel from 'rn-sliding-up-panel'

import Fade from '../components/Fade'

class CloudList extends Component {
  constructor (props) {
    super(props)
    this.state = {shouldScroll: false}
    this.panelHeight = 200
    this.minHeight = 145
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.open && !this.props.open) {
      this._panel.transitionTo({toValue: 350})
    }
    if (!nextProps.open && this.props.open) {
      this._panel.transitionTo({toValue: this.minHeight})
    }
    return true
  }

  shouldCollapseOrOpen (position) {
    if (position < 360) {
      this._panel.transitionTo({toValue: this.minHeight})
      this.props.closeAction()
    } if (position > 360 && position < 500) {
      this.props.openAction()
    }
  }

  handleScroll (event) { event.nativeEvent.contentOffset.y === 0 && this.setState({shouldScroll: false}) }

  shouldScrollHandler (position) {
    position >= Dimensions.get('window').height && this.setState({shouldScroll: true})
    position < Dimensions.get('window').height && this.setState({shouldScroll: false})
  }

  setPanelHeight (cw, ch) {
    let calced_height = this.minHeight + Math.ceil(ch)
    let device_height = Dimensions.get('window').height
    if (calced_height < device_height) {
      this.panelHeight = calced_height
    } else {
      this.panelHeight = device_height
    }
  }

  render () {
    return (
      <View pointerEvents='box-none' style={style.container}>
        <SlidingUpPanel
          pointerEvents='box-none'
          startCollapsed visible
          ref={r => this._panel = r}
          showBackdrop={false}
          allowDragging={this.props.nearbyCount > 0 && !this.state.shouldScroll}
          draggableRange={{top: this.panelHeight, bottom: this.minHeight}}
          onDrag={this.shouldScrollHandler.bind(this)}
          onDragEnd={this.shouldCollapseOrOpen.bind(this)}
          onRequestClose={this.props.closeAction}>

          <View style={style.inner}>

            <View pointerEvents='box-none' style={style.nearby}>
              <Icon
                style={style.openArrow}
                onPress={this.props.openAction}
                name='angle-double-up'
                color={(!this.props.open && this.props.nearbyCount != 0) ? 'rgba(	243, 166, 131, 0.6)' : 'rgba(0, 0, 0, 0)'} type='regular' size={32} />
              <Text style={style.nearbyText}>{this.props.nearbyCount} Nearby</Text>
            </View>

            <LinearGradient style={style.inner} colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.4)']}>

              <ScrollView onScroll={this.handleScroll.bind(this)}
                scrollEnabled={this.state.shouldScroll}
                onContentSizeChange={this.setPanelHeight.bind(this)}
                style={style.scroller}>
                {this.props.children}
              </ScrollView>

            </LinearGradient>

          </View>
        </SlidingUpPanel>
      </View>
    )
  }

}

export default CloudList

const style = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    height: '90%',
    width: '100%',

    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 60,
    elevation: 12

  },
  inner: {
    flex: 1,
    paddingBottom: 40
  },
  scroller: {
    position: 'relative',
    bottom: 0,
    height: 'auto',
    width: '100%'
  },
  close: {
    position: 'absolute',
    top: 45,
    right: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  },
  nearby: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nearbyText: {
    color: '#333',
    padding: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginBottom: 12,
    zIndex: 40,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openArrow: {
    opacity: 0,
    elevation: 5
  }
})
