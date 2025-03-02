
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, PlayCircle, Clock, Bookmark, BookmarkCheck, Heart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const podcastsData = [
  {
    id: '1',
    title: 'Understanding Market Volatility',
    description: 'Expert analysis on how to navigate volatile markets and maintain a balanced portfolio during times of uncertainty.',
    imageUrl: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '32 min',
    date: 'May 15, 2023',
    audioUrl: 'https://example.com/podcast1.mp3',
    category: 'Investing',
  },
  {
    id: '2',
    title: 'The Future of Digital Banking',
    description: 'Exploring how fintech innovations are reshaping traditional banking and what this means for consumers and investors.',
    imageUrl: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '45 min',
    date: 'Jun 3, 2023',
    audioUrl: 'https://example.com/podcast2.mp3',
    category: 'Technology',
  },
  {
    id: '3',
    title: 'Retirement Planning Essentials',
    description: 'Key strategies for effective retirement planning at any age, with guidance on maximizing your savings and investments.',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '28 min',
    date: 'Jun 20, 2023',
    audioUrl: 'https://example.com/podcast3.mp3',
    category: 'Planning',
  },
  {
    id: '4',
    title: 'Global Economic Trends',
    description: 'Analysis of current global economic indicators and their potential impact on various markets and investment strategies.',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '52 min',
    date: 'Jul 8, 2023',
    audioUrl: 'https://example.com/podcast4.mp3',
    category: 'Economy',
  },
  {
    id: '5',
    title: 'Tax Optimization Strategies',
    description: 'Expert advice on legal tax optimization approaches for individuals and small businesses to maximize after-tax returns.',
    imageUrl: 'https://images.unsplash.com/photo-1586486855514-8c737958e1a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '36 min',
    date: 'Jul 25, 2023',
    audioUrl: 'https://example.com/podcast5.mp3',
    category: 'Planning',
  },
  {
    id: '6',
    title: 'Cryptocurrency Investment Guide',
    description: 'A comprehensive look at cryptocurrency investing, blockchain technology, and how to integrate digital assets into your portfolio.',
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    duration: '42 min',
    date: 'Aug 12, 2023',
    audioUrl: 'https://example.com/podcast6.mp3',
    category: 'Technology',
  },
];

const Podcast = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [likedPodcasts, setLikedPodcasts] = useState<string[]>([]);
  const [bookmarkedPodcasts, setBookmarkedPodcasts] = useState<string[]>([]);

  const handleLike = (id: string) => {
    if (likedPodcasts.includes(id)) {
      setLikedPodcasts(likedPodcasts.filter(podcastId => podcastId !== id));
      toast({
        title: "Removed from liked podcasts",
        description: "The podcast has been removed from your liked list",
      });
    } else {
      setLikedPodcasts([...likedPodcasts, id]);
      toast({
        title: "Added to liked podcasts",
        description: "The podcast has been added to your liked list",
      });
    }
  };

  const handleBookmark = (id: string) => {
    if (bookmarkedPodcasts.includes(id)) {
      setBookmarkedPodcasts(bookmarkedPodcasts.filter(podcastId => podcastId !== id));
      toast({
        title: "Removed from bookmarks",
        description: "The podcast has been removed from your bookmarks",
      });
    } else {
      setBookmarkedPodcasts([...bookmarkedPodcasts, id]);
      toast({
        title: "Bookmarked",
        description: "The podcast has been added to your bookmarks",
      });
    }
  };

  const filteredPodcasts = podcastsData.filter((podcast) => {
    const matchesSearch = podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         podcast.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || podcast.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(podcastsData.map(podcast => podcast.category)))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="bg-muted/30 py-12">
          <div className="container px-4 mx-auto">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold mb-4">Financial Podcasts</h1>
              <p className="text-lg text-muted-foreground">
                Listen to expert discussions on finance, markets, and investment strategies.
              </p>
            </div>
          </div>
        </section>
        
        {/* Search and Filters */}
        <section className="py-8 border-b">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col space-y-4">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search podcasts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="flex flex-wrap h-auto">
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category} className="capitalize">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* Podcasts List */}
        <section className="py-12">
          <div className="container px-4 mx-auto">
            {filteredPodcasts.length > 0 ? (
              <div className="space-y-6">
                {filteredPodcasts.map((podcast) => (
                  <Card key={podcast.id} className="overflow-hidden card-hover">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 h-48 md:h-auto overflow-hidden">
                        <img 
                          src={podcast.imageUrl} 
                          alt={podcast.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col flex-grow p-6">
                        <CardHeader className="p-0 pb-4">
                          <div className="flex justify-between">
                            <div>
                              <div className="mb-1 text-xs font-medium text-muted-foreground">
                                {podcast.category} • {podcast.date}
                              </div>
                              <CardTitle className="text-xl">{podcast.title}</CardTitle>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleLike(podcast.id)}
                                className={likedPodcasts.includes(podcast.id) ? "text-primary" : ""}
                              >
                                <Heart className="h-5 w-5" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleBookmark(podcast.id)}
                              >
                                {bookmarkedPodcasts.includes(podcast.id) ? (
                                  <BookmarkCheck className="h-5 w-5 text-primary" />
                                ) : (
                                  <Bookmark className="h-5 w-5" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0 flex-grow">
                          <CardDescription className="text-muted-foreground mb-4">
                            {podcast.description}
                          </CardDescription>
                        </CardContent>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            {podcast.duration}
                          </div>
                          <Button className="flex items-center gap-1">
                            <PlayCircle className="h-4 w-4" />
                            Play Episode
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-medium mb-2">No podcasts found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or category filter
                </p>
                <Button onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Podcast;
