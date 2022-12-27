import React from 'react'

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

export const UnsolvedContestsTable = ({unsolvedcontests}) => {
    let unsolved = unsolvedcontests;
    console.log(unsolved);
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 10;
    const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClickContest = (e, contest) => {
    e.preventDefault();
    window.open(`https://codeforces.com/contest/${contest.id}`);
  }
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - unsolved.length) : 0;
    return (
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
    
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={'medium'}
              >
    
                <PageHead />
                <TableBody>
    
                  {unsolvedcontests
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((contest,index) => {
                      const labelIdcontest = `enhanced-table-checkbox-${index}`;
                      
                      return (
                        <TableRow
                          hover
                          style={{ cursor: 'pointer'}}
                          onClick={(event) => handleClickContest(event, contest)}
                          tabIndex={-1}
                          key={contest.id}
                        >
                        <TableCell
                        component="th"
                        id={labelIdcontest}
                        scope="row">{contest.name}</TableCell>
                        
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: '1rem',
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={unsolvedcontests.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            />
          </Paper>
        </Box>
      );
}
export const PageHead = () => {
    return(
        <TableHead>
            <TableRow>
                <TableCell align={'center'}
            padding={'normal'}>Unsolved Contests</TableCell> 
            </TableRow>
        </TableHead>
    );
}