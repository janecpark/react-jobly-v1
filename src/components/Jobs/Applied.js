import React, {useContext, useState, useEffect} from 'react'
import UserContext from '../User/UserContext'
import Job from './Job'
import JoblyApi from '../../JoblyApi'
import JobContext from '../JobContext'

/** Shows a list of jobs that have been applied by the user */


const Applied = () =>{
    const [userJobs, setUserJobs] = useState([])
    const {jobs, setJobs} = useContext(JobContext)
    const {curUser} = useContext(UserContext)

    useEffect(() =>{
        async function fetchJob(){
        try{

            let user = await curUser.username
            let res = await JoblyApi.getUser(user)

            let appliedJobId = res.jobs.map(job=>job.id)
            
            let applied = jobs.filter(function(job){
              return appliedJobId.includes(job.id)
            })
            setUserJobs(applied)
        
        }catch(err){
            console.log(err);
        }

    }fetchJob()
    },[])
    
    const jobsList = userJobs.map((j,idx)=>(
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

    async function apply(idx){
        let jobId = userJobs[idx].id
        let msg = await JoblyApi.jobApply(jobId)
        
       setUserJobs(j => j.map(job=> 
         job.id === jobId ? {...job, state: msg} : job))

         setJobs(j => j.map(job=> 
            job.id === jobId ? {...job, state: msg} : job)) 

    }
    
    async function removeApply(idx){
        let jobId = userJobs[idx].id
        const msg = await JoblyApi.removeApp(jobId)
       
       setUserJobs(j => j.map(job=> 
         job.id === jobId ? {...job, state: msg} : job))

         setJobs(j => j.map(job=> 
            job.id === jobId ? {...job, state: msg} : job))
    }

    return(
        <div className="Applied" >
            <h1 style={{textAlign:'center'}}>Jobs Applied</h1>
            {userJobs.length ?<> {jobsList} </>: 
            <h2 style={{textAlign:'center'}}>No Applications yet!</h2>}
        </div>
    )
}

export default Applied;