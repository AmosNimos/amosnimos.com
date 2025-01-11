#!/bin/bash

# Start counter at 132
counter=257

# Loop through all png files in the current directory
for img in ./*.png; do
    if [[ -f "$img" ]]; then
        # Construct the new file name
        new_name="ability$counter.png"

        # Rename the file
        mv "$img" "$new_name"

        # Increment the counter
        ((counter++))
    fi
done
