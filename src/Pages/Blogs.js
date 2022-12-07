import React,{useState,useEffect} from 'react'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';

import { BlogPage} from './BlogPage';
const Blogs = () => {


  
  const [blogs,setBlogs] = useState([]);

  const TableItem = styled(Paper)(() => ({
    padding: '2rem',
    margin:'2rem',
  }));


  useEffect(()=> {

    const getBlogs = async() => {

      try{
  
        let blogarr = [];
        let blogres = await axios.get('https://codeforces.com/api/blogEntry.view?blogEntryId=91114');
        console.log(blogres.data.result);
        blogarr.push(blogres.data.result);
        blogres = await axios.get('https://codeforces.com/api/blogEntry.view?blogEntryId=98621');
        console.log(blogres.data.result);
        blogarr.push(blogres.data.result);
        blogres = await axios.get('https://codeforces.com/api/blogEntry.view?blogEntryId=95106');
        console.log(blogres.data.result);
        blogarr.push(blogres.data.result);
        blogres = await axios.get('https://codeforces.com/api/blogEntry.view?blogEntryId=98806');
        console.log(blogres.data.result);
        blogarr.push(blogres.data.result);
        blogres = await axios.get('https://codeforces.com/api/blogEntry.view?blogEntryId=80195');
        console.log(blogres.data.result);
        blogarr.push(blogres.data.result);
        setBlogs(blogarr);
        
  
      }catch(err){
         console.log(err);
      }
    }

     getBlogs();
     
  });

  
 
  

  return (
    <>
     <Box >
      <Grid container spacing={2}>
        
        <Grid item xs={12}>
          <TableItem>
            <BlogPage Blogs={ blogs}/>
          </TableItem>
        </Grid>

      </Grid>
    </Box>

    </>
  )
}

export default Blogs