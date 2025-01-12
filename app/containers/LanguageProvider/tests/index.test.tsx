import React from 'react';
import { render } from '@testing-library/react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import LanguageProvider from '../index';
import configureStore from '../../../configureStore';

import { translationMessages } from '../../../i18n';

const messages = defineMessages({
  someMessage: {
    id: 'some.id',
    defaultMessage: 'This is some default message',
    description: 'This is some en message',
  },
});

describe('<LanguageProvider />', () => {
  let store;

  beforeEach(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render its children', () => {
    const text = 'Test';
    const children = <h1>{text}</h1>;

    const { queryByText } = render(
      // tslint:disable-next-line: jsx-wrap-multiline
      <Provider store={store}>
        <LanguageProvider messages={messages}>{children}</LanguageProvider>
      </Provider>,
    );
    expect(queryByText(text)).toBeInTheDocument();
  });

  it('should render the default language messages', () => {
    const { queryByText } = render(
      // tslint:disable-next-line: jsx-wrap-multiline
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <FormattedMessage {...messages.someMessage} />
        </LanguageProvider>
      </Provider>,
    );
    const queryText =
      (messages &&
        messages.someMessage &&
        messages.someMessage.defaultMessage) ||
      '';

    expect(queryByText(queryText)).toBeInTheDocument();
  });
});
