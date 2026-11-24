import { View, Text, Pressable } from "react-native";
import { HugeiconsIcon } from "@hugeicons/react-native";
import Location01Icon from '@hugeicons/core-free-icons/Location01Icon';
import ArrowDown01Icon from '@hugeicons/core-free-icons/ArrowDown01Icon';
import UserIcon from '@hugeicons/core-free-icons/UserIcon';
import { registerTokens } from "@/constants/register";

const Profile = () => {
  return (
    <View className="w-full flex-row items-center justify-between">

      {/* Location Section */}
      <Pressable className="flex-1 flex-row items-center gap-2 mr-4">
        <HugeiconsIcon icon={Location01Icon} size={24} color="#606060" />

        <Text
          style={{ fontFamily: registerTokens.fonts.regular }}
          className="text-sm text-[#606060] shrink"
          numberOfLines={1}
        >
          22, Off Tipper garage...
        </Text>

        <HugeiconsIcon icon={ArrowDown01Icon} size={20} color="#606060" />
      </Pressable>



      {/* Profile Button */}
      <Pressable className="w-11 h-11 rounded-full border border-gray-300 items-center justify-center">
        <HugeiconsIcon icon={UserIcon} size={20} color="#141428" />
      </Pressable>

    </View>
  );
};

export default Profile;