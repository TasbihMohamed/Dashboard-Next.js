const _emptyObject = { __proto__: null };
Object.freeze(_emptyObject);

const checkIsAuth = async () => {
  try {
    const storedSessionToken = window.localStorage.getItem(
      '_shoptak-user-session',
    );
    let verified = false;
    if (storedSessionToken) {
      const res = await fetch('/api/jwt/verify', {
        method: 'POST',
        headers: {
          'content-type': 'text/plain',
        },
        body: storedSessionToken,
      });
      if (res.status !== 200) return false;
      const data = await res.json().catch(() => _emptyObject);
      if (data.verified) {
        verified = true;
        window.localStorage.setItem(
          '_shoptak-user-data',
          JSON.stringify({
            id: data.payload.uid,
            firstName: data.payload.firstName,
            lastName: data.payload.lastName,
          }),
        );
        if (Date.now() >= data.payload.exp) {
          // Refresh
          const res = await fetch('/api/jwt/refresh', {
            method: 'POST',
            body: storedSessionToken,
          });
          if (res.status !== 200) {
            window.localStorage.removeItem('_shoptak-user-session');
            return false;
          }
          window.localStorage.setItem(
            '_shoptak-user-session',
            await res.text(),
          );
        }
      }
    }
    return verified;
  } catch {
    return false;
  }
};

export { checkIsAuth };
