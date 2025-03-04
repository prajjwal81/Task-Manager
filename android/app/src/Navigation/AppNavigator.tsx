import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStack from '../Stacks/HomeStack';
import {useDispatch, useSelector} from 'react-redux';
import ExploreStack from '../Stacks/ExploreStack';
import React, {useEffect, useState} from 'react';
import SellCarStack from '../Stacks/SellCarStack';
import {Platform} from 'react-native';
import MyOrderStack from '../Stacks/MyOrderStack';
import {useNavigation} from '@react-navigation/native';
import {getItem} from '../utils/storage';
import {setStackName} from '../../Redux/features/GlobalSlice';
import Buy from '../images/svg/buy.svg';
import Sell from '../images/svg/sell.svg';
import OrangeSell from '../images/svg/sell-car.svg';
import OrangesBuy from '../images/svg/buy-car.svg';
import AuctionStack2 from '../Stacks/AuctionStack2';

const Tab = createBottomTabNavigator();

const BottomStack = () => {
  const navigation = useNavigation();
  const removeBottomTab = useSelector(state => state?.global?.removeBottomTab);
  const screenName = useSelector(state => state?.global?.screenName);
  const stackName = useSelector(s => s?.global?.stackName);

  const dispatch = useDispatch();

  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    async function checktoNavigateOrNot() {
      let user = await getItem();
      if (user !== null) {
        if (
          !hasNavigated &&
          (stackName.length !== 0 || screenName.length !== 0)
        ) {
          setHasNavigated(true);
          setTimeout(() => {
            navigation.navigate(stackName, {
              screen: screenName,
            });
            dispatch(setStackName(''));
          }, 0);
        }
      }
    }
    checktoNavigateOrNot();
  }, [navigation, stackName, screenName, hasNavigated, dispatch]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          display: removeBottomTab ? 'none' : 'flex',
          height: Platform.OS === 'ios' ? '9%' : '7%',
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '500',
          position: 'absolute',
          bottom: Platform.OS === 'android' ? -24 : -14,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: '500',
            color: 'black',
          },
          tabBarLabel: 'Home',
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              color={!focused ? 'black' : 'rgba(224, 122, 2, 1)'}
              size={30}
              style={{
                alignSelf: 'center',
                bottom: Platform.OS === 'android' ? -5 : 0,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Buy"
        component={ExploreStack}
        options={{
          tabBarLabelStyle: {fontSize: 14, fontWeight: '500', color: 'black'},
          tabBarLabel: 'Buy Car',
          tabBarIcon: ({color, focused}) =>
            !focused ? (
              <Buy
                color={color}
                width={'90%'}
                height={'90%'}
                style={{
                  alignSelf: 'center',
                  bottom: Platform.OS === 'android' ? -3 : 0,
                }}
              />
            ) : (
              <OrangesBuy
                color={color}
                width={'90%'}
                height={'90%'}
                style={{
                  alignSelf: 'center',
                  bottom: Platform.OS === 'android' ? -3 : 0,
                }}
              />
            ),
        }}
      />

      <Tab.Screen
        name="SellCarStack"
        component={SellCarStack}
        options={{
          tabBarLabelStyle: {fontSize: 14, fontWeight: '500', color: 'black'},
          tabBarLabel: 'Sell Car',
          tabBarIcon: ({color, focused}) =>
            !focused ? (
              <Sell
                color={color}
                width={'90%'}
                height={'90%'}
                style={{
                  alignSelf: 'center',
                  bottom: Platform.OS === 'android' ? -2 : 0,
                }}
              />
            ) : (
              <OrangeSell
                color={color}
                width={'90%'}
                height={'90%'}
                style={{
                  alignSelf: 'center',
                  bottom: Platform.OS === 'android' ? -2 : 0,
                }}
              />
            ),
        }}
      />

      <Tab.Screen
        name="AuctionStack2"
        component={AuctionStack2}
        options={{
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '500',
            color: 'black',
          },
          tabBarLabel: 'My Bids',
          tabBarIcon: ({color, focused}) =>
            !focused ? (
              <Buy
                color={color}
                width={'90%'}
                height={'90%'}
                style={{
                  alignSelf: 'center',
                  bottom: Platform.OS === 'android' ? -3 : 0,
                }}
              />
            ) : (
              <OrangesBuy
                color={color}
                width={'90%'}
                height={'90%'}
                style={{
                  alignSelf: 'center',
                  bottom: Platform.OS === 'android' ? -3 : 0,
                }}
              />
            ),
        }}
      />

      <Tab.Screen
        name="MyCarsStack"
        component={MyOrderStack}
        options={{
          tabBarLabelStyle: {fontSize: 14, fontWeight: '500', color: 'black'},
          tabBarLabel: 'My Orders',
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'car' : 'car-outline'}
              color={!focused ? 'black' : 'rgba(224, 122, 2, 1)'}
              size={34}
              style={{
                alignSelf: 'center',
                bottom: Platform.OS === 'android' ? -7 : -2,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomStack;
