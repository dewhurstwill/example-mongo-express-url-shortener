// Node Modules
import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import queryString from 'query-string';
import './App.css';
import { BASE_URL } from './Settings.js'

// Local Hooks
const useGetParamsFromUrl = () => queryString.parse(window.location.search);

// Wrapper HoC
const Wrapper = ({ title, children }) => (
  <div className="page">
      <h1 className="title"><u><b>{ title ? title : 'URL Shortener' }</b></u></h1>
      { children }
  </div>
);

// Call to create short url
const createShortUrl = ({ url, slug }) => {
  const body = slug ? { url, slug } : { url };
  fetch(`${BASE_URL}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  .then(response => {
    if(response.status === 429) throw new Error("Slow mode enabled, please try again later");
    return response
  })
  .then(response => response.json())
  .then(data => {
    if(data.message && data.message === "Success") return window.location.href = `/?slug=${data.slug}`;
    if(data.stack && data.stack.includes('ValidationError')) return window.location.href = `/?error=${data.message}`;
    if(data.message && data.message.includes('Slug in use')) return window.location.href = `/?error=${data.message}`;
  })
  .catch(err => {
    window.location.href = `/?error=${err.message}`
  })
}

// Main
function App() {
  // State
  const [url, setUrl] = useState('');
  const [slug, setSlug] = useState(''); 

  // Hooks
  const params = useGetParamsFromUrl();
  
  if (Object.keys(params).includes('error')) {
    return (
      <Wrapper title='Oops an error occurred'>
        <div className="form">
          <form className="">
            <p>{ params.error }</p>
            <button onClick={ e => window.location.href = '/' }>
              Home
            </button>
          </form>
        </div>
      </Wrapper>
    )
  } else if (Object.keys(params).includes('slug')) {
    return (
      <Wrapper>
        <div className="form">
          <form className="">
            <h3><a href={`/${params.slug}`}>
              { `${BASE_URL ? `${BASE_URL}/` : 'Slug: '}${params.slug}` }
            </a></h3>
            <br/><br/>
            <button onClick={ e => window.location.href = '/' }>
              Create another
            </button>
          </form>
        </div>
      </Wrapper>
    )
  } else {
    return (
      <Wrapper>
        <div className="form">
          <form className="">
            <input type="text" placeholder="URL" onChange={e => setUrl(e.target.value) }/>
            <input type="text" placeholder="Slug (Optional)" onChange={e => setSlug(e.target.value) }/>
            <button onClick={ e => {
              e.preventDefault();
              createShortUrl({ url, slug })
            } }>
              Shorten
            </button>
          </form>
        </div>
      </Wrapper>
    );
  }
}

export default App;
