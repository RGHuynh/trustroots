import React from 'react';
import { withNamespaces } from '@/modules/core/client/utils/i18n-angular-load';
import PropTypes from 'prop-types';
import Contact from './Contact';
import { getContactsCommon } from '../api/contacts.api';
import '@/config/lib/i18n';

export class ContactsCommon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };
  }

  componentDidMount() {
    const profileId = this.props.profileId;
    getContactsCommon(profileId)
      .then(lists => {
        this.setState({
          contacts: lists
        });
      });

  }

  render() {
    const { t } = this.props;
    const isContactsCommonList = this.state.contacts.length;

    if (!isContactsCommonList) return null;
    return (
      <div className="panel panel-default">
        {/* convert ng-pluralize with NamespacesConsumer */}
        <div className="panel-heading">{t('{{count}} contacts in common_interval', { postProcess: 'interval', count: this.state.contacts.length })}</div>
        <div className="panel-body">
          {this.state.contacts.map((contact) =>
            <Contact
              key={contact._id}
              contact={contact}
              className="contacts-contact"
              hideMeta={true}
              avatarSize={64}
              selfId={this.props.profileId}
            />
          )}
        </div>
      </div>
    );
  }
}

ContactsCommon.propTypes = {
  profileId: PropTypes.string,
  t: PropTypes.func.isRequired
};

export default withNamespaces('contact')(ContactsCommon);
