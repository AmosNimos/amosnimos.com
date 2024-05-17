#!/bin/bash

# Directory containing the audio files
dir="$1"

# Name of the HTML file to be generated
html_file="audio_player.html"

# Begin HTML document
echo "<!DOCTYPE html>
<html>
<head>
	<title>Audio Player</title>
</head>
<body>" > "$html_file"

# Loop through all the audio files in the directory and generate an audio player for each file
for file in "$dir"/*
do
	if [[ "$file" == *.mp3 || "$file" == *.wav || "$file" == *.ogg ]]
	then
		echo "<p>$file</p>
		<audio controls>
			<source src=\"$file\" type=\"audio/mpeg\">
			<source src=\"$file\" type=\"audio/wav\">
			<source src=\"$file\" type=\"audio/ogg\">
			Your browser does not support the audio element.
		</audio>" >> "$html_file"
	fi
done

# End HTML document
echo "</body>
</html>" >> "$html_file"
