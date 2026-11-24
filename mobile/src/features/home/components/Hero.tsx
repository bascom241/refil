import React, { useState } from 'react';
import { Image, ScrollView, useWindowDimensions, View } from 'react-native';

const offerImage = require('@assets/images/home/offer.png');
const offers = [0, 1, 2];

export function Hero() {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width - 64, 370);
  const spacing = 16;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth + spacing}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 20 }}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / (cardWidth + spacing));
          setActiveIndex(Math.max(0, Math.min(index, offers.length - 1)));
        }}
      >
        {offers.map((offer) => (
          <Image
            key={offer}
            source={offerImage}
            accessibilityLabel="Up to 30% discount on first delivery"
            resizeMode="stretch"
            style={{ width: cardWidth, height: cardWidth * 167 / 371, marginRight: spacing }}
          />
        ))}
      </ScrollView>
      <View className="mt-2 flex-row justify-center gap-1">
        {offers.map((offer) => (
          <View
            key={offer}
            style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: activeIndex === offer ? '#F8810B' : '#14318B' }}
          />
        ))}
      </View>
    </View>
  );
}

export default Hero;
