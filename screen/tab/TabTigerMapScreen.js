import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {TigerMap} from '../../data/tigerMap';
import {useNavigation} from '@react-navigation/native';
import TabLayout from '../../components/layout/TabLayout';

const TabTigerMapScreen = () => {
  const navigation = useNavigation();
  const [selectedSubspecies, setSelectedSubspecies] = useState(null);

  const initialRegion = {
    latitude: 23.5937,
    longitude: 102.9629,
    latitudeDelta: 50,
    longitudeDelta: 50,
  };

  const getMarkerColor = subspecies => {
    const colors = {
      'Bengal Tiger': '#FF8C00',
      'Siberian Tiger': '#4A90E2',
      'Sumatran Tiger': '#FF6B6B',
      'Indochinese Tiger': '#50C878',
      'Malayan Tiger': '#FFD700',
      'South China Tiger': '#FF4444',
    };
    return colors[subspecies] || '#FF8C00';
  };

  const formatCoordinates = coords => {
    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
  };

  const handleViewDetails = scientificName => {
    console.log('scientificName', scientificName);
    navigation.navigate('StackTigerHabitatDetails', {scientificName});
  };

  return (
    <TabLayout blur={15}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Tiger Habitats</Text>

        <View style={styles.subspeciesContainer}>
          <ScrollView
            horizontal
            style={styles.subspeciesScroll}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                !selectedSubspecies && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedSubspecies(null)}>
              <Text style={styles.filterText}>All Tigers</Text>
            </TouchableOpacity>
            {TigerMap.map(tiger => (
              <TouchableOpacity
                key={tiger.subspecies}
                style={[
                  styles.filterButton,
                  selectedSubspecies === tiger.subspecies &&
                    styles.filterButtonActive,
                ]}
                onPress={() => setSelectedSubspecies(tiger.subspecies)}>
                <Text style={styles.filterText}>{tiger.subspecies}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.mapContainer}>
          <MapView style={styles.map} initialRegion={initialRegion}>
            {TigerMap.map(tiger => {
              if (
                selectedSubspecies &&
                selectedSubspecies !== tiger.subspecies
              ) {
                return null;
              }

              return tiger.regions.map(region => (
                <React.Fragment key={`${tiger.subspecies}-${region.country}`}>
                  <Marker
                    coordinate={formatCoordinates(region.coordinates)}
                    pinColor={getMarkerColor(tiger.subspecies)}
                    onCalloutPress={() =>
                      handleViewDetails(tiger.scientificName)
                    }>
                    <Callout>
                      <View style={styles.callout}>
                        <Text style={styles.calloutTitle}>
                          {tiger.subspecies}
                        </Text>
                        <Text style={styles.calloutSubtitle}>
                          {region.country}
                        </Text>
                        <Text style={styles.calloutText}>
                          {tiger.scientificName}
                        </Text>
                        {region.status && (
                          <Text style={[styles.calloutText, styles.statusText]}>
                            Status: {region.status}
                          </Text>
                        )}
                        <View style={styles.detailsButton}>
                          <Text style={styles.detailsButtonText}>
                            View Details
                          </Text>
                        </View>
                      </View>
                    </Callout>
                  </Marker>
                  {/* Major sites markers */}
                  {region.majorSites?.map(site => (
                    <Marker
                      key={`${tiger.subspecies}-${site.name}`}
                      coordinate={formatCoordinates(site.coordinates)}
                      pinColor={getMarkerColor(tiger.subspecies)}
                      onCalloutPress={() =>
                        handleViewDetails(tiger.scientificName)
                      }>
                      <Callout>
                        <View style={styles.callout}>
                          <Text style={styles.calloutTitle}>{site.name}</Text>
                          <Text style={styles.calloutSubtitle}>
                            {tiger.subspecies} habitat
                          </Text>
                          <Text style={styles.calloutText}>
                            {region.country}
                          </Text>
                          <View style={styles.detailsButton}>
                            <Text style={styles.detailsButtonText}>
                              View Details
                            </Text>
                          </View>
                        </View>
                      </Callout>
                    </Marker>
                  ))}
                </React.Fragment>
              ));
            })}
          </MapView>
        </View>
      </SafeAreaView>
    </TabLayout>
  );
};

export default TabTigerMapScreen;

const styles = StyleSheet.create({
  subspeciesContainer: {
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    // backgroundColor: '#1A1A1A',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF8C00',
    textAlign: 'center',
    marginVertical: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  subspeciesScroll: {
    maxHeight: 50,
    paddingHorizontal: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 140, 0, 0.1)',
    borderWidth: 1,
    borderColor: '#FF8C00',
    justifyContent:'center'
  },
  filterButtonActive: {
    backgroundColor: '#FF8C00',
  },
  filterText: {
    color: '#FFA500',
    fontSize: 14,
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 8 / 9,
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#FF8C00',
  },
  map: {
    flex: 1,
  },
  callout: {
    padding: 10,
    minWidth: 150,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  calloutSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  calloutText: {
    fontSize: 12,
    color: '#888',
  },
  detailsButton: {
    backgroundColor: '#FF8C00',
    padding: 8,
    borderRadius: 10,
    marginTop: 10,
  
  },
  detailsButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
  statusText: {
    color: '#FF4444',
    fontWeight: 'bold',
    marginTop: 3,
  },
});
