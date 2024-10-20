// Assessment1.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAssessmentData } from '../../../../slices/assessmentSlice';

const Assessment1 = () => {
  const [formData, setFormData] = useState({
    cgpa: '',
    courseStatus: '',
    academicAchievement: '',
    personalInterest: '',
    internship: '',
    certificates: '',
    leadership: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handler for form changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCgpaChange = (e) => {
    const value = e.target.value;
    if (value === '' || (value >= 0 && value <= 10)) {
      setFormData((prevData) => ({ ...prevData, cgpa: value }));
      setError('');
    } else {
      setError('CGPA must be between 0.0 and 10.0');
    }
  };

  // Radio button and dropdown options
  const courseStatusOptions = [
    { label: 'In Progress', value: 'In_Progress' },
    { label: 'Completed', value: 'Completed' },
  ];

  const achievementOptions = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
  ];

  const yesNoOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];

  const personalInterestOptions = [
    'Traveling',
    'CodingOthers',
    'Gaming',
    'Reading',
    'Sports',
    'Music',
  ];

  const handleNext = (e) => {
    e.preventDefault();
    // Save data to Redux store
    dispatch(setAssessmentData({ step: 'assessment1', data: formData }));
    navigate('/dashboard/Assessment-page-2');
  };

  return (
    <form onSubmit={handleNext} className="mt-6 flex w-full flex-col gap-y-4 p-4 bg-gray-800 rounded-md shadow-md">
      {/* CGPA Input */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm leading-5 text-white">CGPA</label>
        <input
          placeholder="Enter CGPA (0.0 - 10.0)"
          value={formData.cgpa}
          onChange={handleCgpaChange}
          name="cgpa"
          type="number"
          step="0.1"
          min="0"
          max="10"
          className={`p-2 border rounded-md focus:outline-none ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>

      {/* Course Status Radio */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm leading-5 text-white">Course Status</label>
        <div className="flex flex-wrap">
          {courseStatusOptions.map((option) => (
            <label key={option.value} className="mr-4 flex items-center text-white">
              <input
                type="radio"
                name="courseStatus"
                value={option.value}
                checked={formData.courseStatus === option.value}
                onChange={handleOnChange}
                className="mr-2"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* Academic Achievements */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm leading-5 text-white">Academic Achievements</label>
        <div className="flex flex-wrap">
          {achievementOptions.map((option) => (
            <label key={option.value} className="mr-4 flex items-center text-white">
              <input
                type="radio"
                name="academicAchievement"
                value={option.value}
                checked={formData.academicAchievement === option.value}
                onChange={handleOnChange}
                className="mr-2"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* Personal Interest Dropdown */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm leading-5 text-white">Personal Interest</label>
        <select
          value={formData.personalInterest}
          onChange={handleOnChange}
          name="personalInterest"
          className="p-2 border rounded-md focus:outline-none border-gray-300 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Personal Interest</option>
          {personalInterestOptions.map((interest, index) => (
            <option key={index} value={interest}>
              {interest}
            </option>
          ))}
        </select>
      </div>

      {/* Internship Experience */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm leading-5 text-white">Internship Experience</label>
        <div className="flex flex-wrap">
          {yesNoOptions.map((option) => (
            <label key={option.value} className="mr-4 flex items-center text-white">
              <input
                type="radio"
                name="internship"
                value={option.value}
                checked={formData.internship === option.value}
                onChange={handleOnChange}
                className="mr-2"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm leading-5 text-white">Certificates</label>
        <div className="flex flex-wrap">
          {yesNoOptions.map((option) => (
            <label key={option.value} className="mr-4 flex items-center text-white">
              <input
                type="radio"
                name="certificates"
                value={option.value}
                checked={formData.certificates === option.value}
                onChange={handleOnChange}
                className="mr-2"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* Leadership Experience */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm leading-5 text-white">Leadership Experience</label>
        <div className="flex flex-wrap">
          {yesNoOptions.map((option) => (
            <label key={option.value} className="mr-4 flex items-center text-white">
              <input
                type="radio"
                name="leadership"
                value={option.value}
                checked={formData.leadership === option.value}
                onChange={handleOnChange}
                className="mr-2"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="cursor-pointer rounded-md bg-gray-700 py-2 px-5 font-semibold text-white"
        >
          Cancel
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

export default Assessment1;
