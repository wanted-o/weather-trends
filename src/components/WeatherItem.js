
import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles/Weather';

const WeatherItem = (icon, title, value, infoItemStyle) => (
  <View style={[styles.infoItemElem, infoItemStyle]}>
    <View style={styles.iconWrapper}>
      <Image source={icon} style={styles.icon} />
    </View>
    <View style={styles.infoItemRight}>
      <Text style={styles.infoItemText}>{value}</Text>
      <Text style={styles.infoItemText}>{title}</Text>
    </View>
  </View>
);

export default WeatherItem;
