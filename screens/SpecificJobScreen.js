import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, Picker } from 'react-native';
import Loader from '../components/Loader';
import { elapsedTimeString } from '../utils/utils';
import HeaderComponent from '../components/HeaderComponent';
import UserContext from '../contexts/UserContext';
import * as api from '../api-requests/axios-request';
import { Avatar } from 'react-native-elements';
import jobImageUpload from '../api-requests/job-image-upload';
import ImagePickerComponent from '../utils/imagePicker';
import { styles } from '../styling/SpecificJobScreenStyling';

export default function SpecificJobScreen({ navigation, route }) {
  const user = useContext(UserContext);
  const [specificJob, setSpecificJob] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const job_id = route.params.job_id;
  const [offerButtonDisabled, setOfferButtonDisabled] = useState(false);
  const [helpers, setHelpers] = useState([]);
  const [selectedHelper, setSelectedHelper] = useState('');

  useEffect(() => {
    api
      .getHelpersByJobId(job_id, user.authtoken)
      .then(({ helpers }) => {
        setHelpers(helpers.map(helper => helper.username));
      })
      .then(() => {
        api.getSpecificJob(job_id, user.authtoken).then(({ job }) => {
          setSpecificJob(job);
          setLoading(false);
        });
      });
  }, [image]);

  const handleJobImageUpdate = () => {
    setLoading(true);
    jobImageUpload(image, job_id, user.authtoken).then(test => {
      setImage(null);
      setLoading(false);
    });
  };

  const handleHelpOffer = () => {
    api
      .postHelpOffer(user.username, job_id, user.authtoken)
      .then(() => {
        return api.postNotification(
          specificJob.username,
          `You have a new interested helper: ${user.username}.`
        );
      })
      .then(() => {
        setOfferButtonDisabled(true);
      });
  };

  const handleSelectHelper = () => {
    api
      .patchJobStatus(job_id, 'helping', user.authtoken)
      .then(() => {
        api.patchHelperStatus(
          selectedHelper,
          job_id,
          'helping',
          user.authtoken
        );
      })
      .then(() => {
        return api.postNotification(
          selectedHelper,
          `${user.username} has accepted your offer to help.`
        );
      });
  };

  const handleJobComplete = () => {
    api.patchJobStatus(job_id, 'complete', user.authtoken);
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }
  const date = new Date(specificJob.created_at);
  return (
    <View style={{ flex: 1, backgroundColor: '#e4f5f0' }}>
      <HeaderComponent name="Details" />
      <View style={styles.headingMain_view}>
        <Text style={styles.headingMain_text}>
          {':: "' + specificJob.title + '"'}
        </Text>
      </View>
      <View style={styles.fieldTitle_view}>
        <Text style={styles.fieldTitle_text}>{'Summary'}</Text>
      </View>
      <View style={styles.fieldBody_view}>
        <Text style={styles.fieldBody_text}>{specificJob.body}</Text>
      </View>
      <View style={styles.rowContainerR1_view}>
        <View style={styles.rowC1_view}>
          <Text style={styles.rowC1_text}>{'Location'}</Text>
        </View>
        <View style={styles.rowC2_view}>
          <Text style={styles.rowC2_text}>{specificJob.location}</Text>
        </View>
        <View style={styles.rowC3_view}>
          <Text style={styles.rowC3_text}>{'User'}</Text>
        </View>
        <View style={styles.rowC4_view}>
          <Text style={styles.rowC4_text}>{specificJob.username}</Text>
        </View>
        <View style={styles.rowC5_view}>
          <Avatar
            size="small"
            rounded
            source={{
              uri: specificJob.avatar_url,
            }}
            activeOpacity={0.7}
          />
        </View>
      </View>
      <View style={styles.rowContainerR2_view}>
        <View style={styles.rowC1_view}>
          <Text style={styles.rowC1_text}>{'Pledge'}</Text>
        </View>
        <View style={styles.rowC2_view}>
          <Text style={styles.rowC2_text}>
            {'£' + specificJob.pledged_amount}
          </Text>
        </View>
        <View style={styles.rowC6_view}>
          <Text style={styles.rowC6_text}>{'Posted'}</Text>
        </View>
        <View style={styles.rowC7_view}>
          <Text style={styles.rowC7_text}>{elapsedTimeString(date)}</Text>
        </View>
      </View>
      <View style={styles.rowContainerR3_view}>
        <View style={styles.rowC8_view}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Comments', {
                job_id: job_id,
                title: specificJob.title,
              })
            }
          >
            <View style={styles.commentsButton_view}>
              <Text style={styles.commentsButton_text}>{'View Comments'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.rowC9_view}>
          {specificJob.username !== user.username ? (
            !offerButtonDisabled && (
              <TouchableOpacity
                onPress={handleHelpOffer}
                disabled={offerButtonDisabled}
              >
                <View style={styles.helperButton_view}>
                  <Text style={styles.helperButton_text}>{'Offer Help'}</Text>
                </View>
              </TouchableOpacity>
            )
          ) : image ? (
            <TouchableOpacity onPress={handleJobImageUpdate}>
              <View style={styles.uploadButton_view}>
                <Text style={styles.uploadButton_text}>Upload Image</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleJobImageUpdate}>
              <View style={styles.changeButton_view}>
                <ImagePickerComponent setImageObj={setImage}>
                  <Text style={styles.changeButton_text}>
                    {specificJob.job_image ? 'Change Image' : 'Upload Image'}
                  </Text>
                </ImagePickerComponent>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {specificJob.username === user.username && (
        <View style={styles.rowContainerR3_view}>
          <View style={styles.rowC8_view}>
            <TouchableOpacity onPress={handleSelectHelper}>
              <View style={styles.commentsButton_view}>
                <Text style={styles.commentsButton_text}>
                  {'Choose Helper'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rowC9_view}>
            <Picker
              style={styles.helperPicker}
              selectedValue={selectedHelper}
              onValueChange={setSelectedHelper}
            >
              <Picker.Item label="Select a helper" value="" />
              {helpers.map((helper, index) => {
                return (
                  <Picker.Item key={index} label={helper} value={helper} />
                );
              })}
            </Picker>
          </View>
        </View>
      )}
      <View style={styles.imageContainer}>
        {specificJob.job_image && (
          <Image
            style={styles.image}
            source={{
              uri: specificJob.job_image,
            }}
          />
        )}
      </View>
      {specificJob.username === user.username && (
        <View style={styles.rowContainerR3_view}>
          <View style={styles.rowC8_view}>
            <TouchableOpacity onPress={handleJobComplete}>
              <View style={styles.commentsButton_view}>
                <Text style={styles.commentsButton_text}>
                  {'Job Completed?'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rowC9_view}></View>
        </View>
      )}
    </View>
  );
}
