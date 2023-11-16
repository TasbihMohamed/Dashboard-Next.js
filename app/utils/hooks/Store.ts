const getStoreData = async () => {
  const request = await fetch(`/api/stores`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(
        '_shoptak-user-session',
      )}`,
    },
  });
  return request.json();
};

export { getStoreData };
