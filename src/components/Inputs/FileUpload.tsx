import { styled } from '@mui/material/styles';
import { Box, InputLabel, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Image from 'next/image';

type PropsInterface = {
    label?: string;
    error?: boolean;
    helperText?: string;
    onChange?: (arg: File | null | undefined) => void;
    value: File | null | undefined;
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const FileUpload = ({ label, helperText, error, onChange, value }: PropsInterface) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    return (
        <Box>
            <InputLabel sx={{ fontSize: 14, mb: 0.5 }}>{label}</InputLabel>
            <Stack
                sx={{ border: 1, borderColor: grey[400], borderStyle: 'dashed', borderRadius: 1, width: 'max-content' }}
                spacing={0}
                direction="column"
                alignItems="center"
                position="relative"
                overflow="hidden"
            >
                <Image
                    src={previewUrl ?? 'https://avatar.iran.liara.run/public/4'}
                    alt="faker"
                    width={100}
                    height={100}
                    priority
                />
                <Box
                    component="label"
                    sx={{
                        position: 'absolute',
                        zIndex: 99,
                        bottom: 0,
                        right: 0,
                        backgroundColor: grey[300],
                        paddingX: 0.5,
                        pt: 0.2,
                        cursor: 'pointer',
                    }}
                >
                    <CloudUploadOutlinedIcon sx={{ fontSize: 16 }} color="primary" />
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => {
                            const value = event.target?.files?.[0] as any;
                            setPreviewUrl(URL.createObjectURL(value));
                            onChange?.(value);
                        }}
                    />
                </Box>
            </Stack>

            <Typography variant="caption" sx={{ color: grey[500], fontWeight: 500, textAlign: 'center' }}>
                PNG*, JPG*, JPEG*. Max 2MB.
            </Typography>
        </Box>
    );
};
