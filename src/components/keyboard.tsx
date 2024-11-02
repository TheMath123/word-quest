import { cn } from '@/lib/cn'
import { Key } from '@/components'
import { DAlphabet } from '@/db/schema';

interface KeyboardProps {
  alphabet?: DAlphabet | null,
  onKeyPress: (words: string) => void,
  onBackspace: () => void,
  onConfirm: () => void,
  wordSize: number,
  disabled?: boolean,
  className?: string,
}
export function Keyboard({ onKeyPress, onBackspace, onConfirm, disabled = false, className, alphabet }: KeyboardProps) {
  if (!alphabet) return null;

  const letters = alphabet?.characters.trim().split(';')

  if (!letters) return null;

  const handleKeyPress = (letter: string) => {
    onKeyPress(letter)
  }

  const handleBackspace = () => {
    onBackspace()
  }

  const handleConfirm = () => {
    onConfirm()
  }
  const alphabetName = alphabet.name.toLowerCase().trim();

  const isDavek = alphabetName === 'davek';
  const isNumber = alphabetName === 'number';
  const isMorse = alphabetName === 'morse'
  const isDefault = !isNumber && !isMorse;

  return <div
    className={cn(
      className,
      isDavek && 'font-davek',
      'grid gap-2 place-items-center',
      isNumber && 'grid-cols-3',
      isMorse && 'grid-cols-2',
      isDefault && 'grid-cols-7 md:grid-cols-9',
      'bg-gray-300 dark:bg-slate-800 rounded-lg p-2 md:p-4 max-w-xl',
    )}>
    {letters.length > 0 && letters.map(
      (letter: string) =>
        <Key
          key={`letter-${letter}-${Math.floor(Math.random() * 999)}`}
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
      className={cn(isDefault && 'md:col-span-9')}
      color='confirm'
    >
      <span className='-translate-y-0.5'>
        ✓
      </span>
    </Key>
  </div>
}