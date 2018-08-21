import React from 'react';

import MessageScreen from '../custom-components/MessageScreen';
import CustomActivityIndicator from '../custom-components/CustomActivityIndicator';
import { LINES } from '../constants/colorsConstants';

export const activityResult =
  (activityIndicator, noResult, msg, textColor = null) => {
    if (noResult) {
      return (
        <MessageScreen
          key="MessageScreen"
          text={msg}
          textColor={textColor === null ? LINES : textColor}
        />
      );
    } else if (activityIndicator) {
      return <CustomActivityIndicator key="cutomActivityIndicator" />;
    }
    return null;
  };
export default activityResult;
