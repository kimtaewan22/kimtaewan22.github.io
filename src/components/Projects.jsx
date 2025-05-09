import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import styles from './Projects.module.css';

const categoryLabels = {
  research: 'Research Projects',
  service: 'Service Projects'
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [projectsSnap, skillsSnap] = await Promise.all([
          getDocs(collection(db, 'projects')),
          getDocs(collection(db, 'skills'))
        ]);
        const projectsList = projectsSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        const skillsList = skillsSnap.docs.map(doc => doc.data());
        console.log('projects:', projectsList);
        console.log('skills:', skillsList);
        setProjects(projectsList);
        setSkills(skillsList);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load projects or skills: ' + err.message);
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;

  // Group by category
  const grouped = projects.reduce((acc, project) => {
    const cat = project.category || 'service';
    acc[cat] = acc[cat] || [];
    acc[cat].push(project);
    return acc;
  }, {});

  // Map skill name to icon
  const skillIconMap = {};
  skills.forEach(skill => {
    skillIconMap[skill.name?.toLowerCase()] = skill.iconUrl;
  });

  return (
    <section id="projects">
      <h2>Projects</h2>
      {['research', 'service'].map(cat => (
        grouped[cat] && (
          <div key={cat}>
            <h3 className={styles.projectCategory}>{categoryLabels[cat]}</h3>
            <div className={styles.projectsGrid}>
              {grouped[cat].map(project => (
                <div key={project.id} className={styles.projectCard}>
                  {project.imageUrl && (
                    <img src={project.imageUrl} alt={project.title} className={styles.projectImage} />
                  )}
                  <div className={styles.projectHeader}>
                    <h3>{project.title}</h3>
                    <span className={styles.projectPeriod}>{project.period}</span>
                  </div>
                  {project.category === 'research' && project.organization && (
                    <div className={styles.projectOrg}>
                      {project.organization}
                    </div>
                  )}
                  <p className={styles.projectDescription}>{project.description}</p>
                  {project.features && (
                    <ul className={styles.projectFeatures}>
                      {project.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  )}
                  <div className={styles.techStackRow}>
                    {Array.isArray(project.techStack) &&
                      project.techStack.map((tech, idx) => {
                        const iconUrl =
                          skillIconMap[tech?.toLowerCase()] ||
                          `https://cdn.simpleicons.org/${tech.replace(/\s+/g, '').toLowerCase()}`;
                        return (
                          <div key={idx} className={styles.techStackItem}>
                            <img
                              src={iconUrl}
                              alt={tech}
                              className={styles.techStackIcon}
                              onError={e => { e.target.style.display = 'none'; }}
                            />
                            <span className={styles.techStackName}>{tech}</span>
                          </div>
                        );
                      })}
                  </div>
                  <div className={styles.projectLinks}>
                    {project.liveLink && (
                      <a href={project.liveLink} className={styles.projectButton} target="_blank" rel="noopener noreferrer">
                        Live
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} className={styles.projectButton} target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    )}
                    {project.videoLink && (
                      <a href={project.videoLink} className={styles.projectButton} target="_blank" rel="noopener noreferrer">
                        Video
                      </a>
                    )}
                    {project.readmeLink && (
                      <a href={project.readmeLink} className={styles.projectButton} target="_blank" rel="noopener noreferrer">
                        README
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
      <div className="scroll-arrow">
        <svg viewBox="0 0 24 24">
          <path d="M12 16.5l-8-8 1.41-1.42L12 13.67l6.59-6.59L20 8.5z" />
        </svg>
      </div>
    </section>
  );
};

export default Projects;