import Link from 'next/link'

import GetPosts from '@/services/postsServices'
import { Product } from '../app/types/products'

export default async function Home() {
  const products = await GetPosts()

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-between min-h-screen py-2">
        <h1 className="text-6xl font-bold">No products found.</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen py-2">
      <h1 className="text-6xl font-bold">Products</h1>
      <ul className="mt-6 text-2xl">
        {products.map((product: Product) => (
          <li key={product.id} className="mb-4 border-b pb-2">
            <Link
              href={`/posts/${product.id}`}
              className="text-blue-500 hover:underline"
            >
              <h4>{product.name}</h4>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
