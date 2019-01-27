import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BackHandler, ActivityIndicator } from 'react-native'
import Icon from 'react-native-fontawesome-pro'

import * as editorActions from '../actions/editor'
import * as uiActions from '../actions/ui'
import * as cloudConstants from '../constants/clouds'
import DarkenOverlay from '../components/DarkenOverlay'
import FancyTitle from '../containers/FancyTitle'
import EditorContent from '../components/EditorContent'
import TypeSelector from '../components/TypeSelector'
import RoundTopButton from '../components/RoundTopButton'

import StarStrip from '../components/StarStrip'
import CouponWindow from '../components/CouponWindow'
import CountDown from '../components/CountDown'

class Editor extends Component {
  constructor (props) {
    super(props)
    this.handleBackPress = this.handleBackPress.bind(this)
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress () {
    this.props.actions.toggleEditor(false)
    return true
  }

  render () {
    if (this.props.state.editor_mode === 'chat') { this.modeString = '' }
    if (this.props.state.editor_mode === 'deal') { this.modeString = 'coupon code' }
    if (this.props.state.editor_mode === 'review') { this.modeString = 'Your rating' }
    if (this.props.state.editor_mode === 'countdown') { this.modeString = 'Expires in' }

    return this.props.state.show_editor && (
      <DarkenOverlay visible={this.props.state.show_editor}>

        <KeyboardAvoidingView style={style.container} behavior='padding'>

          <TouchableOpacity onPress={() => this.props.actions.toggleEditor(false)} style={style.closeButton} >
            <Icon style={style.closeIcon} name='times' color='#fff5ea' type='light' size={32} />
          </TouchableOpacity>

          <FancyTitle
            title={'Get Creative!'}
            subTitle={
              this.props.state.editor_mode === 'chat' ? 'Leave your mark on the map! Make it a good one.'
              : this.props.state.editor_mode === 'deal' ? 'Give fellow users a heads up on sweet deals nearby.'
              : this.props.state.editor_mode === 'review' ? 'Let people know what you think with a 1-5 star rating.'
              : this.props.state.editor_mode === 'countdown' ? 'The cloud that implodes. Limit your message to hours or days.'
              : ''
            }
          />

          <EditorContent
            text={this.props.state.editor_text}
            setText={this.props.actions.setEditorText}
            payloadString={this.modeString}>
            {this.props.state.editor_mode === 'deal' && <CouponWindow value={this.props.state.editor_deal_code} editable setValue={val => this.props.actions.setEditorDealCode(val)} />}
            {this.props.state.editor_mode === 'review' && <StarStrip value={this.props.state.editor_stars} editable setValue={val => this.props.actions.setEditorStars(val)} />}
            {this.props.state.editor_mode === 'countdown' && <CountDown value={this.props.state.editor_countdown} editable setValue={val => this.props.actions.setEditorCountDown(val)} />}
          </EditorContent>

          <View style={style.selectorWrap}>
            <TypeSelector color='#1dd1a1' icon='comments' onPress={() => this.props.actions.changeEditorMode('chat')} selected={this.props.state.editor_mode === 'chat'} />
            <TypeSelector color='#e66767' icon='badge-percent' onPress={() => this.props.actions.changeEditorMode('deal')} selected={this.props.state.editor_mode === 'deal'} />
            <TypeSelector color='#f5cd79' icon='star-half-alt' onPress={() => this.props.actions.changeEditorMode('review')} selected={this.props.state.editor_mode === 'review'} />
            <TypeSelector color='#4a69bd' icon='bomb' onPress={() => this.props.actions.changeEditorMode('countdown')} selected={this.props.state.editor_mode === 'countdown'} />
          </View>

          <TouchableOpacity activeOpacity={0.5} style={style.post} onPress={async () => {
            this.props.actions.createCloud({
              type: this.props.state.editor_mode,
              body: this.props.state.editor_text,
              position: this.props.state.position,
              code: this.props.state.editor_deal_code,
              stars: this.props.state.editor_stars,
              expiry: this.props.state.editor_expiry
            })
          }}>

            {this.props.state.editor_loading && <ActivityIndicator size='large' color='#fff' />}
            {(!this.props.state.editor_loading && this.props.state.fonts_ready) && <Text style={style.postText}> Post </Text>}

          </TouchableOpacity>

        </KeyboardAvoidingView>
      </DarkenOverlay>
    )
  }

}

// onPress=({} => this.props.actions.toggleEditor(false))

const mapStateToProps = state => ({
  state: {...state.ui, ...state.editor, ...state.user}
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...uiActions, ...editorActions}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)

const style = StyleSheet.create({
  container: {
    height: '100%',
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectorWrap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  post: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 140,
    // marginLeft: 'auto',
    backgroundColor: '#f3a683',
    borderRadius: 60,
    elevation: 10,
    borderWidth: 4,
    borderColor: 'rgba(243, 166, 131, 0.4)'
  },
  postText: {
    fontFamily: 'grand-hotel',
    color: '#fff',
    fontSize: 33,
    paddingLeft: 8,
    paddingRight: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 3
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    height: 55,
    width: 55,
    elevation: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  }
})
