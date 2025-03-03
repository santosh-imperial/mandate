
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

const taskData = [
  { name: "Mon", completed: 4, pending: 2 },
  { name: "Tue", completed: 6, pending: 1 },
  { name: "Wed", completed: 5, pending: 3 },
  { name: "Thu", completed: 7, pending: 2 },
  { name: "Fri", completed: 3, pending: 4 },
  { name: "Sat", completed: 2, pending: 2 },
  { name: "Sun", completed: 1, pending: 5 },
];

const categoryDistribution = [
  { name: "Work", value: 40 },
  { name: "Personal", value: 25 },
  { name: "Routine", value: 25 },
  { name: "Focus", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const completionTrend = [
  { name: "Week 1", completion: 60 },
  { name: "Week 2", completion: 75 },
  { name: "Week 3", completion: 65 },
  { name: "Week 4", completion: 80 },
];

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow p-6">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4">
              <h2 className="text-xl font-semibold mb-4">Tasks Overview (This Week)</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={taskData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#4ade80" name="Completed" />
                    <Bar dataKey="pending" fill="#f87171" name="Pending" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card className="p-4">
              <h2 className="text-xl font-semibold mb-4">Task Distribution by Category</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card className="p-4 md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Task Completion Trend</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={completionTrend}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="completion" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                      name="Completion Rate %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AnalyticsPage;
