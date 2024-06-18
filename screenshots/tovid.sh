#!/bin/bash

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "ffmpeg not found. Please install ffmpeg to use this script."
    exit 1
fi

# Check if at least two arguments are provided
if [ "$#" -lt 2 ]; then
    echo "Usage: $0 <directory_of_images> <delay_between_images>"
    exit 1
fi

# Input directory containing images
input_dir="$1"

# Delay between images
delay="$2"

# Output video file
output_file="output.mp4"

# Use ffmpeg to create the video
ffmpeg -y -framerate 1/$delay -pattern_type glob -i "$input_dir/*.png" -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" -c:v libx264 -r 30 -pix_fmt yuv420p "$output_file"

echo "Video created: $output_file"
