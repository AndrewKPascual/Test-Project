import React, { useState } from 'react';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    healthGoals: '',
    dietaryPreferences: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.healthGoals = profile.healthGoals ? "" : "This field is required.";
    tempErrors.dietaryPreferences = profile.dietaryPreferences ? "" : "This field is required.";
    setErrors({...tempErrors});
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validateForm()) {
      try {
        // Replace with actual API endpoint and adjust HTTP method, headers, and body as needed
        const response = await fetch('/api/user-profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Include other headers as required by the backend API
          },
          body: JSON.stringify(profile)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Profile submitted:', data);
        // Handle successful profile submission, e.g., display a success message, redirect, etc.
      } catch (error) {
        console.error('Error submitting profile:', error);
        // Handle errors in profile submission, e.g., display an error message
      }
    }
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
          className={errors.healthGoals ? 'border-error text-error' : ''}
        />
        {errors.healthGoals && <p className="text-error">{errors.healthGoals}</p>}
      </div>
      <div>
        <label htmlFor="dietaryPreferences">Dietary Preferences</label>
        <input
          type="text"
          id="dietaryPreferences"
          name="dietaryPreferences"
          value={profile.dietaryPreferences}
          onChange={handleChange}
          className={errors.dietaryPreferences ? 'border-error text-error' : ''}
        />
        {errors.dietaryPreferences && <p className="text-error">{errors.dietaryPreferences}</p>}
      </div>
      <button type="submit">Save Profile</button>
    </form>
  );
};

export default UserProfile;
