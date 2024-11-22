import React from 'react';
import { LineChart as MuiLineChart } from '@mui/x-charts/LineChart';

export const LineChart = () => {
    return (
        <MuiLineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
                {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
                {
                    data: [5, 1.5, 8.5, 2, 5.5, 2],
                },
            ]}
            height={300}
        />
    );
};
