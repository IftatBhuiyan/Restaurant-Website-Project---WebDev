const SESSION_KEY = "cornerGrillCartSession";

export function getSessionId() {
  if (typeof window === "undefined") {
    return null;
  }

  let sessionId = window.localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    window.localStorage.setItem(SESSION_KEY, sessionId);
  }

  return sessionId;
}
