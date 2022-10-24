import {ChangeEvent, ReactNode, useState} from 'react'
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import {styled} from '@mui/material/styles'

import {fontWeightType} from '../index';

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey['200'],
    color: theme.palette.primary.dark,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({theme}) => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    cursor: 'pointer',
  }
}))

type renderType<E> = {
  entity: E
  fontWeight?: fontWeightType
  extraRow?: boolean
  rowIdx?: number
}

export type HeadCell<E> = {
  label: string | ReactNode
  sort?: string
  render?: (values: renderType<E>) => ReactNode
}

type Props<E> = {
  headCells: HeadCell<E>[]
  list: E[]
  onChangePage?: (page?: number, pageSize?: number) => void
  extraRow?: E[]
  totalCount?: number
  disablePagination?: boolean
  onClickHead?: () => void
  onClickRow?: (value: E) => void
}

export function AppTable<Entity>({
 headCells,
 list,
 totalCount = 0,
 disablePagination = false,
 extraRow,
 onChangePage,
 onClickRow,
}: Props<Entity>) {
  const [[page, rowsPerPage], setPagination] = useState([1, 5])

  const handleChangePage = (_: unknown, newPage: number) => {
    onChangePage && onChangePage(newPage + 1)
    setPagination([newPage + 1, rowsPerPage])
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    onChangePage && onChangePage(undefined, Number.parseInt(event.target.value))
    setPagination([1, Number.parseInt(event.target.value)])
  }

  return (
    <>
      <TableContainer sx={{overflowX: 'auto'}}>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell, idx) => {
                const label: ReactNode = headCell.label
                return (
                  <StyledTableCell key={typeof headCell.label === 'string' ? headCell.label : idx} align='left'>
                    {label}
                  </StyledTableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.length > 0 ? (
              list.map((row, idx) => (
                <StyledTableRow key={idx} onClick={() => onClickRow && onClickRow(row)}>
                  {headCells.map((cell) => (
                    <StyledTableCell key={typeof cell.label === 'string' ? cell.label : idx}>
                      {cell.render?.({entity: row, rowIdx: idx})}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <StyledTableCell
                  colSpan={headCells.length}
                  sx={{textAlign: 'center', width: '100%'}}
                >
                  Пусто
                </StyledTableCell>
              </TableRow>
            )}
            {extraRow && extraRow?.length > 0 && (
              extraRow?.map((row, idx) => (
                <StyledTableRow key={idx}>
                  {headCells.map((cell) => (
                    <StyledTableCell key={typeof cell.label === 'string' ? cell.label : idx}>
                      {cell.render?.({entity: row, fontWeight: 'bold', extraRow: true})}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {!disablePagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  )
}