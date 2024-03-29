import React from 'react'
import styled from 'styled-components'
import { Translate } from 'react-localize-redux'

import DocumentTitle from 'react-document-title'
import Header from '../containers/Header'
import Footer from '../containers/Footer'

import {Page} from '../style/wrappers'
import HomeHeader from '../components/HomeHeader'
import Phone from '../components/Phone'
import FeatureShowCase from '../components/FeatureShowCase'
import ScreenShotCarousel from '../components/ScreenShotCarousel'

export default props =>
  <Page>
    <Translate>{({ translate }) => <DocumentTitle title={translate('pages.home.title') + translate('base_slug')} />}</Translate>
    <Header />
    <Wrap>
      <Phone />
      <HomeHeader />
      <Footer />
    </Wrap>
    <FeatureShowCase />
    <ScreenShotCarousel />
  </Page>

const Wrap = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #f38398;
    background-image: url("${x => x.theme.patterns.topo}");
    background-attachment: fixed;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items:space-around;
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    @media (${x => x.theme.viewport.tablet}){
        height: auto;
        padding: 18rem 0;
    }
    
    @media (${x => x.theme.viewport.phone}){
        padding: 48% 0;
    }
    
  `
