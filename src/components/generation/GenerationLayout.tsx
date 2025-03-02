
import { ReactNode } from "react";
import { Header } from "@/components/navigation/header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Video, Image } from "lucide-react";

interface GenerationLayoutProps {
  imageContent: ReactNode;
  videoContent: ReactNode;
  title?: string;
  defaultTab?: string;
}

export const GenerationLayout = ({
  imageContent,
  videoContent,
  title = "AI Content Generator",
  defaultTab = "image"
}: GenerationLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <div className="container mx-auto max-w-4xl px-4 pt-24">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">{title}</h1>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Image Generation
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Video Generation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="image" className="rounded-lg bg-white p-6 shadow-lg">
            {imageContent}
          </TabsContent>

          <TabsContent value="video" className="rounded-lg bg-white p-6 shadow-lg">
            {videoContent}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
