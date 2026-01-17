import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  StatusBar, 
  Dimensions, 
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/theme/colors';
import Logo from '@components/common/Logo';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Dynamic Background Elements */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.userName}>Guest Member</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.avatarOutline}>
              <MaterialCommunityIcons name="account" size={24} color={Colors.primary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Search / Booking Bar */}
        <TouchableOpacity 
          style={styles.searchBar}
          onPress={() => (navigation as any).navigate('BookRide')}
        >
          <MaterialCommunityIcons name="magnify" size={22} color={Colors.primary} />
          <Text style={styles.searchText}>Where would you like to go?</Text>
          <View style={styles.searchDivider} />
          <MaterialCommunityIcons name="clock-outline" size={20} color={Colors.gray500} />
        </TouchableOpacity>

        {/* Quick Actions Grid */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => (navigation as any).navigate('BookRide')}
          >
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
              <MaterialCommunityIcons name="car" size={28} color={Colors.primary} />
            </View>
            <Text style={styles.actionLabel}>Ride</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
              <MaterialCommunityIcons name="calendar-clock" size={28} color="#3b82f6" />
            </View>
            <Text style={styles.actionLabel}>Schedule</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
              <MaterialCommunityIcons name="star-outline" size={28} color="#f59e0b" />
            </View>
            <Text style={styles.actionLabel}>Favorites</Text>
          </TouchableOpacity>
        </View>

        {/* Premium Banner */}
        <View style={styles.premiumBanner}>
          <View style={styles.premiumContent}>
            <Text style={styles.premiumTitle}>Premium Member</Text>
            <Text style={styles.premiumSub}>Enjoy zero booking fees today</Text>
          </View>
          <View style={styles.premiumIcon}>
            <MaterialCommunityIcons name="crown" size={32} color="#f59e0b" />
          </View>
        </View>

        {/* Recent Locations */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Destinations</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.locationItem}>
          <View style={styles.locationIcon}>
            <MaterialCommunityIcons name="briefcase-outline" size={20} color={Colors.gray400} />
          </View>
          <View style={styles.locationInfo}>
            <Text style={styles.locationName}>Office</Text>
            <Text style={styles.locationAddress}>Victoria Parade, Suva</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.gray700} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.locationItem}>
          <View style={styles.locationIcon}>
            <MaterialCommunityIcons name="home-outline" size={20} color={Colors.gray400} />
          </View>
          <View style={styles.locationInfo}>
            <Text style={styles.locationName}>Home</Text>
            <Text style={styles.locationAddress}>Laucala Bay Rd, Suva</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.gray700} />
        </TouchableOpacity>

        {/* Version Footer */}
        <View style={styles.footer}>
          <Logo size={40} />
          <Text style={styles.versionText}>CAB CONNECT PREMIUM EDITION</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  glowTop: {
    position: 'absolute',
    top: -150,
    right: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  glowBottom: {
    position: 'absolute',
    bottom: -150,
    left: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '500',
  },
  userName: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '800',
    marginTop: 4,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatarOutline: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  searchText: {
    flex: 1,
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  searchDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  actionCard: {
    width: (width - 64) / 3,
    backgroundColor: '#121212',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionLabel: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  premiumBanner: {
    flexDirection: 'row',
    backgroundColor: '#121212',
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  premiumContent: {
    flex: 1,
  },
  premiumTitle: {
    color: '#f59e0b',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  premiumSub: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    fontWeight: '500',
  },
  premiumIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  seeAll: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '700',
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  locationAddress: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 13,
  },
  footer: {
    marginTop: 48,
    alignItems: 'center',
    paddingBottom: 40,
  },
  versionText: {
    fontSize: 10,
    color: 'rgba(16, 185, 129, 0.4)',
    fontWeight: '900',
    letterSpacing: 4,
    marginTop: 16,
  },
});


