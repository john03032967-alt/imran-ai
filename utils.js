export function success(data = {}) {
  return {
    success: true,
    timestamp: Date.now(),
    ...data
  };
}

export function failure(message, status = 400) {
  return {
    success: false,
    status,
    message,
    timestamp: Date.now()
  };
}

export function generateId() {
  return crypto.randomUUID();
}

export function now() {
  return new Date().toISOString();
}

export function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    value === ""
  );
}
