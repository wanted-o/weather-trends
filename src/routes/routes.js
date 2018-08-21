import { StackNavigator } from 'react-navigation';
import Dashboard from '../components/Weather';

export const AppNavigator = StackNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

export default AppNavigator;
