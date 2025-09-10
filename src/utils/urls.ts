export const Urls ={
  addJobApplication: (subdomain: string, jobId: string) =>
    `http://${subdomain}lvh.me:3001/api/v1/jobs/${jobId}/applications`,

  addJob: (subdomain: string) =>
    `http://${subdomain}lvh.me:3001/api/v1/jobs`,

  allApplications: (subdomain: string, query: string) =>
    `http://${subdomain}lvh.me:3001/api/v1/applications?${query}`,

  fetchApplicationDetails: (subdomain: string, jobId: string, id: string) =>
    `http://${subdomain}lvh.me:3001/api/v1/jobs/${jobId}/applications/${id}`,

  applicationStatusChange: (subdomain: string, jobId: string, id: string) =>
    `http://${subdomain}lvh.me:3001/api/v1/jobs/${jobId}/applications/${id}/change_status`,

  fetchJobApplications: (subdomain: string, jobId: string, query: string) =>
    `http://${subdomain}lvh.me:3001/api/v1/jobs/${jobId}/applications?${query}`,

  signup: () =>
    `http://lvh.me:3001/signup`,

  editJob: (subdomain: string, id: string) =>
    `http://${subdomain}lvh.me:3001/api/v1/jobs/${id}`,

  fetchApplications: (subdomain: string) =>
    `http://${subdomain}lvh.me:3001/api/v1/applications/`,

  fetchJobDetails: (subdomain: string, id: string) =>
    `http://${subdomain}lvh.me:3001/api/v1/jobs/${id}`,

  fetchCompanyDetails: (subdomain: string, id: string) =>
    `http://${subdomain}lvh.me:3001/api/v1/show/${id}`,

  deleteJob: (subdomain: string, id: string) =>
    `http://${subdomain}lvh.me:3001/api/v1/jobs/${id}`,

  fetchJobs: (subdomain: string, page: string, query: string) =>
    `http://${subdomain}lvh.me:3001/api/v1/jobs?page=${page}&${query}`,

  getComapnies: () =>
    "http://lvh.me:3001/api/v1/",

  login: () =>
    "http://lvh.me:3001/login",

  updateProfile: (subdomain: string) =>
    `http://${subdomain}lvh.me:3001/signup`,

  fetchMe: (subdomain: string) => 
    `http://${subdomain}lvh.me:3001/api/v1/me`,

  fetchAllUsers: () =>
    "http://admin.lvh.me:3001/api/v1/users/get_all",


  deleteUser: (id: string) =>
    `http://admin.lvh.me:3001/api/v1/users/${id}`
}