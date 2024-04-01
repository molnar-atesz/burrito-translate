import { makeStyles, shorthands } from "@fluentui/react-components";

const useStackStyles = makeStyles({
  stack: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    ...shorthands.gap("10px"),
    width: "auto",
    height: "auto",
    boxSizing: "border-box",
    "> *": {
      textOverflow: "ellipsis",
    },
    "> :not(:first-child)": {
      marginTop: "0px",
    },
    "> *:not(.ms-StackItem)": {
      flexShrink: 1,
    },
  },
  item: {
    height: "auto",
    width: "auto",
    flexShrink: 1,
  },
  verticalFill: {
    height: "100%",
  },
  strech: {
    alignSelf: "stretch",
  },
  center: {
    alignSelf: "center",
  },
});

export default useStackStyles;
