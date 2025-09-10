export interface ApplicationModel {
  id: number;
  user_id: number;
  job_id: number;
  name: string;
  age: number;
  yoe: number;
  status: string;
  email: string;
  resume: string;
}

export interface JobModel {
  location: string;
  salary: number;
  title: string;
  id: number;
  description: string;
  company_id: number;
  brochure: string | undefined;
  jobDescription: string | undefined;
}

interface ApplicationApiResponse {
  id: string;
  attributes: {
    user_id: number;
    job_id: number;
    name: string;
    age: number;
    yoe: number;
    status: string;
    email: string;
    resume: string;
  };
}

export function convertApplicationData(
  apiData: ApplicationApiResponse,
): ApplicationModel {
  return {
    id: Number(apiData.id),
    user_id: apiData.attributes.user_id,
    job_id: apiData.attributes.job_id,
    name: apiData.attributes.name,
    age: apiData.attributes.age,
    yoe: apiData.attributes.yoe,
    status: apiData.attributes.status,
    email: apiData.attributes.email,
    resume: apiData.attributes.resume,
  };
}

export function convertApplicationsList(
  apiDataList: ApplicationApiResponse[],
): ApplicationModel[] {
  return apiDataList.map(convertApplicationData);
}

export interface Application {
  id: number;
  status: string;
}

export function convertApplication(
  apiData: ApplicationApiResponse,
): Application {
  return {
    id: Number(apiData.id),
    status: apiData.attributes.status,
  };
}

interface CompanyApiResponse {
  id: string | number;
  attributes: {
    email: string;
    name: string;
    subdomain: string;
  };
}

export interface Company {
  id: number;
  subdomain: string;
  email: string;
  name: string;
}

export function convertCompany(apiData: CompanyApiResponse): Company {
  return {
    id: Number(apiData.id),
    email: apiData.attributes.email,
    name: apiData.attributes.name,
    subdomain: apiData.attributes.subdomain,
  };
}

export function convertCompaniesList(
  apiDataList: CompanyApiResponse[],
): Company[] {
  return apiDataList.map(convertCompany);
}

export interface CompanyApplication {
  id: number;
  company_id: number;
  status: string;
}

interface CompanyApplicationApiResponse {
  id: string | number;
  attributes: {
    company_id: number;
    status: string;
  };
}

export function convertCompanyApplication(
  apiData: CompanyApplicationApiResponse,
): CompanyApplication {
  return {
    id: Number(apiData.id),
    company_id: apiData.attributes.company_id,
    status: apiData.attributes.status,
  };
}

export function convertCompanyApplicationsList(
  apiDataList: CompanyApplicationApiResponse[],
): CompanyApplication[] {
  return apiDataList.map(convertCompanyApplication);
}

interface JobApiResponse {
  id: string | number;
  attributes: {
    title: string;
    description: string;
    salary?: number;
    location: string;
    company_id: number;
    brochure?: string;
    job_description?: string;
  };
}

export function convertJob(apiData: JobApiResponse): JobModel {
  return {
    id: Number(apiData.id),
    title: apiData.attributes.title,
    description: apiData.attributes.description,
    salary: apiData.attributes.salary ?? 0,
    location: apiData.attributes.location,
    company_id: apiData.attributes.company_id,
    brochure: apiData.attributes.brochure,
    jobDescription: apiData.attributes.job_description,
  };
}

export function convertJobsList(apiDataList: JobApiResponse[]): JobModel[] {
  return apiDataList.map(convertJob);
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

interface UserApiResponse {
  id: string;
  attributes: {
    email: string;
    name: string | null;
    role: string;
  };
}

export function convertUser(apiData: UserApiResponse): User {
  return {
    id: apiData.id,
    email: apiData.attributes.email,
    name: apiData.attributes.name,
    role: apiData.attributes.role,
  };
}

export function convertUsersList(apiDataList: UserApiResponse[]): User[] {
  return apiDataList.map(convertUser);
}
