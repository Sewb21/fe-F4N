import React, { useState, useEffect, useContext } from 'react';
import * as api from '../api-requests/axios-request';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Picker,
} from 'react-native';
import { elapsedTimeString } from '../utils/utils';
import Loader from '../components/Loader';
import { styles } from '../styling/CommentScreenStyling';
import UserContext from '../contexts/UserContext';
import HeaderComponent from '../components/HeaderComponent';

export default function CommentsScreen({ route }) {
  const user = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);
  const { job_id, title } = route.params;
  const [displayedComments, setDisplayedComments] = useState([]);
  const [comment, setComment] = useState({
    username: user.username,
    body: '',
  });
  const [newComment, setNewComment] = useState(true);
  const [sortBy, setSortBy] = useState('created_at');
  const [order, setOrder] = useState('desc');
  const [charities, setCharities] = useState([]);
  const [filterCharity, setFilterCharity] = useState('');

  useEffect(() => {
    api
      .getComments(job_id, user.authtoken, sortBy, order)
      .then(({ comments }) => {
        setCharities(
          getUniqueCharities(comments.map(comment => comment.charity_name))
        );
      })
      .then(
        api
          .getComments(job_id, user.authtoken, sortBy, order, filterCharity)
          .then(({ comments }) => {
            setDisplayedComments(comments);
            setLoading(false);
            setNewComment(false);
          })
      );
  }, [filterCharity, order, newComment]);

  const getUniqueCharities = charities => {
    return charities
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();
  };

  const handleCommentChange = commentBody => {
    let updatedComment = {};
    Object.assign(updatedComment, comment);
    updatedComment['body'] = commentBody;
    setComment(updatedComment);
  };

  const handleCommentPost = () => {
    api
      .postComment(job_id, comment, user.authtoken)
      .then(() => {
        setNewComment(true);
      })

      .catch(err => {
        console.log(err);
      });
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#e4f5f0' }}>
      <HeaderComponent name="Comments" />
      <View style={styles.rowContainerSortBar}>
        <View style={styles.rowC6}>
          <Picker
            selectedValue={filterCharity}
            onValueChange={setFilterCharity}
          >
            <Picker.Item label="Charity: (All)" value="" />
            {charities.map((charity, index) => {
              return (
                <Picker.Item key={index} label={charity} value={charity} />
              );
            })}
          </Picker>
        </View>
        <View style={styles.rowC7}>
          <Picker selectedValue={order} onValueChange={setOrder}>
            <Picker.Item label="Posted: (newest)" value="desc" />
            <Picker.Item label="Posted: (oldest)" value="asc" />
          </Picker>
        </View>
      </View>
      <Text style={styles.headingMain}>{':: "' + title + '"'}</Text>
      {displayedComments.length === 0 && (
        <Text style={styles.fieldTitle}>No Comments</Text>
      )}
      <ScrollView>
        {displayedComments.map(comment => {
          const date = new Date(comment.created_at);

          return (
            <View key={comment.comment_id} style={styles.commentView}>
              <View style={styles.rowContainerListItemTop}>
                <Text style={styles.rowC3}>{comment.username}</Text>
                <Text style={styles.rowC4}>{elapsedTimeString(date)}</Text>
              </View>
              <View style={styles.commentTextContainer}>
                <Text style={styles.commentText}>{comment.body}</Text>
              </View>
              <View style={styles.rowContainerListItemBottom}>
                <Text style={styles.rowC5}>
                  {'supporting >   '}
                  <Text style={{ fontWeight: 'bold' }}>
                    {comment.charity_name}
                  </Text>
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
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
    </View>
  );
}
