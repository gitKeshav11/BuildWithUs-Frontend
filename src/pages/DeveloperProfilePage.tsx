import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Github, Linkedin, Globe, MapPin, ExternalLink } from 'lucide-react';

import { profileService } from '../services/profile.service';
import { projectsService } from '../services/projects.service';
import type { Profile, Project } from '../types';

export function DeveloperProfilePage() {
  const { username } = useParams();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 🔥 SAFE PROFILE FETCH
        let profileData: Profile;

        if (username) {
          profileData = await profileService.getProfile(username);
        } else {
          profileData = await profileService.getMyProfile();
        }

        if (!profileData) {
          throw new Error('Profile not found');
        }

        setProfile(profileData);

        // 🔥 SAFE PROJECT FETCH (NO CRASH)
        try {
          const projectData = await projectsService.getProjects({
            search: profileData?.username || '',
          });

          const projectList = Array.isArray(projectData)
            ? projectData
            : projectData?.content ?? [];

          setProjects(projectList);
        } catch (err) {
          console.error('Projects fetch failed', err);
          setProjects([]);
        }
      } catch (err) {
        console.error('Failed to load profile', err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  // 🔥 LOADING UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020817] text-white">
        Loading profile...
      </div>
    );
  }

  // 🔥 ERROR UI
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020817] text-red-400">
        Failed to load profile
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817]">
      <Navbar />

      <div className="pt-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-4 mt-10">
            <Avatar
              name={profile.fullName || 'User'}
              src={profile.profilePhotoUrl}
              size="2xl"
              isVerified={profile.isVerified || profile.emailVerified}
            />

            <div>
              <h1 className="text-2xl text-white font-bold">
                {profile.fullName || 'No Name'}
              </h1>
              <p className="text-slate-400">
                @{profile.username || 'unknown'}
              </p>

              {profile.headline && (
                <p className="text-slate-300 text-sm mt-1">
                  {profile.headline}
                </p>
              )}
            </div>
          </div>

          {profile.bio && (
            <p className="text-slate-400 mt-4">{profile.bio}</p>
          )}

          {profile.location && (
            <div className="flex items-center gap-2 text-slate-400 mt-2">
              <MapPin className="w-4 h-4" />
              {profile.location}
            </div>
          )}

          <div className="flex gap-6 mt-6 text-sm">
            <span className="text-white">
              {profile.followersCount ?? 0} Followers
            </span>
            <span className="text-white">
              {profile.followingCount ?? 0} Following
            </span>
            <span className="text-white">
              {profile.projectsCount ?? projects.length} Projects
            </span>
          </div>

          {/* SKILLS */}
          <div className="mt-6 flex flex-wrap gap-2">
            {(profile.skills ?? []).map((skill: any) => (
              <Badge key={skill?.name || skill} variant="blue">
                {skill?.name || skill}
              </Badge>
            ))}
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex gap-4 mt-6 text-slate-300">
            {profile.githubUrl && (
              <a href={profile.githubUrl} target="_blank">
                <Github />
              </a>
            )}

            {profile.linkedinUrl && (
              <a href={profile.linkedinUrl} target="_blank">
                <Linkedin />
              </a>
            )}

            {profile.portfolioUrl && (
              <a href={profile.portfolioUrl} target="_blank">
                <Globe />
              </a>
            )}
          </div>

          {/* PROJECTS */}
          <div className="mt-10">
            <h2 className="text-white text-xl font-bold mb-4">Projects</h2>

            {projects.length === 0 ? (
              <p className="text-slate-400">No projects found</p>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="glass p-4 mb-4 rounded-xl">
                  <h3 className="text-white font-semibold">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-sm">
                    {project.shortDescription}
                  </p>

                  <div className="flex gap-2 mt-2 flex-wrap">
                    {(project.techStack ?? []).map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-3 text-slate-300">
                    {(project.githubRepoUrl || project.githubUrl) && (
                      <a
                        href={project.githubRepoUrl || project.githubUrl}
                        target="_blank"
                      >
                        <Github />
                      </a>
                    )}

                    {(project.liveDemoUrl || project.liveUrl) && (
                      <a
                        href={project.liveDemoUrl || project.liveUrl}
                        target="_blank"
                      >
                        <ExternalLink />
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}