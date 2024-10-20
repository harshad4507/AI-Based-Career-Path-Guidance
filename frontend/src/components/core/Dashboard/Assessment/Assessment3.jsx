// Assessment3.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitAssessment } from '../../../../services/operations/assessmentAPI';
import { useNavigate } from 'react-router-dom';
import { setAssessmentData } from '../../../../slices/assessmentSlice';

const Assessment3 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.profile);

  const ratingsList = [
    'Python',
    'Java',
    'C++',
    'JavaScript',
    'C#',
    'PHP',
    'Ruby',
    'Swift',
    'Go',
    'Rust',
    'Others',
    'Interest_In_Software_Dev',
    'Interest_In_Database_Management',
    'Interest_In_Networking_Skills',
    'Interest_In_WebDevelopment',
  ];

  const [ratings, setRatings] = useState({});

  // Handler for rating changes
  const handleRatingChange = (skill, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [skill]: value,
    }));
  };

  const formData = useSelector((state) => state.assessment.formData);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save data to Redux store
    dispatch(setAssessmentData({ step: 'assessment3', data: { ratings } }));

    // Combine all data and send to the backend
    const finalFormData = { ...formData, assessment3: { ratings }, email: user?.email };
    dispatch(submitAssessment(finalFormData,navigate));

  };

  // Slider component
  const Slider = ({ skillName, value, onChange }) => {
    return (
      <div className="flex items-center mb-4">
        <label className="mr-4 text-white w-64">{skillName}</label>
        <input
          type="range"
          min="0"
          max="10"
          value={value || 0}
          onChange={(e) => onChange(skillName, Number(e.target.value))}
          className="flex-grow h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <span className="ml-4 text-white">{value || 0}</span>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="font-serif pt-20 bg-gray-900 p-10">
      <h1 className="text-2xl text-center text-orange-500 font-serif mb-6">
        Evaluate Your Proficiency in Programming and Technical Skills
      </h1>

      {ratingsList.map((skill) => (
        <Slider
          key={skill}
          skillName={skill}
          value={ratings[skill]}
          onChange={handleRatingChange}
        />
      ))}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => navigate('/assessment2')}
          className="cursor-pointer rounded-md bg-gray-700 py-2 px-5 font-semibold text-white"
        >
          Back
        </button>
        <button
          type="submit"
          className="cursor-pointer rounded-md border py-2 px-5 border-yellow-50 bg-yellow-50"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Assessment3;
