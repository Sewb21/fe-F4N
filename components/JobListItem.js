import React from 'react'
import { View, Text } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements';
import getSkillImageLocation from '../utils/utils';


export default function JobListItem({item}) {
  return (
    <View>
      <ListItem
        containerStyle={styles.listItem}
        key={item.job_id}
        title={'"' + item.title + '"'}
        leftAvatar={
          <Avatar
            size="medium"
            overlayContainerStyle={{ backgroundColor: '#026670' }}
            rounded
            icon={{
              name: getSkillImageLocation(item.skill_name),
              color: '#EDEAE5',
              type: 'material',
            }}
            activeOpacity={0.7}
          />
        }
        chevron
      />
    </View>
  );
}

const styles = {
  listItem: {
    height: 100,
    margin: 1
  },
};
