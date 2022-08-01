export type Character = Record<
    "name" |
    "height" |
    "mass" |
    "hair_color" |
    "skin_color" |
    "eye_color" |
    "birth_year" |
    "gender" |
    "homeworld"
    , string>;

export type Characters = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Character[];
}
