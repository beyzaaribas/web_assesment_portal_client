"use client";
import React, { useEffect, useState } from "react";
import "./TestDetail.css";
import { useParams, useRouter } from "next/navigation";
import { getAllQuestions } from "@/services/questions";
import { getAllAnswers, getTestAnswers } from "@/services/answers";
import { createResult } from "@/services/results";
import Swal from "sweetalert2";
import BaseLoader from "@/components/loader/baseLoader";
import { Col } from "react-bootstrap";

const TestDetail = () => {
  const [testId, setTestId] = useState();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [selectedQuestionsAndAnswers, setSelectedQuestionsAndAnswers] =
    useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(
    Array(questions.length).fill(false)
  );

  const params = useParams();
  const router = useRouter()

  useEffect(() => {
    setTestId(params.id);
  }, [params.id]);

  //getQuestions
  const getQuestions = async (id) => {
    if (id != null || id != undefined) {
      const data = await getAllQuestions(id);
      if (data.isSuccess == true) {
        setQuestions(data.questions);
      }
    }
  };

  const getAnswers = async (id) => {
    if (id != null || id != undefined) {
      const data = await getAllAnswers(id);
      if (data.isSuccess == true) {
        setAnswers((prevAnswers) => [...prevAnswers, ...data.answers]);
      }
    }
  };

  useEffect(() => {
    if (testId != null || testId != undefined) {
      getQuestions(testId);
    }
  }, [testId]);

  useEffect(() => {
    questions.forEach((question) => {
      getAnswers(question._id);
    });
  }, [questions]);

  const handleAnswerClick = (question, answer) => {
    const index = questions.findIndex((q) => q._id === question._id);
    if (index !== -1) {
      const updatedArray = [...isAnswered];
      updatedArray[index] = true;
      setIsAnswered(updatedArray);
      const updatedQuestionsAndAnswers = [...selectedQuestionsAndAnswers];
      updatedQuestionsAndAnswers[index] = {
        questionId: question._id,
        question:question.question,
        answerId: answer._id,
        answer:answer.answer
      };
      setSelectedQuestionsAndAnswers(updatedQuestionsAndAnswers);
    }
  };

  console.log(selectedQuestionsAndAnswers)

  // Sonraki soruya geçmek için çağrılan fonksiyon
  const handleNextQuestion = () => {
    if (!isAnswered[currentQuestionIndex]) {
      Swal.fire({
        icon: "warning",
        text: "Please answer the current question before proceeding.",
      });
      return;
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  // Finish butonuna tıklamak için çağrılan fonksiyon
  const handleFinishTest = async () => {
    if (!isAnswered.every((answered) => answered)) {
      Swal.fire({
        icon: "warning",
        text: "Please answer all questions before finishing the test.",
      });
      return;
    }
    setIsLoading(true);
    const result = await createResult(form);
    setIsLoading(false);
    if (result.isSuccess) {
      Swal.fire({
        icon: "success",
        text: result.message,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/userTests")

        }
      });
    } else {
      Swal.fire({
        icon: "error",
        text: result.message,
      });
    }
  };

  const form = {
    questionAndAnswers: selectedQuestionsAndAnswers,
    testId: testId,
  };

  const handleTestClick = async () => {
    setIsLoading(true);

    const result = await createResult(form);
    if (result.isSuccess == true) {
      setIsLoading(false);

      Swal.fire({
        icon: "success",
        text: result.message,
      });
    } else {
      setIsLoading(false);

      Swal.fire({
        icon: "error",
        text: result.message,
      });
    }
  };

  return (
    <div className="test-detail">
      {isLoading ? <BaseLoader /> : ""}

      <div className="container">
        {questions[currentQuestionIndex] && (
          <div
            className="question-box"
            key={questions[currentQuestionIndex]._id}
          >
            <p>
              <span>{currentQuestionIndex + 1}</span>{" "}
              {questions[currentQuestionIndex].question}
            </p>
            <div className="answers">
              {answers
                .filter(
                  (answer) =>
                    answer.questionId === questions[currentQuestionIndex]._id
                )
                .map((answer, answerIndex) => (
                  <div
                    className={`answer ${
                      selectedQuestionsAndAnswers.some(
                        (item) =>
                          item.questionId ===
                            questions[currentQuestionIndex]._id &&
                          item.answerId === answer._id
                      )
                        ? "selected"
                        : ""
                    }`}
                    key={answer._id}
                    onClick={() => {
                      handleAnswerClick(
                        questions[currentQuestionIndex],
                        answer
                      );
                    }}
                  >
                    <p>{answer.answer}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        <Col md={12} style={{ display: "flex", justifyContent: "flex-end" }}>
          {currentQuestionIndex < questions.length - 1 && (
            <button className="next-btn" onClick={() => handleNextQuestion()}>
              Next
            </button>
          )}

          {currentQuestionIndex === questions.length - 1 && (
            <button className="test-btn" onClick={() => handleFinishTest()}>
              Finish
            </button>
          )}
        </Col>
      </div>
    </div>
  );
};

export default TestDetail;
