import React, { useEffect } from 'react';
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from 'react-icons/md';
import MiniStatistics from '../../../components/card/MiniStatistics';
import IconBox from '../../../components/icons/IconBox';
import { useGetDashboardStatisticsQuery } from '../../../features/dashboard';

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  // Fetch dashboard statistics
  const { data, error, isLoading } = useGetDashboardStatisticsQuery();

  if (isLoading) return <Box pt="130px">Loading...</Box>;
  if (error) return <Box pt="130px">Error loading data</Box>;

  const {
    downloads,
    activeUsers,
    activeProjects,
    activeInvestors,
    completedProjectsPercentage,
    ongoingProjectsPercentage,
  } = data?.data || {};

  return (
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }} gap='20px' mb='20px'>

          <MiniStatistics

              name='No. of Downloads'
              value={downloads}
          />
          <MiniStatistics

              name='No. of Active Users'
              value={activeUsers}
          />
          <MiniStatistics

              name='No. of Active Projects'
              value={activeProjects}
          />
          <MiniStatistics

              name='No. of Active Investors'
              value={activeInvestors}
          />
          <MiniStatistics

              name='% of Completed Projects'
              value={`${completedProjectsPercentage}%`}
          />
          <MiniStatistics

              name='% of Ongoing Projects'
              value={`${ongoingProjectsPercentage}%`}
          />
        </SimpleGrid>
      </Box>
  );
}
