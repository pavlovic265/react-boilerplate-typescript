/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';

export interface Props {
  messages: { [locale: string]: { [id: string]: string | any } };
  children?: React.ReactNode;
}

const stateSelector = createSelector(
  makeSelectLocale(),
  locale => ({
    locale,
  }),
);

export default function LanguageProvider({ messages, children }: Props) {
  const { locale } = useSelector(stateSelector);

  return (
    <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
      {React.Children.only(children)}
    </IntlProvider>
  );
}
