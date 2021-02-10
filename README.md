# Kubernetes Raspberry Pi Cluster

Good articles on Raspberry Pi Kubernetes setup:

[Installing Kubernetes RaspberryPi](https://uthark.github.io/post/2020-09-02-installing-kubernetes-raspberrypi/)

[MetalB Network Load Balancer](https://opensource.com/article/20/7/homelab-metallb)

## Restarting the cluster

To stop the cluster run the following command on all nodes:

    kubeadm reset

## Starting the Cluster

Start the cluster on the control plane with the following command:

    sudo kubeadm init --pod-network-cidr=192.168.0.0/17 --service-cidr=192.168.128.0/17

The kubeadm init command is called with the --pod-network-cidr and --service-cidr parameters to keep the pod and service network IP spaces from overlapping and causing DNS lookup issues

## Running Kubectl

In order to connect to the Kubernetes API Server with the kubectl command you will need a local config which includes the API token

Copy the Kubernetes admin config to your user home folder

    sudo cp -i /etc/kubernetes/admin.config $HOME/.kube/config

Check Running nodes (and if kubectl can connect to the Kubernetes API):

    kubectl get nodes

## Joining Nodes

When the cluster is initialized kubeadm will output the command to run to join worker nodes to the cluster

For example:

    sudo kubeadm join 10.0.0.54:6443 --token uv7a2p.3s1grv7ufohx20sd     --discovery-token-ca-cert-hash sha256:70df0277c6d7d87f71de00d55c20e27582f8f212bc36737f2d5390f46e2c750b

Run this command on any worker nodes (Note: worker nodes will also need kubernetes installed)

## Run CNI
A Cluster Networking plugin must be installed to enable network communication within the cluster

Install the Calico CNI plugin

Get the manifest

    curl https://docs.projectcalico.org/manifests/calico.yaml -O

Apply it
    kubectl apply -f calico.yaml

## Install MetalB Network Load Balancer

Apply the metalB namespace and pods

    kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.9.3/manifests/namespace.yaml

    kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.9.3/manifests/metallb.yaml

Create a secret to enable encrypted communications

    kubectl create secret generic -n metallb-system memberlist --from-literal=secretkey="$(openssl rand -base64 128)"



For more information see [Organizing Cluster Access](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/)