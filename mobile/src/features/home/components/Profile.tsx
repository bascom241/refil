import { View, Text } from 'react-native'
import { Image } from 'expo-image'


const Profile = () => {

  const location = require("@assets/images/home/location.png");

  const addresses = [
    {
      label:"01", value:"irewolede"
    }, 
    {
      label: "02", value:"Ajayi"
    }
  ]
  return (
    <View className='flex-row '>

      <View>
        <Image
          source={location}
          style={{ width: 24, height: 24 }}
        />

        {/** Drop Down Design */}



      </View>

      <View>
        <View>

        </View>
      </View>


    </View>
  )
}

export default Profile