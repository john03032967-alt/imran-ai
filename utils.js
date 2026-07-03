export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
    }
  });
}

export function errorResponse(message, status = 400) {
  return jsonResponse({
    success: false,
    error: message
  }, status);
}

export function successResponse(data) {
  return jsonResponse({
    success: true,
    data
  });
}

export function now() {
  return new Date().toISOString();
}
