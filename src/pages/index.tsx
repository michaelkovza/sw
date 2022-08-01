// Можно заменить на @loadable/component
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const CharactersListPage = lazy(() => import("./characters-list/characters-list"));
const CharacterDetailPage = lazy(() => import("./character-detail/character-detail"));

export const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<CharactersListPage />} />
            <Route path="/:name" element={<CharacterDetailPage />} />
        </Routes>
    );
};
