import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';

interface DefeatDialogProps {
  open?: boolean;
  onTryAgain: () => void;
}

export function DefeatDialog({ open = false, onTryAgain }: DefeatDialogProps) {

  const handleNextRound = () => {
    onTryAgain();
  }

  return <Dialog.Root open={open} onOpenChange={handleNextRound} >
    <Dialog.Portal >
      <Dialog.Overlay
        className='fixed inset-0 bg-black/80 blur-lg animate-dialog-overlay-show'
      />
      <Dialog.Content
        className={cn(
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'flex flex-col gap-6 p-6',
          'bg-gray-900 text-gray-100',
          'bg-blend-multiply min-w-[300px] w-full max-w-fit rounded-md shadow shadow-gray-900 animate-dialog-content-show'
        )}
      >
        <Dialog.Title className='text-2xl font-bold'>
          Defeat! 🥲
        </Dialog.Title>
        <Dialog.Description>
          You lost, not this time!
          <br />
          Unfortunately you used all your chances.
        </Dialog.Description>
        <Dialog.Close asChild>
          <Button
          >
            Try Again
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root >

}