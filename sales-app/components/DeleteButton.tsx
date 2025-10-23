'use client';

import { deleteProduct } from '@/lib/actions';
import { useTransition } from 'react';

// This is a small Client Component to handle the Server Action bind
export function DeleteButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();
  
  // Create a function that calls the bound Server Action
  const handleDelete = () => {
    startTransition(async () => {
        // We call the action directly instead of using a form action
        const result = await deleteProduct(productId);
        if (result.error) {
            alert(`Delete Failed: ${result.error}`);
        }
    });
  };

  return (
    <button 
        type="button" // Change type to button as we are using an onClick handler
        onClick={handleDelete} 
        disabled={isPending}
        className="text-red-500 hover:text-red-300 ml-4 p-1 rounded-md disabled:opacity-50"
    >
        {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
