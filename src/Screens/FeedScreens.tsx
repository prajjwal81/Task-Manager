import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Video, {VideoRef} from 'react-native-video';

const API_URL = 'https://social.circuitchat.io/api/feed';
const HEADERS = {
  'client-id': '66ea7609c990886923861202',
  'client-secret': '653f1e94-fa6d-4d10-932e-e1030c5dcb1c',
  Cookie:
    'session=s%3A8tq6BbGo7I5htwLfGzEP1mKtI7wI8Q73.0sdlCnMjLKza9A9v34qMeQ8ucNjr4J34yM7ecsR6fAk;',
};

const feedsData = [
  {
    id: '1',
    userName: 'Cart Melton',
    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
    postImage: 'https://source.unsplash.com/600x400/?nature,water',
    timeAgo: '12 mins ago',
    likes: '1.2k',
    shares: '508',
  },
  {
    id: '2',
    userName: 'Anku Skoop',
    profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
    postImage: 'https://source.unsplash.com/600x400/?flowers,landscape',
    timeAgo: 'Friday, June 23',
    likes: '1.2k',
    shares: '508',
  },
];
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const FeedScreen = () => {
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<VideoRef>(null);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: HEADERS,
        params: {
          profile: '67c14a5cc3ca32727761ca6f',
          lastId: '',
          limit: 15,
        },
      });
      console.log(JSON.stringify(response.data, null, 2));
      setFeedData(response?.data?.feeds || []);
    } catch (error) {
      console.error('Error fetching feed:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = timestamp => {
    const postDate = new Date(timestamp);
    const now = new Date();

    const diffMs = now - postDate;
    const diffMin = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays === 0) {
      return diffHours > 0
        ? `${diffHours} hours ago`
        : `${diffMin} minutes ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return postDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
      });
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{flex: 1, justifyContent: 'center'}}
      />
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={24}
          color="black"
          style={{right: '20%'}}
        />
        <Icon name="camera" size={24} color="black" style={{right: '180%'}} />
        <Text style={styles.headerTitle}>Ankita ▼</Text>

        <Icon name="search" size={24} color="black" style={{left: '100%'}} />
        <Icon name="ellipsis-v" size={24} color="black" />
      </View>

      {/* Stories Section */}
      <FlatList
        data={feedData}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storyContainer}
        renderItem={({item}) => (
          <View style={styles.storyItem}>
            <FastImage
              source={{uri: item?.user?.avatar}}
              style={styles.storyImage}
            />
          </View>
        )}
      />

      {/* Hashtags Section */}
      <View style={styles.hashtags}>
        <Text style={[styles.hashtag, {color: 'purple'}]}>#Food</Text>
        <Text style={styles.hashtag}>#Travel</Text>
        <Text style={styles.hashtag}>#Shopping</Text>
        <Text style={styles.hashtag}>#Science</Text>
      </View>

      {/* Feed List */}
      <FlatList
        data={feedData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <View style={[styles.userInfo, {justifyContent: 'space-between'}]}>
              <View style={styles.userInfo}>
                <FastImage
                  source={{uri: item?.user?.avatar}}
                  style={styles.profilePic}
                />
                <View>
                  <Text style={styles.userName}>{item?.user?.username}</Text>
                  <Text style={styles.timeAgo}>
                    {formatTimeAgo(item?.updatedAt)}
                  </Text>
                </View>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity style={[styles.action, {right: 20}]}>
                  <Icon name="heart" size={20} color="red" />
                  <Text style={styles.actionText}>
                    {item.reaction === '' ? 0 : item.reaction}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action}>
                  <Icon name="share" size={20} color="gray" />
                  <Text style={styles.actionText}>{item.share} Shares</Text>
                </TouchableOpacity>
              </View>
            </View>
            {item?.files[0]?.type === 'image/webp' ? (
              <FastImage
                source={{uri: item?.files[0]?.url}}
                style={styles.postImage}
              />
            ) : item?.files[0]?.type === 'video/mp4' ? (
              <Video
                source={{uri: item?.files[0]?.url}} 
                ref={videoRef}
                style={styles.postImage}
                resizeMode="cover"
                controls={false}
                paused={false}
              />
            ) : (
              <View
                style={[
                  styles.postImage,
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                  },
                ]}>
                <Text>No Image</Text>
              </View>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderColor: 'grey',
  },
  headerTitle: {fontSize: 18, fontWeight: 'bold', right: '50%'},

  storyContainer: {
    paddingHorizontal: 15,
    marginVertical: 20,
    paddingBottom: '5%',
  },
  storyItem: {marginRight: 10},
  storyImage: {width: 60, height: 60, borderRadius: 100},

  hashtags: {flexDirection: 'row', paddingHorizontal: 15, marginVertical: 10},
  hashtag: {fontSize: 20, fontWeight: 'bold', marginRight: 10},

  card: {backgroundColor: '#fff', padding: 10, marginVertical: 5},
  userInfo: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  profilePic: {
    width: width / 8,
    height: height / 17,
    borderRadius: 100,
    marginRight: 10,
    top: '5%',
  },
  userName: {fontWeight: 'bold', fontSize: 16},
  timeAgo: {fontSize: 12, color: 'gray'},
  postImage: {
    width: Dimensions.get('window').width / 1.2 - 10,
    height: Dimensions.get('window').height / 5,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },

  // Actions
  actions: {flexDirection: 'row', justifyContent: 'space-between', padding: 10},
  action: {flexDirection: 'row', alignItems: 'center'},
  actionText: {marginLeft: 5, fontSize: 14, color: 'gray'},
});

export default FeedScreen;
