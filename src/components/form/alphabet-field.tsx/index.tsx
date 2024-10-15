import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { ComboboxAlphabets } from "./combobox-alphabets";

interface AlphabetFieldProps {
  name?: string;
  label?: string;
  description?: string;
}

export function AlphabetField({ name, label, description }: AlphabetFieldProps) {
  const form = useFormContext();

  return <FormField
    control={form.control}
    name={name ?? "alphabetName"}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label ?? 'Alphabet'}</FormLabel>
        <FormControl>
          <ComboboxAlphabets onChange={field.onChange} />
        </FormControl>
        {description ? <FormDescription>
          {description}
        </FormDescription> : null}
        <FormMessage />
      </FormItem>
    )}
  />
}