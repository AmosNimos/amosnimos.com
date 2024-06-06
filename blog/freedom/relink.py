import re

def transform_link(line):
  """Transforms a line containing a link into the desired format.

  Args:
      line: The original line containing the link.

  Returns:
      A string containing the transformed link in the desired format (within an <li> tag).
  """
  # Extract the date
  date_match = re.search(r"\[([^]]+)\]", line)
  date = date_match.group(1) if date_match else ""

  # Extract the text and filename
  text = line.split("[")[1].split("] ")[1]
  filename = text.split(".")[-1]

  # Create the link
  link = f'<a class="btn-v" href="post/{filename}"> {text} </a>'

  # Format and return the output
  return f"<li><p>[{date}] {link}</p></li>\n"

def main():
  """Reads the input file, transforms links, and writes to the output file."""
  # Get filenames
  input_file = input("Enter the name of the file containing links: ")
  output_file = f"transformed_{input_file}"

  # Open files
  with open(input_file, "r") as infile, open(output_file, "w") as outfile:
    for line in infile:
      transformed_line = transform_link(line)
      outfile.write(transformed_line)

  print(f"Transformed links saved to: {output_file}")

if __name__ == "__main__":
  main()
