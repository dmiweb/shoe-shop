export const setLocalStorage = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Ошибка при записи в localStorage:", error);
  }
}

export const getLocalStorage = <T>(key: string): T | null => {
  try {
    const value = localStorage.getItem(key);
    if (value === null) {
      return null;
    }
    return JSON.parse(value) as T;
  } catch (error) {
    console.error("Ошибка при чтении из localStorage:", error);
    return null;
  }
}

export const removeLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Ошибка при удалении из localStorage:", error);
  }
}