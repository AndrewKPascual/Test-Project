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

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateForm()) {
      // TODO: Implement the submit logic, possibly sending the profile data to the backend
      console.log('Profile submitted:', profile);
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
          className={errors.healthGoals ? 'error' : ''}
        />
        {errors.healthGoals && <p className="error-text">{errors.healthGoals}</p>}
      </div>
      <div>
        <label htmlFor="dietaryPreferences">Dietary Preferences</label>
        <input
          type="text"
          id="dietaryPreferences"
          name="dietaryPreferences"
          value={profile.dietaryPreferences}
          onChange={handleChange}
          className={errors.dietaryPreferences ? 'error' : ''}
        />
        {errors.dietaryPreferences && <p className="error-text">{errors.dietaryPreferences}</p>}
      </div>
      <button type="submit">Save Profile</button>
    </form>
  );
};

export default UserProfile;
