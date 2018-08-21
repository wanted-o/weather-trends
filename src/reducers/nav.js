// import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../routes/routes';

const firstAction = AppNavigator.router.getActionForPathAndParams('Dashboard');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

export default (state = initialNavState, action) => {
  let nextState;
  switch (action.type) {
    // case 'DASHBOARD_SCREEN':
    //   nextState = AppNavigator.router.getStateForAction(NavigationActions.reset({
    //     index: 0,
    //     actions: [NavigationActions.navigate({
    //       routeName: 'TabNavigators',
    //     })],
    //   }), state);
    //   break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
};
