import React, {useState, useContext} from 'react'
import Job from './Job'
import JoblyApi from '../../JoblyApi'
import JobContext from '../JobContext'
import Pagination from '../Pagination'

/** Shows simple information about a company on the list 
 Search box filters companies using backend */

const Jobs = () =>{
    const [formData, setFormData] = useState()
    const { jobs, setJobs} = useContext(JobContext)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(20)
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentJob = jobs.slice(indexOfFirstPost, indexOfLastPost);

    const handleChange = (e)=>{
        setFormData(e.target.value)
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        search(formData)
        setFormData('')
    }

    async function search(term){
        const result = await JoblyApi.searchJob(term)
        setJobs(result)
    } 

    async function apply(idx){
        let jobId = jobs[idx].id

        let msg = await JoblyApi.jobApply(jobId)
        
        
       setJobs(j => j.map(job=> 
         job.id === jobId ? {...job, state: msg} : job))
    }

    async function removeApply(idx){
        let jobId = jobs[idx].id
        const msg = await JoblyApi.removeApp(jobId)
        
       setJobs(j => j.map(job=> 
         job.id === jobId ? {...job, state: msg} : job))
    }

    const jobList = currentJob.map((j,idx) =>(
            <Job key={idx}
                    idx={idx}
                    title={j.title} 
                    salary={j.salary} 
                    equity={j.equity} 
                    company_handle={j.company_handle}
                    apply={apply}
                    state={j.state}
                    removeApply={removeApply}
                    /> 
        ))
        
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    
    return(
        <div className="Jobs">
            <h1>Jobs</h1>    
            <form className="form" onSubmit={handleSubmit}>
                <input 
                className="form-control"
                type="text"
                name="title"
                placeholder="Enter search term..."
                onChange={handleChange}
                />
                <button className="btn btn-outline-secondary">Submit</button>
            </form>
            {jobList}
            <Pagination postsPerPage={postsPerPage} totalPosts={jobs.length} paginate={paginate}/>
        </div>
    )
}

export default Jobs;