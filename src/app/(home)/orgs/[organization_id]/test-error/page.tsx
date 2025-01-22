// app/page.tsx
"use client"
import { Button } from '@/components/ui/button';
import { instance } from '@/lib/axios';
import { clientErrorHandler } from '@/lib/error-handler';
import { toast } from 'sonner';

export default function Page() {
  const handleTestError = async () => {
    try {
      const response = await instance.post(`/api/test-error`);
      toast.success("Success!");
    } catch (error: any) {
      clientErrorHandler(error)
    }
  }

  return (
    <div className="p-4">
      <Button 
        onClick={handleTestError}
      >
        Test Error
      </Button>
    </div>
  )
}
