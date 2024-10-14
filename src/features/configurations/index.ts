import { injectEndpoints } from '../baseQuery';

export interface ConfiguredProject { // Ensure this is exported
    id: number;
    name: string;
    investment_percentage: string;
    investment_period: string;
    min_investment_amount: string;
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
        getConfiguredProjects: builder.query<GetConfiguredProjectsResponse, { page: number, pageSize: number }>({
            query: ({ page, pageSize }) => ({
                url: 'configured-projects',
                method: 'GET',
                params: { page, pageSize },
            }),
            providesTags: ['ConfiguredProject'],
        }),
        addConfiguredProject: builder.mutation<void, Partial<ConfiguredProject>>({
            query: (newConfiguredProject) => ({
                url: 'configured-projects',
                method: 'POST',
                body: newConfiguredProject,
            }),
            invalidatesTags: ['ConfiguredProject'],
        }),

    }),
});

export const { useGetConfiguredProjectsQuery, useAddConfiguredProjectMutation } = configurationSlice;
