import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Spin, Space, Alert, Input } from "antd";
import { Typography } from "antd";
import { CharacterLink } from "../../entities/character/ui/character-link/character-link";
import css from "./characters-list.module.css";
import { Characters } from "../../entities/character/model/characters";
import { useDebounce } from "react-use";

const { Text } = Typography;

const INITIAL_PAGE = 1;
const MS_FOR_DEBOUNCE_ON_SEARCH = 500;

const CharsListPage = () => {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [page, setPage] = useState(INITIAL_PAGE);
    const fetchChars = (page = INITIAL_PAGE, search = ''): Promise<Characters> => (
        fetch(`https://swapi.dev/api/people?page=${page}&search=${search}`)
            .then(async res => {
                const result: Characters = await res.json();
                return result;
            })
        );

    const {
        isLoading,
        isError,
        error,
        data,
        isFetching,
        isPreviousData,
        refetch,
    } = useQuery(['people', page, search], () => fetchChars(page, debouncedSearch), { keepPreviousData : true });

    useEffect(() => {
        refetch()
    }, [debouncedSearch]);

    const onSearch = ({currentTarget}: any) => {
        setSearch(currentTarget.value);
        setPage(INITIAL_PAGE);
    }

    useDebounce(() => {
        setDebouncedSearch(search);
    }, MS_FOR_DEBOUNCE_ON_SEARCH, [search])

    if (isLoading) {
        return <Spin className={css.spinner} />;
    }

    if (isError) {
        return <Alert type="error" message={JSON.stringify(error)} />;
    }

    const { results } = data;

    return (
        <>
            <Input className={css.input} onChange={onSearch} placeholder="Search" />
            <>
                {results.map(item => <CharacterLink key={item.name} character={item} />)}
            </>
            <Space direction="vertical" size={10}>
                <Text>Current page: {page}</Text>
                <Space size={20}>
                    <Button
                        type="primary"
                        onClick={() => setPage(old => Math.max(old - 1, INITIAL_PAGE))}
                        disabled={page === INITIAL_PAGE}
                    >
                        Previous
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => {
                            if (!isPreviousData && data.next) {
                                setPage(old => old + 1)
                            }
                        }}
                        disabled={isPreviousData || !data.next}
                    >
                        Next
                    </Button>
                    {isFetching && (<Spin />)}
                </Space>
            </Space>
        </>
    );
}

export default CharsListPage;
