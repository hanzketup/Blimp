import React from 'react'
import { bindActionCreators } from 'redux'
import { StyleSheet, Image, Text, View, Alert } from 'react-native'
import moment from 'moment'
import Icon from 'react-native-fontawesome-pro'

import { avatarIcons } from '../constants/avatars'
import * as cloudConstants from '../constants/clouds'

import StarStrip from '../components/StarStrip'
import CouponWindow from '../components/CouponWindow'
import CountDown from '../components/CountDown'

export default props => {
  upvoted = props.votes.filter(i => i.user === props.me).length > 0
  return (
    <View style={[style.container, {borderColor: cloudConstants[props.type].color }]}>
      <View style={style.main}>

        <View style={style.user}>
          <Image style={style.userAvatar} source={avatarIcons[props.user.avatar || 0]} resizeMode='contain' />
          <Text style={[style.userName, (props.user.id === props.me && {color: '#5181b2'})]}>{props.user.username}</Text>
          <Text style={style.timeStamp}>{moment(props.timestamp, 'X').fromNow()}</Text>

          <Icon onPress={() => {
            Alert.alert(
              `Report post by ${props.user.username}?`, `Are you sure you want to report this post?`,
              [{text: 'Cancel', style: 'cancel'}, {text: 'Confirm', onPress: () => props.reportAction(props.id)}]
           )
          }} containerStyle={style.report} name='exclamation-circle' color='rgba(0, 0, 0, 0.3)' type='regular' size={18} />

        </View>

        <Text style={style.body}>{props.body}</Text>
      </View>

      <View style={style.footer}>
        <View style={style.vote}>
          <Icon containerStyle={style.upvoted}
            onPress={() => props.voteAction(props.me, props.id)}
            name='heart'
            color={upvoted ? '#ff7675' : 'rgba(0, 0, 0, 0.5)'}
            type={upvoted ? 'solid' : 'light'}
            size={24} />
          <Text style={style.voteCount}>{props.votes.length}</Text>
        </View>

        {props.type === 'deal' && <CouponWindow value={props.code} editable={false} />}
        {props.type === 'review' && <StarStrip value={props.stars} editable={false} />}
        {props.type === 'countdown' && <CountDown value={props.expiry} editable={false} />}

      </View>

    </View>
  )
}
const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '96%',
    marginBottom: 12,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    paddingBottom: 2,
    marginTop: 'auto',
    overflow: 'hidden',
    borderWidth: 3,
    zIndex: 120,
    shadowColor: '#000',
    shadowOffset: {
    	width: 0,
    	height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5

  },
  user: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 'auto'
  },
  userAvatar: {
    height: 30,
    width: 30,
    marginLeft: 0
  },
  userName: {
    fontSize: 18,
    color: '#6c757d',
    fontWeight: 'bold',
    marginLeft: 4,
    marginBottom: -5
  },
  timeStamp: {
    fontSize: 14,
    color: '#6c757d',
    marginLeft: 'auto',
    marginRight: 6,
    marginTop: -2.5,
    alignSelf: 'center'
  },
  footer: {
    width: '94%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center'
  },
  vote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 5,
    paddingBottom: 8
  },
  upvoted: {
    opacity: 0.6,
    padding: 3,
    marginBottom: 2
  },
  report: {
    opacity: 0.6
  },
  voteCount: {
    fontSize: 18,
    fontWeight: 'normal',
    opacity: 0.7,
    color: '#333',
    margin: 0,
    paddingRight: 8,
    paddingLeft: 8
  },
  main: {
    width: '100%',
    height: 'auto',
    padding: '4%',
    paddingLeft: '3%',
    paddingTop: '3%',
    paddingBottom: '2%',
    backgroundColor: '#fafafa'
  },
  body: {
    fontSize: 17,
    color: '#212529',
    paddingTop: 12,
    paddingBottom: 5,
    paddingLeft: 0,
    paddingRight: 12
  }
})
