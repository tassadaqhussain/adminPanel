import { injectEndpoints } from '../baseQuery';

export interface ConfiguredProject {
    id: number;
    name: string;
    investment_percentage: number;
    investment_period: string;
    min_investment_amount: number;
    is_active: boolean;
}

interface GetConfiguredProjectsResponse {
    data: ConfiguredProject[];
    total: number;
    page: number;
    pageSize: number;
}

export const configurationSlice = injectEndpoints({
    endpoints: (builder) => ({
        // Fetch configured projects with pagination
        getConfiguredProjects: builder.query<GetConfiguredProjectsResponse, { page: number; pageSize: number }>({
            query: ({ page, pageSize }) => ({
                url: 'configured-projects-list',
                method: 'POST',
                params: { page, pageSize },
            }),
            providesTags: ['ConfiguredProject'], // Tag to invalidate cache
        }),

        // Add a new configured project
        addConfiguredProject: builder.mutation<void, Partial<ConfiguredProject>>({
            query: (newConfiguredProject) => ({
                url: 'configured-projects',
                method: 'POST',
                body: newConfiguredProject,
            }),
            invalidatesTags: ['ConfiguredProject'], // Invalidate cache after mutation
        }),

        // Update an existing configured project
        updateConfiguredProject: builder.mutation<void, { id: number; updates: Partial<ConfiguredProject> }>({
            query: ({ id, updates }) => ({
                url: `configured-projects/${id}`,
                method: 'PUT',
                body: updates,
            }),
            invalidatesTags: ['ConfiguredProject'], // Invalidate cache after mutation
        }),

        // Delete an existing configured project
        deleteConfiguredProject: builder.mutation<void, { id: number }>({
            query: ({ id }) => ({
                url: `configured-projects/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ConfiguredProject'], // Invalidate cache after deletion
        }),
    }),
});

export const {
    useGetConfiguredProjectsQuery,
    useAddConfiguredProjectMutation,
    useUpdateConfiguredProjectMutation,
    useDeleteConfiguredProjectMutation,
} = configurationSlice;
