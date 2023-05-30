import React from "react";

export const LanguageSelect = ({ selected, handleSelectedLanguage }) => {
  const languages = [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
    { value: "Chinese", label: "Chinese" },
    { value: "Bengali", label: "Bengali" },
    { value: "Hindi", label: "Hindi" },
    { value: "Korean", label: "Korean" },
    { value: "Arabic", label: "Arabic" },
    { value: "Japanese", label: "Japanese" },
    { value: "Creole", label: "Creole" },
    { value: "Filipino", label: "Filipino" },
    { value: "Urdu", label: "Urdu" },
  ];
  return (
    <div>
      <label>Languages: </label>
      <select
        //   id={newJob.native_language}
        value={selected}
        onChange={handleSelectedLanguage}
        required
      >
        <option value="">Select a language</option>
        {languages.map((language) => (
          <option value={language.value} key={language.value}>
            {language.label}
          </option>
        ))}
      </select>{" "}
    </div>
  );
};
