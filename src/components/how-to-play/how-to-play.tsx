import * as React from "react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ButtonInfo } from "./button-info"
import { ContentInfo } from "./content-info"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function HowToPlay() {
  const [open, setOpen] = React.useState(false)

  const title = 'How to play?'

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonInfo />
      </DialogTrigger>
      <DialogContent className="sm:max-w-fit">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <ScrollArea className="h-full">
            <ContentInfo />
          </ScrollArea>
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full">Back</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

