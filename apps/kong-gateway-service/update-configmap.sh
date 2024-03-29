kubectl create configmap kong-config-siakad --from-file=./config --dry-run=client -o yaml | kubectl apply -f -
