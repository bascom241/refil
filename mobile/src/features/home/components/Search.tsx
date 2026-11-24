import { registerTokens } from '@/constants/register';
import React from 'react';
import { TextInput, View } from 'react-native';
import SearchIcon from '@hugeicons/core-free-icons/Search01Icon';
import FilterHorizontalIcon from '@hugeicons/core-free-icons/FilterHorizontalIcon';
import { HugeiconsIcon } from '@hugeicons/react-native';

export function Search() {
  return (
    <View className="h-14 flex-row items-center rounded-4xl border border-gray-300 bg-gray-50">
      <View className="flex-1 flex-row items-center pl-4">
        <HugeiconsIcon icon={SearchIcon} size={16} color="#9CA3AF" strokeWidth={1.5} />
        <TextInput
          style={{ fontFamily: registerTokens.fonts.regular }}
          accessibilityLabel="Search for a station"
          placeholder="Search a station"
          placeholderTextColor="#9CA3AF"
          className="ml-2 flex-1 text-sm text-gray-900"
        />
      </View>
      <View className="h-full w-12 items-center justify-center border-l border-gray-100">
        <HugeiconsIcon icon={FilterHorizontalIcon} size={19} color="#111111" strokeWidth={1.7} />
      </View>
    </View>
  );
}

export default Search;
