import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import JoblyApi from '../../JoblyApi'
import Job from '../Jobs/Job'
import './Company.css'
import UserContext from '../User/UserContext'
import JobContext from '../JobContext'

/** Fetches information about a single company and available jobs for the company */

const CompanyDetail = () =>{
    const [detail] = useState([])
    const { handle } = useParams()
    const { curUser } = useContext(UserContext)
    const [compJobs, setCompJobs] = useState([])
    const {setJobs} = useContext(JobContext)
        
    useEffect(() =>{
        async function fetchComp() {
            try{
            let result = await JoblyApi.getCompany(handle)
            let user = curUser.username
            let res = await JoblyApi.getUser(user)
            let userJob = res.jobs
            let jobId = new Set(userJob.map(job=>job.id))
            result.jobs=result.jobs.map(job=>({
                ...job,
                state: jobId.has(job.id) ? "applied" : null
            }))
            setCompJobs([...result.jobs])
        }catch(err){
            console.log(err);
            }
        }
        fetchComp(handle)
    },[handle, curUser])

    async function apply(idx){
        let jobId = compJobs[idx].id
        let msg = await JoblyApi.jobApply(jobId)
 
       setCompJobs(j => j.map(job=> 
         job.id === jobId ? {...job, state: msg} : job))
        setJobs(j => j.map(job=> 
         job.id === jobId ? {...job, state: msg} : job)) 
    }
    
    async function removeApply(idx){
        let jobId = compJobs[idx].id
        const msg = await JoblyApi.removeApp(jobId)
        
       setCompJobs(j => j.map(job=> 
         job.id === jobId ? {...job, state: msg} : job))

        setJobs(j => j.map(job=> 
            job.id === jobId ? {...job, state: msg} : job)) 
    }


    const jobsList = compJobs.map((j,idx)=>(
        <Job key={j.id} 
        idx={idx}
        title={j.title} 
        salary={j.salary} 
        equity={j.equity}
        apply={apply}
        state={j.state}
        removeApply={removeApply}
        />
    ))

    return(
        <div className="CompanyDetail">
            <div className="CompanyInfo">
            <h2>Company Details</h2>
            {detail.map((d, idx)=>(
                <div key={`Company-Details-${idx}`}>
                <div className="title">{d.name}</div>
                <div>{d.description}</div> 
                </div>
            ))}
            </div>
            {jobsList}
        </div>
    )

}

export default CompanyDetail;