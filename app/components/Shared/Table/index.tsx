import {
  Checkbox,
  Flex,
  // eslint-disable-next-line no-restricted-imports
  Table as BasicTable,
  TableBodyProps,
  TableHeadProps,
  TableProps as BasicTableProps,
  TableRowProps,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  Children,
  createContext,
  Dispatch,
  FC,
  isValidElement,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import Pagination from '@/app/components/Shared/Table/Pagination';
import RangeInfo from '@/app/components/Shared/Table/RangeInfo';
import IconButton from '@/app/components/Shared/IconButton';
import { BsChevronDown } from 'react-icons/bs';

interface State {
  totalItems: number;
  columnWidths: (`${number}px` | `${number}rem`)[];
  itemsPerPage: number;
  allChecked: boolean;
  isIndeterminate: boolean;
  checkedItems: boolean[];
  setCheckedItems: Dispatch<SetStateAction<boolean[]>>;
  onSortChange: (sortBy: { value: string; order: 'asc' | 'desc' }) => void;
}

const TableContext = createContext<State | null>(null);

const useTableContext = () => useContext(TableContext)!;

type Picked = 'columnWidths' | 'itemsPerPage' | 'onSortChange' | 'totalItems';

interface TableProps extends BasicTableProps, Pick<State, Picked> {
  onPageChange: (page: number) => void;
}

function Table({
  children,
  columnWidths,
  totalItems,
  itemsPerPage,
  onPageChange,
  onSortChange,
  ...props
}: TableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedItems, setCheckedItems] = useState(
    Array.from({ length: itemsPerPage }).fill(false) as boolean[],
  );

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const pages = Math.ceil(totalItems / itemsPerPage);

  const selectedRowsCount = checkedItems.filter(Boolean).length;

  const [head, body, ...restChildren] = Children.toArray(children);

  if (isValidElement(head)) {
    if (head.type !== Head) {
      throw new Error('<Table> should include <Table.Head> as the first child');
    }
  }

  if (isValidElement(body)) {
    if (body.type !== Body) {
      throw new Error(
        '<Table> should include <Table.Body> as the second child',
      );
    }
  }

  if (!head || !body) {
    throw new Error(
      '<Table> should contain <Table.Head> as first child and <Table.Body> as a second child',
    );
  }

  if (restChildren.length) {
    throw new Error('<Table> should contain <Table.Head> or <Table.Body> only');
  }

  return (
    <TableContext.Provider
      value={{
        totalItems,
        columnWidths,
        itemsPerPage,
        allChecked,
        isIndeterminate,
        checkedItems,
        setCheckedItems,
        onSortChange,
      }}
    >
      <BasicTable
        bg="white"
        rounded="5px"
        overflow="hidden"
        w="fit-content"
        boxShadow="0px 1.5px 2px 0px rgba(16, 24, 40, 0.10)"
        {...props}
      >
        {children}
        <Tfoot>
          {pages ? (
            <Tr px="1.38rem" py="1rem">
              <Td>
                <Flex
                  gap={5}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {!selectedRowsCount ? (
                    <RangeInfo
                      currentPage={currentPage}
                      itemsPerPage={itemsPerPage}
                      totalItems={totalItems}
                    />
                  ) : (
                    <Text
                      fontFamily="Inter"
                      fontSize="0.875rem"
                      fontWeight={500}
                      lineHeight={1.42857}
                      color="#667085"
                    >
                      {selectedRowsCount} Row{selectedRowsCount > 1 && 's'} was
                      selected
                    </Text>
                  )}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={pages}
                    onPageChange={page => {
                      setCurrentPage(page);
                      onPageChange(page);
                    }}
                  />
                </Flex>
              </Td>
            </Tr>
          ) : (
            <></>
          )}
        </Tfoot>
      </BasicTable>
    </TableContext.Provider>
  );
}

interface SortableColumn {
  name: string;
  value: string;
  isSortable?: boolean;
}

interface HeadProps extends TableHeadProps {
  columns: (SortableColumn | string)[];
}

function isSortableColumn(
  column: SortableColumn | ReactElement | string,
): column is SortableColumn {
  if (typeof column === 'string' || isValidElement(column)) {
    return false;
  }

  if ('name' in column) {
    if (typeof column.name === 'string' || column.name === undefined) {
      if (column.isSortable == null || typeof column.isSortable === 'boolean') {
        return true;
      }
    }
  }

  return false;
}

const getGridTemplateColumns = (columnWidths: State['columnWidths']) => {
  return ['auto', ...columnWidths].map(width => width).join(' ');
};

const Head: FC<HeadProps> = ({ columns, ...props }) => {
  const {
    totalItems,
    columnWidths,
    allChecked,
    isIndeterminate,
    setCheckedItems,
    onSortChange,
  } = useTableContext();
  const [selectedColumn, setSelectedColumn] = useState(-1);

  const handleSort = (columnIndex: number) => () => {
    const newSelectedColumn = selectedColumn === columnIndex ? -1 : columnIndex;
    setSelectedColumn(newSelectedColumn);

    const column = columns?.[columnIndex - 1];
    if (!column || !isSortableColumn(column)) return;

    if (newSelectedColumn === -1)
      onSortChange({ order: 'desc', value: column.value });
    else onSortChange({ order: 'asc', value: column.value });
  };

  const checkbox = (
    <Checkbox
      aria-label="check all rows"
      mr="-1.38rem"
      borderColor="#858D9D"
      isChecked={allChecked}
      isIndeterminate={isIndeterminate}
      pointerEvents={totalItems === 0 ? 'none' : undefined}
      onChange={event =>
        setCheckedItems(items => items.map(() => event.target.checked))
      }
    />
  );

  return (
    <Thead bg="#F0F1F3" {...props}>
      <Tr
        display="grid"
        gridTemplateColumns={getGridTemplateColumns(columnWidths)}
      >
        {[checkbox, ...columns].map((column, columnIndex) => {
          return (
            <Th
              key={columnIndex}
              textTransform="capitalize"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap="12.17px"
              fontSize="0.875rem"
              fontWeight={500}
              lineHeight={1.42857}
              px="22px"
              userSelect="none"
              transition="150ms background"
              cursor={
                columnIndex !== 0 &&
                isSortableColumn(column) &&
                column.isSortable
                  ? 'pointer'
                  : undefined
              }
              pointerEvents={
                columnIndex !== 0 &&
                (!isSortableColumn(column) || !column.isSortable)
                  ? 'none'
                  : undefined
              }
              onClick={handleSort(columnIndex)}
              overflow="hidden"
            >
              {!isSortableColumn(column) && column}
              {isSortableColumn(column) && (
                <>
                  {column.name}
                  {column.isSortable && (
                    <IconButton
                      aria-label="sort column"
                      icon={
                        <BsChevronDown
                          fill="#858D9D"
                          style={{
                            transition: '100ms rotate',
                            rotate: (selectedColumn === columnIndex &&
                              '180deg') as string,
                          }}
                        />
                      }
                      size="xs"
                      variant="ghost"
                      onClick={event => {
                        // when clicking the whole cell instead of the icon,
                        // this code runs twice,
                        // so the icon won't rotate, so I used `event.stopPropagation`
                        // to prevent the event on the whole cell trigger
                        // when clicking the icon
                        event.stopPropagation();
                        handleSort(columnIndex)();
                      }}
                      _hover={{
                        bg: 'gray.300',
                      }}
                    />
                  )}
                </>
              )}
            </Th>
          );
        })}
      </Tr>
    </Thead>
  );
};

type Omitted = 'display' | 'alignItems' | 'gridTemplateColumns';

interface RowProps extends Omit<TableRowProps, Omitted> {
  columns: (string | ReactNode)[];
  index: number;
}

const Row: FC<RowProps> = ({ columns, index, ...props }) => {
  const { columnWidths, checkedItems, setCheckedItems } = useTableContext();

  const checkbox = (
    <Checkbox
      aria-label="check row"
      mr="-1.38rem"
      borderColor="#858D9D"
      isChecked={checkedItems[index]}
      onChange={event =>
        setCheckedItems(items => {
          const newItems = [...items];
          newItems[index] = event.target.checked;
          return newItems;
        })
      }
    />
  );

  return (
    <Tr
      {...props}
      display="grid"
      alignItems="center"
      gridTemplateColumns={getGridTemplateColumns(columnWidths)}
    >
      {[checkbox, ...columns].map((column, index) => (
        <Td
          key={index}
          px="22px"
          h="100%"
          display="flex"
          alignItems="center"
          overflow="hidden"
        >
          {column}
        </Td>
      ))}
    </Tr>
  );
};

const Body: FC<TableBodyProps> = ({ children, ...props }) => {
  const { itemsPerPage } = useTableContext();

  Children.forEach(children, child => {
    if (isValidElement(child)) {
      if (child.type !== Row) {
        throw new Error('<Table.Body> should include <Table.Row> only');
      }
    }
  });

  const newChildren = Children.toArray(children).slice(0, itemsPerPage);
  return <Tbody {...props}>{newChildren}</Tbody>;
};

Table.Head = Head;
Table.Body = Body;
Table.Row = Row;

export default Table;
