import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, TextInput, View, ActivityIndicator } from "react-native";

import { AuthProgress, type AuthProgressStep } from "@/components/auth/AuthProgress";
import { registerTokens } from "@/constants/register";
import { useRegisterStore } from "@/features/auth/store/registerStore";
import { useRegister } from "@/features/auth/hooks/useAuth";
import { toast } from "@/utils/toast";
import { saveTokens } from "@/utils/tokenService";

interface Props {
  contentWidth: number;
  currentStep: AuthProgressStep;
  onNext?: () => void;
}

const VerifyActions = ({ contentWidth, currentStep, onNext }: Props) => {
  const confirmPassword = useRegisterStore((state) => state.confirmPassword);
  const setConfirmPassword = useRegisterStore((state) => state.setConfirmPassword);
  const [showPassword, setShowPassword] = useState(false);


  const { phoneNumber, firstName, lastName, password } = useRegisterStore()
  const { mutate, isPending } = useRegister();

  const registerUser = () => {
    const formData = {
      firstName,
      lastName,
      password,
      phoneNumber
    }

    mutate(formData, {

    
      onSuccess: async (data) => {
        try {
          const { accessToken, refreshToken, message } = data;
          await saveTokens({ accessToken, refreshToken });
          toast.success(message);
          if (onNext) {
            onNext()
          }
        } catch {
          toast.error("Registration failed", "Your session could not be saved securely. Please try again.");
        }

      }, onError: (error: any) => {
        console.log("========== REGISTRATION ERROR ==========");
        console.log("Error message:", error?.message);
        console.log("Error name:", error?.name);
        console.log("Error response data:", error?.response?.data);
        console.log("Error status:", error?.response?.status);
        console.log("Full error:", JSON.stringify(error, null, 2));
        console.log("========================================");

        toast.error(
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
        );
      }
    })
  }



  return (
    <View
      className="items-center"
      style={{
        width: contentWidth,
      }}
    >
      <Text
        className="text-center text-[30px] leading-9 tracking-[1.2px] text-[#121212]"
        style={{ fontFamily: registerTokens.fonts.regular }}
      >
        Verify Password
      </Text>

      <View className="mt-[35px] w-full gap-[26px]">
        <View className="w-full gap-[10px]">
          <Text
            className="text-[12px] leading-[19px] tracking-[-0.24px] text-[#606060]"
            style={{ fontFamily: registerTokens.fonts.regular }}
          >
            Confirm Password
          </Text>

          {/* Input Wrapper with Eye Icon */}
          <View className="relative w-full flex-row items-center justify-between rounded-full border border-[#F8810B] bg-[#F6F6F6] px-5">
            <TextInput
              className="h-[58px] flex-1 text-[14px] leading-[21px] tracking-[-0.14px] text-[#1A1C1E]"
              style={{ fontFamily: registerTokens.fonts.regular }}
              accessibilityLabel="Confirm password"
              placeholder="*******"
              placeholderTextColor="#9CA3AF"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
            />

            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              hitSlop={10}
              className="ml-2 items-center justify-center"
            >
              {showPassword ? (
                <EyeOff size={20} color="#606060" />
              ) : (
                <Eye size={20} color="#606060" />
              )}
            </Pressable>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Next"
          onPress={registerUser}

          className="h-[58px] w-full items-center justify-center rounded-full border border-[#F8810B] bg-[#F8810B] px-5"
          style={{
            shadowColor: "#CBD6FF",
            shadowOpacity: 0.05,
            shadowRadius: 10,
            shadowOffset: {
              width: 0,
              height: 10,
            },
            elevation: 1,
          }}
        >
          <Text
            className="text-center text-[20px] text-[#F6F6F6]"
            style={{
              fontFamily: registerTokens.fonts.semibold,
            }}
          >
            Next
          </Text>
        </Pressable>
      </View>

      <AuthProgress currentStep={currentStep} />
    </View>
  );
};

export default VerifyActions;