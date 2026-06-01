export function getZoneFromHR(hr, maxHR = 185) {
  const pct = hr / maxHR;
  if (pct < 0.6) return 1;
  if (pct < 0.7) return 2;
  if (pct < 0.8) return 3;
  if (pct < 0.9) return 4;
  return 5;
}

export function getZoneRange(zone, maxHR = 185) {
  const ranges = {
    1: [0, 0.6],
    2: [0.6, 0.7],
    3: [0.7, 0.8],
    4: [0.8, 0.9],
    5: [0.9, 1.0],
  };
  const [lo, hi] = ranges[zone] || [0, 0];
  return {
    min: Math.round(lo * maxHR),
    max: Math.round(hi * maxHR),
  };
}

export function formatPace(secondsPerKm) {
  if (!secondsPerKm || secondsPerKm === Infinity) return '--:--';
  const mins = Math.floor(secondsPerKm / 60);
  const secs = Math.round(secondsPerKm % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function estimateCalories(distanceKm, weightKg = 70) {
  return Math.round(distanceKm * weightKg * 1.036);
}
