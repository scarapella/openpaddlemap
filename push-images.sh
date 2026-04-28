#!/bin/bash
set -x
podman tag paddlemap:latest northamerica-northeast2-docker.pkg.dev/paddle-map/paddle-map/paddlemap:latest
podman push northamerica-northeast2-docker.pkg.dev/paddle-map/paddle-map/paddlemap:latest