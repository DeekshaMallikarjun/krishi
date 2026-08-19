#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "================================================="
echo " 1. Installing Frontend Dependencies & Building  "
echo "================================================="
npm --prefix frontend install
npm --prefix frontend run build

echo "================================================="
echo " 2. Upgrading Pip & Installing CPU PyTorch       "
echo "================================================="
pip install --upgrade pip
# Installing CPU-only torch avoids downloading massive CUDA binaries and prevents RAM exhaustion on Render free tier
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu

echo "================================================="
echo " 3. Installing Backend Dependencies              "
echo "================================================="
pip install -r backend/requirements.txt

echo "================================================="
echo " Build Completed Successfully!                   "
echo "================================================="
