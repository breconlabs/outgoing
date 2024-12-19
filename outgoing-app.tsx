import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Star, BarChart, BookOpen, Home, ArrowRight, Lock, Plus, MessageCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const OutgoingApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [totalPoints, setTotalPoints] = useState(0);
  const [unlockedDays, setUnlockedDays] = useState(1);
  const [completedToday, setCompletedToday] = useState(false);
  const [dailyPoints, setDailyPoints] = useState(0);
  const [actionLog, setActionLog] = useState([]);

  const weeklyProgression = [
    { day: 1, task: "Give someone a compliment on social media", points: 1 },
    { day: 2, task: "Say good morning to someone on your way to work/school", points: 5 },
    { day: 3, task: "Ask a barista how their day is going", points: 50 },
    { day: 4, task: "Join a group chat about your favorite hobby", points: 20 },
    { day: 5, task: "Ask someone for directions (even if you don't need them)", points: 30 },
    { day: 6, task: "Share a story in a group setting", points: 200 },
    { day: 7, task: "Start a conversation with someone new", points: 100 }
  ];

  const pointsSystem = [
    {
      category: "Online Actions",
      activities: [
        { name: "Comment with a compliment on social media", points: 1 },
        { name: "Join a group discussion online", points: 20 },
        { name: "Share a personal story in a comment", points: 30 }
      ]
    },
    {
      category: "Everyday Interactions",
      activities: [
        { name: "Say hello to a stranger", points: 5 },
        { name: "Start a conversation with a barista/server", points: 50 },
        { name: "Ask someone for directions", points: 30 }
      ]
    },
    {
      category: "Challenge Actions",
      activities: [
        { name: "Approach and start a conversation with stranger", points: 100 },
        { name: "Join a group activity or event", points: 150 },
        { name: "Public speaking", points: 500 }
      ]
    }
  ];

  const pointsProgress = [
    { day: 'Mon', points: 50 },
    { day: 'Tue', points: 120 },
    { day: 'Wed', points: 180 },
    { day: 'Thu', points: 250 },
    { day: 'Fri', points: 310 },
    { day: 'Sat', points: 400 },
    { day: 'Sun', points: 450 }
  ];

  const handleCompleteDaily = () => {
    const points = weeklyProgression[unlockedDays - 1].points;
    setTotalPoints(prev => prev + points);
    setDailyPoints(prev => prev + points);
    setCompletedToday(true);
    if (unlockedDays < 7) {
      setUnlockedDays(prev => prev + 1);
    }
  };

  const handleLogAction = (points, actionName) => {
    const now = new Date();
    setActionLog(prev => [...prev, {
      action: actionName,
      points: points,
      timestamp: now.toISOString()
    }]);
    setTotalPoints(prev => prev + points);
    setDailyPoints(prev => prev + points);
  };

  const HomeView = () => (
    <div className="space-y-6">
      {/* Guidance Text */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <p className="text-white text-lg text-center">
          Complete your 1st week challenges to build your confidence and unlock your progress tracker
        </p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Day {unlockedDays} Challenge</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 p-6 rounded-lg mb-4 border border-gray-700">
            <h3 className="font-semibold mb-2 text-white">Your Task:</h3>
            <p className="text-lg mb-2 text-white">{weeklyProgression[unlockedDays - 1].task}</p>
            <p className="text-cyan-400 font-medium">Worth {weeklyProgression[unlockedDays - 1].points} points</p>
          </div>
          <button
            onClick={handleCompleteDaily}
            disabled={completedToday}
            className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 ${
              completedToday 
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'bg-cyan-500 hover:bg-cyan-600 text-white'
            }`}
          >
            {completedToday ? 'Completed!' : 'Complete Task'}
            {!completedToday && <ArrowRight className="w-4 h-4" />}
          </button>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">7-Day Challenge Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weeklyProgression.map((day, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg border ${
                  index + 1 < unlockedDays ? 'bg-gray-900 border-green-700'
                  : index + 1 === unlockedDays ? 'bg-gray-900 border-cyan-700'
                  : 'bg-gray-900 border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">Day {day.day}</span>
                  {index + 1 <= unlockedDays ? (
                    <span className="text-sm text-cyan-400">{day.points} pts</span>
                  ) : (
                    <Lock className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                {index + 1 <= unlockedDays ? (
                  <p className="text-sm text-gray-200 mt-1">{day.task}</p>
                ) : (
                  <p className="text-sm text-gray-500 mt-1">Complete today's challenge to unlock</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ProgressView = () => (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Points Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pointsProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                    color: '#fff'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="points" 
                  stroke="#22d3ee" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Log Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pointsSystem.map((category, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-semibold text-lg text-white">{category.category}</h3>
                <div className="space-y-2">
                  {category.activities.map((activity, actIdx) => (
                    <div 
                      key={actIdx} 
                      className="flex items-center justify-between p-3 bg-gray-900 rounded border border-gray-700"
                    >
                      <div className="flex-grow">
                        <span className="text-sm text-white">{activity.name}</span>
                        <span className="ml-2 text-cyan-400 text-sm">({activity.points} pts)</span>
                      </div>
                      <button
                        onClick={() => handleLogAction(activity.points, activity.name)}
                        className="flex items-center gap-1 px-3 py-1 bg-cyan-500 text-white rounded hover:bg-cyan-600"
                      >
                        <Plus className="w-4 h-4" />
                        Log
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {actionLog.length === 0 ? (
              <p className="text-gray-300 text-center py-4">No activities logged yet today</p>
            ) : (
              actionLog.map((log, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 bg-gray-900 rounded border border-gray-700">
                  <div>
                    <span className="text-sm text-white">{log.action}</span>
                    <span className="text-xs text-gray-300 ml-2">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <span className="text-cyan-400">+{log.points} pts</span>
                </div>
              )).reverse()
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const CommunityView = () => (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="pt-6">
          <span className="text-sm text-cyan-400 mb-2 inline-block">
            Community Content Coming Soon
          </span>
          <h3 className="text-xl font-bold mb-2 text-white">Join the Discussion</h3>
          <p className="text-gray-200 mb-4">Share your journey and connect with others...</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderView = () => {
    switch (currentView) {
      case 'progress':
        return <ProgressView />;
      case 'community':
        return <CommunityView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Outgoing
          </h1>
          <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg border border-gray-700">
            <Star className="w-6 h-6 text-yellow-400" />
            <span className="text-xl font-semibold text-white">{totalPoints} Points</span>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setCurrentView('home')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              currentView === 'home' 
                ? 'bg-cyan-500 text-white' 
                : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
            }`}
          >
            <Home className="w-4 h-4" /> Today
          </button>
          <button
            onClick={() => setCurrentView('progress')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              currentView === 'progress' 
                ? 'bg-cyan-500 text-white' 
                : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
            }`}
          >
            <BarChart className="w-4 h-4" /> Progress
          </button>
          <button
            onClick={() => setCurrentView('community')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              currentView === 'community' 
                ? 'bg-cyan-500 text-white' 
                : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Learn
          </button>
        </div>

        {renderView()}
      </div>
    </div>
  );
};

export default OutgoingApp;
