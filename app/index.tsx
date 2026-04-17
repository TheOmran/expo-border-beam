import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import { BorderBeam } from '@/src/BorderBeam';
import type { BorderBeamColorVariant } from '@/src/BorderBeam/types';

const VARIANTS: BorderBeamColorVariant[] = ['colorful', 'mono', 'ocean', 'sunset'];

export default function DemoScreen() {
  const [active, setActive] = useState(true);
  const [variant, setVariant] = useState<BorderBeamColorVariant>('colorful');

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.heading}>Border Beam</Text>
      <Text style={styles.subheading}>
        Expo/React-Native port — tap a variant, toggle active.
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>Active</Text>
        <Switch value={active} onValueChange={setActive} />
      </View>

      <View style={styles.variantRow}>
        {VARIANTS.map((v) => (
          <Pressable
            key={v}
            onPress={() => setVariant(v)}
            style={[
              styles.chip,
              variant === v && styles.chipActive,
            ]}
          >
            <Text
              style={[
                styles.chipText,
                variant === v && styles.chipTextActive,
              ]}
            >
              {v}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Card (size=&quot;md&quot;)</Text>
      <BorderBeam
        size="md"
        colorVariant={variant}
        active={active}
        style={styles.cardOuter}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Premium plan</Text>
          <Text style={styles.cardBody}>
            Unlock unlimited projects, advanced analytics, and priority support.
          </Text>
          <View style={styles.cardCta}>
            <Text style={styles.cardCtaText}>Upgrade →</Text>
          </View>
        </View>
      </BorderBeam>

      <Text style={styles.sectionTitle}>Button (size=&quot;sm&quot;)</Text>
      <View style={styles.buttonWrap}>
        <BorderBeam size="sm" colorVariant={variant} active={active}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Get started</Text>
          </View>
        </BorderBeam>
      </View>

      <Text style={styles.sectionTitle}>Input (size=&quot;line&quot;)</Text>
      <BorderBeam
        size="line"
        colorVariant={variant}
        active={active}
        style={styles.inputOuter}
      >
        <View style={styles.input}>
          <Text style={styles.inputPlaceholder}>Search anything…</Text>
        </View>
      </BorderBeam>

      <Text style={styles.sectionTitle}>Light theme</Text>
      <BorderBeam
        size="md"
        colorVariant={variant}
        active={active}
        theme="light"
        style={styles.cardOuter}
      >
        <View style={[styles.card, styles.cardLight]}>
          <Text style={[styles.cardTitle, styles.cardTitleLight]}>
            Light background
          </Text>
          <Text style={[styles.cardBody, styles.cardBodyLight]}>
            The beam adapts its opacity and saturation for light surfaces.
          </Text>
        </View>
      </BorderBeam>

      <View style={{ height: 48 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: 20,
    paddingTop: 12,
    backgroundColor: '#0b0b10',
  },
  heading: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  subheading: {
    color: '#9a9aa8',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    color: '#e5e5ef',
    fontSize: 15,
    fontWeight: '500',
  },
  variantRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#1a1a24',
    borderWidth: 1,
    borderColor: '#26263a',
  },
  chipActive: {
    backgroundColor: '#2a2a3e',
    borderColor: '#5a5a8a',
  },
  chipText: {
    color: '#9a9aa8',
    fontSize: 13,
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#fff',
  },
  sectionTitle: {
    color: '#d0d0dc',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 16,
    marginBottom: 10,
  },
  cardOuter: {
    alignSelf: 'stretch',
  },
  card: {
    backgroundColor: '#14141c',
    borderRadius: 16,
    padding: 20,
  },
  cardLight: {
    backgroundColor: '#f5f5f8',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardTitleLight: {
    color: '#14141c',
  },
  cardBody: {
    color: '#b0b0bc',
    fontSize: 14,
    lineHeight: 20,
  },
  cardBodyLight: {
    color: '#4a4a5a',
  },
  cardCta: {
    marginTop: 14,
    alignSelf: 'flex-start',
  },
  cardCtaText: {
    color: '#9ac4ff',
    fontWeight: '600',
  },
  buttonWrap: {
    alignSelf: 'flex-start',
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: '#1a1a24',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  inputOuter: {
    alignSelf: 'stretch',
  },
  input: {
    backgroundColor: '#14141c',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  inputPlaceholder: {
    color: '#6a6a78',
    fontSize: 15,
  },
});
