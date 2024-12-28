import React from 'react';
import toast from 'react-hot-toast';
import {IconType} from 'react-icons';
import {
    LineChart,

    Line,

    // CartesianGrid,
    Tooltip,
    // Legend,
    ResponsiveContainer,
} from 'recharts';

interface ChartBoxProps {
    chartType: string; // 'line', 'bar', 'area', 'pie'
    color?: string;
    IconBox?: IconType;
    title?: string;
    dataKey?: string;
    number?: number | string;
    percentage?: number;
    chartData?: object[];
    chartPieData?: Array<{
        name: string;
        value: number;
        color: string;
    }>;
    chartAreaData?: Array<{
        name: string;
        smartphones: number;
        consoles: number;
        laptops: number;
        others: number;
    }>;
    isLoading?: boolean;
    isSuccess?: boolean;
}

const ChartBox: React.FC<ChartBoxProps> = ({
                                               chartType,
                                               color,
                                               IconBox,
                                               title,
                                               dataKey,
                                               number,
                                               percentage,
                                               chartData,

                                               isLoading,
                                               isSuccess,
                                           }) => {
    // Fallback for invalid or missing chartType
    if (!chartType || !['line', 'bar', 'area', 'pie'].includes(chartType)) {
        return (
            <div className="w-full h-full flex flex-col items-start justify-center p-4 border rounded-lg shadow-md">
                <div className="flex items-center gap-2">
                    {IconBox && (
                        <IconBox className="text-[24px] xl:text-[30px] 2xl:text-[42px]"/>
                    )}
                    <span className="text-[16px] xl:text-[20px] font-semibold">
            {title || 'Default Title'}
          </span>
                </div>
                <span className="text-xl xl:text-2xl font-bold">{number || '0'}</span>
            </div>
        );
    }

    if (chartType === 'line') {
        if (isLoading) {
            return (
                <div className="w-full h-full flex justify-between items-end xl:gap-5">
                    <div className="flex h-full flex-col justify-between items-start">
                        <div className="flex items-center gap-2">
                            {IconBox && (
                                <IconBox className="m-0 p-0 text-[24px] xl:text-[30px] 2xl:text-[42px] leading-none"/>
                            )}
                            <span
                                className="w-[88px] xl:w-[60px] 2xl:w-[82px] m-0 p-0 text-[16px] xl:text-[15px] 2xl:text-[20px] leading-[1.15] 2xl:leading-tight font-semibold">
                {title}
              </span>
                        </div>
                        <div className="skeleton w-16 h-6"></div>
                        <div className="skeleton w-12 h-4"></div>
                    </div>
                    <div className="flex h-full grow flex-col justify-between items-end">
                        <div className="skeleton w-20 h-10"></div>
                        <div className="skeleton w-16 h-6"></div>
                    </div>
                </div>
            );
        }

        if (isSuccess) {
            return (
                <div className="w-full h-full flex justify-between items-end xl:gap-5">
                    <div className="flex h-full flex-col justify-between items-start">
                        <div className="flex items-center gap-2">
                            {IconBox && (
                                <IconBox
                                    className="m-0 p-0 text-[24px] xl:text-[30px] 2xl:text-[42px] 3xl:text-[48px] leading-none"/>
                            )}
                            <span
                                className="w-[88px] xl:w-[60px] 2xl:w-[82px] 3xl:w-[140px] m-0 p-0 text-[16px] xl:text-[15px] 2xl:text-[20px] 3xl:text-[24px] leading-[1.15] 2xl:leading-tight font-semibold">
                {title}
              </span>
                        </div>
                        <span className="font-bold text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl m-0 p-0">
              {number}
            </span>
                        <button
                            onClick={() =>
                                toast('Ngapain?', {
                                    icon: '😋',
                                })
                            }
                            className="px-0 py-0 min-h-0 max-h-5 btn btn-link font-medium text-base-content no-underline m-0"
                        >
                            View All
                        </button>
                    </div>
                    <div className="flex h-full grow flex-col justify-between items-end">
                        <div className="w-full h-full xl:h-[60%]">
                            <ResponsiveContainer width="99%" height="100%">
                                <LineChart width={300} height={100} data={chartData}>
                                    <Line
                                        type="monotone"
                                        dataKey={dataKey}
                                        stroke={color}
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: color,
                                            border: 'none',
                                            color: 'white',
                                            borderRadius: '8px',
                                            paddingTop: '0px',
                                            paddingBottom: '0px',
                                        }}
                                        itemStyle={{color: 'white'}}
                                        labelStyle={{display: 'none'}}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div
                            className="flex xl:flex-col 2xl:flex-row gap-2 xl:gap-2 items-end xl:items-end 2xl:items-center">
              <span
                  className={`${
                      percentage && percentage > 0
                          ? 'text-success'
                          : 'text-error'
                  } text-2xl xl:text-xl 2xl:text-3xl font-bold`}
              >
                {percentage || ''}%
              </span>
                            <span className="font-medium xl:text-sm 2xl:text-base">
                this month
              </span>
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    }

    // Other chart types follow...
    return null;
};

export default ChartBox;
