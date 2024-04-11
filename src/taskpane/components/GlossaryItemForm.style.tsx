import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

const useGlossaryItemFormStyles = makeStyles({
  base: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
  },
  field: {
    display: "grid",
    gridRowGap: tokens.spacingVerticalXXS,
    ...shorthands.padding(tokens.spacingHorizontalS),
  },
});

export default useGlossaryItemFormStyles;
