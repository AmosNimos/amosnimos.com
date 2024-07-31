#!/bin/bash

# Directory containing images
IMG_DIR="img"

# Output HTML file
OUTPUT_FILE="index.html"

# Shuffle the images
shuffled_images=$(ls "$IMG_DIR" | shuf)

# HTML Header
cat <<EOL > "$OUTPUT_FILE"
<!DOCTYPE html>
<html>
<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial;
}

.header {
  text-align: center;
  padding: 32px;
}

/* Create four equal columns that float next to each other */
.column {
  float: left;
  width: 25%;
  padding: 10px;
}

.column img {
  margin-top: 12px;
  width: 100%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>
<body>

<!-- Header -->
<div class="header">
  <h1>Image Grid</h1>
</div>

<!-- Photo Grid -->
<div class="row">
EOL

# Initialize column counter
column_counter=0

# Loop through shuffled images and add them to the HTML
for img in $shuffled_images; do
    if (( column_counter % 4 == 0 )); then
        echo "  <div class=\"column\">" >> "$OUTPUT_FILE"
    fi

    echo "    <a href=\"$IMG_DIR/$img\"><img src=\"$IMG_DIR/$img\"></a>" >> "$OUTPUT_FILE"

    if (( column_counter % 4 == 3 )); then
        echo "  </div>" >> "$OUTPUT_FILE"
    fi

    ((column_counter++))
done

# Close the last column if it wasn't closed
if (( column_counter % 4 != 0 )); then
    echo "  </div>" >> "$OUTPUT_FILE"
fi

# HTML Footer
cat <<EOL >> "$OUTPUT_FILE"
</div>

</body>
</html>
EOL

echo "HTML file generated at $OUTPUT_FILE"
