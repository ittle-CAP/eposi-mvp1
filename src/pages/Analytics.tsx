
import { useEffect, useState } from "react";
import { Header } from "@/components/navigation/header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, BarChartIcon, Activity, Users } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";
import { CharacterEngagementChart } from "@/components/analytics/CharacterEngagementChart";
import { CharacterEngagementTable } from "@/components/analytics/CharacterEngagementTable";
import { TopCharactersCard } from "@/components/analytics/TopCharactersCard";

const Analytics = () => {
  const { 
    characterEngagementData, 
    isLoading, 
    error, 
    fetchCharacterEngagementData 
  } = useAnalytics();

  useEffect(() => {
    fetchCharacterEngagementData();
  }, [fetchCharacterEngagementData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container pt-24 pb-16 mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-gray-500 mt-1">View engagement metrics across all characters</p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Activity size={16} />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="characters" className="flex items-center gap-2">
                <Users size={16} />
                <span>Character Engagement</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <TopCharactersCard title="Most Generated" metric="generations" />
                <TopCharactersCard title="Most Unlocked" metric="unlocks" />
                <TopCharactersCard title="Newest Characters" metric="newest" />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Daily Engagement Overview</CardTitle>
                  <CardDescription>
                    Total character interactions over the past 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <CharacterEngagementChart 
                      data={characterEngagementData} 
                      isLoading={isLoading} 
                      error={error} 
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="characters" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Character Engagement Details</CardTitle>
                  <CardDescription>
                    Detailed breakdown of character usage and performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CharacterEngagementTable 
                    data={characterEngagementData} 
                    isLoading={isLoading} 
                    error={error} 
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
