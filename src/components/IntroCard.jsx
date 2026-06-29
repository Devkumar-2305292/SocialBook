import React from "react";

export const IntroCard = ({ profile }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-bold text-lg mb-3">Intro</h2>

      <p>🎓 Studied at {profile.education}</p>
      <p>📍 Lives in {profile.location}</p>
      <p>💻 {profile.bio}</p>
    </div>
  );
};

export default IntroCard;