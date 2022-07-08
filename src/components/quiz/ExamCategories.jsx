import { Button, MenuItem, TextField } from '@material-ui/core';
import {Component, React, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
// import questionsg from "../../questions.json";
import Categories from "../../Data/Categories"
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ErrMessage from '../ErrorMessage/ErrMessage';



const ExamCategories =({setName, fetchQuestions}) => {
   const [category, setCategory] = useState("")
   const [difficulty, setDifficulty] = useState("")
 
   const [error, setError] = useState(false)
   const [err, setErr] = useState(false)
  const [questionNumbers, setQuestionNumbers] = useState(null)

   const history = useHistory()
   
   const handleSubmit = (e)=> {
    e.preventDefault();
    if(!category || !difficulty|| !questionNumbers ){
      setError(true)
      return;
    }
    else if(
      questionNumbers<1 || questionNumbers>25){
        setErr(true)
      }
     else {
      setError(false);
      
      history.push('/play/quiz')
    }
   }

   const handleChange =(e)=>{
    e.preventDefault();
    setQuestionNumbers(e.target.value);
   }

    return(
      <div className='content'>
        <div className='settings'>
          <span style={{ fontSize: 30}}>Exam Categories</span>
          <br /> 
          <div className='settings_select'>
            {error && 
            <ErrorMessage>
              Please Fill in the fields below
            </ErrorMessage>}
            {err && 
            <ErrMessage>
              Question numbers should be set between 1 and 25
            </ErrMessage>}
     <TextField
      select
      label = "Select Subject"
      style={{marginBottom: 30}}
      onChange = {(e) => setCategory(e.target.value)}
      value ={category}
      variant= "outlined">
          { 
          Categories && Categories.map((cat)=>(
          
          <MenuItem key={cat.category} value={cat.value}>
              {cat.category}
          </MenuItem>
          ))
           }
        
           </TextField>
       
           <TextField 
           inputProps = {{min: 1, max: 25}}
           required
           fullWidth
           type="number"
           variant = "outlined"
           value={questionNumbers || ""}
           name = "Number of Questions"
           label ="Add number of questions from 1 - 25"
           onChange={handleChange}


           />
           <br />
           <TextField
           select
           label="Select difficulty"
           variant='outlined'
           style={{marginBottom: 30}}
           onChange = {(e) => setDifficulty(e.target.value)}
           value ={difficulty}
           >
            <MenuItem key="Easy" value="easy">Easy</MenuItem>
            <MenuItem key="Medium" value="medium">Medium</MenuItem>
            <MenuItem key="Hard" value="hard">Hard</MenuItem>

           </TextField>

           <Button 
           variant='contained'
           style={{backgroundColor: 'rgb(8, 212, 8)',
            color: 'white'}}
           size='large'
           onClick={handleSubmit}
           >
            Start Test
           </Button>
           </div>
           </div>
           <img src='img1.jpg' className='banner' alt='Exam img'/>
      </div>
      
    )
  }


export default ExamCategories;
