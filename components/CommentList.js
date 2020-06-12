import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

export default function CommentList({ jobID }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`https://f4n.herokuapp.com/api/jobs/${jobID}/comments`)
      .then(({ data }) => {
        setComments(data.comments);
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
