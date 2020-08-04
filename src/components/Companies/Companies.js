import React, {useState, useEffect} from 'react'
import Company from './Company'
import {Link} from 'react-router-dom'
import JoblyApi from '../../JoblyApi'
import './Company.css'
import Pagination from '../Pagination'

/** Shows simple information about a company on the list 
 Search box filters companies using backend */

const Companies = () =>{
    const [formData, setFormData] = useState()
    const [companies, setCompanies] = useState([])
    const [comp, setComp] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(20)
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentComp = companies.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(() =>{
        async function getCompanies() {
          const result = await JoblyApi.getCompanies()
          setCompanies(result)      
        }
        getCompanies()
      },[]);

    const handleChange = (e) =>{
        setFormData(e.target.value)
    }

    const handleSubmit= (e) =>{
        e.preventDefault()
        search(formData)
    }

    async function search(term){
        const result = await JoblyApi.searchCompany(term)
        setComp([...result])
    }
    
    const compList = currentComp.map(c =>(
        <Company key={c.handle} 
                name={c.name} 
                desc={c.description} 
                logo_url={c.logo_url}
                handle={c.handle}
                /> 
    ))

    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    
    return(
        <div className="Companies">
            <h1>Companies</h1>
            <form onSubmit={handleSubmit} className="form">
            <input
            className="form-control" 
            type="text"
            name="name"
            placeholder="Enter search term..."
            onChange={handleChange}
            />
            <button className="btn btn-outline-secondary">Submit</button>
            </form>
      
            {comp ? comp.map(c=>(
                <>
                <Link to={`/company/${c.handle}`}>
                <Company name={c.name} desc={c.description}/> </Link></>))
             : <>{compList}</>
            }
            <Pagination postsPerPage={postsPerPage} totalPosts={companies.length} paginate={paginate}/>
        </div>
    )
    
}

export default Companies;