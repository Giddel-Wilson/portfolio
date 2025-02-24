<script lang="ts">
  const projects = [
    {
      title: "Project Name 1",
      description: "A brief description of the project and its key features. What problems did it solve?",
      image: "/images/projects/project1.jpg",
      tags: ["React", "Node.js", "MongoDB"],
      link: "https://project1.com",
      github: "https://github.com/username/project1"
    },
    {
      title: "Project Name 2",
      description: "Another amazing project with its own unique challenges and solutions.",
      image: "/images/projects/project2.jpg",
      tags: ["Svelte", "Firebase", "Tailwind"],
      link: "https://project2.com",
      github: "https://github.com/username/project2"
    },
    {
      title: "Project Name 3",
      description: "A showcase of your best work with detailed information about the implementation.",
      image: "/images/projects/project3.jpg",
      tags: ["TypeScript", "GraphQL", "PostgreSQL"],
      link: "https://project3.com",
      github: "https://github.com/username/project3"
    }
  ];
</script>

<section class="py-20">
  <div class="space-y-8">
    <div class="text-center space-y-4">
      <h2 class="text-4xl font-bold text-white">Featured Projects</h2>
      <p class="text-slate-400 max-w-2xl mx-auto">
        Here are some of my recent projects that showcase my skills in web development, 
        design, and problem-solving.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each projects as project}
        <article class="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 group">
          <!-- Project Image -->
          <div class="relative aspect-video overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
          </div>

          <!-- Project Info -->
          <div class="p-6 space-y-4">
            <h3 class="text-xl font-bold text-white">{project.title}</h3>
            <p class="text-slate-400">{project.description}</p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2">
              {#each project.tags as tag}
                <span class="px-3 py-1 text-sm bg-slate-800 text-slate-300 rounded-full">
                  {tag}
                </span>
              {/each}
            </div>

            <!-- Links -->
            <div class="flex gap-4 pt-4">
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-purple-400 hover:text-purple-300"
              >
                <span>View Live</span>
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-slate-400 hover:text-slate-300"
              >
                <span>Source Code</span>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </article>
      {/each}
    </div>

    <div class="text-center pt-8">
      <a 
        href="/projects"
        class="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300"
      >
        <span>View All Projects</span>
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  </div>
</section>
