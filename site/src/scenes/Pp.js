import React from 'react'
import { Translate } from 'react-localize-redux'

import DocumentTitle from 'react-document-title'
import SubTop from '../containers/SubTop'
import Footer from '../containers/Footer'
import { Page, SubContent} from '../style/wrappers'

export default props =>
  <Page>
    <Translate>{({ translate }) => <DocumentTitle title={translate('pages.pp.title') + translate('base_slug')} />}</Translate>
    <SubTop title='pages.pp.title' />
    <SubContent>
      <Translate id='privacy_policy' />
    </SubContent>
    <Footer colorInverted />
  </Page>
