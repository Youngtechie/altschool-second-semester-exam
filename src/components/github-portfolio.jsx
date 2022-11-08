import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/portfolio.css";
import Loading from "./Loading";

export function Portfolio() {
  const portfolio = useRef(null);
  const [Data, setData] = useState([])

  useEffect(() => {
    async function getProjects() {
      let url = "https://api.github.com/users/Youngtechie";
      try {
        let res = await fetch(url);
        return await res.json();
      } catch (error) {
        console.log(error);
      }
    }

    let id = setTimeout(()=>{
      async function data() {
        setData(await getProjects());
      }
  
      data();
    }, 3000)

    return ()=> clearTimeout(id)
    
  }, []);

  return <section className="portfolioContainer" ref={portfolio}>
    {Data !== undefined && Data.length !== 0 ? 
    <section className="portfolio">
      <section className="heading">
        <Link to={'/error'}>Error Page</Link>
        <img src='/github_logo.png' alt={'github logo'}/>
      </section>
      
      <section className="username"><h1>{Data.login}'s Github Page</h1></section>
      <section className="Image"><img src={Data.avatar_url} alt='avatar'/></section>
      <section className="profile">
        <section className="name"><h2>{Data.name}</h2></section>
        <section className="bio"><p>{Data.bio}</p></section>
        <section className="location"><b>Location:</b>{Data.location}</section>
        <section className="show">
          <section className="repos">
            <b>Repositories</b>
            <section className="number">{Data.public_repos}</section>
            <a href="/Repositories">View My Public Repos</a>
          </section>
        </section>
        <section className="publicRepo"></section>
      </section>
    </section>
    : 
    <Loading/>}
  </section>;
}