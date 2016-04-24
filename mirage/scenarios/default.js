export default function(server) {
  server.create('team', {
    id:        "quipu",
    name:      "Quipu",
    subdomain: "quipu"
  });

  server.create('team', {
    id:        "empty",
    name:      "Emptyness S.L.",
    subdomain: "empty"
  });
}
