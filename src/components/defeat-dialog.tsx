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
    <DialogContent>
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