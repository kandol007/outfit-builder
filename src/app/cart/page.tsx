'use client';

import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const cart = useCartStore((s) => s.cart);
  const increaseQuantity = useCartStore((s) => s.increaseQuantity);
  const decreaseQuantity = useCartStore((s) => s.decreaseQuantity);
  const removeItem = useCartStore((s) => s.removeItemById); // New method

  const handleRemoveItem = (id: string) => {
    removeItem(id);
    toast.error('🧺 Item removed from cart.');
  };

  const handleIncrease = (id: string) => {
    increaseQuantity(id);
    toast.success('🔼 Increased quantity.');
  };

  const handleDecrease = (id: string) => {
    decreaseQuantity(id);
    toast.info('🔽 Decreased quantity.');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🛒 Your Cart</h1>
        <Link href="/">
          <Button variant="outline" className="text-xl font-semibold bg-gray-200">
            🏠 Home
          </Button>
        </Link>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty. Add some items!</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-4 rounded-lg bg-white shadow-sm"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.src}
                  alt={item.name}
                  width={40}
                  height={70}
                  className="object-contain"
                />  
                <div className="w-16 h-16 object-contain">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={() => handleDecrease(item.id)} variant="outline" className="text-md bg-gray-200">−</Button>
                <span className="text-2xl">{item.quantity}</span>
                <Button onClick={() => handleIncrease(item.id)} variant="outline" className="text-md bg-gray-200">+</Button>
                <Button onClick={() => handleRemoveItem(item.id)} variant="outline" className="text-md bg-gray-200">
                  ❌ Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
