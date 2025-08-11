import { memo } from 'react';
import { 
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
};

interface ChartWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const ChartWrapper = memo(({ children, className }: ChartWrapperProps) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
});

ChartWrapper.displayName = 'ChartWrapper';

export default ChartWrapper;
