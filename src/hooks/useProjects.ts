// src/hooks/useProjects.ts
import { useGetProjectsQuery } from '../features/project/index';

const useProjects = () => {
       const { data: projects = [], error, isLoading, refetch } = useGetProjectsQuery();
       return { projects, error, isLoading, refetch };
};

export default useProjects;
