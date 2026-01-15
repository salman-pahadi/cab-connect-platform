import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/theme/colors';

const OnboardingScreen4 = ({ onComplete, onPrev, onNext: _onNext }: { onComplete?: () => void; onPrev: () => void; onNext?: () => void }) => {
  const { height } = useWindowDimensions();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />
      <View style={{ minHeight: height }}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Ready to Earn?</Text>
          <Text style={styles.headerSubtitle}>Complete your profile</Text>
        </View>

        {/* Main Content */}
        <View style={styles.contentSection}>
          {/* Success Icon */}
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="check-decagram" size={50} color={Colors.primary} />
          </View>

          <Text style={styles.mainTitle}>You&apos;re Almost There!</Text>
          <Text style={styles.description}>
            Complete just a few more steps to start earning with Cab Connect
          </Text>

          {/* Steps Checklist */}
          <View style={styles.checklistSection}>
            {[
              { id: 1, text: 'Download the Driver App', completed: true },
              { id: 2, text: 'Upload your documents', completed: false },
              { id: 3, text: 'Pass verification', completed: false },
              { id: 4, text: 'Start accepting rides', completed: false },
            ].map((step) => (
              <View key={step.id} style={styles.checklistItem}>
                <View style={[styles.checklistBox, step.completed && styles.checklistBoxCompleted]}>
                  {step.completed ? (
                    <MaterialCommunityIcons name="check" size={20} color={Colors.black} />
                  ) : (
                    <Text style={styles.number}>{step.id}</Text>
                  )}
                </View>
                <Text style={[styles.checklistText, !step.completed && { color: Colors.textSecondary }]}>
                  {step.text}
                </Text>
              </View>
            ))}
          </View>

          {/* Required Documents Info */}
          <View style={styles.documentsSection}>
            <Text style={styles.documentsTitle}>Required Documents</Text>
            {[
              { text: "Valid Driver's License", icon: 'card-account-details-outline' },
              { text: 'Vehicle Registration Certificate', icon: 'car-info' },
              { text: 'Vehicle Insurance Document', icon: 'shield-car' },
            ].map((doc, idx) => (
              <View key={idx} style={styles.documentItem}>
                <MaterialCommunityIcons name={doc.icon as any} size={20} color={Colors.primary} />
                <Text style={styles.docText}>{doc.text}</Text>
              </View>
            ))}
          </View>

          {/* Info Banner */}
          <View style={styles.infoBanner}>
            <MaterialCommunityIcons name="information-outline" size={20} color="#3b82f6" />
            <Text style={styles.infoText}>
              Verification typically takes 24-48 hours. We&apos;ll notify you once you&apos;re approved.
            </Text>
          </View>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.prevButton} onPress={onPrev}>
            <Text style={styles.prevButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.completeButton} onPress={onComplete}>
            <Text style={styles.completeButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: Colors.darkSecondary,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.white,
  },
  headerSubtitle: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 6,
  },
  contentSection: {
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  checklistSection: {
    gap: 16,
    marginBottom: 30,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: Colors.darkSecondary,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  checklistBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checklistBoxCompleted: {
    backgroundColor: Colors.primary,
  },
  number: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.textSecondary,
  },
  checklistText: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: '700',
    flex: 1,
  },
  documentsSection: {
    backgroundColor: Colors.darkSecondary,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  documentsTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  docText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  infoBanner: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
    gap: 12,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '600',
    flex: 1,
    lineHeight: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 24,
    gap: 16,
    marginTop: 'auto',
    paddingBottom: 40,
  },
  prevButton: {
    flex: 1,
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  prevButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  completeButton: {
    flex: 2,
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  completeButtonText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '800',
  },
});

export default OnboardingScreen4;
