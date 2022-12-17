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
export const ContestProblems = ({contestName,contestProblems}) => {
    console.log(contestName);
    console.log(contestProblems);
    
    let problems = contestProblems;
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 10;
    const handleClickProblem = (e,problem) =>{
        e.preventDefault();
        window.open(`https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`,'_blank');
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
      const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - problems.length) : 0;
      return (
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={'medium'}
              >
                
                <ContestPageHead/>
    
                <TableBody>
                  
                  {problems
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((problem, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          style = {{cursor: 'pointer'}}
                          onClick={(event) => handleClickProblem(event, problem)}
                          tabIndex={-1}
                          key={problem.name}
                        >
                          <TableCell align="left">{`${problem.contestId}${problem.index}`}</TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row">
                            {problem.name}
                          </TableCell>
                          <TableCell align="left">{problem.rating}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: '2rem',
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
              count={problems.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            />
          </Paper>
        </Box>
      );
    
}
export const ContestPageHead = () => {
    const headCells = [
        {
          id : 'problem id',
          label: 'Problem ID'
        },
        {
          id : 'problem',
          label: 'Problem'
        },
        {
          id : 'rating',
          label: 'Problem Rating'
        }
      ]
    
      return (
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={'left'}
                padding={'normal'}
              >
                {headCell.label}
    
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      );
}