const getUserData = async (userId: string) => {
  const request = await fetch(`/api/users?id=${userId}`);
  return request.json();
};

export { getUserData };
