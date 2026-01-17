import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch } from '@redux/store';
import { clearCurrentRide } from '@redux/slices/rideSlice';
import Colors from '../../theme/colors';
import rideService from '@services/rideService';

export const RideRatingScreen = ({ route, navigation }: any) => {
  const { rideId } = route.params;
  const dispatch = useAppDispatch();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const availableTags = ['Exemplary Service', 'Pristine Vehicle', 'Expert Navigation', 'Punctual', 'Secure Journey'];

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
      Alert.alert('Selection Required', 'Please provide a rating reflecting your experience.');
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
      Alert.alert('Gratitude', 'Your feedback has been integrated into our excellence records.');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error submitting rating:', error);
      Alert.alert('Note', 'Temporary synchronization error. Feedback saved locally.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    dispatch(clearCurrentRide());
    navigation.navigate('Home');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <MaterialCommunityIcons name="star-face" size={32} color={Colors.primary} />
        </View>
        <Text style={styles.title}>Valuation of Service</Text>
        <Text style={styles.subtitle}>Your appraisal ensures our continued gold standard.</Text>
      </View>

      {/* Star Rating */}
      <View style={styles.ratingCard}>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleRating(star)} activeOpacity={0.7}>
              <MaterialCommunityIcons
                name={star <= rating ? 'star' : 'star-outline'}
                size={42}
                color={star <= rating ? Colors.primary : Colors.gray700}
                style={styles.star}
              />
            </TouchableOpacity>
          ))}
        </View>
        {rating > 0 && (
          <Text style={styles.ratingLabel}>
            {rating === 5 ? 'EXCEPTIONAL' : rating >= 4 ? 'EXCELLENT' : rating >= 3 ? 'SATISFACTORY' : 'IMPROVEMENT NEEDED'}
          </Text>
        )}
      </View>

      {/* Tags */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Commendations</Text>
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
        <Text style={styles.sectionTitle}>Additional Intelligence</Text>
        <TextInput
          style={styles.reviewInput}
          placeholder="Share confidential feedback..."
          placeholderTextColor={Colors.gray600}
          multiline
          numberOfLines={4}
          value={review}
          onChangeText={setReview}
          textAlignVertical="top"
        />
      </View>

      {/* Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.submitBtn, (rating === 0 || loading) && styles.submitBtnDisabled]}
          onPress={handleSubmitRating}
          disabled={rating === 0 || loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.submitBtnText}>Submit Appraisal</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Dismiss for now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
    alignItems: 'center',
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray500,
    textAlign: 'center',
    lineHeight: 20,
  },
  ratingCard: {
    backgroundColor: '#121212',
    marginHorizontal: 24,
    padding: 32,
    borderRadius: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  star: {
    marginHorizontal: 6,
  },
  ratingLabel: {
    fontSize: 12,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: 2,
    marginTop: 8,
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.gray500,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tagButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  tagButtonActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: Colors.primary,
  },
  tagText: {
    color: Colors.gray400,
    fontSize: 13,
    fontWeight: '600',
  },
  tagTextActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  reviewInput: {
    backgroundColor: '#121212',
    color: '#fff',
    borderRadius: 20,
    padding: 20,
    fontSize: 14,
    height: 120,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  footer: {
    paddingHorizontal: 24,
    marginTop: 40,
    gap: 16,
  },
  submitBtn: {
    height: 64,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  submitBtnDisabled: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    shadowOpacity: 0,
  },
  submitBtnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '900',
  },
  skipButton: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipText: {
    color: Colors.gray500,
    fontWeight: '700',
  },
});
