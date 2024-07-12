#!/bin/bash

# Assuming blog.html is in the current directory
HTML_FILE="blog.html"
OUTPUT_XML="tmp_feed.xml"

# Start the RSS feed
cat << EOF > "$OUTPUT_XML"
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Amosnimos's Blog Feed</title>
    <link>https://amosnimos.com</link>
    <description>Recent articles from Amosnimos's blog</description>
    <language>en-us</language>
    <pubDate>$(date -R)</pubDate>
    <lastBuildDate>$(date -R)</lastBuildDate>
    <generator>ChatGPT RSS Generator</generator>
EOF

# Extract links from blog.html and create RSS items
grep -oE '<a class="btn-v" href="[^"]+' "$HTML_FILE" | while read -r line; do
    link=$(echo "$line" | sed 's/<a class="btn-v" href="//')
    title=$(basename "$link" | sed 's/-/ /g')
    pubDate=$(echo "$line" | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}')
    description="Description for $title"  # Replace with actual descriptions if available

    cat << EOF >> "$OUTPUT_XML"
    <item>
      <title>$title</title>
      <link>https://amosnimos.com/$link</link>
      <pubDate>$(date -d "$pubDate" -R)</pubDate>
      <guid>https://amosnimos.com/$link</guid>
      <description>$description</description>
    </item>
EOF
done

# End the RSS feed
echo "  </channel>" >> "$OUTPUT_XML"
echo "</rss>" >> "$OUTPUT_XML"

echo "RSS feed generated: $OUTPUT_XML"
