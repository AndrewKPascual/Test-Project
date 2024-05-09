import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

const UserProfile = () => {
  const { data: session } = useSession();
  const [profile, setProfile] = useState({
    healthGoals: '',
    dietaryPreferences: ''
  });
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState({
    success: false,
    error: false,
    message: ''
  });

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.healthGoals = profile.healthGoals ? "" : "Health goals are required.";
    tempErrors.dietaryPreferences = profile.dietaryPreferences ? "" : "Dietary preferences are required.";
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
        // Retrieve userId from the session
        const userId = session?.user?.id; // Assuming the session object has a user object with an id
        if (!userId) {
          throw new Error('No user ID found in session.');
        }
        const submissionData = { ...profile, userId };

        const response = await fetch('/api/userProfile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Profile submitted:', data);
        setSubmissionStatus({
          success: true,
          error: false,
          message: 'Profile updated successfully!'
        });
      } catch (error) {
        console.error('Error submitting profile:', error);
        setSubmissionStatus({
          success: false,
          error: true,
          message: 'An error occurred while updating the profile.'
        });
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
      {submissionStatus.message && (
        <p
          className={`text-${submissionStatus.error ? 'error' : 'success'}`}
          aria-live="assertive"
        >
          {submissionStatus.message}
        </p>
      )}
      <button type="submit">Save Profile</button>
    </form>
  );
};

export default UserProfile;
