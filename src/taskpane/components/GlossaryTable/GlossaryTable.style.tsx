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
  itemSourceCell: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionCell: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    ...shorthands.gap("5px"),
  },
});

export default useGlossaryTableStyle;
