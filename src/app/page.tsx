import ProductsFeed from '@/features/products-feed/products-feed';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 p-8 dark:bg-black">
      <div className="w-full max-w-6xl">
        <ProductsFeed />
      </div>
    </div>
  );
}
