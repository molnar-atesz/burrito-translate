import { makeStyles, shorthands } from "@fluentui/react-components";

const useAppStyles = makeStyles({
  messageBar: {
    ...shorthands.padding("10px"),
    justifyContent: "center",
    position: "sticky",
    bottom: "10px",
  },
  main: {
    height: "100%",
  },
});

export default useAppStyles;
