import React from 'react';

function Food(props){
  return <h2>I like {props.fav}</h2>;
}
function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      <Food fav="kimchi" />
      <Food fav="ramen" />
      <Food fav="samgiopsal" />
      <Food fav="chukumi" />
    </div>
  );
}

export default App;
