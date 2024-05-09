import React, { useState, useEffect } from 'react';

const LevelingSystem = () => {
  // State to store user's current level and badges
  const [level, setLevel] = useState(0);
  const [badges, setBadges] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  // Function to fetch level and badges data from the backend
  const fetchLevelData = async () => {
    try {
      const response = await fetch('/api/leveling');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLevel(data.level);
      setProgress(data.progress); // Assuming the API returns progress
      setBadges(data.badges);
    } catch (e) {
      setError(e.message);
      console.error('Fetch error:', e.message);
    }
  };

  useEffect(() => {
    // Fetch level and badges data when the component mounts
    fetchLevelData();
  }, []);

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-4">
      <h2 className="text-lg font-semibold">Your Level</h2>
      <div className="my-2">
        <div className="text-sm font-medium text-gray-700">Level {level}</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Badges</h3>
        <ul className="list-disc pl-5">
          {badges.map((badge, index) => (
            <li key={index} className="text-sm font-medium text-gray-700">
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LevelingSystem;
