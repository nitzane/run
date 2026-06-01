import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Dimensions, FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../src/context/AppContext';
import {
  AVATAR_CATEGORIES, AVATAR_ITEMS, SKIN_TONES,
  getItem, isUnlocked, getUnlockLabel,
} from '../../src/data/avatarItems';
import { getXPLevel } from '../../src/data/badges';
import AvatarRenderer from '../../src/components/AvatarRenderer';
import { Colors } from '../../src/utils/colors';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 48 - 12) / 3;

// Resolve avatar IDs → item objects (for AvatarRenderer's _xxxItem props)
function resolveAvatar(av) {
  return {
    ...av,
    skinTone: SKIN_TONES.find(s => s.id === av.skinTone)?.color || '#FFDFC4',
    _hairItem:   getItem('hair', av.hair) || {},
    _topItem:    getItem('top', av.top) || {},
    _bottomItem: getItem('bottom', av.bottom) || {},
    _shoeItem:   getItem('shoes', av.shoes) || {},
    _accItem:    getItem('accessory', av.accessory) || {},
    _jewItem:    getItem('jewelry', av.jewelry) || {},
    _makeItem:   getItem('makeup', av.makeup) || {},
  };
}

function ItemCard({ item, isEquipped, unlocked, onPress, price }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.itemCard, isEquipped && styles.itemCardEquipped]}>
      {/* color swatch */}
      <View style={[styles.itemSwatch, { backgroundColor: item.color || '#888' }]}>
        {item.accent && (
          <View style={[styles.itemSwatchAccent, { backgroundColor: item.accent }]} />
        )}
        {!unlocked && (
          <View style={styles.lockOverlay}>
            <Ionicons name="lock-closed" size={18} color="#fff" />
          </View>
        )}
        {isEquipped && (
          <View style={styles.equippedDot}>
            <Ionicons name="checkmark" size={12} color="#fff" />
          </View>
        )}
      </View>

      <Text style={styles.itemLabel} numberOfLines={2}>{item.label}</Text>

      {!unlocked ? (
        <Text style={styles.itemLock} numberOfLines={1}>{getUnlockLabel(item)}</Text>
      ) : price > 0 && !isEquipped ? (
        <Text style={styles.itemPrice}>✨ {price} XP</Text>
      ) : null}
    </TouchableOpacity>
  );
}

export default function AvatarScreen() {
  const insets = useSafeAreaInsets();
  const { avatar, setAvatar, xp, setXp, unlockedBadges } = useApp();
  const { level } = getXPLevel(xp);

  const [activeCategory, setActiveCategory] = useState('hair');
  const [draft, setDraft] = useState({ ...avatar });

  const resolved = useMemo(() => resolveAvatar(draft), [draft]);

  function equip(category, itemId, price, unlocked) {
    if (!unlocked) return;
    // Deduct XP if it costs and wasn't previously equipped
    if (price > 0 && avatar[category] !== itemId) {
      if (xp < price) return; // not enough XP
      setXp(x => x - price);
    }
    setDraft(d => ({ ...d, [category]: itemId }));
  }

  function save() {
    setAvatar(draft);
  }

  const items = activeCategory === 'skin'
    ? SKIN_TONES
    : (AVATAR_ITEMS[activeCategory] || []);

  const catKey = activeCategory === 'skin' ? 'skinTone' : activeCategory;

  return (
    <LinearGradient colors={['#1A0A2E', '#2D1B69', '#11001C']} style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.title}>My Avatar</Text>
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>✨ {xp.toLocaleString()} XP</Text>
          <Text style={styles.levelText}>Lv {level}</Text>
        </View>
      </View>

      {/* Avatar preview */}
      <View style={styles.previewContainer}>
        <LinearGradient
          colors={['rgba(206,147,216,0.15)', 'rgba(100,181,246,0.1)']}
          style={styles.previewBg}
        >
          <AvatarRenderer avatar={resolved} size={160} />
        </LinearGradient>

        <TouchableOpacity style={styles.saveBtn} onPress={save}>
          <LinearGradient colors={['#FF6B9D', '#CE93D8']} style={styles.saveBtnGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={styles.saveBtnText}>Save Look</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Category tabs + skin tone */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
          {/* Skin tone tab */}
          <TouchableOpacity
            onPress={() => setActiveCategory('skin')}
            style={[styles.catTab, activeCategory === 'skin' && styles.catTabActive]}
          >
            <Text style={styles.catIcon}>🎨</Text>
            <Text style={[styles.catLabel, activeCategory === 'skin' && styles.catLabelActive]}>Skin</Text>
          </TouchableOpacity>

          {AVATAR_CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setActiveCategory(cat.id)}
              style={[styles.catTab, activeCategory === cat.id && styles.catTabActive]}
            >
              <Text style={styles.catIcon}>{cat.icon}</Text>
              <Text style={[styles.catLabel, activeCategory === cat.id && styles.catLabelActive]}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Items grid */}
      <FlatList
        key={activeCategory}
        data={items}
        numColumns={3}
        keyExtractor={it => it.id}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          if (activeCategory === 'skin') {
            const isEquipped = draft.skinTone === item.id;
            return (
              <TouchableOpacity
                onPress={() => setDraft(d => ({ ...d, skinTone: item.id }))}
                activeOpacity={0.8}
                style={[styles.itemCard, isEquipped && styles.itemCardEquipped]}
              >
                <View style={[styles.itemSwatch, { backgroundColor: item.color }]}>
                  {isEquipped && (
                    <View style={styles.equippedDot}>
                      <Ionicons name="checkmark" size={12} color="#fff" />
                    </View>
                  )}
                </View>
                <Text style={styles.itemLabel}>{item.label}</Text>
                <Text style={styles.itemPrice}>Free</Text>
              </TouchableOpacity>
            );
          }

          const unlocked = isUnlocked(item, level, unlockedBadges);
          const isEquipped = draft[activeCategory] === item.id;
          return (
            <ItemCard
              item={item}
              isEquipped={isEquipped}
              unlocked={unlocked}
              price={item.price}
              onPress={() => equip(activeCategory, item.id, item.price, unlocked)}
            />
          );
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  title: { fontSize: 28, fontWeight: '800', color: Colors.white },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  xpText: { fontSize: 13, fontWeight: '700', color: '#FFD700' },
  levelText: { fontSize: 13, fontWeight: '700', color: Colors.offWhite },
  previewContainer: {
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
  },
  previewBg: {
    width: 190,
    height: 190,
    borderRadius: 95,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(206,147,216,0.4)',
    overflow: 'hidden',
  },
  saveBtn: { borderRadius: 14, overflow: 'hidden', shadowColor: '#FF6B9D', shadowOpacity: 0.4, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } },
  saveBtnGrad: { paddingHorizontal: 28, paddingVertical: 10 },
  saveBtnText: { fontSize: 15, fontWeight: '800', color: '#fff' },
  catScroll: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  catTab: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    minWidth: 60,
  },
  catTabActive: {
    backgroundColor: 'rgba(206,147,216,0.3)',
    borderWidth: 1,
    borderColor: 'rgba(206,147,216,0.6)',
  },
  catIcon: { fontSize: 18 },
  catLabel: { fontSize: 10, color: Colors.muted, fontWeight: '600', marginTop: 2 },
  catLabelActive: { color: '#CE93D8' },
  grid: { paddingHorizontal: 16, paddingBottom: 120, paddingTop: 4 },
  itemCard: {
    width: ITEM_SIZE,
    margin: 4,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    padding: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  itemCardEquipped: {
    borderColor: '#CE93D8',
    backgroundColor: 'rgba(206,147,216,0.15)',
  },
  itemSwatch: {
    width: ITEM_SIZE - 24,
    height: ITEM_SIZE - 24,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginBottom: 6,
  },
  itemSwatchAccent: {
    width: '45%',
    height: '100%',
    opacity: 0.7,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  equippedDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#CE93D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: { fontSize: 10, color: Colors.offWhite, fontWeight: '600', textAlign: 'center', lineHeight: 13 },
  itemLock: { fontSize: 9, color: Colors.muted, marginTop: 2, textAlign: 'center' },
  itemPrice: { fontSize: 9, color: '#FFD700', marginTop: 2, fontWeight: '700' },
});
