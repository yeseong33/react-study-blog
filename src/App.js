/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let [modal, setModal] = useState(false)
  let [titles, setTitles] = useState([['신발가게', 0], ['아이스크림 가게', 0], ['카페', 0], ['자동차 판매점', 0]])
  let [name, setName] = useState(0)
  let [reviews, setReviews] = useState([['신발이 맛있어요', new Date().toLocaleString()], ['아이스크림이 이뻐요', new Date().toLocaleString()], ['커피가 잘나가요', new Date().toLocaleString()], ['차가 향긋해요', new Date().toLocaleString()]])
  let [userInput, setUserInput] = useState('')
  let [userReiewInput, setUserReiewInput] = useState(['', new Date().toLocaleString()])
  return (
    <div className="App">
      <div className='black-nav'>
        <h4>ReactBlog</h4>
      </div>

      <span onClick={() => {
        const copy = [...titles]
        const shuffled = shuffleArray(copy)
        console.log(shuffled)
        setTitles(shuffled)
      }}> 🔄 </span>

      <span onClick={() => {
        const copy = [...titles]
        copy.sort()
        setTitles(copy)
      }}> 📋 </span>

      {
        titles.map((title, i) => {
          return (
            <div className='list' key={i}>
              <h4 onClick={() => {
                setModal(!modal)
                setName(i)
              }}> {title[0]}
                <span onClick={(e) => {
                  e.stopPropagation()
                  let copy = [...titles]
                  copy[i][1] += 1
                  setTitles(copy)
                }}> 👍 </span>
                {titles[i][1]}
                <span style={{paddingLeft : 15}} onClick={(e) => {
                  e.stopPropagation()
                  let copy = [...titles]
                  copy.splice(i, 1)
                  setTitles(copy)
                }}>  ❌ </span>
              </h4>
              <Today></Today>
            </div>
          )
        })
      }
      {
        modal == true ? 
        <Modal 
          titles={titles} 
          idx={name}
          reviews = {reviews}
          ></Modal> : null
      }
      <div className='container'>
        <input className='title' onInput={(e) => {
          setUserInput([e.target.value, 0])
        }}></input>
        <textarea className='desc'  onInput={(e) => {
          setUserReiewInput([e.target.value, new Date().toLocaleString()])
        }}></textarea>
        <button onClick={() => {
          let copyTiltes = [...titles]
          let copyReviews = [...reviews]
          copyTiltes.unshift([userInput, 0])
          copyReviews.unshift(userReiewInput)
          setTitles(copyTiltes)
          setReviews(copyReviews)
        }}>추가</button>
      </div>
    </div>
  );
}

function Modal(props) {
  return (
    <div className='modal'>
      <h4>{props.titles[props.idx]}</h4>
      <p>{props.reviews[props.idx][0]}</p>
      <p>{props.reviews[props.idx][1]}</p>
    </div>
  )
}

const Today = () => {
  let now = new Date().toDateString()
  return (
    <p>{now}</p>
  )
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


export default App;
