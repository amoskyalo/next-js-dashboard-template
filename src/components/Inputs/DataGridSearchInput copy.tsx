import { TextField, InputAdornment, TextFieldProps, IconButton, Tooltip } from '@mui/material';
import { useGridApiContext } from '@mui/x-data-grid';
import { useCallback, useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import { styled } from '@mui/material/styles';

type SearchProps = TextFieldProps & {
    searching: boolean;
};

const StyledSearchBox = styled(TextField)<SearchProps>(({ searching }) => ({
    transition: 'width 0.5s ease',
    cursor: 'pointer',
    width: searching ? 170 : 36,
}));

export const DataGridSearchInput = () => {
    const apiRef = useGridApiContext();
    const [searching, setSearching] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    const updateSearchValue = useCallback(
        (newSearchValue: string) => {
            apiRef.current.setQuickFilterValues([newSearchValue]);
        },
        [apiRef],
    );

    useEffect(() => {
        updateSearchValue(searchValue);
    }, [searchValue, updateSearchValue]);

    return (
        <StyledSearchBox
            placeholder="Type to search..."
            variant="standard"
            type='search'
            searching={searching}
            size="small"
            onChange={(e) => setSearchValue(e.target.value)}
            onClick={() => setSearching(true)}
            value={searchValue}
            slotProps={{
                input: {
                    style: {
                        height: '24px',
                    },
                    startAdornment: (
                        <InputAdornment position="start">
                            {searching ? (
                                <CiSearch className="search-icon" />
                            ) : (
                                <Tooltip title="search">
                                    <IconButton size='small'>
                                        <CiSearch className="search-icon" />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </InputAdornment>
                    ),
                    disableUnderline: true,
                },
                htmlInput: {
                    style: {
                        padding: 0,
                    },
                },
            }}
        />
    );
};
