import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';

import { BACKGROUND_COLOR, ITEMS_COLOR } from '../constants/colorsConstants';
import styles from '../styles/Weather';

class DrawerYear extends PureComponent {
  render() {
    const {
      selectYear,
      year,
      selectedYear,
    } = this.props;
    return (
      <TouchableOpacity
        style={[styles.drawerItemContainer,
          { backgroundColor: selectedYear === year ? ITEMS_COLOR : BACKGROUND_COLOR }]}
        onPress={() => selectYear(year)}
      >
        <Text
          style={[styles.yearItem,
            { color: selectedYear === year ? BACKGROUND_COLOR : ITEMS_COLOR }]
          }
        >
          {year}
        </Text>
      </TouchableOpacity>
    );
  }
}

DrawerYear.propTypes = {
  selectYear: PropTypes.func.isRequired,
  year: PropTypes.string,
  selectedYear: PropTypes.string,
};

DrawerYear.defaultProps = {
  year: '',
  selectedYear: '',
};

export default DrawerYear;
