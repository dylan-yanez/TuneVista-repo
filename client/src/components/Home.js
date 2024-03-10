import React, {Fragment} from 'react';
import './Home.css'; // css file for styling

import InputTodo from "./InputTodo";
import ListTodos from "./ListTodos";

const Home = () => {
  return (
    <div className="home-container">
      <header>
        <h1 className="title">Welcome to TuneVista</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/library">Library</a></li>
            <li><a href="/playlist">Playlists</a></li>
            <li><a href="/account">Account</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="main-section">
          <h2 className="section-heading">Discover and Enjoy Music</h2>
          <p className="section-text">Explore a vast collection of songs from various genres. Create playlists, save your favorite tracks, and enjoy a seamless music listening experience.</p>
          <button className="cta-button">Get Started</button>
        </section>
        <Fragment>
          <InputTodo />
          <ListTodos />
        </Fragment>
      </main>
      <footer>
        <p className="footer-text">&copy; 2024 TuneVista. All rights reserved.</p>
      </footer>
      
    </div>
    
  );
  
}

export default Home;
