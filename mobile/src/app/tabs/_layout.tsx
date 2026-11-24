import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { HugeiconsIcon } from '@hugeicons/react-native';
import Home01Icon from '@hugeicons/core-free-icons/Home01Icon';
import FavouriteIcon from '@hugeicons/core-free-icons/FavouriteIcon';
import SearchIcon from '@hugeicons/core-free-icons/Search01Icon';
import TaskDoneIcon from '@hugeicons/core-free-icons/TaskDone01Icon';
import { registerTokens } from '@/constants/register';

const tabs = {
  index: { icon: Home01Icon, label: 'Home' },
  favourite: { icon: FavouriteIcon, label: 'Favourite' },
  search: { icon: SearchIcon, label: 'Search' },
  orders: { icon: TaskDoneIcon, label: 'Order' },
} as const;

type TabName = keyof typeof tabs;
type BottomTabBarProps = Parameters<NonNullable<React.ComponentProps<typeof Tabs>['tabBar']>>[0];

function TabItem({ name, focused, onPress, onLongPress }: { name: TabName; focused: boolean; onPress: () => void; onLongPress: () => void }) {
  const progress = useSharedValue(focused ? 1 : 0);
  useEffect(() => {
    progress.value = withSpring(focused ? 1 : 0, { damping: 18, stiffness: 210 });
  }, [focused, progress]);
  const animatedStyle = useAnimatedStyle(() => ({
    flex: 1 + progress.value * 0.9,
  }));
  const { icon, label } = tabs[name];
  return (
    <Animated.View style={[styles.tab, animatedStyle]}>
      <Pressable accessibilityRole="tab" accessibilityLabel={label} accessibilityState={{ selected: focused }} onPress={onPress} onLongPress={onLongPress} style={[styles.button, focused && styles.selected]}>
        <HugeiconsIcon icon={icon} size={21} color={focused ? '#FFFFFF' : '#4F5663'} strokeWidth={1.6} />
        {focused && <Text numberOfLines={1} style={styles.label}>{label}</Text>}
      </Pressable>
    </Animated.View>
  );
}

function FloatingTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { bottom: Math.max(insets.bottom, 16) }]}>
      {state.routes.map((route, index) => {
        if (!(route.name in tabs)) return null;
        const focused = state.index === index;
        return <TabItem key={route.key} name={route.name as TabName} focused={focused} onPress={() => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
        }} onLongPress={() => navigation.emit({ type: 'tabLongPress', target: route.key })} />;
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <FloatingTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="favourite" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="orders" />
      <Tabs.Screen name="scan" options={{ href: null }} />
      <Tabs.Screen name="wallet" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: { position: 'absolute', left: 20, right: 20, height: 68, padding: 7, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.95)', borderRadius: 36, elevation: 10, shadowColor: '#111111', shadowOffset: { width: 0, height: 7 }, shadowOpacity: 0.2, shadowRadius: 15 },
  tab: { height: '100%', minWidth: 0 },
  button: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, borderRadius: 28 },
  selected: { backgroundColor: registerTokens.colors.primary },
  label: { color: '#FFFFFF', fontFamily: registerTokens.fonts.semibold, fontSize: 12, flexShrink: 1 },
});
