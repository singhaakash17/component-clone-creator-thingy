
export interface TowerData {
  id: string;
  org: string;
  tower: string;
  receivedResponses: number;
  declinedResponses: number;
  declinedRate: number;
}

export const towerData: TowerData[] = [
  {
    id: "1",
    org: "Transformation & Capabilities",
    tower: "Transformation",
    receivedResponses: 56,
    declinedResponses: 6,
    declinedRate: 4.6
  },
  {
    id: "2",
    org: "Transformation & Capabilities",
    tower: "CM",
    receivedResponses: 42,
    declinedResponses: 2,
    declinedRate: 3.1
  },
  {
    id: "3",
    org: "Transformation & Capabilities",
    tower: "Expansion",
    receivedResponses: 52,
    declinedResponses: 2,
    declinedRate: 2.9
  },
  {
    id: "4",
    org: "Business Support Operations",
    tower: "PBS",
    receivedResponses: 152,
    declinedResponses: 15,
    declinedRate: 3.7
  },
  {
    id: "5",
    org: "Business Support Operations",
    tower: "DM",
    receivedResponses: 402,
    declinedResponses: 26,
    declinedRate: 2.6
  },
  {
    id: "6",
    org: "Business Support Operations",
    tower: "ATR",
    receivedResponses: 61,
    declinedResponses: 0,
    declinedRate: 0
  },
  {
    id: "7",
    org: "Business Operations",
    tower: "TTC",
    receivedResponses: 361,
    declinedResponses: 19,
    declinedRate: 3.2
  },
  {
    id: "8",
    org: "Business Operations",
    tower: "GEB",
    receivedResponses: 154,
    declinedResponses: 23,
    declinedRate: 8.4
  }
];
