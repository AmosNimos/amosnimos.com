#!/bin/bash

cat ../token.txt | xclip -selection clipboard

# Add all changes
git add .

# Commit with a message including the current date
git commit -m "Update $(date +%F)" 

# Push to the main branch
git push origin main
