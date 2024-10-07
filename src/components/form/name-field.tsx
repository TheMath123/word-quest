import { useForm } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"

interface NameFieldProps {
  name?: string;
  label?: string;
  placeholder?: string;
  description?: string;
}

export function NameField({ name, label, placeholder, description }: NameFieldProps) {
  const form = useForm();

  return <FormField
    control={form.control}
    name={name ?? "name"}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label ?? 'Name'}</FormLabel>
        <FormControl>
          <Input placeholder={placeholder ?? "Grece"} {...field} />
        </FormControl>
        {description ? <FormDescription>
          {description}
        </FormDescription> : null}
        <FormMessage />
      </FormItem>
    )}
  />
}