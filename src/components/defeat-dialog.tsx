import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface DefeatDialogProps {
  open?: boolean;
  onTryAgain: () => void;
}

export function DefeatDialog({ open = false, onTryAgain }: DefeatDialogProps) {

  const handleNextRound = () => {
    onTryAgain();
  }

  return <Dialog open={open} onOpenChange={handleNextRound} >
    <DialogContent
      className={cn(
        'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        'flex flex-col gap-6 p-6',
        'bg-gray-900 text-gray-100',
        'bg-blend-multiply min-w-[300px] w-full max-w-fit rounded-md shadow shadow-gray-900 animate-dialog-content-show'
      )}
    >
      <DialogHeader>
        <DialogTitle className='text-2xl font-bold'>
          Defeat! 🥲
        </DialogTitle>
      </DialogHeader>
      <DialogDescription>
        You lost, not this time!
        <br />
        Unfortunately you used all your chances.
      </DialogDescription>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            className='w-full'
          >
            Try Again
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog >

}