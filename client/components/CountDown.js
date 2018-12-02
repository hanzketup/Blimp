import React, { Component } from 'react'
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-fontawesome-pro'
import TextTicker from 'react-native-text-ticker'
import Countdown from 'react-countdown-now'

class CountDown extends Component {
  constructor (props) {
    super(props)
    this.state = {index: 0}

    this.offsets = [
      {string: '3 days', offset: 259200},
      {string: '1 day', offset: 86400},
      {string: '4 hours', offset: 14400},
      {string: '30 min', offset: 1800}
    ]
  }

  render () {
    return (
      <TouchableOpacity style={style.wrap} onPress={() => {
        if (this.props.editable) {
          if ((this.state.index + 1) === this.offsets.length) {
            this.setState({index: 0})
            this.props.setValue(this.offsets[0].offset)
          } else {
            this.setState({index: this.state.index + 1})
            this.props.setValue(this.offsets[(this.state.index + 1)].offset)
          }
        }
      }}>
        <Icon name='bomb' color='#fff5ea' type='regular' size={18} />

        {this.props.editable && <Text style={style.count}>{this.offsets[this.state.index].string}</Text>}
        {!this.props.editable && <Text style={style.count}><Countdown daysInHours date={new Date(this.props.value * 1000)} renderer={props => `${props.hours}:${props.minutes}:${props.seconds}`} /></Text>}

      </TouchableOpacity>
    )
  }

}

export default CountDown

const style = StyleSheet.create({
  wrap: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 60,
    backgroundColor: '#4a69bd',
    elevation: 5,
    marginTop: 1
  },
  count: {
    fontSize: 16,
    color: '#fff',
    paddingLeft: 6
  }
})
