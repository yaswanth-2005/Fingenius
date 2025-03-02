
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Heart, Play, Pause } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PodcastPlayerProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  date: string;
  audioUrl: string;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({
  id,
  title,
  description,
  imageUrl,
  duration,
  date,
  audioUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
    // Here you would actually control the audio playback
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? 'Removed from favorites' : 'Added to favorites',
      description: isLiked ? `${title} removed from your favorites` : `${title} added to your favorites`,
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? 'Removed from bookmarks' : 'Bookmarked for later',
      description: isBookmarked ? `${title} removed from your bookmarks` : `${title} has been bookmarked`,
    });
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col card-hover">
      <div className="flex flex-row">
        <div className="w-1/3">
          <img 
            src={imageUrl} 
            alt={title} 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-2/3 flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl line-clamp-1">{title}</CardTitle>
            <CardDescription className="text-sm">
              {date} · {duration}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </CardContent>
          <CardFooter className="pt-0 flex justify-between">
            <Button 
              size="sm" 
              variant="outline" 
              className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
              onClick={handlePlayToggle}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="ghost" 
                className={`rounded-full p-0 w-10 h-10 flex items-center justify-center ${isLiked ? 'text-red-500' : ''}`}
                onClick={handleLike}
              >
                <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className={`rounded-full p-0 w-10 h-10 flex items-center justify-center ${isBookmarked ? 'text-blue-500' : ''}`}
                onClick={handleBookmark}
              >
                <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
              </Button>
            </div>
          </CardFooter>
        </div>
      </div>
      <div className="px-4 pb-4">
        <audio className="w-full h-10" controls src={audioUrl} />
      </div>
    </Card>
  );
};

export default PodcastPlayer;
