
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Timer, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { integrationProblems } from '@/data/problems';
import MathRenderer from '@/components/MathRenderer';

interface QuizInterfaceProps {
  topic: string;
  onComplete: (results: any) => void;
  onBack: () => void;
}

const QuizInterface = ({ topic, onComplete, onBack }: QuizInterfaceProps) => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [problems, setProblems] = useState<any[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>([]);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [startTime] = useState(Date.now());
  
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Load problems based on topic
    const topicProblems = integrationProblems[topic] || integrationProblems['mixed'];
    const shuffled = [...topicProblems].sort(() => Math.random() - 0.5).slice(0, 5);
    setProblems(shuffled);
    setAnswered(new Array(shuffled.length).fill(false));
  }, [topic]);

  useEffect(() => {
    // Timer
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleQuizEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleQuizEnd = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    onComplete({
      score,
      totalQuestions: problems.length,
      timeSpent: timeSpent,
      topic
    });
  };

  const checkAnswer = () => {
    if (!problems[currentProblem] || userAnswer.trim() === '') return;
    
    const correct = problems[currentProblem].answers.some((answer: string) => 
      userAnswer.toLowerCase().trim() === answer.toLowerCase().trim()
    );
    
    const CheckerAnswers = async() =>{
      try{
        const fetchanswer = await fetch('http://127.0.0.1:5001/integrateapi/validate',{
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            user_problem: problems[currentProblem],
          })
        });

        const realans = await fetchanswer.json();
        console.log('The Correct answer is: ', realans);

      } catch(error){
        console.log("An error has occured from API logic: ", error);
      } 
    }; 

    CheckerAnswers();

    if (correct && !answered[currentProblem]) {
      setScore(score + 1);
      setShowFeedback('correct');
    } else if (!correct) {
      setShowFeedback('incorrect');
    }
    
    const newAnswered = [...answered];
    newAnswered[currentProblem] = true;
    setAnswered(newAnswered);
    
    setTimeout(() => {
      setShowFeedback(null);
      if (currentProblem < problems.length - 1) {
        setCurrentProblem(currentProblem + 1);
        setUserAnswer('');
      } else {
        handleQuizEnd();
      }
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (problems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading problems...</div>
      </div>
    );
  }

  const progress = ((currentProblem + 1) / problems.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={onBack} 
            variant="outline" 
            className="flex items-center gap-2 text-slate-300 border-slate-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Question {currentProblem + 1} of {problems.length}
            </Badge>
            <Badge variant="outline" className={`text-lg px-4 py-2 ${timeLeft < 60 ? 'border-red-500 text-red-400' : 'text-slate-300'}`}>
              <Timer className="h-4 w-4 mr-2" />
              {formatTime(timeLeft)}
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Problem */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-xl">
                Solve the following integral:
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-slate-900/50 p-6 rounded-lg">
                <MathRenderer latex={problems[currentProblem].problem} />
              </div>
              
              {problems[currentProblem].hint && (
                <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    <strong>Hint:</strong> {problems[currentProblem].hint}
                  </p>
                </div>
              )}
              
              <div className="space-y-4">
                <Input
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Enter your answer (e.g., x^2 + C, sin(x) + C)"
                  className="bg-slate-700 border-slate-600 text-white text-lg p-4"
                  disabled={answered[currentProblem] || showFeedback !== null}
                  onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                />
                
                <Button 
                  onClick={checkAnswer}
                  disabled={answered[currentProblem] || showFeedback !== null || userAnswer.trim() === ''}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg py-3"
                >
                  Submit Answer
                </Button>
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className={`flex items-center gap-3 p-4 rounded-lg ${
                  showFeedback === 'correct' 
                    ? 'bg-green-900/20 border border-green-500/30 text-green-300' 
                    : 'bg-red-900/20 border border-red-500/30 text-red-300'
                }`}>
                  {showFeedback === 'correct' ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span>Correct! Well done!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5" />
                      <span>Incorrect. The correct answer is: {problems[currentProblem].answers[0]}</span>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Score Display */}
        <div className="text-center mt-8">
          <Badge variant="outline" className="text-lg px-4 py-2 text-slate-300">
            Current Score: {score}/{answered.filter(Boolean).length}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default QuizInterface;
