import React,{useContext} from 'react'
import {Link } from 'react-router-dom'

import Input from '../Components/Input';
import Tags from '../Pages/Tags';
import Contests from '../Pages/Contests';
import Practice from './Practice';
import Analysis from './Analysis';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import  UserContext  from '../Context/user-context';


const Home = () => {

   const Item = styled(Paper)(({theme}) => ({
    textAlign: 'center',
    backgroundColor:'#1D1E22',
    padding:'3rem',
    margin:'4rem',
    color:'white'

  }));
  
  const LargeItem = styled(Paper)(({theme}) => ({
    textAlign: 'center',
    backgroundColor:'#1D1E22',
    padding:'3rem',
    margin:'0 30rem',
    color:'white'

  }));



  const linkStyle = {
    textDecoration: 'none',
    color: 'white', 
    letterSpacing :'0.1rem',
  }

  const userCtx = useContext(UserContext);


  return (
    <>
      <Input />

        <Box >
        <Grid container spacing={5}>
        { (
        <>
        <Grid item xs={4}>
            <Item>
            <Link to="/Tags" element={<Tags/>} style ={linkStyle}>Practice Questions By Tags</Link>
            </Item>
        </Grid>
        </>)}
        {Object.keys(userCtx.user).length !== 0 &&
        (<>
        <Grid item xs={4}>
            <Item>
            <Link to="/Contests" element={<Contests/>} style ={linkStyle}>Upsolve Previous Contests</Link> 
            </Item>
        </Grid>
        </>)}
        
        {Object.keys(userCtx.user).length !== 0 &&
        (<>
        <Grid item xs={4}>
            <Item>
            <Link to="/Practice" element={<Practice/>} style ={linkStyle}>Suggested Practice</Link>
            </Item>
        </Grid>
        </>)}

        <Grid item xs= {12}>
          <LargeItem>
          <Link to="/Analysis" element={<Analysis/>} style ={linkStyle}>Get Your Analysis</Link>
          </LargeItem>
        </Grid>
        
        </Grid>
        </Box>
    </>
  )
}

export default Home