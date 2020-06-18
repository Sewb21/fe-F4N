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
    if (newComment) {
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
    }
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
  if (displayedComments.length <= 0) {
    return <Text style={styles.fieldTitle}>No Comments</Text>;
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
      <ScrollView contentContainerStyle={styles.scrollView}>
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

const styles = {
  headingMain: {
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    fontSize: 20,
    color: '#026670',
    paddingLeft: 10,
    fontWeight: 'bold',
    paddingBottom: 5,
    paddingTop: 5,
  },
  inputBox: {
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
    padding: 4,
    backgroundColor: '#fff',
    fontSize: 14,
    color: '#026670',
    height: 50,
  },
  button: {
    backgroundColor: '#026670',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    padding: 4,
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
  rowC1: {
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    backgroundColor: '#FEF9C7',
    fontSize: 20,
    color: '#026670',
    paddingLeft: 10,
    width: '75%',
  },
  rowC2: {
    borderTopWidth: 2,
    borderTopColor: '#FCE181',
    backgroundColor: '#FEF9C7',
    fontSize: 20,
    color: '#026670',
    paddingLeft: 10,
    width: '25%',
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
  rowC5: {
    width: '100%',
    padding: 4,
    paddingRight: 30,
    fontSize: 14,
    color: '#026670',
    textAlign: 'right',
  },

  container: {
    height: '100%',
  },
  commentView: {
    height: 125,
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
  },
  rowContainerListItemTop: {
    flexDirection: 'row',
    height: 27,
  },
  rowContainerListItemBottom: {
    flexDirection: 'row',
    height: 30,
    justifyItems: 'space-around',
  },
  commentText: {
    fontSize: 14,
    color: '#026670',
  },

  commentTextContainer: {
    paddingLeft: 4,
    paddingRight: 4,
    height: 68,
    justifyContent: 'center',
  },

  fieldTitle: {
    padding: 4,
    fontSize: 14,
    color: '#026670',
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#FCE181',
  },
  rowContainerSortBar: {
    backgroundColor: '#EDEAE5',
    flexDirection: 'row',
  },
  rowC6: {
    width: '48%',
    paddingLeft: 5,
  },
  rowC7: {
    width: '52%',
  },
};
