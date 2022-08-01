import { Card } from "antd";
import { Typography } from "antd";
import { memo } from "react";
import { Character } from "../../model/characters";

const { Text } = Typography;

type Props = {
    character: Character;
}

export const CharacterCard = memo((props: Props) => {
    const { character: { name, height, eye_color, mass } } = props;

    return (
        <Card title={name} style={{width: 300}}>
            <Text>Height: {height}</Text>
            <br />
            <Text>Mass: {mass}</Text>
            <br />
            <Text>Eye Color: {eye_color}</Text>
        </Card>
    );
})


