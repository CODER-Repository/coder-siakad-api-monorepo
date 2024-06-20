kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username={username} \
  --docker-password={password}
