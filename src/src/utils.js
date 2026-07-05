export const HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
};

export function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: HEADERS
  });
}

export function success(data) {
  return json({
    success: true,
    data
  });
}

export function error(message, status = 400) {
  return json({
    success: false,
    error: message
  }, status);
}

export function now() {
  return new Date().toISOString();
}
