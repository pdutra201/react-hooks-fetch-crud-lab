import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(resp => resp.json())
      .then((data) => setQuestions(data))
  }, [])

  function onFormSubmit(newItem){

    fetch("http://localhost:4000/questions", {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "prompt": newItem.prompt,
        "answers": [newItem.answer1, newItem.answer2, newItem.answer3, newItem.answer4],
        "correctIndex": newItem.correctIndex
      })
    })
      .then(resp=> resp.json())
      .then(data=> setQuestions([...questions, data]))
    
  }
  
  function onDeleteClick(current){
    fetch(`http://localhost:4000/questions/${current.id}`, {
      method:"DELETE",
    })
      .then(resp => resp.json())
      .then(() => deleteQuestion(current))     
  }

  function deleteQuestion(removedQ){
    const newQuestions = questions.filter((question) => question.id !== removedQ.id)
    setQuestions(newQuestions)
  }

  function onAnswerChange(current, newItem){
    fetch(`http://localhost:4000/questions/${current.id}`, {
      method:"PATCH",
      headers:{
        "Content-Type": "application/json"
      },
      body: {
        "correctIndex": newItem
      }
    })
      .then(resp => resp.json())
      .then((updatedQuestion)=> handleUpdateQuestions(updatedQuestion))
  }

  function handleUpdateQuestions(updatedQuestion) {
    const newQuestions = questions.map((item) => {
      if (item.id === updatedQuestion.id) {
        return updatedQuestion
      }
      else {
        return item
      }
    })
    setQuestions(newQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onFormSubmit={onFormSubmit}/> : <QuestionList questions={questions} onDeleteClick={onDeleteClick} onAnswerChange={onAnswerChange}/>}
    </main>
  );
}

export default App;
