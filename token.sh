MASTER="ubuntu@10.0.0.15"

# Print token for login
TOKEN_COMMAND="kubectl -n kube-system describe secret \$(kubectl -n kube-system get secret | grep admin-user | awk '{print \$1}')"

echo "Dumping token for dashboard..."
ssh ${MASTER} -C "${TOKEN_COMMAND}"
