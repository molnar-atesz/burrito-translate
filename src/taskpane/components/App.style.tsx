import { makeStyles, shorthands } from "@fluentui/react-components";

const useAppStyles = makeStyles({
  messageBar: {
    ...shorthands.padding("10px"),
    justifyContent: "center",
    alignSelf: "end",
  },
  main: {
    height: "100%",
  },
});

export default useAppStyles;
