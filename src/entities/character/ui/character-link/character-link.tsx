import { Link } from "react-router-dom";
import { Typography } from "antd";
import { memo, useMemo } from "react";
import { Character } from "../../model/characters";

const { Title } = Typography;

type Props = {
    character: Character,
}

export const CharacterLink = memo((props: Props) => {
    const { character: { name }, character } = props;
    const url = useMemo(() => name.split(' ').join('').toLowerCase(), [name]);
    return <Title level={3}><Link to={url} state={character}>{name}</Link></Title>
});
