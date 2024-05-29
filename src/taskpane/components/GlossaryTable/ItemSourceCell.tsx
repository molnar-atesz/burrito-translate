import React, { FC } from "react";
import { IGlossaryItem } from "../../@types/glossary";
import { Label, tokens, Tooltip } from "@fluentui/react-components";
import { Info12Filled, Info16Filled, Info24Filled } from "@fluentui/react-icons";
import useGlossaryTableStyle from "./GlossaryTable.style";

export interface IItemSourceCellProps {
  item: IGlossaryItem;
}

const ItemSourceCell: FC<IItemSourceCellProps> = ({ item }) => {
  const style = useGlossaryTableStyle();

  return item.note ? (
    <Tooltip content={item.note} positioning="above-start" relationship="label">
      <div className={style.itemSourceCell}>
        <Label>{item.original}</Label>
        <Info12Filled color={tokens.colorNeutralForeground2BrandSelected} />
      </div>
    </Tooltip>
  ) : (
    item.original
  );
};

export default ItemSourceCell;
