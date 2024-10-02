import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogClose, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface WinDialogProps {
  open?: boolean;
  onNextRound: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;

}
export function WinDialog({ open = false, onNextRound, data }: WinDialogProps) {

  const handleNextRound = () => {
    onNextRound();
  }

  return <Dialog open={open} onOpenChange={handleNextRound}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className='text-2xl font-bold'>
          Victory! 🥳🎖
        </DialogTitle>
      </DialogHeader>
      <DialogDescription className='text-xl space-y-4'>
        Congratulations! You got the word right.<br />
        <span className='flex flex-row gap-2'>
          <dt>Remaining attempts:</dt>
          <dd
            className='font-semibold'
          >
            {data.attempts}
          </dd>
        </span>
      </DialogDescription>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            className='w-full'
          >
            Next turn
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>

}