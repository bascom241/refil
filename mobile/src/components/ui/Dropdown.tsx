import { useState } from 'react'
import { View, Text } from 'react-native'


export default function Dropdown() {

    const [visible, setVisible] = useState(false);
    


  return (
    <View>
      <Text>Dropdown</Text>
    </View>
  )
}