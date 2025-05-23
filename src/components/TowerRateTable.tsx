
import React, { useState } from 'react';
import { towerData, TowerData } from '../data/towerData';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const TowerRateTable = () => {
  const [filteredTower, setFilteredTower] = useState<string | null>(null);
  
  const handleTowerClick = (tower: string) => {
    if (filteredTower === tower) {
      setFilteredTower(null); // Clear filter if clicking the same tower
    } else {
      setFilteredTower(tower); // Set filter to the clicked tower
    }
  };
  
  const filteredData = filteredTower 
    ? towerData.filter(item => item.tower === filteredTower)
    : towerData;

  // Group data by organization to handle row spans
  const groupedByOrg: Record<string, TowerData[]> = filteredData.reduce((acc, item) => {
    if (!acc[item.org]) {
      acc[item.org] = [];
    }
    acc[item.org].push(item);
    return acc;
  }, {} as Record<string, TowerData[]>);
  
  const orgEntries = Object.entries(groupedByOrg);

  return (
    <Card className="p-6 shadow-md">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Declined Rate by Tower</h2>
        <p className="text-sm text-muted-foreground">Click on a tower to filter</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 pr-4 font-semibold">Org</th>
              <th className="text-left py-3 pr-4 font-semibold">Tower</th>
              <th className="text-left py-3 pr-4 font-semibold">#Received Responses</th>
              <th className="text-left py-3 pr-4 font-semibold">
                <div className="flex items-center">
                  #Declined Responses
                </div>
              </th>
              <th className="text-left py-3 font-semibold w-1/5"></th>
            </tr>
          </thead>
          <tbody>
            {orgEntries.map(([org, items], orgIndex) => (
              <>
                {items.map((item, itemIndex) => (
                  <tr key={item.id} className="border-b hover:bg-muted/50">
                    {itemIndex === 0 && (
                      <td 
                        className="py-3 pr-4 align-top font-medium" 
                        rowSpan={items.length}
                      >
                        {org}
                      </td>
                    )}
                    <td 
                      className={cn("py-3 pr-4 cursor-pointer", 
                        filteredTower === item.tower && "font-medium")}
                      onClick={() => handleTowerClick(item.tower)}
                    >
                      {item.tower}
                    </td>
                    <td className="py-3 pr-4">{item.receivedResponses}</td>
                    <td className="py-3 pr-4">{item.declinedResponses}</td>
                    <td className="py-3 relative">
                      <div className="flex items-center w-full">
                        <div 
                          className="bg-blue-800 h-6" 
                          style={{ width: `${Math.min(100, item.declinedRate * 8)}%` }}
                        ></div>
                        <span className="ml-2">{item.declinedRate}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
