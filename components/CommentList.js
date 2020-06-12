import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import { elapsedTimeString } from '../utils/utils';

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
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {comments.map(comment => {
          const date = new Date(comment.created_at);

          return (
            <View key={comment.comment_id} style={styles.commentView}>
              <View style={styles.rowContainer}>
                <Text style={styles.rowC1}>{comment.username}</Text>
                <Text style={styles.rowC2}>{elapsedTimeString(date)}</Text>
              </View>
              <Text style={styles.commentText}>{comment.body}</Text>
              <View style={styles.rowContainer}>
                <Text style={styles.rowC1}></Text>
                <Text style={styles.rowC2}>{comment.charity_name}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

// Username
// Date Posted
// Comment Body
// Charity

const styles = {
  rowContainer: {
    flexDirection: 'row',
  },
  rowC1: {
    width: '50%',
    padding: 4,
    fontSize: 14,
    color: '#026670',
    fontWeight: 'bold',
  },
  rowC2: {
    width: '50%',
    padding: 4,
    fontSize: 14,
    color: '#026670',
  },
  container: {
    height: '100%',
  },
  scrollView: {},
  commentView: {
    height: 125,
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
  },
  commentText: {
    padding: 4,
    fontSize: 14,
    color: '#026670',
  },

  fieldTitle: {
    padding: 4,
    fontSize: 14,
    color: '#026670',
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
  },
};
