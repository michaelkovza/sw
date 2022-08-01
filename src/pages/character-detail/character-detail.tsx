import { useLocation } from "react-router-dom";
import { CharacterCard } from "../../entities/character/ui/character-card/character-card";
import { Character } from "../../entities/character/model/characters";

const CharacterDetail = () => {
    const { state } = useLocation();
    const character = state as unknown as Character;

    return (
        <CharacterCard character={character} />
    );
}

export default CharacterDetail;
