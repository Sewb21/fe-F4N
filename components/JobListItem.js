import React from 'react'
import { View, Text } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements';
import { getIconDetails, elapsedTimeString } from '../utils/utils';


export default function JobListItem({item}) {
  const date = new Date(item.created_at);
  return (
    <View>
      <ListItem
        containerStyle={styles.listItem}
        key={item.job_id}
        title={'"' + item.title + '"'}
        subtitle={
          <>
            <Text>{item.username + ' , fundraising for ' + 'charityXYZ'}</Text>
            <Text>{elapsedTimeString(date)}</Text>
          </>
        }
        titleStyle={styles.title}
        leftAvatar={
          <Avatar
            size="medium"
            overlayContainerStyle={{ backgroundColor: '#026670' }}
            rounded
            icon={{
              name: getIconDetails(item.skill_name).name,
              color: '#EDEAE5',
              type: getIconDetails(item.skill_name).type,
            }}
            activeOpacity={0.7}
          />
        }
        chevron={{
          name: 'chevron-right',
          color: '#026670',
          type: 'material',
          size: 50,
        }}
      />
    </View>
  );
}

const styles = {
  listItem: {
    height: 150,
    margin: 1,
    
  },
  title: {
    paddingBottom: 12,
  }
};
