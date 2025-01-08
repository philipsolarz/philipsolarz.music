import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutGrid, List } from 'lucide-react'
import { TrackGrid } from "./track-grid"
import { TrackList } from "./track-list"
import tracksData from '@/data/tracks.json'
import { ParticleBackground } from "../components/particle-background"

export default function TracksPage() {
    return (
        <main className="relative min-h-screen w-full bg-black text-white p-4 md:p-8 pb-24">
            <ParticleBackground />

            <div className="relative z-10 max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold tracking-tighter">Tracks</h1>
                    <p className="text-muted-foreground">Explore my latest electronic and techno productions</p>
                </div>

                <Tabs defaultValue="grid" className="w-full">
                    <div className="flex justify-end mb-6">
                        <TabsList className="bg-white/5 border border-white/10">
                            <TabsTrigger value="grid" className="data-[state=active]:bg-white/10">
                                <LayoutGrid className="h-4 w-4" />
                            </TabsTrigger>
                            <TabsTrigger value="list" className="data-[state=active]:bg-white/10">
                                <List className="h-4 w-4" />
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="grid" className="mt-0">
                        <TrackGrid tracks={tracksData.tracks} />
                    </TabsContent>

                    <TabsContent value="list" className="mt-0">
                        <TrackList tracks={tracksData.tracks} />
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    )
}

