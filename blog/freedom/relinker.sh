#!/bin/bash

# Check if a file is provided as an argument
if [ $# -eq 0 ]; then
  echo "Usage: $0 <filename>"
  exit 1
fi

# Input and output files
infile="$1"
outfile="transformed_$infile"

# Process the file line by line
awk -v RS='\n' -v ORS='\n' '
  {
    # Extract the date (anything in square brackets)
    date=$0 /\[([^]]+)\]/

    # Extract the remaining text (everything after the date)
    text=substr($0, RLENGTH+2)

    # Remove leading/trailing whitespace from the text
    text=trim(text)

    # Create the link structure
    link="<a class=\"btn-v\" href=\"post/" substr(text, RINDEX(text, ".")+1) "\">" text "</a>"

    # Print the formatted output
    printf "<li><p>[" date "] " link "</p></li>\n"
  }

  function trim(str) {
    sub(/^\s+|\s+$/, "", str);
    return str;
  }
' "$infile" > "$outfile"

echo "Transformed links saved to: $outfile"
