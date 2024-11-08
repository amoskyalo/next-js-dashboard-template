import { TextFieldProps, InputLabel, Stack, TextField } from "@mui/material";

export const TextFieldInput = ({ size, label, ...rest }: TextFieldProps) => {
  return (
    <Stack spacing={0.5}>
      <InputLabel sx={{ fontSize: 14 }}>{label}</InputLabel>
      <TextField fullWidth size={size ?? "small"} {...rest} />
    </Stack>
  );
};
