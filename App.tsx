import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScannerScreen } from './src/screens/ScannerScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { GuideScreen } from './src/screens/GuideScreen';
import { BrowseScreen } from './src/screens/BrowseScreen';
import { useTranslation } from './src/i18n/useTranslation';
import { validateEnv } from './src/utils/validateEnv';

// Validate environment variables at startup in development.
// Fails loudly rather than causing confusing runtime errors later.
if (__DEV__) {
  validateEnv();
}

const Tab = createBottomTabNavigator();

function Tabs() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#43A047',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: { borderTopColor: '#eee' },
      }}
    >
      <Tab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          tabBarLabel: t.tabScanner,
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📷</Text>,
        }}
      />
      <Tab.Screen
        name="Browse"
        component={BrowseScreen}
        options={{
          tabBarLabel: t.tabBrowse,
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🔍</Text>,
        }}
      />
      <Tab.Screen
        name="Guide"
        component={GuideScreen}
        options={{
          tabBarLabel: t.tabGuide,
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📖</Text>,
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: t.tabHistory,
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📋</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}