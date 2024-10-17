export interface AlphabetDTO {
  name: string;
  characters: string;
}

export interface AlphabetUpdateDTO extends AlphabetDTO {
  id: string;
}
