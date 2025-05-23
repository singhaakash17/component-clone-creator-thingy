
import { TowerRateTable } from "@/components/TowerRateTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Tower Analytics Dashboard</h1>
        <TowerRateTable />
      </div>
    </div>
  );
};

export default Index;
