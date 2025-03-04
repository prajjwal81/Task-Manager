import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome';

const feedData = [
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

const FeedScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="camera" size={24} color="black" />
        <Text style={styles.headerTitle}>Ankita ▼</Text>
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
              source={{uri: item.profilePic}}
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
            <View style={styles.userInfo}>
              <FastImage
                source={{uri: item.profilePic}}
                style={styles.profilePic}
              />
              <View>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.timeAgo}>{item.timeAgo}</Text>
              </View>
            </View>
            <FastImage
              source={{uri: item.postImage}}
              style={styles.postImage}
            />
            <View style={styles.actions}>
              <TouchableOpacity style={styles.action}>
                <Icon name="heart" size={20} color="red" />
                <Text style={styles.actionText}>{item.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.action}>
                <Icon name="share" size={20} color="gray" />
                <Text style={styles.actionText}>{item.shares} Shares</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},

  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
  },
  headerTitle: {fontSize: 18, fontWeight: 'bold'},

  // Story Styles
  storyContainer: {paddingHorizontal: 15, marginVertical: 10},
  storyItem: {marginRight: 10},
  storyImage: {width: 60, height: 60, borderRadius: 30},

  // Hashtags
  hashtags: {flexDirection: 'row', paddingHorizontal: 15, marginBottom: 10},
  hashtag: {fontSize: 16, fontWeight: 'bold', marginRight: 10},

  // Card Styles
  card: {backgroundColor: '#fff', padding: 10, marginVertical: 5},
  userInfo: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  profilePic: {width: 40, height: 40, borderRadius: 20, marginRight: 10},
  userName: {fontWeight: 'bold', fontSize: 16},
  timeAgo: {fontSize: 12, color: 'gray'},
  postImage: {width: '100%', height: 200, borderRadius: 10, marginVertical: 10},

  // Actions
  actions: {flexDirection: 'row', justifyContent: 'space-between', padding: 10},
  action: {flexDirection: 'row', alignItems: 'center'},
  actionText: {marginLeft: 5, fontSize: 14, color: 'gray'},
});

export default FeedScreen;
