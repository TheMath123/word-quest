import alphabet from '@/assets/alphabet.json'
import { cn } from '@/lib/cn'
import { Key } from '@/components'

interface KeyboardProps {
  onKeyPress: (words: string) => void,
  onBackspace: () => void,
  onConfirm: () => void,
  wordSize: number,
  disabled?: boolean,
  className?: string,
}
export function Keyboard({ onKeyPress, onBackspace, onConfirm, disabled = false, className }: KeyboardProps) {

  const handleKeyPress = (letter: string) => {
    onKeyPress(letter)
  }

  const handleBackspace = () => {
    onBackspace()
  }

  const handleConfirm = () => {
    onConfirm()
  }

  return <div className={cn(className, 'grid grid-cols-7 md:grid-cols-9 gap-2 place-items-center flex-wrap', 'bg-gray-300 dark:bg-slate-800 rounded-lg p-2 md:p-4')}>
    {alphabet.length > 0 && alphabet.map(
      (letter: string) =>
        <Key
          key={letter}
          disabled={disabled}
          onClick={() => handleKeyPress(letter)}
        >
          {letter}
        </Key>)
    }
    <Key
      key='←'
      disabled={disabled}
      onClick={() => handleBackspace()}
      color='erase'
    >
      <span className='-translate-y-0.5'>
        ←
      </span>
    </Key>
    <Key
      key='✓'
      disabled={disabled}
      onClick={() => handleConfirm()}
      className='md:col-span-9'
      color='confirm'
    >
      <span className='-translate-y-0.5'>
        ✓
      </span>
    </Key>
  </div>
}