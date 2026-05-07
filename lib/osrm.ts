export type RouteSummary = {
  distanceKm: number;
  durationMin: number;
  label: string;
};

export async function fetchOsrmRouteSummary(
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number },
  timeoutMs: number = 8000,
): Promise<RouteSummary | null> {
  const request = async (profile: 'driving' | 'foot') => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/${profile}/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=false`,
        { signal: controller.signal },
      );
      if (!res.ok) return null;
      const data = await res.json();
      if (!data?.routes?.length) return null;
      const route = data.routes[0];
      const distanceKm = route.distance / 1000;
      const durationMin = Math.max(1, Math.round(route.duration / 60));
      return { distanceKm, durationMin, label: `${distanceKm.toFixed(1)} km • ${durationMin} min` };
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const driving = await request('driving');
  if (driving) return driving;
  return request('foot');
}
