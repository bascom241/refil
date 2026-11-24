import React from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Profile from '../components/Profile';
import Search from '../components/Search';
import Hero from '../components/Hero';
import Distributors from '../components/Distributors';
import { NearbyCard, NearbyHeading } from '../components/Nearby';

// Placeholder cards until nearby station data is connected.
const nearbyStations = ['example-1', 'example-2', 'example-3'];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F8F8F8]" edges={['top']}>
      <FlatList
        data={nearbyStations}
        keyExtractor={(item) => item}
        renderItem={() => <NearbyCard />}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="gap-8">
            <Profile />
            <Search />
            <Hero />
            <Distributors />
            <NearbyHeading />
          </View>
        }
      />
    </SafeAreaView>
  );
}
