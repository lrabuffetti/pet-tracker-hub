const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const res = await fetch(`https://api.vercel.app/products/${slug}`, {
    cache: "no-store",
  });
  const product = await res.json();

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-between min-h-screen py-2">
        <h1 className="text-6xl font-bold">Product not found.</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen py-2">
      <h1 className="text-6xl font-bold">{product.name}</h1>
      <h4 className="text-xl font-semibold">{product.brand}</h4>
      <p className="mt-6 text-2xl">{product.description}</p>
    </div>
  );
}

export default PostPage;