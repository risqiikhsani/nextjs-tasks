// "use client";

import React from "react";
// import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

// export default function FormSubmitButton() {
//   const { pending } = useFormStatus();
//   return (
//     <Button type="submit" disabled={pending}>
//       {pending && <Loader2 className="animate-spin h-10 w-10 my-2" />}
//       {pending ? "Submitting..." : "Submit"}
//     </Button>
//   );
// }

interface FormSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

export default function FormSubmitButton({
  loading,
  className = "",
  ...props
}: FormSubmitButtonProps) {
  return (
    <Button
      type="submit"
      className={`btn ${className}`} // Replace "btn" with your base Button class
      disabled={loading}
      {...props}
    >
      {loading && <Loader2 className="animate-spin h-10 w-10 my-2" />}
      {loading ? "Submitting..." : "Submit"}
    </Button>
  );
}
