import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/cn';

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

  return <Dialog.Root open={open} onOpenChange={handleNextRound}>
    <Dialog.Portal>
      <Dialog.Overlay
        className='fixed inset-0 bg-gray-900/50 blur-lg animate-dialog-overlay-show'
      />
      <Dialog.Content
        className={cn(
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'flex flex-col gap-6 p-6',
          'bg-gray-900 text-gray-100',
          'bg-blend-multiply min-w-[300px] w-full max-w-fit rounded-md shadow-lg shadow-gray-800 animate-dialog-content-show'
        )}
      >
        <Dialog.Title className='text-2xl font-bold'>
          Victory! 🥳🎖
        </Dialog.Title>
        <Dialog.Description className='text-xl space-y-4'>
          Congratulations! You got the word right.<br />
          <span className='flex flex-row gap-2'>
            <dt>Remaining attempts:</dt>
            <dd
              className='font-semibold'
            >
              {data.attempts}
            </dd>
          </span>
        </Dialog.Description>
        <Dialog.Close asChild>
          <button
            className='px-4 py-2 bg-blue-500 text-blue-950 rounded-md font-semibold text-lg'
          >
            Next turn
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>

}