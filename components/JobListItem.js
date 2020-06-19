import React from 'react';
import { View, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { getIconDetails, elapsedTimeString } from '../utils/utils';
import { styles } from '../styling/JobListItemStyling';

export default function JobListItem({ item }) {
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
            <Text>{item.location + ' ' + item.job_status}</Text>
            <Text>{elapsedTimeString(date)}</Text>
            <Avatar
              size="small"
              rounded
              source={{
                uri: item.avatar_url,
              }}
              activeOpacity={0.7}
            />
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
