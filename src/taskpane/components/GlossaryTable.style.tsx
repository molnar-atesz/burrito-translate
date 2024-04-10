import { makeStyles, shorthands } from "@fluentui/react-components";

const useGlossaryTableStyle = makeStyles({
  header: {
    position: "sticky",
    top: "0px",
  },
  headerCell: {
    fontWeight: "bold",
    ...shorthands.padding("5px"),
  },
});

export default useGlossaryTableStyle;
