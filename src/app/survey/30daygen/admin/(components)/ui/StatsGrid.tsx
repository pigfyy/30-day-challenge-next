import { Card, CardContent } from "@/components/ui/card";

export interface StatsGridItem {
  title: string;
  backgroundColor: string;
  allUsers: { percentage: number; count: number };
  min3Queries: { percentage: number; count: number };
  min5Queries: { percentage: number; count: number };
}

interface StatsGridProps {
  items: StatsGridItem[];
}

export function StatsGrid({ items }: StatsGridProps) {
  const getGridColsClass = (itemCount: number) => {
    if (itemCount <= 2) return "grid-cols-1 md:grid-cols-2";
    if (itemCount <= 3) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    if (itemCount <= 4) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    if (itemCount <= 5)
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
    if (itemCount <= 6)
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6";
    if (itemCount === 7)
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  };

  return (
    <div className={`grid gap-4 ${getGridColsClass(items.length)}`}>
      {items.map((item, index) => (
        <Card key={index} className={item.backgroundColor}>
          <CardContent className="p-4">
            <h4 className="text-md mb-4 text-center font-semibold">
              {item.title}
            </h4>

            <div className="space-y-3">
              <div className="text-center">
                <p className="text-muted-foreground text-xs">All Users</p>
                <p className="text-lg font-bold">
                  {item.allUsers.percentage.toFixed(1)}%
                </p>
                <p className="text-muted-foreground text-xs">
                  ({item.allUsers.count} responses)
                </p>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground text-xs">≥3 Queries</p>
                <p className="text-lg font-bold">
                  {item.min3Queries.percentage.toFixed(1)}%
                </p>
                <p className="text-muted-foreground text-xs">
                  ({item.min3Queries.count} responses)
                </p>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground text-xs">≥5 Queries</p>
                <p className="text-lg font-bold">
                  {item.min5Queries.percentage.toFixed(1)}%
                </p>
                <p className="text-muted-foreground text-xs">
                  ({item.min5Queries.count} responses)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
