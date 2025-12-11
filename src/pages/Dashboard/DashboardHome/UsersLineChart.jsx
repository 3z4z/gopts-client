import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { axiosInstance } from "../../../utils/axiosInstance";
import QueryLoader from "../../../components/Common/Loaders/QueryLoader";
import dayjs from "dayjs";
import { useState } from "react";

// #region Sample data
const formatXAxisDate = (tickItem) => {
  return dayjs(tickItem).format("DD MMM, YY");
};
export default function UsersLineChart() {
  const [time, setTime] = useState("last-week");
  const { data: data = [], isLoading } = useQuery({
    queryKey: ["users", time],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/users/stats?timeInfo=${time || "last-week"}`
      );
      return res.data;
    },
  });
  return (
    <div className="rounded-2xl shadow-lg bg-base-200 p-6 border border-primary/8 h-max">
      <div className="flex justify-between items-center mb-6">
        <p className="text-neutral/70 font-bold">Total Users by day</p>
        <select
          className="select w-max bg-base-200"
          onChange={(e) => setTime(e.target.value)}
          value={time}
        >
          <option value="last-week">Last 1 Week</option>
          <option value="last-15-days">Last 15 Days</option>
          <option value="last-30-days">Last 1 Month</option>
        </select>
      </div>
      {isLoading ? (
        <QueryLoader />
      ) : (
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 20,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" tickFormatter={formatXAxisDate} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalUsers"
                name="Total Users"
                stroke="#294778"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
