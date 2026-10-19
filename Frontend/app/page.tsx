'use client';

import { useEffect, useState } from 'react';
import { getProfile, getSkills, getProjects } from '@/lib/api';
import type { Profile, Project, Skill } from '@/types';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SkeletonLoader from '@/components/SkeletonLoader';

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
        <section className="pt-40 pb-24 px-6 text-center min-h-screen flex items-center justify-center bg-neutral-50">
          <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8">
            <h2 className="mb-4 text-2xl font-semibold text-neutral-900">Terjadi Kesalahan</h2>
            <p className="mb-8 text-neutral-600">
              Gagal memuat data. Pastikan backend berjalan di port 5000.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
            >
              Coba Lagi
            </button>
          </div>
        </section>
      ) : (
        <>
        
          <Hero profile={profile} />
          <About profile={profile} />
          <Skills skills={skills} />
          <Projects projects={projects} />
          <Contact />
          <Footer profile={profile} />
        </>
      )}
    </main>
  );
}
