const STORAGE_KEY = "dialywear_feedback";

export function getFeedback() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveFeedback(entry) {
  const list = getFeedback();
  list.unshift(entry);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    if (e.name === "QuotaExceededError") {
      // Strip photos and retry
      const stripped = list.map((entry) => ({ ...entry, photos: [] }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stripped));
    }
  }
}
