const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      if (body.message) message = body.message;
    } catch {
      // ignore parse errors
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function fetchMenu() {
  return request("/api/menu");
}

export async function fetchCart(sessionId) {
  return request(`/api/cart/${sessionId}`);
}

export async function addCartItem(sessionId, item) {
  return request(`/api/cart/${sessionId}/items`, {
    method: "POST",
    body: JSON.stringify(item),
  });
}

export async function decrementCartItem(sessionId, menuItemId) {
  return request(`/api/cart/${sessionId}/items/${menuItemId}`, {
    method: "PATCH",
    body: JSON.stringify({ action: "decrement" }),
  });
}

export async function clearCartApi(sessionId) {
  return request(`/api/cart/${sessionId}`, {
    method: "DELETE",
  });
}

export async function createOrder(sessionId, customer = {}) {
  return request("/api/orders", {
    method: "POST",
    body: JSON.stringify({
      sessionId,
      customerName: customer.name || "",
      customerEmail: customer.email || "",
    }),
  });
}

export { API_URL };
