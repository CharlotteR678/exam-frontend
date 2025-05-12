export interface Country {
  id: string;
  name: string;
  emoji: string;
  code: string;
  continent?: Continent;
}

export interface Continent {
  name: string;
  id: number;
}
