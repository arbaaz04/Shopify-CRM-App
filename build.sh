#!/bin/bash
# Increase Node.js memory limit for the build process
export NODE_OPTIONS="--max-old-space-size=8192"

# Run the build command
yarn build 