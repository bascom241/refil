import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import StarIcon from '@hugeicons/core-free-icons/StarIcon';
import Location01Icon from '@hugeicons/core-free-icons/Location01Icon';
import BicycleIcon from '@hugeicons/core-free-icons/Bicycle01Icon';
import { registerTokens } from '@/constants/register';

const stationImage = require('@assets/images/home/loc1.png');

export function NearbyHeading() {
  return (
    <View style={styles.heading}>
      <Text style={styles.headingText}>Nearby</Text>
      <Text style={styles.seeAll}>See all</Text>
    </View>
  );
}

export function NearbyCard() {
  return (
    <View style={styles.card}>
      <Image source={stationImage} style={styles.image} resizeMode="cover" />
      <View style={styles.details}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>Heagle Gas</Text>
          <Text style={styles.price}>{"\u20A6"}1,400</Text>
        </View>
        <View style={styles.ratingRow}>
          <HugeiconsIcon icon={StarIcon} size={20} color={registerTokens.colors.primary} fill={registerTokens.colors.primary} />
          <Text style={styles.detailText}>4.2 (187)</Text>
        </View>
        <View style={styles.meta}>
          <View style={styles.metaRow}>
            <HugeiconsIcon icon={Location01Icon} size={19} color="#171717" />
            <Text style={styles.metaText} numberOfLines={2}>Ilorin Mall, Taiwo Rd, Offa Garage</Text>
          </View>
          <View style={styles.metaRow}>
            <HugeiconsIcon icon={BicycleIcon} size={21} color="#171717" />
            <Text style={styles.metaText}>1.3 Km away from you</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  headingText: { fontFamily: registerTokens.fonts.regular, fontSize: 18, color: '#171717' },
  seeAll: { fontFamily: registerTokens.fonts.semibold, fontSize: 14, color: '#102D83' },
  card: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 24, padding: 12, marginBottom: 14, minHeight: 168 },
  image: { width: '38%', borderRadius: 18, minHeight: 144 },
  details: { flex: 1, marginLeft: 14, paddingVertical: 5 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 5 },
  name: { flex: 1, fontFamily: registerTokens.fonts.semibold, fontSize: 15, color: '#171717' },
  price: { fontFamily: registerTokens.fonts.semibold, fontSize: 18, color: '#171717' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  detailText: { fontFamily: registerTokens.fonts.regular, fontSize: 13, color: '#171717' },
  meta: { marginTop: 'auto', gap: 10, paddingTop: 12 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { flex: 1, fontFamily: registerTokens.fonts.regular, fontSize: 12, color: '#171717' },
});
