import styled from '@emotion/styled';
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme,} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { User } from './FormReducer';

// import $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-dt/css/jquery.dataTables.css';


// $(document).ready(function() {
//  $('#userTable').DataTable();
// });

interface StyledTableCellProps {
 theme: any; 
}

const StyledTableCell = styled(TableCell)<StyledTableCellProps>((props) => ({
  [`&.${props.theme.palette.mode === 'light' ? 'MuiTableCell-head' : 'MuiTableCell-body'}`]: {
    backgroundColor: props.theme.palette.common.black,
    color: props.theme.palette.common.white,
  },
  [`&.${props.theme.palette.mode === 'light' ? 'MuiTableRow-odd' : 'MuiTableRow-root'}`]: {
    backgroundColor: props.theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  fontSize: 14,
}));

const StyledTableRow = styled(TableRow)({
 '&:last-child td, &:last-child th': {
  border: 0,
 },
});




interface RootState {
 users: User[];
}


const Home = () => {
 const theme = useTheme();

const users = useSelector((all: RootState) => all.users);


 return (
  <>
    <Typography variant='h4' align='center' margin={2} >User Table</Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
        <StyledTableCell theme={theme}>Name</StyledTableCell>
        <StyledTableCell align="center" theme={theme}>Age</StyledTableCell>
        <StyledTableCell align="center" theme={theme}>Mobile</StyledTableCell>
        <StyledTableCell align="center" theme={theme}>Gender</StyledTableCell>
        <StyledTableCell align="center" theme={theme}>Govt ID</StyledTableCell>
        <StyledTableCell align="center" theme={theme}>GovtID No.</StyledTableCell>
        <StyledTableCell align="center" theme={theme}>Address</StyledTableCell>
        <StyledTableCell align="center" theme={theme}>State</StyledTableCell>
        <StyledTableCell align="center" theme={theme}>City</StyledTableCell>
        <StyledTableCell align="center" theme={theme}>Country</StyledTableCell>
        <StyledTableCell align="center" theme={theme}>Pincode</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.isArray(users) && users.map((user,index) => (
        <StyledTableRow key={index}>
          <StyledTableCell component="th" scope="row" theme={theme}>{user.name}</StyledTableCell>        
          <StyledTableCell align="center" theme={theme}>{user.age}</StyledTableCell>
          <StyledTableCell align="center" theme={theme}>{user.mobile}</StyledTableCell>
          <StyledTableCell align="center" theme={theme}>{user.gender}</StyledTableCell>
          <StyledTableCell align="center" theme={theme}>{user.govtID}</StyledTableCell>
          <StyledTableCell align="center" theme={theme}>{user.enterGovtID}</StyledTableCell>
          <StyledTableCell align="center" theme={theme}>{user.addressVal}</StyledTableCell>
          <StyledTableCell align="center" theme={theme}>{user.state}</StyledTableCell>
          <StyledTableCell align="center" theme={theme}>{user.city}</StyledTableCell>
          <StyledTableCell align="center" theme={theme}>{user.country}</StyledTableCell>
          <StyledTableCell align="center" theme={theme}>{user.pincode}</StyledTableCell>
        </StyledTableRow>
        ))}
      </TableBody>
      </Table>
    </TableContainer>
  </>
 );

  // return (
  //  <>
  //   <table id="userTable" className="display">
  //    <thead>
  //     <tr>
  //      <th>Name</th>
  //      <th>Age</th>
  //      <th>Gender</th>
  //      <th>Mobile</th>
  //      <th>Govt ID</th>
  //      <th>GovtID No.</th>
  //      <th>Address</th>
  //      <th>City</th>
  //      <th>State</th>
  //      <th>Country</th>
  //      <th>Pincode</th>
  //     </tr>
  //    </thead>
  //    <tbody>
  //     {users.map((user,i) => 
  //     <tr key={i}>
  //       <td>{user.name}</td>       
  //       <td>{user.age}</td>       
  //       <td>{user.gender}</td>       
  //       <td>{user.mobile}</td>       
  //       <td>{user.govtID}</td>       
  //       <td>{user.enterGovtID}</td>       
  //       <td>{user.addressVal}</td>       
  //       <td>{user.city}</td>       
  //       <td>{user.state}</td>       
  //       <td>{user.country}</td> 
  //       <td>{user.pincode}</td> 
  //      </tr>      
  //     )}
  //    </tbody>
  //   </table>
  //  </>
  // );

 
};

export default Home;
