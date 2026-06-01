import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ZoneColors, ZoneNames } from '../utils/colors';

export default function ZoneBar({ zones }) {
  // zones: { 1: 5, 2: 68, 3: 20, 4: 7, 5: 0 }
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {[1, 2, 3, 4, 5].map(z => (
          zones[z] > 0 ? (
            <View
              key={z}
              style={[styles.segment, { flex: zones[z], backgroundColor: ZoneColors[z] }]}
            />
          ) : null
        ))}
      </View>
      <View style={styles.legend}>
        {[1, 2, 3, 4, 5].map(z => (
          zones[z] > 0 ? (
            <View key={z} style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: ZoneColors[z] }]} />
              <Text style={styles.legendText}>Z{z} {zones[z]}%</Text>
            </View>
          ) : null
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  bar: {
    height: 12,
    borderRadius: 6,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  segment: {},
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
  },
});
