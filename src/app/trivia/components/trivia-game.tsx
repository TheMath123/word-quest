'use client'

import { Trivia } from "@/@types/trivia";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TriviaGameProps {
  trivia: Trivia;
}

export function TriviaGame({ trivia }: TriviaGameProps) {
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    setOptions(getOptions());
  }, [trivia]);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter();

  function checkAnswer() {
    if (selectedOption === trivia.correct_answer) {
      alert("Correct!");
      router.refresh()
    } else {
      alert("Incorrect!");
    }
  }

  function getOptions() {
    let answers: string[];

    if (trivia.type === "boolean") {
      answers = ["True", "False"];
    } else {
      answers = trivia.incorrect_answers.concat(trivia.correct_answer);

      answers = answers.sort(() => Math.random() - 0.5);
    }

    return answers;
  }

  return <div className="flex flex-col gap-4 items-center p-8">
    <h1 className="font-bold text-xl">Trivia Game</h1>
    <h1 className="text-xl font-medium">{decodeURI(trivia.question)}</h1>
    <div className="flex flex-col gap-2 w-fit">

      {options.map((option, index) => (
        <div
          key={option}
          className={cn(
            'border rounded-lg px-4 py-2',
            selectedOption === option && 'bg-blue-800'
          )}
        >
          <input
            id={'option' + index}
            type="radio"
            name="answer"
            value={option}
            className="hidden"
            onChange={() => setSelectedOption(option)}
          />

          <label
            htmlFor={'option' + index}
            className="text-xl"
          >
            {option}
          </label>
        </div>
      ))}
    </div>
    <Button
      className="bg-green-500 text-white hover:bg-green-700"
      onClick={checkAnswer}
    >
      Confirm
    </Button>
  </div>
}