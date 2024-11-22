'use client';

import { Stack, Box, Typography, Grid2 as Grid } from '@mui/material';
import { CodePreview } from '@/components/Containers';
import { _db } from './_components/_db';

const Developer = () => {
    const { list } = _db();

    return (
        <Grid container spacing={4}>
            <Grid size={8}>
                <Stack spacing={3}>
                    <Stack spacing={1}>
                        <Typography variant="h5">Introduction</Typography>
                        <Box>
                            <Typography variant="h6">Overview</Typography>
                            <Typography variant="body2">
                                This template is designed to streamline your dashboard development process, allowing you
                                to kickstart your projects without starting from scratch every time. It comes
                                pre-configured with the essential components and utilities that are commonly used in
                                modern dashboards. With this template, you'll have most of the foundational setup done
                                for you, including hooks, inputs, data grids, snackbars, and popovers.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h6">Inspiration</Typography>
                            <Typography variant="body2">
                                I built this MUI dashboard template because I was tired of setting up the same things
                                every time I started a new project. Instead of spending time on repetitive
                                configurations, I wanted a solid starting point that let me dive straight into building
                                the actual features. This template is designed to simplify the process, save time, and
                                provide a consistent foundation for any dashboard project.
                            </Typography>
                        </Box>
                    </Stack>

                    {list.map(({ list, name }) => (
                        <Box key={name}>
                            <Typography variant="h6">{name}</Typography>
                            {list.map(({ component, title }) => (
                                <Box sx={{ mt: 1 }} key={title}>
                                    <CodePreview title={title} previewComponent={component} />
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Stack>
            </Grid>

            <Grid size={4} sx={{ position: 'relative' }}>
                <Box sx={{ position: 'sticky', top: 20 }}>
                    <Typography color="primary" variant="subtitle1">
                        Table of contents
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Developer;
