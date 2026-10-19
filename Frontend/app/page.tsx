'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SkeletonLoader from '@/components/SkeletonLoader';
import { getProfile, getSkills, getProjects } from '@/lib/api';
import type { Profile, Project, Skill } from '@/types';

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const [profileData, skillsData, projectsData] = await Promise.all([
          getProfile(),
          getSkills(),
          getProjects(),
        ]);
        if (cancelled) return;
        setProfile(profileData);
        setSkills(Array.isArray(skillsData) ? skillsData : []);
        setProjects(Array.isArray(projectsData) ? projectsData : []);
      } catch (err) {
        console.error('Error fetching data:', err);
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main>
      <Navbar />
      {loading ? (
        <SkeletonLoader />
      ) : error ? (
        <section className="pt-40 pb-24 px-6 text-center min-h-screen flex items-center justify-center">
          <div className="card max-w-md">
            <h2 className="text-3xl font-black mb-4 uppercase">Error</h2>
            <p className="font-mono text-white/80 mb-8">
              Backend failed to load. Ensure server runs on port 5000.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn accent w-full"
            >
              Retry
            </button>
          </div>
        </section>
      ) : (
        <>
          <div className="pt-20"></div>
          <Hero profile={profile} />
          <Skills skills={skills} />
          <Projects projects={projects} />
          <Contact />
          <Footer profile={profile} />
        </>
      )}
    </main>
  );
}
