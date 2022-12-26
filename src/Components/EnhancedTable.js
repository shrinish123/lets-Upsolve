import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import UserContext from "../Context/user-context";

function EnhancedTable({ problems }) {
  const userCtx = useContext(UserContext);

  console.log(problems);
  const [page, setPage] = useState(0);

  const rowsPerPage = 10;

  const handleClick = (e, problem) => {
    e.preventDefault();
    window.open(
      `https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`,
      "_blank"
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - problems.length) : 0;
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead />

            <TableBody>
              {problems
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((problem, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      style={{ cursor: "pointer" }}
                      onClick={(event) => handleClick(event, problem)}
                      tabIndex={-1}
                      key={problem.name}
                    >
                      <TableCell align="left">{`${problem.contestId}${problem.index}`}</TableCell>
                      <TableCell component="th" id={labelId} scope="row">
                        {problem.name}
                      </TableCell>
                      {userCtx.rating && (
                        <TableCell align="left">{problem.rating}</TableCell>
                      )}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: "2rem",
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
          // TO DO
          // fix the option to change pages as per availablity // right now there is ui ,but not working
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
}

export default EnhancedTable;

export const EnhancedTableHead = () => {
  const userCtx = useContext(UserContext);
  const headCells = [
    {
      id: "problem id",
      label: "Problem ID",
    },
    {
      id: "problem",
      label: "Problem",
    },
    userCtx.rating && {
      id: "rating",
      label: "Problem Rating",
    },
  ];

  return (
    <TableHead>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: 10,
        }}
      >
        <Typography style={{ fontSize: "10px" }}>Show Rating</Typography>
        <Switch checked={userCtx.rating} onClick={userCtx.toggleRating} />
      </Box>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={"left"} padding={"normal"}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
