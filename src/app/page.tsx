'use client';

import Image from 'next/image'; // Import necessary components
import { useEffect, useRef, useState } from 'react'; // Import necessary hooks and components
import { useRouter } from 'next/navigation'; // Import necessary hooks and components
import { useCartStore } from '@/lib/store'; // Import Zustand store
import { Button } from '@/components/ui/button'; // Import Button component
import { toast } from 'sonner'; // Import Sonner for notifications
import { Rnd } from 'react-rnd'; // Import Rnd for draggable and resizable components

const clothingItems = [
  { src: '/clothing-icons/accessories/belt1.png', name: 'Belt-1' },
  { src: '/clothing-icons/accessories/belt2.png', name: 'Belt-2' },
  { src: '/clothing-icons/accessories/cap.png', name: 'Cap' },
  { src: '/clothing-icons/accessories/hat.png', name: 'Hat' },
  { src: '/clothing-icons/accessories/sunglasses.png', name: 'Sunglasses' },
  { src: '/clothing-icons/bottoms/bottom1.png', name: 'Bottom 1' },
  { src: '/clothing-icons/bottoms/bottom2.png', name: 'Bottom 2' },
  { src: '/clothing-icons/bottoms/bottom3.png', name: 'Bottom 3' },
  { src: '/clothing-icons/bottoms/bottom4.png', name: 'Bottom 4' },
  { src: '/clothing-icons/bottoms/bottom5.png', name: 'Bottom 5' },
  { src: '/clothing-icons/shoes/shoes1.png', name: 'Shoes 1' },
  { src: '/clothing-icons/shoes/shoes2.png', name: 'Shoes 2' },
  { src: '/clothing-icons/shoes/shoes3.png', name: 'Shoes 3' },
  { src: '/clothing-icons/shoes/shoes4.png', name: 'Shoes 4' },
  { src: '/clothing-icons/shoes/shoes5.png', name: 'Shoes 5' },
  { src: '/clothing-icons/tops/top1.png', name: 'Top 1' },
  { src: '/clothing-icons/tops/top2.png', name: 'Top 2' },
  { src: '/clothing-icons/tops/top3.png', name: 'Top 3' },
  { src: '/clothing-icons/tops/top4.png', name: 'Top 4' },
  { src: '/clothing-icons/tops/top5.png', name: 'Top 5' },
];  // Define clothing items with their image sources and names

export default function OutfitBuilder() {  // Main component for the outfit builder
  const [canvasItems, setCanvasItems] = useState<typeof clothingItems>([]); 
  const canvasRef = useRef<HTMLDivElement>(null);  
  const addToCart = useCartStore((s) => s.addItem); 
  const router = useRouter(); 

  useEffect(() => {  // Load saved outfit from localStorage on component mount
    const saved = localStorage.getItem('savedOutfit');
    try {
      if (saved) setCanvasItems(JSON.parse(saved));
    } catch {
      console.error('Invalid saved outfit in localStorage');
      localStorage.removeItem('savedOutfit');
    }
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {  // Handle drop event on the canvas
    const src = e.dataTransfer.getData('src');
    const name = e.dataTransfer.getData('name');
    const lname = name.toLowerCase();

    let category = '';            // Determine the category based on the item name
    if (lname.includes('cap') || lname.includes('hat')) category = 'headwear';
    else if (lname.includes('sunglass')) category = 'sunglass';
    else if (lname.includes('top')) category = 'top';
    else if (lname.includes('belt')) category = 'belt';
    else if (lname.includes('bottom')) category = 'bottom';
    else if (lname.includes('shoe')) category = 'shoe';
    else return;

    const updatedItems = canvasItems.filter((item) => {    // Filter out items that don't match the category
      const iname = item.name.toLowerCase();
      if (category === 'headwear') return !(iname.includes('cap') || iname.includes('hat'));
      return !iname.includes(category);
    });

    setCanvasItems([...updatedItems, { src, name }]);
  };

  const handleDragStart = (item: { src: string; name: string }, e: React.DragEvent) => {   // Handle drag start event for clothing items
    e.dataTransfer.setData('src', item.src);
    e.dataTransfer.setData('name', item.name);
  };

  const handleAddToCart = () => {        // Handle adding items to the cart
    if (canvasItems.length === 0) {
      toast.warning('🛑 Add some items to canvas before adding to cart.');
      return;
    }
    canvasItems.forEach((item) => {
    addToCart({
      id: item.name, // 👈 generate a unique ID
      name: item.name,
      src: item.src,
    });
   });
    toast.success('🛒 Outfit added to cart!');
  };

  const handleReset = () => {
    setCanvasItems([]);
    localStorage.removeItem('savedOutfit');
  };

  const handleSave = () => {
    localStorage.setItem('savedOutfit', JSON.stringify(canvasItems));
    toast.success('💾 Outfit saved to Memory, Now you can load it later unless you reset it!! ');
  };

  const handleGoToCart = () => {
    router.push('/cart');
  };

  return (
    <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Clothing List */}
      <section className="border p-4 rounded-xl shadow-xl">
        <h2 className="text-2xl text-center font-bold mb-4">Clothing Items</h2>
        <div className="grid grid-cols-2 gap-2">
          {clothingItems.map((item, idx) => (
            <Image
              key={idx}
              src={item.src}
              alt={item.name}
              width={40}
              height={30}
              draggable
              onDragStart={(e) => handleDragStart(item, e)}
              className="border rounded-lg hover:scale-105 transition-transform cursor-move"
            />
          ))}
        </div>
      </section>

      {/* Canvas */}
      <section
        className="border p-4 rounded-xl shadow-xl col-span-2 min-h-[500px] relative"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <h2 className="text-3xl text-center font-bold mb-4">Canvas</h2>
        <div
          ref={canvasRef}
          className="relative w-full h-[400px] bg-gray-50 border rounded-lg overflow-hidden"
        >
          {canvasItems.map((item, idx) => {
            const name = item.name.toLowerCase();
            let top = 0;

            if (name.includes('cap') || name.includes('hat')) top = 10;
            else if (name.includes('sunglass')) top = 50;
            else if (name.includes('top')) top = 70;
            else if (name.includes('belt')) top = 140;
            else if (name.includes('bottom')) top = 160;
            else if (name.includes('shoe')) top = 250;

            return (
              <Rnd
                key={idx}
                default={{
                  x: canvasRef.current?.clientWidth ? canvasRef.current.clientWidth / 2 - 20 : 100,
                  y: top,
                  width: 40,
                  height: 40,
                }}
                bounds="parent"
                enableResizing={{
                  top: true,
                  right: true,
                  bottom: true,
                  left: true,
                  topRight: true,
                  bottomRight: true,
                  bottomLeft: true,
                  topLeft: true,
                }}
                lockAspectRatio
                className="absolute"
              >
              <Image
                src={item.src}
                alt={item.name}
                fill
                className="object-contain"
                draggable={false}
              />
            </Rnd>
           );
        })}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mt-10">
          <Button onClick={handleAddToCart} className="text-xl font-semibold">Add to Cart</Button>
          <Button onClick={handleSave} className="text-xl font-semibold">Save Outfit</Button>
          <Button onClick={handleGoToCart} className="text-xl font-semibold">Go to Cart</Button>
          <Button onClick={handleReset} variant="outline" className="text-xl font-semibold">Reset</Button>
        </div>
      </section>
    </main>
  );
}
