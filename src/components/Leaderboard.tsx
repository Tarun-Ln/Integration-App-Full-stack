
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, Calendar, Clock } from 'lucide-react';

interface LeaderboardEntry {
  id: number;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  topic: string;
  date: string;
}

const Leaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('integrationLeaderboard');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getTopicColor = (topic: string) => {
    const colors: { [key: string]: string } = {
      'u-substitution': 'bg-blue-500',
      'trig-substitution': 'bg-purple-500',
      'integration-by-parts': 'bg-green-500',
      'mixed': 'bg-orange-500'
    };
    return colors[topic] || 'bg-gray-500';
  };

  const getTopicName = (topic: string) => {
    const names: { [key: string]: string } = {
      'u-substitution': 'U-Sub',
      'trig-substitution': 'Trig Sub',
      'integration-by-parts': 'By Parts',
      'mixed': 'Mixed'
    };
    return names[topic] || 'Unknown';
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (index === 1) return <Medal className="h-5 w-5 text-gray-400" />;
    if (index === 2) return <Award className="h-5 w-5 text-amber-600" />;
    return <span className="text-slate-400 font-bold">#{index + 1}</span>;
  };

  if (entries.length === 0) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-center">
            No scores yet!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400 text-center">
            Complete a quiz to see your score here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Top Scores
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {entries.map((entry, index) => (
            <div 
              key={entry.id}
              className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                index < 3 ? 'bg-slate-700/50' : 'bg-slate-800/30'
              } hover:bg-slate-700/70`}
            >
              <div className="flex items-center gap-3">
                {getRankIcon(index)}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">
                      {entry.score}/{entry.totalQuestions}
                    </span>
                    <Badge 
                      variant="secondary" 
                      className={`${getTopicColor(entry.topic)} text-white text-xs`}
                    >
                      {getTopicName(entry.topic)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTime(entry.timeSpent)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(entry.date)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white">
                  {Math.round((entry.score / entry.totalQuestions) * 100)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
