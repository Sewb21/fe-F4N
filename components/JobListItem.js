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
        title={
          <View style={styles.title_view}>
            <Text style={styles.title_text}>{'"' + item.title + '"'}</Text>
          </View>
        }
        subtitle={
          <View style={styles.subtitle_view}>
            <Text>{item.username + ' , fundraising for ' + 'charityXYZ'}</Text>
            <Text>{item.location + ' ' + item.job_status}</Text>
            <Text>{elapsedTimeString(date)}</Text>
          </View>
        }
        titleStyle={styles.title}
        subtitleStyle={styles.subtitle}
        leftAvatar={
          <Avatar
            size="medium"
            overlayContainerStyle={{ backgroundColor: '#026670' }}
            rounded
            icon={{
              name: getIconDetails(item.skill_name).name,
              color: getIconDetails(item.skill_name).color,
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
