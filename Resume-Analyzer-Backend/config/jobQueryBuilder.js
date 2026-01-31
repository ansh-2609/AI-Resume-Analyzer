// exports.buildJobQueriesFromSkills = (skills = {}) => {
//   const priorityOrder = [
//     "programming",
//     "frameworks",
//     "databases",
//     "cloud_platforms",
//     "tools"
//   ];

//   const queries = [];

//   for (const category of priorityOrder) {
//     if (skills[category]?.length) {
//       queries.push(skills[category].slice(0, 3).join(" "));
//     }
//   }

//   // Fallback
//   if (!queries.length && skills.other?.length) {
//     queries.push(skills.other.slice(0, 3).join(" "));
//   }

//   return queries.slice(0, 2); 
// };


exports.buildJobQueriesFromSkills = (skills = {}) => {
  const priorityOrder = [
    "programming",
    "frameworks",
    "databases",
    "cloud_platforms",
    "tools",
    "other"
  ];

  // Collect all skills
  const allSkills = [];

  for (const category of priorityOrder) {
    if (Array.isArray(skills[category])) {
      allSkills.push(...skills[category]);
    }
  }

  // Deduplicate + sanitize
  const uniqueSkills = [...new Set(
    allSkills
      .map(s => s.toLowerCase().trim())
      .filter(Boolean)
  )];

  // Chunk skills into small queries (3 per query)
  const queries = [];
  for (let i = 0; i < uniqueSkills.length; i += 3) {
    queries.push(uniqueSkills.slice(i, i + 3).join(" "));
  }

  // Limit API calls (important!)
  return queries.slice(0, 3);
};
