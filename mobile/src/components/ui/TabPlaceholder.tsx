import React from 'react';
import { Text, View } from 'react-native';
import { registerTokens } from '@/constants/register';

export function TabPlaceholder({ title }: { title: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F8F8' }}>
      <Text style={{ fontFamily: registerTokens.fonts.semibold, fontSize: 20, color: '#1C1C1E' }}>{title}</Text>
    </View>
  );
}
