import React from 'react';
import { View, Text } from 'react-native';
import {Input} from 'react-native-elements';

export default function JobAdder() {
  return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Input placeholder={'Title'} label={'Job Title'}/>
        <Input placeholder={'Info'} label={'Job Info'} />
      </View>
  )
}
