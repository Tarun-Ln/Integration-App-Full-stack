
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Timer, Trophy, Play, RotateCcw } from 'lucide-react';
import QuizInterface from '@/components/QuizInterface';
import Leaderboard from '@/components/Leaderboard';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [gameState, setGameState] = useState<'menu' | 'quiz' | 'results'>('menu');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [quizResults, setQuizResults] = useState<any>(null);
  const { toast } = useToast();

  const topics = [
    {
      id: 'u-substitution',
      name: 'U-Substitution',
      description: 'Master the technique of substitution in integration',
      color: 'bg-blue-500'
    },
    {
      id: 'trig-substitution',
      name: 'Trigonometric Substitution',
      description: 'Solve integrals using trigonometric identities',
      color: 'bg-purple-500'
    },
    {
      id: 'integration-by-parts',
      name: 'Integration by Parts',
      description: 'Apply the integration by parts formula effectively',
      color: 'bg-green-500'
    },
    {
      id: 'mixed',
      name: 'Mixed Problems',
      description: 'Challenge yourself with various integration techniques',
      color: 'bg-orange-500'
    }
  ];

  const startQuiz = (topicId: string) => {
    setSelectedTopic(topicId);
    setGameState('quiz');
    toast({
      title: "Quiz Started!",
      description: "Good luck with your integration problems!",
    });
  };

  const handleQuizComplete = (results: any) => {
    setQuizResults(results);
    setGameState('results');
    
    // Save to leaderboard
    const leaderboard = JSON.parse(localStorage.getItem('integrationLeaderboard') || '[]');
    const newEntry = {
      id: Date.now(),
      score: results.score,
      totalQuestions: results.totalQuestions,
      timeSpent: results.timeSpent,
      topic: selectedTopic,
      date: new Date().toISOString()
    };
    leaderboard.push(newEntry);
    leaderboard.sort((a: any, b: any) => b.score - a.score);
    localStorage.setItem('integrationLeaderboard', JSON.stringify(leaderboard.slice(0, 10)));
    
    toast({
      title: "Quiz Completed!",
      description: `You scored ${results.score}/${results.totalQuestions}!`,
    });
  };

  const resetToMenu = () => {
    setGameState('menu');
    setSelectedTopic('');
    setQuizResults(null);
  };

  if (gameState === 'quiz') {
    return (
      <QuizInterface 
        topic={selectedTopic} 
        onComplete={handleQuizComplete}
        onBack={resetToMenu}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Integration Master
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Master the art of integration with timed quizzes covering U-substitution, 
            trigonometric substitution, and integration by parts
          </p>
        </div>

        {gameState === 'menu' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quiz Topics */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Play className="h-6 w-6" />
                Choose Your Challenge
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {topics.map((topic) => (
                  <Card key={topic.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${topic.color}`} />
                        {topic.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300 mb-4">{topic.description}</p>
                      <Button 
                        onClick={() => startQuiz(topic.id)}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      >
                        Start Quiz
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Trophy className="h-6 w-6" />
                Leaderboard
              </h2>
              <Leaderboard />
            </div>
          </div>
        )}

        {gameState === 'results' && quizResults && (
          <div className="max-w-2xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-white mb-2">Quiz Complete!</CardTitle>
                <div className="flex justify-center items-center gap-4">
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    Score: {quizResults.score}/{quizResults.totalQuestions}
                  </Badge>
                  <Badge variant="outline" className="text-lg px-4 py-2 text-slate-300">
                    <Timer className="h-4 w-4 mr-2" />
                    {Math.floor(quizResults.timeSpent / 60)}:{(quizResults.timeSpent % 60).toString().padStart(2, '0')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-6xl mb-4">
                    {quizResults.score / quizResults.totalQuestions >= 0.8 ? '🎉' : 
                     quizResults.score / quizResults.totalQuestions >= 0.6 ? '👍' : '📚'}
                  </div>
                  <p className="text-slate-300 text-lg">
                    {quizResults.score / quizResults.totalQuestions >= 0.8 
                      ? "Excellent work! You've mastered this topic!" 
                      : quizResults.score / quizResults.totalQuestions >= 0.6 
                      ? "Good job! Keep practicing to improve further." 
                      : "Keep studying! Practice makes perfect."}
                  </p>
                </div>
                
                <div className="flex gap-4 justify-center pt-6">
                  <Button onClick={resetToMenu} variant="outline" className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Try Another Topic
                  </Button>
                  <Button onClick={() => startQuiz(selectedTopic)} className="bg-gradient-to-r from-blue-500 to-purple-500">
                    Retry Same Topic
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
