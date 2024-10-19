import { ServiceResponse } from "@/@types/response";
import { toast } from "@/hooks/use-toast";

type CustomToast = (
  response: ServiceResponse,
  options?: {
    success?: {
      title?: string;
      description?: string;
    };
    error?: {
      title?: string;
      description?: string;
    };
  }
) => void;

export const customToast: CustomToast = (response, { success, error } = {}) => {
  if (response?.error) {
    toast({
      variant: "destructive",
      title: error?.title || "Uh oh! Something went wrong.",
      description: response.error || error?.description,
    });
  }
  toast({
    variant: "default",
    title: success?.title || "Uh oh! Success!",
    description: response?.description || success?.description,
  });
};
