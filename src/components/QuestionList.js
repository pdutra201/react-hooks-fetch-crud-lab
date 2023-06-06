import React from "react";
import QuestionItem from "./QuestionItem";
function QuestionList({questions, onDeleteClick, onAnswerChange}) {
 
  const list = questions.map((q) => <QuestionItem key={q.id} onAnswerChange={onAnswerChange} question={q} onDeleteClick={onDeleteClick}/>)

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{list}</ul>
    </section>
  );
}

export default QuestionList;
