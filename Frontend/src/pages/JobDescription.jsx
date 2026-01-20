import { useState } from "react";

const JobDescription = () => {
    const recruiterData = {
        role: "Product Manager",
        experience: "Entry Level",
        competencies: "Project Management, Data Analysis",
    };

    // Predefined improved job description (dummy AI output)
    const improvedJD = `
We are seeking an enthusiastic and detail-oriented Product Manager (Entry Level) 
to join our dynamic product team.

Role Overview:
As a Product Manager, you will assist in driving the product lifecycle from ideation 
to execution while working closely with engineering, design, and business teams.

Key Responsibilities:
• Support end-to-end product planning and execution
• Conduct market research and analyze user data
• Translate business requirements into clear product specifications
• Collaborate with cross-functional teams to ensure timely delivery

Key Competencies:
• Project Management – ability to coordinate tasks and timelines effectively
• Data Analysis – interpret user metrics and product performance data
• Strong communication and problem-solving skills

This role is ideal for candidates looking to build a strong foundation in product 
management while contributing to data-driven decision-making and impactful products.
  `;

    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
                <h1 className="text-2xl font-bold text-blue-700 mb-4">
                    AI Job Description Generator (Demo)
                </h1>

                <p className="text-gray-600 mb-6">
                    Below is a static demo showing how recruiter inputs are transformed into
                    an improved job description using AI (dummy data).
                </p>

                {/* Recruiter Input (Static Display) */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <h2 className="text-lg font-semibold text-blue-700 mb-3">
                        Recruiter Inputs
                    </h2>

                    <ul className="text-gray-700 space-y-2">
                        <li>
                            <span className="font-semibold">Role:</span>{" "}
                            {recruiterData.role}
                        </li>
                        <li>
                            <span className="font-semibold">Experience:</span>{" "}
                            {recruiterData.experience}
                        </li>
                        <li>
                            <span className="font-semibold">Key Competencies:</span>{" "}
                            {recruiterData.competencies}
                        </li>
                    </ul>
                </div>

                {/* AI Output */}
                <div className="bg-white border border-blue-300 rounded-xl p-5">
                    <h2 className="text-lg font-semibold text-blue-700 mb-3">
                        AI-Improved Job Description
                    </h2>

                    <pre className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
                        {improvedJD}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;
