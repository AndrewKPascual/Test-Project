import React, { useState } from 'react';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    healthGoals: '',
    dietaryPreferences: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement the submit logic, possibly sending the profile data to the backend
    console.log('Profile submitted:', profile);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="healthGoals">Health Goals</label>
        <input
          type="text"
          id="healthGoals"
          name="healthGoals"
          value={profile.healthGoals}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="dietaryPreferences">Dietary Preferences</label>
        <input
          type="text"
          id="dietaryPreferences"
          name="dietaryPreferences"
          value={profile.dietaryPreferences}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save Profile</button>
    </form>
  );
};

export default UserProfile;
