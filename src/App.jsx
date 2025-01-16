import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom';
import Header from "./components/Header";
import Question from "./components/Question"
import Results from "./components/Results";
import UserForm from "./components/UserForm";
import { UserProvider } from "./components/UserContext";

export default function App(){
    const questions = [
        {
          question: "What's your favorite color?",
          options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
        },
          {
            question: "What's your favorite time of day?",
            options: ["Morning 🌅", "Afternoon 🌞", "Evening 🌇", "Night 🌌"],
          },
          {
            question: "Which environment do you feel most at peace in?",
            options: ["Mountains 🏔️", "Beach 🏖️", "Forest 🌳", "City 🌆"],
          },
          {
            question: "Choose a pet you'd love to have:",
            options: ["Dog 🐶", "Cat 🐱", "Bird 🐦", "Fish 🐟"],
          },
          {
            question: "Which hobby excites you the most?",
            options: ["Cooking 🍳", "Swimming 🏊‍♂️", "Gardening 🌱", "Reading 📚"],
          },
          {
            question: "How do you handle stress?",
            options: ["Exercise 🏋️", "Meditation 🧘", "Talking to friends 🗣️", "Sleeping 😴"],
          },
          {
            question: "What’s your go-to drink?",
            options: ["Coffee ☕", "Tea 🍵", "Juice 🧃", "Water 💧"],
          }
        
      ];
      const keywords = {
        Fire: "fire",
        Water: "water",
        Earth: "earth",
        Air: "air",
      };
      const elements = {
        "Red 🔴": "Fire",
        "Blue 🔵": "Water",
        "Green 🟢": "Earth",
        "Yellow 🟡": "Air",
      };
      const [currentQuestionIndex , setCurrentQuestionIndex] = useState(0);
      const [answers , setAnswers] = useState([]);
      const [userName , setUserName] = useState("");
      const [element  , setElement] = useState("");
      const [artwork , setArtwork] = useState(null);

      function handleAnswer(answer) {
        if (currentQuestionIndex === 0) {
          setElement(elements[answer]); // Set element based on the first question
        }
        setAnswers([...answers, answer]);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      };

      function handleUserFormSubmit(name) {
        setUserName(name);
      };
      
      function determineElement(answers) {
        const counts = {};
        answers.forEach(function(answer) {
          const element = elements[answer];
          counts[element] = (counts[element] || 0) + 1;
        });
        return Object.keys(counts).reduce(function(a, b) {
          return counts[a] > counts[b] ? a : b
        });
      };
    
     
      

      useEffect(() => {
        if (currentQuestionIndex === questions.length) {
          fetchDogImage();
        }
      }, [currentQuestionIndex]);
      
      function fetchDogImage() {
        fetch("https://dog.ceo/api/breeds/image/random")
          .then(response => response.json())
          .then(data => setArtwork(data.message))
          .catch(error => console.error("Error fetching dog image:", error));
      }
      

      return (
        <UserProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<UserForm />} />
              <Route
                path="/quiz"
                element={
                  currentQuestionIndex < questions.length ? (
                    <Question
                      question={questions[currentQuestionIndex].question}
                      options={questions[currentQuestionIndex].options}
                      onAnswer={handleAnswer}
                    />
                  ) : (
                    <Results element={element} artwork={artwork} />
                  )
                }
              />
            </Routes>
          </Router>
        </UserProvider>
      );
    }