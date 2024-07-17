#!/bin/bash

# Define the base URL
BASE_URL="https://amosnimos.com/posts/"

# Check if the directory is provided as an argument
if [ -z "$1" ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

# Iterate over subdirectories in the given directory
for dir in "$1"/*/; do
    # Remove the trailing slash from the directory name
    dir=${dir%/}
    
    # Extract the date and article title from the directory name
    if [[ "$dir" =~ ([0-9]{4}-[0-9]{2}-[0-9]{2})_(.*) ]]; then
        date="${BASH_REMATCH[1]}"
        title="${BASH_REMATCH[2]}"
        url_title=$(echo "$title" | tr ' ' '_' | tr '[:upper:]' '[:lower:]')

        # Find the HTML file within the directory
        html_file="${dir}/${title}.html"

        # Output the XML item
        cat <<EOF
<item>
    <title>${title//_/ }</title>
    <link>${BASE_URL}${date}_${url_title}/${url_title}.html</link>
    <pubDate>${date}</pubDate>
</item>
EOF
    fi
done
