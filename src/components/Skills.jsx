import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const q = query(collection(db, 'skills'), orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);
      setSkills(querySnapshot.docs.map(doc => doc.data()));
    };
    fetchSkills();
  }, []);

  return (
    <section>
      <h2>Skills &amp; Tools</h2>
      <div className="simple-skills-list">
        {skills.map(skill => (
          <div className="simple-skill" key={skill.name}>
            <img src={skill.iconUrl} alt={skill.name} />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills; 