import { useEffect, useRef,useState } from "react";
import Loading from './Loading'
import Back from "./Back";
import ReactPaginate from 'react-paginate';
import '../styles/repositories.css'

export default function Repositories() {
  const repos = useRef(null);
  const display = useRef(null)
  const [Data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(null)
  const itemsCount = 5
  

  useEffect(() => {
    async function getRepos() {
      let url = "https://api.github.com/users/Youngtechie/repos";
      try {
        let res = await fetch(url);
        return await res.json();
      } catch (error) {
        repos.current.innerHTML = 'Something went wrong ...'
      }
    }

   
      let id = setTimeout(()=>{
        async function data() {
        setData(await getRepos());

        
        }

        data();
      }, 2000)

      return ()=> clearTimeout(id)
  }, []);

  useEffect(()=>{
    setPageCount(Math.ceil(Data.length / itemsCount))
  }, [Data, itemsCount])
  
useEffect(()=>{
  setCurrentPage(Data.slice(0, 5))
}, [Data])  

const ChangePage = ({selected: selectedpage}) => {  
  const pageVisited = selectedpage * itemsCount
  setCurrentPage(Data.slice(pageVisited, pageVisited + itemsCount))
}

  return <section className="repositories" ref={repos}><section className="repoContainer">
    {Data.length !== 0 && Data !== undefined ? currentPage.map((data)=>{
        return <section className="repository" key={data.id} onClick={()=>{
          repos.current.innerHTML=`
          <section class="eachRepo" ref=${display}>
            <section class="Repo_head">
              <section class="eachRepo_Branch"> Branch: ${data.default_branch}</section>
              <section class="eachRepo_Visibility">Visibility: ${data.visibility}</section>
            </section>

            <section class="eachRepo_name">${data.name.toUpperCase()}</section>

            <section class="Repo_body">
              <section class="body1">
                ${data.description !== null ? 
                `<section class="eachRepo_Desc">Description: ${data.description}</section>` 
                : 
                `<section class="eachRepo_Desc">Description: No Description</section>`
                }

                ${data.language !== null ? 
                `<section class="eachRepo_Language">Major Language: ${data.language}</section>`
                :
                `<section class="eachRepo_Language">Major Language: None</section>`
                }
              </section>

              <section class="body2">
                  <section class="eachRepo_forks group">FORKS: ${data.forks}</section>
                  <section class="eachRepo_stars group">STARS: ${data.stargazers_count}</section>
                  <section class="eachRepo_watch group">WATCHERS: ${data.watchers}</section>
                  <section class="eachRepo_issues group">ISSUES: ${data.open_issues}</section>
              </section>
            </section>

            <section class="Repo_end">
                <section class="Repo_link"><a href=${data.html_url}>View on Github</a></section>
                <section class="Repo_link"><a href=''}>Back</a></section>
            </section>
            
          </section>`
        }}>
          <section className="repo_name">{data.name.toUpperCase()}</section>
          <section className="repo_lang">{data.description}</section> 
        </section>
      }) 
      :
      <Loading/>
      } 
    </section>
      {Data.length !== 0 && Data !== undefined ? 
      <ReactPaginate
      previousLabel={"< Prev"}
        nextLabel={"Next >"}  
        pageCount={pageCount}  
        onPageChange={ChangePage}  
        containerClassName={"paging"}  
        previouslinkClassName={"paging__link"}  
        nextLinkClassName={"paging__link"}
        pageClassName={"numb"}
        disabledClassName={"paging__link--disabled"}  
        activeClassName={"paging__link--active"} 
      /> 
      : 
      <span></span>
      }
      {Data.length !== 0 && Data !== undefined ? 
      <Back/>
      : 
      <span></span>
      }
  </section>;
}