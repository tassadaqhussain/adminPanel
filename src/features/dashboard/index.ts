
import { injectEndpoints } from '../baseQuery';

// Define the interface for the response data
interface DashboardStatistics {
    downloads: number;
    activeUsers: number;
    activeProjects: number;
    activeInvestors: number;
    completedProjectsPercentage: number;
    ongoingProjectsPercentage: number;
}

// Define the response structure
interface GetDashboardStatisticsResponse {
    data: DashboardStatistics;
}

export const dashboardApi = injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStatistics: builder.query<GetDashboardStatisticsResponse, void>({
            query: () => ({
                url: 'dashboard-statistics',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetDashboardStatisticsQuery } = dashboardApi;
