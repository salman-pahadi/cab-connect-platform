import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Button from '@components/common/Button';
import { HomeScreenNavigationProp } from '@navigation/types';

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Cab Connect</Text>
      <Text style={styles.subtitle}>Your reliable ride partner in Fiji</Text>

      <View style={styles.buttonContainer}>
        <Button title="Get Started" onPress={() => console.log('Get Started')} />
      </View>

      <Text style={styles.version}>Version 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  version: {
    position: 'absolute',
    bottom: 20,
    fontSize: 12,
    color: '#9ca3af',
  },
});
