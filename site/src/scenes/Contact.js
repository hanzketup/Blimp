import React from 'react'
import { Translate } from 'react-localize-redux'

import DocumentTitle from 'react-document-title'
import SubTop from '../containers/SubTop'
import Footer from '../containers/Footer'
import { Page, SubContent} from '../style/wrappers'

import Email from '../components/Email'

export default props =>
  <Page>
    <Translate>{({ translate }) => <DocumentTitle title={translate('pages.contact.title') + translate('base_slug')} />}</Translate>
    <SubTop title='pages.contact.title' />
    <SubContent>
      <Translate id='pages.contact.upper' />
      <Email address={'contact@getblimp.co'} />
      <Translate id='pages.contact.lower' />
    </SubContent>
    <Footer colorInverted />
  </Page>
