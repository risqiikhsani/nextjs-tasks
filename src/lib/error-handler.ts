import { toast } from "sonner";

export function clientErrorHandler(error: any) {
  console.error("error : ",error);
  // Handle axios error response
  if (error.response) {
    toast.error(error.response.data.message || "An error occurred");
  } else if (error.request) {
    // Request was made but no response received
    toast.error("No response from server");
  } else {
    // Something else caused the error
    toast.error(error.message || "An unexpected error occurred");
  }
}
