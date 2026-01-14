import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch } from '@redux/store';
import { clearCurrentRide } from '@redux/slices/rideSlice';
import Button from '@components/common/Button';
import { theme } from '@/styles/theme';
import rideService from '@services/rideService';

export const RideRatingScreen = ({ route, navigation }: any) => {
  const { rideId } = route.params;
  const dispatch = useAppDispatch();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const availableTags = ['Friendly', 'Clean', 'Professional', 'Courteous', 'Safe'];

  const handleRating = (value: number) => {
    setRating(value);
  };

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleSubmitRating = async () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating');
      return;
    }

    try {
      setLoading(true);
      await rideService.rateRide(rideId, {
        overall_rating: rating,
        review_text: review,
        tags: tags.join(','),
      });

      dispatch(clearCurrentRide());
      Alert.alert('Thank You!', 'Your rating has been submitted');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error submitting rating:', error);
      Alert.alert('Error', 'Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    dispatch(clearCurrentRide());
    navigation.navigate('Home');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Rate Your Ride</Text>
        <Text style={styles.subtitle}>Help us improve our service</Text>
      </View>

      {/* Star Rating */}
      <View style={styles.ratingContainer}>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleRating(star)}>
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'}
                size={48}
                color={star <= rating ? theme.colors.warning : theme.colors.border}
                style={styles.star}
              />
            </TouchableOpacity>
          ))}
        </View>
        {rating > 0 && (
          <Text style={styles.ratingText}>
            {rating} {rating === 1 ? 'Star' : 'Stars'}
          </Text>
        )}
      </View>

      {/* Tags */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What was great?</Text>
        <View style={styles.tagsContainer}>
          {availableTags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.tagButton,
                tags.includes(tag) && styles.tagButtonActive,
              ]}
              onPress={() => toggleTag(tag)}
            >
              <Text
                style={[
                  styles.tagText,
                  tags.includes(tag) && styles.tagTextActive,
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Review Text */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add a comment (optional)</Text>
        <TextInput
          style={styles.reviewInput}
          placeholder="Share your feedback..."
          placeholderTextColor={theme.colors.textSecondary}
          multiline
          numberOfLines={4}
          value={review}
          onChangeText={setReview}
          textAlignVertical="top"
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <Button
          title="Submit Rating"
          onPress={handleSubmitRating}
          loading={loading}
          disabled={rating === 0 || loading}
        />
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  ratingContainer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  star: {
    marginHorizontal: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: 8,
    marginBottom: 8,
  },
  tagButtonActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryLight,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  tagTextActive: {
    color: theme.colors.primary,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: theme.colors.text,
    minHeight: 100,
  },
  buttonsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
});
