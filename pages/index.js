import { useEffect, useState, useRef } from "react";

function HomePage() {
  const [datas, setDatas] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const sendRequest = async () => {
    const res = await fetch(`/api/feedback`);
    const data = await res.json();
    // if (!data || data.feedback.length === 0) {
    //   return <p>Loading...</p>
    // }
    
    setDatas(data.feedback)
  }

  useEffect( () => {
    sendRequest();
  }, [sendRequest])

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;
    if (enteredEmail.trim().length === 0 || enteredFeedback.trim().length === 0) {
      return;
    }
    const dataObj = {
      email: enteredEmail,
      text: enteredFeedback
    }
    emailInputRef.current.value = "";
    feedbackInputRef.current.value = "";
    const response = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(dataObj),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const resData = await response.json();
  };

  
  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="emal">Email</label>
          <input type="email" id="email" ref={emailInputRef}/>
        </div>
        <div>
          <label htmlFor="text">Feedback</label>
          <textarea id="text" rows={5} ref={feedbackInputRef} />
        </div>
        <button>Submit</button>
      </form>
      <hr />
      <ul>
        {datas.map(item => <li key={item.id}>Text: {item.text} <br /> Email: {item.email}</li>)}
      </ul>
    </div>
  );
}

export default HomePage;
