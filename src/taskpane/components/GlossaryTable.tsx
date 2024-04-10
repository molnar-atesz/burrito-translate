import React from "react";
import { IGlossaryItem } from "../@types/glossary";

import {
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
} from "@fluentui/react-components";
import useGlossaryTableStyle from "./GlossaryTable.style";

export interface IGlossaryTableProps {
  source: string;
  target: string;
  items: IGlossaryItem[];
}

const getColumns = (source: string, target: string): TableColumnDefinition<IGlossaryItem>[] => [
  createTableColumn<IGlossaryItem>({
    columnId: "original",
    compare: (a, b) => a.original.localeCompare(b.original),
    renderHeaderCell: () => `From ${source}`,
    renderCell: (item) => item.original,
  }),
  createTableColumn<IGlossaryItem>({
    columnId: "translation",
    compare: (a, b) => a.translation.localeCompare(b.translation),
    renderHeaderCell: () => `To ${target}`,
    renderCell: (item) => item.translation,
  }),
  createTableColumn<IGlossaryItem>({
    columnId: "note",
    renderHeaderCell: () => "Note",
    renderCell: (item) => item.note,
  }),
];

const GlossaryTable = (props: IGlossaryTableProps) => {
  const styles = useGlossaryTableStyle();
  return (
    <DataGrid
      items={props.items}
      columns={getColumns(props.source, props.target)}
      sortable
      getRowId={(item) => item.key}
      focusMode="composite"
    >
      <DataGridHeader className={styles.header}>
        <DataGridRow appearance="brand">
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell className={styles.headerCell}>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<IGlossaryItem>>
        {({ item, rowId }) => (
          <DataGridRow<IGlossaryItem> key={rowId}>
            {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};

export default GlossaryTable;
