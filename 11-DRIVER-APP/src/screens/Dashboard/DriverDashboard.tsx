import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  Switch,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import type { RootState } from '@redux/store';
import { setOnlineStatus } from '@redux/slices/driverSlice';
import Colors from '@/theme/colors';

const DriverDashboard = () => {
  useWindowDimensions();
  const dispatch = useAppDispatch();
  const driver = useAppSelector((state: RootState) => state.driver);
  const [isOnline, setIsOnline] = useState(driver.isOnline);

  const handleToggleOnline = (value: boolean) => {
    setIsOnline(value);
    dispatch(setOnlineStatus(value));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLogoWrapper}>
              <MaterialCommunityIcons name="car-connected" size={28} color={Colors.primary} />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Dashboard</Text>
              <View style={styles.statusBadge}>
                <View style={[styles.statusDot, { backgroundColor: isOnline ? Colors.primary : Colors.gray500 }]} />
                <Text style={[styles.headerStatus, { color: isOnline ? Colors.primary : Colors.textSecondary }]}>
                  {isOnline ? 'Online' : 'Offline'}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <MaterialCommunityIcons name="bell-outline" size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.statusCard, { backgroundColor: Colors.darkSecondary }]}>
          <View style={styles.statusCardContent}>
            <View>
              <Text style={styles.statusLabel}>Availability</Text>
              <Text style={[styles.statusValue, { color: isOnline ? Colors.primary : Colors.textSecondary }]}>
                {isOnline ? 'Active & Ready' : 'Go online to receive rides'}
              </Text>
            </View>
            <Switch
              value={isOnline}
              onValueChange={handleToggleOnline}
              trackColor={{ false: '#333', true: 'rgba(16, 185, 129, 0.3)' }}
              thumbColor={isOnline ? Colors.primary : '#666'}
            />
          </View>
        </View>

        <View style={styles.earningsCard}>
          <View style={styles.earningsHeader}>
            <Text style={styles.earningsLabel}>Today&apos;s Earnings</Text>
            <Text style={styles.earningsValue}>${driver.todayEarnings.toFixed(2)}</Text>
          </View>
          <View style={styles.earningsStats}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{driver.totalRides}</Text>
              <Text style={styles.statLabel}>Rides</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statBox}>
              <View style={styles.ratingValueRow}>
                <MaterialCommunityIcons name="star" size={16} color={Colors.white} />
                <Text style={styles.statValue}>
                  {driver.rating > 0 ? driver.rating.toFixed(1) : '5.0'}
                </Text>
              </View>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIconWrapper, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                <MaterialCommunityIcons name="finance" size={26} color="#3b82f6" />
              </View>
              <Text style={styles.actionText}>Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIconWrapper, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                <MaterialCommunityIcons name="account-outline" size={26} color="#ef4444" />
              </View>
              <Text style={styles.actionText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIconWrapper, { backgroundColor: 'rgba(167, 139, 250, 0.1)' }]}>
                <MaterialCommunityIcons name="map-marker-radius" size={26} color="#a78bfa" />
              </View>
              <Text style={styles.actionText}>Demand</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIconWrapper, { backgroundColor: 'rgba(236, 72, 153, 0.1)' }]}>
                <MaterialCommunityIcons name="cog-outline" size={26} color="#ec4899" />
              </View>
              <Text style={styles.actionText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.activeRideSection}>
          <Text style={styles.sectionTitle}>Current Session</Text>
          <View style={styles.noActiveCard}>
            <View style={styles.noActiveIconCircle}>
              <MaterialCommunityIcons name="car-off" size={32} color={Colors.textSecondary} />
            </View>
            <Text style={styles.noActiveText}>No Active Job</Text>
            <Text style={styles.noActiveSubtext}>
              Once you go online, new ride requests will appear here.
            </Text>
          </View>
        </View>

        <View style={styles.supportSection}>
          <TouchableOpacity style={styles.supportCard}>
            <View style={styles.supportIconWrapper}>
              <MaterialCommunityIcons name="chat-question" size={24} color={Colors.primary} />
            </View>
            <View style={styles.supportContent}>
              <Text style={styles.supportTitle}>Need Help?</Text>
              <Text style={styles.supportDesc}>Contact 24/7 Support</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLogoWrapper: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: Colors.darkSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerText: {
    flex: 1,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.white,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  headerStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  notificationButton: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: Colors.darkSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statusCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statusCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusLabel: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
  earningsCard: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    padding: 25,
    marginBottom: 25,
  },
  earningsHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  earningsLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '600',
  },
  earningsValue: {
    color: Colors.white,
    fontSize: 36,
    fontWeight: '900',
    marginTop: 5,
  },
  earningsStats: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  ratingValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionsSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: 70,
    backgroundColor: Colors.darkSecondary,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  activeRideSection: {
    marginBottom: 20,
  },
  noActiveCard: {
    backgroundColor: Colors.darkSecondary,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  noActiveIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  noActiveText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  noActiveSubtext: {
    color: Colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  supportSection: {
    marginBottom: 40,
  },
  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.darkSecondary,
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  supportIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  supportContent: {
    flex: 1,
    marginLeft: 15,
  },
  supportTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  supportDesc: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
});

export default DriverDashboard;
