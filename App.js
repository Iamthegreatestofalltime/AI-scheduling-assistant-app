import React, { useState } from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Login from './login';
import Home from './Home';
import Tasks from './Tasks';
import TaskDetails from './TaskDetails';
import AddTask from './AddTask';
import GoalSetting from './GoalSetting';
import Rewards from './Rewards';
import AccountabilityPartner from './AccountabilityPartner';
import ShareTask from './ShareTask';
import Profile from './Profile';
import Settings from './Settings';
import CreateGoal from './CreateGoal';
import ConsistencyGoal from './ConsistencyGoal';
import DurationGoal from './DurationGoal';
import CompletionGoal from './CompletionGoal'
import NumericalGoal from './NumericalGoal'
import TaskGrid from './TaskGrid';

import { TasksProvider } from './TasksContext'; 

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Rewards':
              iconName = focused ? 'gift' : 'gift-outline';
              break;
            case 'Goal Setting':
              iconName = focused ? 'flag' : 'flag-outline';
              break;
            case 'Accountability Partner':
              iconName = focused ? 'people' : 'people-outline';
              break;
            default:
              iconName = 'ban';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#00FF9D', // Active icon color
        inactiveTintColor: 'gray', // Inactive icon color
        style: {
          backgroundColor: '#1F1B24', // Tab bar background color
          borderTopColor: '#1F1B24', // To blend the tab bar with your app
        },
      }}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Tab.Screen name="Rewards" component={Rewards} options={{ headerShown: false }}/>
      <Tab.Screen name="Goal Setting" component={GoalSetting} options={{ headerShown: false }}/>
      <Tab.Screen name="Accountability Partner" component={AccountabilityPartner} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

function App() {
  const getHeaderTitle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    return routeName;
  };

  // Set initial state for tasks
  const [tasks, setTasks] = useState([]);

  return (
    <TasksProvider value={{ tasks, setTasks }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="HomeTabs" 
            component={HomeTabs} 
            options={({ route, navigation }) => ({
              headerTitle: getHeaderTitle(route),  // Set header title to the current screen
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('Profile')}
                  title="Profile"
                />
              ),
              headerLeft: () => (
                <Button
                  onPress={() => navigation.navigate('Settings')}
                  title="Settings"
                />
              ),
            })}
          />
          <Stack.Screen name="Tasks" component={Tasks} />
          <Stack.Screen name="TaskDetails" component={TaskDetails} />
          <Stack.Screen name="AddTask" component={AddTask} />
          <Stack.Screen name="ShareTask" component={ShareTask} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="CreateGoal" component={CreateGoal} />
          <Stack.Screen name="ConsistencyGoal" component={ConsistencyGoal} />
          <Stack.Screen name='DurationGoal' component={DurationGoal} />
          <Stack.Screen name='CompletionGoal' component={CompletionGoal} />
          <Stack.Screen name='NumericalGoal' component={NumericalGoal} />
          <Stack.Screen name='TaskGrid' component={TaskGrid} />
        </Stack.Navigator>
      </NavigationContainer>
    </TasksProvider>
  );
}

export default App;
