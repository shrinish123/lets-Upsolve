import React,{useState,useEffect} from 'react'

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

export const BlogPage = ({Blogs}) => {
    console.log(Blogs);

    const [page, setPage] = React.useState(0);
    const rowsPerPage = 10;

    const handleClickBlog = (e,blog) => {
        e.preventDefault();
        window.open(`https://codeforces.com/blog/entry/${blog.id}`);
    }
    const handleChangePageBlog = (event, newPage) => {
        setPage(newPage);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Blogs.length) : 0;
  return(
    <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer>
            <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
            >
            <BlogPageHead />
            <TableBody>
                {
                    Blogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((blog,index) => {
                        const labelIDBlog = `enhanced-table-checkbox-${index}`;
                        return(
                            <TableRow hover
                            style = {{cursor: 'pointer'}}
                            onClick={(event) => handleClickBlog(event, blog)}
                            tabIndex={-1}
                            key={blog.id}>
                            <TableCell component="th"
                            id={labelIDBlog}
                            scope="row">{blog.title}

                            </TableCell>
                            </TableRow>
                        );
                    })
                }
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
          count={Blogs.length}
          rowsPerPage={rowsPerPage}
          // TO DO 
          // fix the option to change pages as per availablity // right now there is ui ,but not working 
          page={page}
          onPageChange={handleChangePageBlog}
        />
        </Paper>
    </Box>
  );
}


export const BlogPageHead = () => {
    return(
        <TableHead>
            <TableRow>
                <TableCell align={'center'}
            padding={'normal'}>Popular Blogs</TableCell> 
            </TableRow>
        </TableHead>
    );
}
