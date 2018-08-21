import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginTop: (height / 2) - 40,
    width,
  },
  text: {
    fontSize: 20,
    fontFamily: 'roboto-bold',
  },
});
