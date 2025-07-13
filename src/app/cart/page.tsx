'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const cart = useCartStore((s) => s.cart);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🛒 Your Outfit Cart</h1>
        <Link href="/">
          <Button variant="outline">🏠 Home</Button>
        </Link>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. Go back and add some outfits!</p>
      ) : (
        <div className="space-y-6">
          {cart.map((entry, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-lg shadow-md bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Outfit #{idx + 1}</h2>
                <Button
                  variant="destructive"
                  onClick={() => removeItem(idx)}
                  className="text-sm"
                >
                  Remove Outfit
                </Button>
              </div>
              <p className="text-sm text-gray-500 mb-3">
                {entry.items.length} item{entry.items.length !== 1 ? 's' : ''}
              </p>
              <div className="flex gap-3 flex-wrap">
                {entry.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="w-[80px] h-[100px] flex items-center justify-center border rounded bg-gray-50"
                  >
                    <img
                      src={item.src}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
