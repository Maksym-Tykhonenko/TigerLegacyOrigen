import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {TigerEncyclopedia} from '../../data/enciclopedia';

const StackTigerHabitatDetailsScreen = ({route, navigation}) => {
  const {scientificName} = route.params;

  const tigerData = Object.values(TigerEncyclopedia).find(
    tiger => tiger.scientificName === scientificName,
  );

  if (!tigerData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Tiger information not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back to Map</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{tigerData.commonName}</Text>
        <Text style={styles.scientificName}>{tigerData.scientificName}</Text>

        {tigerData.image && (
          <Image
            source={tigerData.image}
            style={styles.tigerImage}
            resizeMode="cover"
          />
        )}

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Habitat</Text>
          <View style={styles.habitatInfo}>
            <Text style={styles.infoText}>
              Regions: {tigerData.habitat.regions.join(', ')}
            </Text>
            <Text style={styles.infoText}>
              Terrain: {tigerData.habitat.terrainTypes.join(', ')}
            </Text>
            {tigerData.habitat.famousLocation && (
              <Text style={styles.infoText}>
                Famous Location: {tigerData.habitat.famousLocation}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Physical Characteristics</Text>
          <View style={styles.characteristicsInfo}>
            {tigerData.physicalCharacteristics.weight?.male && (
              <Text style={styles.infoText}>
                Weight:{' '}
                {tigerData.physicalCharacteristics.weight.male.min || ''}-{' '}
                {tigerData.physicalCharacteristics.weight.male.max}
                {tigerData.physicalCharacteristics.weight.male.unit}
              </Text>
            )}
            <Text style={styles.infoText}>
              Appearance: {tigerData.physicalCharacteristics.appearance}
            </Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Behavioral Traits</Text>
          {tigerData.behavioralTraits.map((trait, index) => (
            <Text key={index} style={styles.bulletPoint}>
              • {trait}
            </Text>
          ))}
        </View>

        <View style={[styles.infoSection, styles.statusSection]}>
          <Text style={styles.statusTitle}>Conservation Status</Text>
          <Text style={styles.statusText}>{tigerData.conservationStatus}</Text>
          {tigerData.populationStatus && (
            <Text style={styles.populationText}>
              {tigerData.populationStatus}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StackTigerHabitatDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  scrollContent: {
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: '#FF8C00',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 5,
  },
  scientificName: {
    fontSize: 18,
    color: '#FFA500',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  tigerImage: {
    width: '100%',
    height: 400,
    borderRadius: 15,
    marginBottom: 20,
  },
  infoSection: {
    marginBottom: 25,
    backgroundColor: 'rgba(255, 140, 0, 0.1)',
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FF8C00',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 10,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  bulletPoint: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    paddingLeft: 10,
  },
  statusSection: {
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    borderColor: '#FF4444',
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF4444',
    marginBottom: 10,
  },
  statusText: {
    color: '#FF4444',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  populationText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
  errorText: {
    color: '#FF4444',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
