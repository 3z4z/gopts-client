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
    const { data } = await axios.post("/users", newUser);
    console.log(data);
    return { user };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
