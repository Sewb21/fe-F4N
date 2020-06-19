import React, { useState, useEffect, useContext } from 'react';
import * as api from '../api-requests/axios-request';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Loader from '../components/Loader';

import UserContext from '../contexts/UserContext';
import HeaderComponent from '../components/HeaderComponent';

export default function NotificationsScreen() {
  const user = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);
  const [displayedNotifications, setDisplayedNotifications] = useState([]);

  useEffect(() => {
    api
      .getNotifications(user.username, user.authtoken)
      .then(({ notifications }) => {
        console.log(notifications[0]);
        setDisplayedNotifications(notifications);
        setLoading(false);
      });
  }, []);

  const handleStatusUpdate = (notification_id, status) => {
    api
      .patchNotifications(notification_id, status, user.username, user.authtoken)
      .then(() => {
        setDisplayedNotifications(displayedNotifications.filter(notification => notification.notification_id !== notification_id));
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }
  if (displayedNotifications.length <= 0) {
    return <Text style={styles.fieldTitle}>No Notifications</Text>;
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#e4f5f0' }}>
      <HeaderComponent name="Notifications" />
      <ScrollView>
        {displayedNotifications.map(notification => {
          return (
            <View
              key={notification.notification_id}
              style={styles.notificationView}
            >
              <View style={styles.notificationTextContainer}>
                <Text style={styles.notificationText}>{notification.body}</Text>
              </View>
              <View style={styles.notificationButtonContainer}>
                <TouchableOpacity onPress={() => handleStatusUpdate(notification.notification_id, 'read')}>
                  <View style={styles.clearNotificationButton_view}>
                    <Text style={styles.clearNotificationButton_text}>X</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = {
  clearNotificationButton_view: {
    backgroundColor: '#D10000',
    borderRadius: 7,
    padding: 6,
    paddingLeft: 6,
    paddingRight: 6,
    width: 40,
    alignItems: 'center',
  },
  clearNotificationButton_text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  notificationView: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#9FEDD7',
  },
  notificationText: {
    fontSize: 14,
    color: '#026670',
  },
  notificationTextContainer: {
    paddingLeft: 4,
    paddingRight: 4,
    justifyContent: 'center',
    width: '85%',
  },
  notificationButtonContainer: {
    paddingLeft: 4,
    paddingRight: 4,
    justifyContent: 'center',
    width: '15%',
  },
};
