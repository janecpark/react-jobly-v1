import axios from "axios";

/** API endpoints for the routes */
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001" 
class JoblyApi {
    static async request(endpoint, params = {}, verb = "get") {
   
      let _token =localStorage.getItem('token')
      let q;

      if(verb==="get"){
          q= axios.get(
            `${BASE_URL}/${endpoint}`, {params: {_token, ...params}});
      }else if(verb==="post"){
          q = axios.post(
            `${BASE_URL}/${endpoint}`, {_token, ...params})
      }else if(verb==="patch"){
          q = axios.patch(
            `${BASE_URL}/${endpoint}`, {_token, ...params}
          )
      }else if(verb==="delete"){
          q = axios.delete(
            `${BASE_URL}/${endpoint}`, {_token, ...params}
          )
      }

      try {
        return (await q).data;
      }
  
      catch(err) {
        console.error("API Error:", err.response);
        let message = err.response.data.message;
        throw Array.isArray(message) ? message : [message];
      }
    }
  
    static async getCompany(handle) {
      let res = await this.request(`companies/${handle}`);
      return res.company;
    }
    static async getCompanies(){
      let res = await this.request(`companies/`);
      return res.companies;
    }

    static async searchCompany(handle){
      let res = await this.request(`companies/`, {search: handle})
      return res.companies;
    }

    static async getJobs(){
      let res = await this.request(`jobs/`)
      return res.jobs
    }
    static async getJob(id){
      let res = await this.request(`jobs/${id}`)
      return res.job
    }
    static async searchJob(id){
      let res = await this.request(`jobs`, {search: id})
      return res.jobs
    }
    static async login(data){
      let res = await this.request(`login`, data, "post")
      return res.token
    }
    static async getUser(data){
      let res = await this.request(`users/${data}`)
      return res.user
    }
    static async jobApply(id){
      let res = await this.request(`jobs/${id}/apply`,{}, "post")
      return res.message
    }
    static async updateUser(username, data){
      let res = await this.request(`users/${username}`, data, "patch")
      return res.user;
    }
    static async removeApp(id){
      let res = await this.request(`jobs/${id}/removeApp`, {}, "delete")
      return res.message
    }
    static async signUp(data){
      let res = await this.request(`users/`, data, "post")
      return res.token
    }
  }

  export default JoblyApi
