const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const User = require('../models/User');
const Resource = require('../models/Resource');
const { configDotenv } = require("dotenv");

// Set up the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate content based on a structured prompt
const generateContentForSubdomain = async (subdomain) => {
    const prompt = `
    Provide an introduction to the ${subdomain} subdomain in the IT sector. 
    Use the following format:

    ### Introduction:
    [Your introduction goes here]

    ### Easy Topics:
    - [List of easy topics minimum 10 topics]

    ### Medium Topics:
    - [List of medium topics minimum 10 topics]

    ### Hard Topics:
    - [List of hard topics minimum 10 topics]

    Keep the sections clearly separated and formatted as shown above.
    `;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Error generating content:", error);
        throw new Error("Failed to generate content for the given subdomain. Please try again.");
    }
};

// Route to handle subdomain-based content generation
exports.getTopics = async (req, res) => {
    try {
        const { subdomain } = req.body;
        console.log(subdomain);

        // Validate the subdomain input
        if (!subdomain || typeof subdomain !== 'string') {
            return res.status(400).json({ error: "Subdomain is missing or invalid" });
        }

        // Generate content for the given subdomain
        const content = await generateContentForSubdomain(subdomain);

        // Split the content into sections
        const sections = {
            introduction: "",
            easyTopics: [],
            mediumTopics: [],
            hardTopics: [],
        };

        const lines = content.split('\n').filter(line => line.trim() !== ''); // Remove empty lines

        let currentSection = null;

        lines.forEach(line => {
            if (line.startsWith('### Introduction:')) {
                currentSection = 'introduction';
            } else if (line.startsWith('### Easy Topics:')) {
                currentSection = 'easyTopics';
            } else if (line.startsWith('### Medium Topics:')) {
                currentSection = 'mediumTopics';
            } else if (line.startsWith('### Hard Topics:')) {
                currentSection = 'hardTopics';
            } else {
                if (currentSection === 'introduction') {
                    sections.introduction += line + ' ';
                } else if (currentSection === 'easyTopics' && line.startsWith('-')) {
                    const topic = line.replace('- ', '').trim();
                    sections.easyTopics.push({
                        title: topic.split(':')[0].trim(),
                        description: topic.split(':')[1]?.trim() || ""
                    });
                } else if (currentSection === 'mediumTopics' && line.startsWith('-')) {
                    const topic = line.replace('- ', '').trim();
                    sections.mediumTopics.push({
                        title: topic.split(':')[0].trim(),
                        description: topic.split(':')[1]?.trim() || ""
                    });
                } else if (currentSection === 'hardTopics' && line.startsWith('-')) {
                    const topic = line.replace('- ', '').trim();
                    sections.hardTopics.push({
                        title: topic.split(':')[0].trim(),
                        description: topic.split(':')[1]?.trim() || ""
                    });
                }
            }
        });

        // Send structured response
        res.status(200).json({ topics: sections, success: true });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Failed to generate content for the given subdomain" });
    }
};

// Function to generate resources for a topic
const generateResourcesForTopic = async (topic) => {
    const prompt = `
    Generate a detailed study plan for the topic "${topic}" of 10 weeks. Provide the response in JSON format with a "weeklyBreakdown" array where each item represents a weekly study plan. Follow this structure exactly:

    {
        "weeklyBreakdown": [
            {
                "week": "Week [number]",
                "focusArea": "[Primary topic or concept to focus on during this week, relevant to ${topic}]",
                "timeAllocation": "[Recommended number of hours to spend on this week's focus area]",
                "tasks": [
                    {
                        "title": "Task 1 Title",
                        "description": "Brief description of Task 1",
                    },
                    {
                        "title": "Task 2 Title",
                        "description": "Brief description of Task 2",
                    }
                ],
                "resources": [
                    {
                        "title": "Title of Resource 1",
                        "link": "https://link-to-resource-1.com"
                    },
                    {
                        "title": "Title of Resource 2",
                        "link": "https://link-to-resource-2.com"
                    },
                    {
                        "title": "Title of Resource 3",
                        "link": "https://link-to-resource-3.com"
                    }
                ]
            }
        ]
    }

    Ensure the response is only JSON, without extra characters.
    `;

    try {
        const result = await model.generateContent(prompt);
        
        // Clean up potential extra text around the JSON
        let rawContent = result.response.text();
        
        // Remove code block markers if present
        rawContent = rawContent.replace(/```json|```/g, '').trim();
        
        // Attempt to parse the cleaned-up content as JSON
        return JSON.parse(rawContent);
    } catch (error) {
        console.error("Error generating or parsing content:", error);
        throw new Error("Failed to generate resources for the given topic.");
    }
};

exports.getAllDetails = async (req, res) => {
    try {
        const { topicTitles } = req.body;

        if (!topicTitles || typeof topicTitles !== 'string') {
            return res.status(400).send({ error: "Topic title is missing or invalid" });
        }
 
        const content = await generateResourcesForTopic(topicTitles);
       
        res.status(200).json({ success: true, message: "Resources generated successfully", resource : content, });
    } catch (error) {
        console.error("Error saving resource or updating user:", error);
        res.status(500).send({ error: "Failed to save resource or update user" });
    }
};
