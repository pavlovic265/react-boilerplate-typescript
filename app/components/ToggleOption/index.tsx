/**
 *
 * ToggleOption
 *
 */

import * as React from 'react';
import { injectIntl } from 'react-intl';

const ToggleOption = ({ value, message, intl }) => {
  return <option value={value}>{intl.formatMessage(message)}</option>;
};

export default injectIntl(ToggleOption);
