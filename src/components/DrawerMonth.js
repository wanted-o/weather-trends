import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';

import { BACKGROUND_COLOR, ITEMS_COLOR } from '../constants/colorsConstants';
import styles from '../styles/Weather';

class DrawerMonth extends PureComponent {
  render() {
    const {
      data,
      monthNames,
      selectMonth,
      toogleDrawer,
      selectedMonth,
    } = this.props;
    const month = monthNames[JSON.parse(data.mm) - 1];
    return (
      <TouchableOpacity
        style={[styles.drawerItemContainer,
          { backgroundColor: selectedMonth === data ? ITEMS_COLOR : BACKGROUND_COLOR }]}
        onPress={() => {
          selectMonth(data);
          toogleDrawer();
        }}
      >
        <Text style={[styles.drawerItemMonth,
          { color: selectedMonth === data ? BACKGROUND_COLOR : ITEMS_COLOR }]}
        >
          {month}
        </Text>
      </TouchableOpacity>
    );
  }
}

DrawerMonth.propTypes = {
  monthNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.string),
  selectedMonth: PropTypes.objectOf(PropTypes.string),
  selectMonth: PropTypes.func.isRequired,
  toogleDrawer: PropTypes.func.isRequired,
};

DrawerMonth.defaultProps = {
  data: {},
  selectedMonth: {},
};

export default DrawerMonth;
