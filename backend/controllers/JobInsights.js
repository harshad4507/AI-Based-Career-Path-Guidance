const { PythonShell } = require('python-shell');

exports.scrapeLinkedInJobs = (req, res) => {
    const { title, location } = req.body;
    
    // Prepare the data to be sent to the Python script
    const inputData = { title, location };

    let pyshell = new PythonShell('./controllers/LinkedInData.py');

    // Send the input data to the Python script
    pyshell.send(JSON.stringify(inputData));

    // Handle data received from the Python script
    pyshell.on('message', function (message) {
        try {
            const jobData = JSON.parse(message);
            
            res.status(200).json({
                success: true,
                jobs: jobData
            });
        } catch (error) {
            console.error('Error parsing response:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to parse Python script output',
                error: error.message
            });
        }
    });

    // Handle errors from the Python script
    pyshell.on('error', (error) => {
        console.error('Python script error:', error);
        res.status(500).json({
            success: false,
            message: 'Python script execution failed',
            error: error.message
        });
    });

    // End the Python shell process
    pyshell.end((err) => {
        if (err) console.error('Error closing PythonShell:', err);
    });
};
