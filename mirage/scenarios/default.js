export default function(server) {
  const quipu = server.create('team', {
    id:        "quipu",
    name:      "Quipu",
    subdomain: "quipu"
  });

  server.create('team', {
    id:        "empty",
    name:      "Emptyness S.L.",
    subdomain: "empty"
  });

  const quipuProject1 = server.create('project', {
    name:   "New frontend",
    description: `Building a completely new frontend for Quipuapp. It will be
      a single page javascript application that comunicates with the backend
      via a REST API.`,
    teamId: quipu.id
  });

  server.create('project', {
    name:   "Fouding round 2016",
    description: `We want to close a founding in late 2016 - early 2017 that
      will enable the company to grow and target new markets`,
    teamId: quipu.id
  });

  server.create('user', {
    email:  'quipu-user-1@example.com',
    teamId: quipu.id,
    currentProjectId: null
  });

  server.create('user', {
    email: 'quipu-user-2@example.com',
    teamId: 'quipu'
  });

  server.create('goal', {
    name: "New income invoice form",
    description: "",
    projectId: quipuProject1.id
  });

  server.create('goal', {
    name: "Refactor taxes calculations",
    description: "",
    projectId: quipuProject1.id
  });

  server.create('goal', {
    name: "Optimize API performance",
    description: "",
    projectId: quipuProject1.id
  });
}
