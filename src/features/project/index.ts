import {injectEndpoints} from '../baseQuery';

export interface Project {
    id: number;
    name: string;
    location: string;
    size: string;
    funding: string;
    annual_return: string;
    gross_yield: string;
    net_yield: string;
    created_at: string;
    updated_at: string;

}

interface ProjectsResponse {
    success: boolean;
    data: Project[];
    message: string;
}


interface getProjectsPaginationResponse {
    data: Project[];
    total: number;
    page: number;
    pageSize: number;
}

export const projectSlice = injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query<Project[], void>({
                query: () => 'get-farms',
                transformResponse: (response: ProjectsResponse) => response.data,
            }
        ),
        addProject: builder.mutation({
            query: (formData: FormData) => ({
                url: 'add-project',
                method: 'POST',
                body: formData,
                headers: {
                    // 'Content-Type': 'multipart/form-data', // Usually not needed as the browser sets this
                },
            }),
            invalidatesTags: ['Project'],
        }),
        getProjectsPagination: builder.query<getProjectsPaginationResponse, { page: number, pageSize: number }>({
            query: ({page, pageSize}) => ({
                url: 'get-project-list',
                method: 'GET',
                params: {page, pageSize},
            }),
            providesTags: ['Project'],
        }),

    }),
});

export const {useGetProjectsQuery, useAddProjectMutation, useLazyGetProjectsPaginationQuery} = projectSlice;
