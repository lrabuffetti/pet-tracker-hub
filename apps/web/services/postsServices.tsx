const GetPosts = async () => {
  const res = await fetch("https://api.vercel.app/products", {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export default GetPosts;