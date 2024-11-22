import { Box, Chip, Stack, IconButton, Divider, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CodeIcon from '@mui/icons-material/Code';

const CodePreview = ({ title, previewComponent }: { title: string; previewComponent: any }) => {
    const [active, setActive] = useState(0);

    return (
        <Box sx={{ overflow: 'hidden' }}>
            <Stack direction="row" alignItems={'center'}>
                <ArrowRightIcon />
                <Typography variant="subtitle1">{title}</Typography>
            </Stack>
            <Box
                sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 2,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    overflow: 'hidden',
                    borderBottom: 0,
                    paddingBottom: 0.5,
                    paddingTop: 0.5,
                    paddingLeft: 1,
                    paddingRight: 0.5,
                    marginTop: 1,
                }}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1}>
                        {['Playground', 'Code'].map((label, index) => (
                            <Chip
                                key={label}
                                size="small"
                                color={index === active ? 'primary' : 'default'}
                                label={label}
                                variant="outlined"
                                onClick={() => setActive(index)}
                                disabled={index === 1}
                                icon={index === 0 ? <PlayArrowIcon /> : <CodeIcon />}
                            />
                        ))}
                    </Stack>

                    <Tooltip title="Copy code">
                        <IconButton size="small" disabled={active === 0}>
                            <ContentCopyIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Box>

            <Divider />

            {active === 0 && (
                <Stack sx={{ border: 1, borderTop: 0, borderColor: 'divider', padding: 4 }}>{previewComponent()}</Stack>
            )}
        </Box>
    );
};

export default CodePreview;
