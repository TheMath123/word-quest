"use client"

import * as React from "react"
import { Check, ChevronUpDown } from "@mynaui/icons-react"

import { cn } from "@/lib/cn"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { fetchAlphabets } from "@/services/dashboard/alphabet"
import { ButtonInput } from "@/components/ui/button-input"

interface Item {
  label: string
  value: string
}

interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
}


export function ComboboxAlphabets({ value, onChange }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [alphabetList, setAlphabetList] = React.useState<Item[]>([])


  React.useEffect(() => {
    const fillList = async () => {
      const alphabets = await fetchAlphabets()
      const list = alphabets.map((alphabet) => ({
        label: alphabet.name,
        value: alphabet.name,
      }))
      setAlphabetList(list)
    }

    fillList()
  }, []);

  const onSelect = (currentValue: string) => {
    onChange(currentValue)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ButtonInput
          variant="default"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? alphabetList.find((alphabet) => alphabet.value === value)?.label
            : "Select alphabet..."}
          <ChevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </ButtonInput>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command>
          <CommandInput placeholder="Search alphabet..." />
          <CommandList>
            <CommandEmpty>No alphabet found.</CommandEmpty>
            <CommandGroup>
              {alphabetList.map((alphabet) => (
                <CommandItem
                  key={alphabet.value}
                  value={alphabet.value}
                  onSelect={(e) => onSelect(e)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === alphabet.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {alphabet.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
