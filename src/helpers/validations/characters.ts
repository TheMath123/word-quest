export function validateCharactersString(input: string) {
  if (input.length < 1) {
    return {
      isValid: false,
      error: "A string deve ter pelo menos 1 caractere",
    };
  }

  if (input === ";") {
    return { isValid: false, error: "A string não pode ser apenas ';'" };
  }

  const parts = input.split(";");
  if (parts.some((part: string) => part === "")) {
    return {
      isValid: false,
      error: "Todos os caracteres devem ser separados por ';'",
    };
  }

  return { isValid: true };
}
