import { type FC, memo, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartDataPoint {
  time: string;
  value: number;
}

interface RateChartProps {
  code?: string;
  rate: string;
}

const RateChart: FC<RateChartProps> = ({ rate }) => {
  const data = useMemo<ChartDataPoint[]>(() => {
    const now = new Date();
    const arr: ChartDataPoint[] = [];

    const base = Number(rate);
    const isValid = !isNaN(base);

    for (let i = 23; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 60 * 60 * 1000);
      const hour = d.getHours().toString().padStart(2, '0');

      const randomDelta = isValid ? base * (1 + (Math.random() - 0.5) * 0.1) : 0;

      arr.push({
        time: `${hour}:00`,
        value: parseFloat(randomDelta.toFixed(6)),
      });
    }

    return arr;
  }, [rate]);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis
            domain={['auto', 'auto']}
            tickFormatter={(v) => v.toFixed(2)}
            tick={{ fontSize: 12 }}
          />
          <Tooltip formatter={(value: number) => value.toFixed(2)} />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(RateChart);
