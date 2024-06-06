#!/bin/bash
################################################################################
# Name:        linker.sh
# Date:        2024-06-06
# Author:      Amosnimos
# Description: Takes a URL and creates an html link where the text is the same as the URL
################################################################################

# ▌  ▜▘▙ ▌▌ ▌▛▀▘▛▀▖  ▞▀▖▌ ▌
# ▌  ▐ ▌▌▌▙▞ ▙▄ ▙▄▘  ▚▄ ▙▄▌
# ▌  ▐ ▌▝▌▌▝▖▌  ▌▚ ▗▖▖ ▌▌ ▌
# ▀▀▘▀▘▘ ▘▘ ▘▀▀▘▘ ▘▝▘▝▀ ▘ ▘


# Check if a URL is provided as an argument
if [ $# -eq 0 ]; then
  echo "Usage: $0 <URL>"
  exit 1
fi

# Sanitize the URL (optional)
# This line removes leading/trailing whitespace and potential special characters
url=$(echo "$1" | tr -d '\t\r\n ')

# Create the link
echo "<li><p><a href=\"$url\">$url</a></p></li>"
