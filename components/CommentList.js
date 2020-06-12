import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import UserContext from '../contexts/UserContext';
import * as api from '../api-requests/axios-request';

export default function CommentList({ jobID }) {
  const user = useContext(UserContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    api.getComments(jobID, user.authtoken).then(({ comments }) => {
      setComments(comments);
    });
  }, []);
  if (comments.length <= 0) {
    return <Text style={styles.fieldTitle}>No Comments</Text>;
  }
  return comments.map(comment => {
    return (
      <View style={styles.button}>
        <Text key={comment.comment_id} style={styles.fieldTitle}>
          {comment.body}
        </Text>
      </View>
    );
  });
}

const styles = {
  fieldTitle: {
    padding: 4,
    fontSize: 14,
    color: '#026670',
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
  },
};
