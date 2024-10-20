// Assessment2.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAssessmentData } from '../../../../slices/assessmentSlice';

const Assessment2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const skills = [
    'Communication Skills',
    'Problem Solving',
    'Teamwork',
    'Time Management',
    'Adaptability',
  ];

  // State to store ratings for each skill
  const [skillRatings, setSkillRatings] = useState({});

  // Handler for skill rating changes
  const handleSkillChange = (skill, value) => {
    setSkillRatings((prevRatings) => ({
      ...prevRatings,
      [skill]: value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    // Save data to Redux store
    dispatch(setAssessmentData({ step: 'assessment2', data: { skillRatings } }));

    navigate('/dashboard/Assessment-page-3');
  };

  // Slider component
  const Slider = ({ value, onChange }) => {
    return (
      <input
        type="range"
        min="0"
        max="10"
        step="1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
      />
    );
  };

  return (
    <form onSubmit={handleNext} className="font-serif pt-20 bg-gray-900 p-10">
      <h1 className="text-2xl text-center text-orange-500 font-mono mb-6">
        Know, Rate Yourself In Soft-Skills
      </h1>

      {/* Rendering sliders for each skill */}
      {skills.map((skill) => (
        <div key={skill} className="mb-6">
          <label className="mb-1 text-sm text-white">{skill}</label>
          <Slider
            value={skillRatings[skill] || 0} // Default value is 0 if not rated yet
            onChange={(value) => handleSkillChange(skill, value)} // Update rating on slider change
          />
        </div>
      ))}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => navigate('/assessment1')}
          className="cursor-pointer rounded-md bg-gray-700 py-2 px-5 font-semibold text-white"
        >
          Back
        </button>
        <button
          type="submit"
          className="cursor-pointer rounded-md border py-2 px-5 border-yellow-50 bg-yellow-50"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Assessment2;
