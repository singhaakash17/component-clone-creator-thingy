
import React, { useState } from 'react';
import { towerData, TowerData } from '../data/towerData';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Org</TableHead>
              <TableHead>Tower</TableHead>
              <TableHead>#Received Responses</TableHead>
              <TableHead>#Declined Responses</TableHead>
              <TableHead className="w-1/5"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orgEntries.map(([org, items]) => (
              // We need this React.Fragment with key for proper rendering
              <React.Fragment key={org}>
                {items.map((item, itemIndex) => (
                  <TableRow key={item.id}>
                    {itemIndex === 0 && (
                      <TableCell 
                        className="font-medium align-top"
                        rowSpan={items.length}
                      >
                        {org}
                      </TableCell>
                    )}
                    <TableCell 
                      className={cn("cursor-pointer", 
                        filteredTower === item.tower && "font-medium")}
                      onClick={() => handleTowerClick(item.tower)}
                    >
                      {item.tower}
                    </TableCell>
                    <TableCell>{item.receivedResponses}</TableCell>
                    <TableCell>{item.declinedResponses}</TableCell>
                    <TableCell className="relative">
                      <div className="flex items-center w-full">
                        <div 
                          className="bg-blue-800 h-6" 
                          style={{ width: `${Math.min(100, item.declinedRate * 8)}%` }}
                        ></div>
                        <span className="ml-2">{item.declinedRate}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
