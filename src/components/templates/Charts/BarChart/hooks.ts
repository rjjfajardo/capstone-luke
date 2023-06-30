import { useTheme } from "@mui/material/styles";

export const useHooks = () => {
  const theme = useTheme();

  return {
    theme,
  };
};
