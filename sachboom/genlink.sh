#!/bin/bash

# Create a new HTML file or overwrite if it exists
output_file="portfolio_items.html"
echo "" > $output_file

# Create an array with numbers 1 to 64
numbers=($(seq 1 46))

# Shuffle the array
shuffled_numbers=($(shuf -e "${numbers[@]}"))

# Loop through the shuffled array to generate HTML
for i in "${shuffled_numbers[@]}"
do
    cat <<EOL >> $output_file
<div class="portfolio-item">
    <a href="project${i}.html">
        <img src="img/${i}.jpeg" alt="Project ${i}">
        <div class="overlay">
            <div class="text">Project ${i}</div>
        </div>
    </a>
</div>
EOL
done

echo "HTML for shuffled portfolio items has been generated in ${output_file}."
