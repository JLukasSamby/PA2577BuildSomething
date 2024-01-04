#!/bin/bash

# Define your Docker image names
VERIFICATION_IMAGE="your-verification-image:latest"
UMAS_IMAGE="your-umas-image:latest"

# Function to check if a command is available
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Function to pull Docker images
pull_docker_images() {
  echo "Pulling Docker images..."
  docker pull mongo:latest
  docker pull $VERIFICATION_IMAGE
  docker pull $UMAS_IMAGE
}

# Function to apply Kubernetes manifests
apply_kubernetes_manifests() {
  echo "Applying Kubernetes manifests..."
  kubectl apply -f mongodb-service.yaml
  kubectl apply -f verification-service.yaml
  kubectl apply -f umas-service.yaml
}

# Main installation script
main() {
  pull_docker_images
  apply_kubernetes_manifests

  echo "Installation completed successfully!"
}

# Run the main script
main
