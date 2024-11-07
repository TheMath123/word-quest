import { useFormContext } from "react-hook-form";
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

export function NumberField({ name, label, placeholder, description }: NameFieldProps) {
  const form = useFormContext();

  return <FormField
    control={form.control}
    name={name ?? "number"}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label ?? 'Number'}</FormLabel>
        <FormControl>
          <Input placeholder={placeholder ?? "Write a number"} {...field} inputMode="numeric" enterKeyHint="done" />
        </FormControl>
        {description ? <FormDescription>
          {description}
        </FormDescription> : null}
        <FormMessage />
      </FormItem>
    )}
  />
}