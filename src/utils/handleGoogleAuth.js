export const handleGoogleAuth = async (signInWithGoogle, axios) => {
  const res = await signInWithGoogle();
  if (!res || res.error) {
    console.log(res?.error);
    return { error: res?.error };
  }
  const { user } = res;
  const newUser = {
    email: user.email,
    name: user.displayName,
    image: user.photoURL,
  };
  try {
    const checkExistedUserRes = await axios.post("/users/check-duplicate", {
      email: user?.email,
    });
    if (checkExistedUserRes?.data?.existed) {
      return { user };
    }
    await axios.post("/users", newUser);
    return { user };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
