#!/bin/bash
################################################################################
# Name:        mblog.sh
# Date:        2024-06-06
# Author:      Amosnimos
# Description: To convert text files (date, title, content) to HTML articles with basic structure in designated output directory.
################################################################################

# ▙▗▌▛▀▖▌  ▞▀▖▞▀▖  ▞▀▖▌ ▌
# ▌▘▌▙▄▘▌  ▌ ▌▌▄▖  ▚▄ ▙▄▌
# ▌ ▌▌ ▌▌  ▌ ▌▌ ▌▗▖▖ ▌▌ ▌
# ▘ ▘▀▀ ▀▀▘▝▀ ▝▀ ▝▘▝▀ ▘ ▘

# mblog

# For handling error message
error() {
    echo -e "\e[1;37;41mError: $1\e[0m"
    if [[ -n "$2" ]]; then
        exit 0
    fi
}


day="$(date +%F)"

if [[ $# -gt 0 ]]; then
  text_file=$1
else
  read -p "Text file: " text_file
fi

read -p "Title: " title_selected
if [[ "$title_selected" == "" ]]; then
  title_selected=$(basename "$text_file" .txt)
fi

read -p "Image URL: " image_url

if [[ "$image_url" != "" ]]; then
  read -p "Image Name: " image_name
fi

date=$(date +%F)

article_name_lower=$(echo "${title_selected// /_}" | tr '[:upper:]' '[:lower:]')
output_directory="post_${article_name_lower}"
if [[ ! -d "$output_directory" ]];then
    mkdir "$output_directory"
else
    error "$output_directory already exist"
    exit 1
fi

image_extension="${image_url##*.}"
curl "$image_url" "${output_directory}/${image_name}.${extension}"

output_file="post_${article_name_lower}/${day}_${article_name_lower}.html"

# Empty/create the output file
> "$output_file"

echo -ne "<!DOCTYPE html>\n<html>\n<head>\n<title>Amos Nimos: $title_selected</title>\n<link rel=\"icon\" type=\"img/x-icon\" href=\"img/favicon.ico\">\n<link rel=\"stylesheet\" href=\"../../../css/light.css\">\n</head>\n<body>\n<main>\n" >> "$output_file"
echo "<a class=\"btn-h\" href=\"../../../index.html\">Home</a> <a class=\"btn-h\" href=\"../blog.html\">Blog</a>" >> "$output_file"
echo "<h2 class=\"title\">$title_selected</h2>" >> "$output_file"
echo "<div class=\"article\">" >> "$output_file"
if [[ "$image_url" != "" ]]; then
  echo "<img src=\"$image_url\" alt=\"$image_name\">" >> "$output_file"
fi
echo "<h3>$date</h3>" >> "$output_file"
echo "<p>" >> "$output_file"
if [[ ! -f "$text_file" ]]; then
  echo "If no text file was provided, this is the default text you will see." >> "$output_file"
  echo "ERROR: no file was provided!"
else
  # Use sed to replace empty lines with two HTML new line tags
  sed -e 's/^$/<\/p><p>/' "$text_file" >> "$output_file"
fi
echo "</p>" >> "$output_file"
echo "<hr><p class=\"footer\">By Amos Nimos</p>" >> "$output_file"
echo -ne "</div>\n</main>\n</body>\n" >> "$output_file"
echo "<li><p>[$date]<a class=\"btn-v\" href=\"post/${day}_${article_name_lower}.html\">$title_selected</a></p></li>" >> "post_${article_name_lower}/link.txt"

# Make the add link to blog.html page

if [[ -d ../../post ]]; then
  cp $output_file ../../post/ 
fi


rss_file="rss_feed.xml"

# Function to create RSS feed XML file if it doesn't exist
create_rss_file() {
    if [ ! -f "$rss_file" ]; then
        echo '<?xml version="1.0" encoding="UTF-8"?>' > "$rss_file"
        echo '<rss version="2.0">' >> "$rss_file"
        echo '<channel>' >> "$rss_file"
        echo '<title>Your RSS Feed Title</title>' >> "$rss_file"
        echo '<link>https://yourwebsite.com/rss_feed.xml</link>' >> "$rss_file"
        echo '<description>Latest articles from Your Website</description>' >> "$rss_file"
        echo '</channel>' >> "$rss_file"
        echo '</rss>' >> "$rss_file"
        echo "Created new RSS feed file: $rss_file"
    fi
}

# Function to append title and date to RSS feed XML file
append_to_rss() {
    local title="$1"
    local date="$2"
    local rss_entry="<item>\n\t<title>${title}</title>\n\t<pubDate>${date}</pubDate>\n</item>\n"

    echo -e "$rss_entry" >> "$rss_file"
    echo "Added article '$title' to RSS feed."
}

# Ensure RSS feed XML file exists
create_rss_file

# Append to RSS feed XML file
append_to_rss "$title_selected" "$(date +%F)"
