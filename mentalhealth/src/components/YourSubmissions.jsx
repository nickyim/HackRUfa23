import React, { useState } from 'react';

function YourSubmissions() {
    const [submissionType, setSubmissionType] = useState('text');
    const [submissionContent, setSubmissionContent] = useState('');

    const handleSubmission = () => {
        // Send the submission to the backend server
        // Reset the form after submitting
        setSubmissionContent('');
    };

    return (
        <div>
            <div>
                <select value={submissionType} onChange={e => setSubmissionType(e.target.value)}>
                    <option value="text">Text</option>
                    <option value="voice">Voice Recording</option>
                    <option value="video">Video Recording</option>
                </select>

                {submissionType === 'text' && <textarea value={submissionContent} onChange={e => setSubmissionContent(e.target.value)} />}
                {(submissionType === 'voice' || submissionType === 'video') && <input type="file" onChange={/* handle file input */} />}
                
                <button onClick={handleSubmission}>Submit</button>
            </div>

            {/* Here, render the user's past submissions using Submissions component */}
        </div>
    );
}

export default YourSubmissions;
