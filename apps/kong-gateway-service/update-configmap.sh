kubectl create configmap kong-config --from-file=./config --dry-run=client -o yaml | kubectl apply -f -
