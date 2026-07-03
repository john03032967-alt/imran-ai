const memory = new Map();

export function saveMemory(key, value) {
  memory.set(key, value);

  return {
    success: true
  };
}

export function getMemory(key) {
  return memory.get(key) || null;
}

export function getAllMemory() {
  return Object.fromEntries(memory);
}

export function clearMemory() {
  memory.clear();

  return {
    success: true
  };
}
