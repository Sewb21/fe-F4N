
import React, { useState, useEffect, useContext } from 'react';
import * as api from '../api-requests/axios-request';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { elapsedTimeString } from '../utils/utils';
import UserContext from '../contexts/UserContext';

export default function CommentList({ jobID }) {
  const user = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({
    body: '',
    username: UserContext._currentValue,
  });

  useEffect(() => {
    api.getComments(jobID, user.authtoken).then(({ comments }) => {
      setComments(comments);
    });
  }, []);

  const handleCommentChange = commentBody => {
    let updatedComment = {};
    Object.assign(updatedComment, comment);
    updatedComment['body'] = commentBody;
    setComment(updatedComment);
  };

  const handleCommentPost = () => {
    console.log(comment);
    axios
      .post(`https://f4n.herokuapp.com/api/jobs/${jobID}/comments`, comment)
      .then(({ data }) => {
        setComments([comment, ...comments]);
        // setComment({
          //body: '',
          //username: UserContext._currentValue,
        //});
      });
  };

  if (comments.length <= 0) {
    return <Text style={styles.fieldTitle}>No Comments</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.rowC1}>{'Add a Comment'}</Text>
        <View style={styles.rowC2}>
          <TouchableOpacity onPress={handleCommentPost}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Post</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        multiline={true}
        numberOfLines={4}
        style={styles.inputBox}
        onChangeText={handleCommentChange}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {comments.map(comment => {
          const date = new Date(comment.created_at);

          return (
            <View key={comment.comment_id} style={styles.commentView}>
              <View style={styles.rowContainer}>
                <Text style={styles.rowC3}>{comment.username}</Text>
                <Text style={styles.rowC4}>{elapsedTimeString(date)}</Text>
              </View>
              <Text style={styles.commentText}>{comment.body}</Text>
              <View style={styles.rowContainer}>
                <Text style={styles.rowC3}></Text>
                <Text style={styles.rowC4}>{comment.charity_name}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = {
  inputBox: {
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    padding: 4,
    backgroundColor: '#fff',
    fontSize: 14,
    color: '#026670',
    height: 40,
  },
  button: {
    backgroundColor: '#026670',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    padding: 6,
    paddingLeft: 6,
    paddingRight: 6,
    margin: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  rowC3: {
    width: '50%',
    padding: 4,
    fontSize: 14,
    color: '#026670',
    fontWeight: 'bold',
  },
  rowC4: {
    width: '50%',
    padding: 4,
    fontSize: 14,
    color: '#026670',
  },
  rowC1: {
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    backgroundColor: '#FEF9C7',
    fontSize: 20,
    color: '#026670',
    marginTop: 5,
    paddingLeft: 10,
    width: '75%',
  },
  rowC2: {
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    backgroundColor: '#FEF9C7',
    fontSize: 20,
    color: '#026670',
    marginTop: 5,
    paddingLeft: 10,
    width: '25%',
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
