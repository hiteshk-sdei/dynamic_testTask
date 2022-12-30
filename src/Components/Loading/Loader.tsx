import { CircularProgress, Stack } from "@mui/material";
import "./Style.css";

const Loader = () => {
  return (
    <Stack
      className="container"
      sx={{ color: "grey.500" }}
      spacing={2}
      direction="row"
    >
      <CircularProgress color="inherit" />
    </Stack>
  );
};
export default Loader;
