import { registerTokens } from '@/constants/register';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const stationImage = require('@assets/images/home/loc1.png');
const distributors = ['Bovas', 'Heagle', 'Orange', 'NNPC', 'Ace'];

export function Distributors() {
  return (
    <View>
      <View className="mb-5 flex-row items-center justify-between">
        <Text style={{ fontFamily: registerTokens.fonts.regular, fontSize: 15, color: '#171717' }}>
          Top Distributors
        </Text>
        <Text style={{ fontFamily: registerTokens.fonts.regular, fontSize: 13, color: '#102D83' }}>
          See all
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {distributors.map((name) => (
          <View key={name} style={{ width: 68, alignItems: 'center', marginRight: 18 }}>
            <View style={{ width: 58, height: 58, borderRadius: 29, borderWidth: 3, borderColor: '#617EC4', padding: 2, backgroundColor: '#F8F8F8' }}>
              <Image source={stationImage} style={{ width: '100%', height: '100%', borderRadius: 25 }} />
            </View>
            <Text numberOfLines={1} style={{ marginTop: 7, fontFamily: registerTokens.fonts.regular, fontSize: 12, color: '#404040' }}>
              {name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default Distributors;
