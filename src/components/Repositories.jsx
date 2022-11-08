import { useEffect, useRef,useState } from "react";
import Loading from './Loading'
import Back from "./Back";
import ReactPaginate from 'react-paginate';
import '../styles/repositories.css'

export default function Repositories() {
  const repos = useRef(null);
  const [Data, setData] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(null)
  const itemsCount = 5
  

  useEffect(() => {
    async function getRepos() {
      let url = "/repos.json";
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
      }, 1000)

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
          window.location.href = `${data.html_url}`
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