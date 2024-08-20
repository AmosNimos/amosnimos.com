### Introduction: Why I Decided to Write This Book

When I wander into a bookstore, I'm always drawn to the programming section. The glossy covers and bold titles promise so much, but when I actually start flipping through them, I realize that most of these books have aged like fine milk. They’re outdated, overly specialized, or even worse, specific to software interfaces that have long since changed.

I never end up taking any of them home. Instead, I rely on my own experience and passion for creating little programs. I have a strong belief that if something can be done in the terminal, it should be done in the terminal. And most things, in fact, can. My second belief is that if something can be coded to be fully functional in a CLI-only environment, it also should be.

This book isn't just about coding; it’s about the philosophy of coding. The concepts we’ll discuss apply to most, if not all, programming languages and will never age. While this book isn’t purely hypothetical—we’ll look at actual scripts and some code that will be system or language-specific—it’s written to last and always be relevant in its core teachings. It’s practical and will show you how to complete actual tasks and build your own library of software.

I’m Amosnimos, and I’ve been coding for about a decade, completing more than a hundred solo projects. This is not a master class in perfect code, but in quick, enjoyable coding. I’ve never coded as a full-time job or earned money from it, so why do I keep the hobby? Because programming is the closest thing to being a god. It's the most creative outlet there is. It's magical; it's the closest to being an actual wizard. Coding is power.

It’s not always evident to non-wizards what’s so fun about the process of writing code, but it gives you one of the most powerful senses of accomplishment when you solve a problem on your own. It's similar to solving a complex math equation, but with more possibilities and more creativity. Unlike math, where solutions are often finite, there are often an infinite number of solutions to a single issue in programming and scripting.

Even though I program in a multitude of languages, I specialize in Bash at a somewhat master level, using it as an actual programming language for complex tasks. I’ve built my own library to expand the scripting language far beyond its intended usage and performed multiple tasks outperforming Python. While I can accomplish interesting things in Python too, it’s often far less optimized.

By the end of this book, I hope you’ll learn to do the same—take a language you like and expand on it. Build your own utility. Not to be the best programmer, but to have working software you made from scratch.

---

### Chapter Two: Embracing the Unix Philosophy

The Unix philosophy is a set of cultural norms and philosophical approaches to software development that emerged from the experiences of leading developers of the Unix operating system. It's a philosophy that can guide you in writing clean, efficient, and maintainable code, whether you're working with Bash, Python, or any other language.

#### The Core Tenets of the Unix Philosophy

1. **Make Each Program Do One Thing Well**
   - Focus on creating programs that perform a single task effectively. This encourages modularity and simplicity.

2. **Expect the Output of Every Program to Become the Input to Another**
   - Design programs to work together. This is achieved through a simple, consistent interface, often using text streams.

3. **Design and Build Software, Even Operating Systems, to Be Tried Early, Ideally Within Weeks**
   - Encourage incremental development and frequent iteration.

4. **Use Tools in Harmony**
   - Combine small, well-defined tools to accomplish more complex tasks.

5. **Write Programs to Handle Text Streams, Because That Is a Universal Interface**
   - Text streams are simple, flexible, and easy to understand. They allow different programs to communicate and work together seamlessly.

#### Applying the Unix Philosophy

To illustrate how these principles can be applied, let's consider a simple example. Suppose we want to create a script that processes log files to extract and summarize error messages.

**Step 1: Make Each Program Do One Thing Well**
- We start by creating a script that reads a log file and extracts error messages.
  
```bash
#!/bin/bash
extract_errors() {
    grep "ERROR" "$1"
}
```

**Step 2: Expect the Output of Every Program to Become the Input to Another**
- Next, we write a script that summarizes the extracted error messages.

```bash
#!/bin/bash
summarize_errors() {
    sort | uniq -c | sort -nr
}
```

**Step 3: Use Tools in Harmony**
- We combine these two scripts in a pipeline to achieve the desired functionality.

```bash
#!/bin/bash
extract_errors "$1" | summarize_errors
```

**Step 4: Handle Text Streams**
- The scripts use text streams to pass data between them, ensuring flexibility and simplicity.

#### The Power of Modularity

By adhering to the Unix philosophy, we create modular tools that can be reused and recombined in various ways. This modularity not only makes our code easier to maintain but also empowers us to build more complex solutions by leveraging simple, well-defined components.

#### Conclusion

The Unix philosophy is more than just a set of guidelines; it's a mindset that fosters creativity, efficiency, and elegance in software development. As you progress through this book, you'll see how these principles can be applied to real-world problems, making your coding journey not only more enjoyable but also more productive.

---

### Chapter Three: Mastering the Command Line

In an era where graphical user interfaces (GUIs) dominate the landscape, the command line (TTY) remains a bastion of efficiency, control, and simplicity. For those of us who have an unconditional love for the TTY environment, the invention of the mouse marked the beginning of a misguided shift towards laziness. The reliance on GUIs led to bloated, slow, and often confusing applications, particularly when it comes to server management and remote SSH connections. GUIs can make learning and using applications frustrating, as updates and changes often render previous knowledge obsolete. In contrast, the command line offers a timeless and powerful way to interact with your system.

#### Why the Command Line?

The command line is the heart of Unix-like systems, providing a direct and efficient way to perform tasks. Unlike GUIs, which can be resource-intensive and slow, the command line is lightweight and fast. It allows you to automate repetitive tasks, chain commands together, and manage your system with precision.

Key advantages of the command line include:
- **Efficiency:** Commands can be executed quickly, often with just a few keystrokes.
- **Automation:** Scripts can be written to automate complex tasks, saving time and reducing errors.
- **Consistency:** The command line interface remains stable across updates, unlike GUIs, which may change frequently.
- **Remote Management:** The command line is ideal for managing remote systems over SSH, where graphical interfaces are impractical.

#### Getting Started with the Command Line

To begin mastering the command line, you need to understand some basic concepts and commands. Let's start with navigating the file system.

**Navigating the File System**

- `echo`: Print Text
  
    ```bash
    echo "Hello World"
    ```


- `pwd`: Print Working Directory. Displays the current directory you are in.
  
    ```bash
    pwd
    ```

- `ls`: List. Lists the contents of a directory.

    ```bash
    ls
    ```

- `cd`: Change Directory. Moves you to a different directory.

    ```bash
    cd /path/to/directory
    ```

    ```

**File Manipulation**

- `touch`: Creates an empty file or updates the timestamp of an existing file.

    ```bash
    touch new_file.txt
    ```

- `cp`: Copy. Copies files or directories.

    ```bash
    cp source_file.txt destination_file.txt
    ```

- `mv`: Move. Moves or renames files or directories.

    ```bash
    mv old_name.txt new_name.txt
    ```

- `rm`: Remove. Deletes files or directories.

    ```bash
    rm file_to_delete.txt
    ```

#### Command Line Tools

The command line is packed with powerful tools that can handle a wide range of tasks. Here are a few essential ones:

- `grep`: Searches for patterns in files.

    ```bash
    grep "search_pattern" file.txt
    ```

- `find`: Searches for files and directories.

    ```bash
    find /path/to/search -name "file_name"
    ```

- `cat`: Concatenates and displays file content.

    ```bash
    cat file.txt
    ```

- `head` and `tail`: Display the beginning and end of a file, respectively.

    ```bash
    head file.txt
    tail file.txt
    ```

### Chapter Four: The Power of GNU and the Philosophy of Unix

In the realm of computing, few organizations have had as profound an impact on the tools and philosophies we use daily as the GNU Project. The GNU (GNU's Not Unix) Foundation, spearheaded by Richard Stallman, has not only contributed to the development of essential command-line tools but has also championed a philosophy that underpins the power and flexibility of Unix-like systems. Understanding the GNU Project and its philosophy is key to appreciating the versatility of the command line and the power of combining tools through pipes.

#### What is the GNU Project?

The GNU Project, launched in 1983 by Richard Stallman, is an ambitious initiative aimed at creating a free Unix-like operating system. The project's name reflects its goal: to develop a Unix-compatible system that is completely free software, meaning users have the freedom to run, modify, and distribute it.

The GNU Project provides a suite of tools that are integral to the Unix and Unix-like environments. These tools include well-known utilities such as `ls`, `grep`, `awk`, `sed`, `find`, and many others. The GNU utilities adhere to the Unix philosophy of small, single-purpose programs that can be combined to perform complex tasks.

#### Why the GNU Project Matters

1. **Freedom and Open Source**: The GNU Project's commitment to free software has been fundamental in shaping the open-source movement. By providing software that can be freely used, modified, and shared, GNU has empowered countless developers and users around the world.

2. **Standardization**: GNU tools have become standard components in Unix-like operating systems, including Linux distributions. Their widespread adoption has helped create a consistent environment for developers and system administrators.

3. **Philosophy**: The GNU Project promotes a philosophy that emphasizes the importance of software freedom, collaboration, and transparency. This philosophy is not just about the tools themselves but also about fostering a community where knowledge and improvements are shared.

4. **Community and Collaboration**: The GNU Project has fostered a vibrant community of developers and users who contribute to and improve GNU software. This collaborative spirit has led to continuous enhancements and innovations in the tools provided by GNU.

#### The Philosophy of Unix

At the core of the GNU Project's philosophy is the Unix philosophy, which values simplicity, modularity, and composability. Here’s a brief overview of this philosophy:

1. **Write Programs That Do One Thing and Do It Well**: Unix tools are designed to perform a single task efficiently. This focus on simplicity ensures that each tool is reliable and effective in its specific domain.

2. **Write Programs to Work Together**: Unix tools are designed to be combined in various ways to perform complex tasks. This modularity allows users to build powerful workflows by chaining simple commands together.

3. **Handle Text Streams**: Many Unix tools are designed to process and manipulate text streams. This approach leverages the power of text as a universal format for data exchange and processing.

4. **Use Pipes to Combine Tools**: Pipes (`|`) are a fundamental feature of Unix-like systems that allow the output of one command to be used as the input to another. This concept enables users to create powerful command sequences and pipelines.

#### The Power of Pipes

Pipes are a key element of the Unix philosophy, allowing you to combine multiple tools to achieve complex results. By chaining commands together with pipes, you can leverage the strengths of individual tools to perform sophisticated data processing tasks.

**Example of Using Pipes**

Consider a scenario where you want to find the number of lines in a log file that contain the word "error":

```bash
grep "error" /var/log/syslog | wc -l
```

In this example:

1. `grep "error" /var/log/syslog`: Searches for lines containing "error" in the syslog file.
2. `|`: Pipes the output of the `grep` command to the next command.
3. `wc -l`: Counts the number of lines in the output from `grep`.

By using pipes, you have combined `grep` and `wc` to efficiently count occurrences of "error" in the log file.

**Another Example**

Suppose you want to find all files in a directory that are larger than 1MB and sort them by size:

```bash
find /path/to/directory -type f -size +1M -exec ls -lh {} + | sort -k 5 -h
```

In this example:

1. `find /path/to/directory -type f -size +1M`: Finds files larger than 1MB.
2. `-exec ls -lh {} +`: Lists details of these files.
3. `|`: Pipes the output of `ls` to the next command.
4. `sort -k 5 -h`: Sorts the files by size in human-readable format.

#### Conclusion

The GNU Project and the Unix philosophy have provided us with a robust set of tools and principles that are as relevant today as ever. By understanding and embracing the philosophy of simplicity, modularity, and composability, you can harness the full potential of command-line tools and create powerful, efficient workflows. The ability to combine tools using pipes allows for unparalleled versatility, turning individual commands into a cohesive, dynamic system. As you continue to explore and utilize these tools, you'll discover that their true power lies in their ability to work together, much like building blocks in a grand, ever-evolving construction.


---

#### Chapter Five: Automation with Shell Scripting

One of the greatest strengths of the command line is the ability to automate tasks through scripting. Bash scripting allows you to write scripts that execute a series of commands, making repetitive tasks a breeze.

**Basic Bash Script**

```bash
#!/bin/bash

# A simple script to back up a directory

SOURCE="/path/to/source"
DESTINATION="/path/to/destination"

tar -czf backup.tar.gz $SOURCE
mv backup.tar.gz $DESTINATION
```

Save this script to a file, make it executable, and run it:

```bash
chmod +x backup.sh
./backup.sh
```

**Scheduling Tasks**

Combine your scripts with `cron` to schedule them. Edit your crontab file with `crontab -e` and add a line to run your script at a specific time:

```bash
0 2 * * * /path/to/backup.sh
```

This example schedules the script to run every day at 2 AM.

#### Conclusion

The command line offers unparalleled power and efficiency, particularly for tasks that can be cumbersome and slow with a GUI. By mastering the command line, you gain the ability to control your system with precision, automate repetitive tasks, and streamline your workflow. As you continue to explore the command line, you'll discover that its timeless principles and tools provide a solid foundation for any programming or system administration task. The journey to command line mastery is one of empowerment, enabling you to accomplish more with less effort and greater confidence.

---

```bash
#!/bin/bash

# del - A safer delete utility
# Author: Amosnimos
# Created: 2024-08-03
# Last Modified: 2024-08-03

TRASH_DIR="$HOME/.local/share/Trash"
CONFIRM_PROMPT="Are you sure you want to delete"

print_help() {
    echo "Usage: del [OPTIONS] FILES..."
    echo "A safer delete utility that moves files and directories to trash."
    echo
    echo "Options:"
    echo "  -h          Show this help message and exit."
    echo "  -c          Clear the trash directory."
    echo
    echo "Files are moved to $TRASH_DIR."
}

clear_trash() {
    if [ -d "$TRASH_DIR" ]; then
        echo "Clearing trash directory..."
        rm -rf "$TRASH_DIR"/*
        echo "Trash directory cleared."
    else
        echo "Trash directory does not exist."
    fi
}

move_to_trash() {
    local item="$1"
    local trash_item="$TRASH_DIR/$(basename "$item")"

    if [ -e "$trash_item" ]; then
        echo "$CONFIRM_PROMPT $item? (f - file, d - directory)"
        read -r choice
        case "$choice" in
            f)
                if [ -d "$item" ]; then
                    echo "$item is a directory. Use '-r' option to delete directories."
                else
                    mv "$item" "$TRASH_DIR"
                    echo "$item moved to trash."
                fi
                ;;
            d)
                if [ -f "$item" ]; then
                    echo "$item is a file. Use 'f' option to delete files."
                else
                    mv "$item" "$TRASH_DIR"
                    echo "$item moved to trash."
                fi
                ;;
            *)
                echo "Invalid choice. $item not moved."
                ;;
        esac
    else
        mv "$item" "$TRASH_DIR"
        echo "$item moved to trash."
    fi
}

# Main script logic
if [ "$#" -eq 0 ]; then
    print_help
    exit 1
fi

while getopts ":hc" opt; do
    case $opt in
        h)
            print_help
            exit 0
            ;;
        c)
            clear_trash
            exit 0
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            print_help
            exit 1
            ;;
    esac
done

shift $((OPTIND -1))

for item in "$@"; do
    if [ -e "$item" ]; then
        move_to_trash "$item"
    else
        echo "$item not found."
    fi
done
```

### Why I Chose This as an Example

I like to patch what I perceive to be flaws in my system, and so should you. We don't all think alike, and that's perfectly okay. For example, I understand why `rm` and `rmdir` are separate commands. You don't want to accidentally delete a directory when you intended to delete a text file sharing the same name. 

It makes sense, doesn't it? But I don't like how impractical it is to remember multiple commands just to delete stuff. 

Deletion can be a scary risky process, so I made my own utility in Bash.

This does not mean that this specific script will suit everyone's workflow, but it's the concept of it that matters. I didn't like how things worked, so I made them work the way I preferred. I adapted the workflow to match my personal preferences, how I wanted to use my system, not how my system wanted to be used.

While this book aims to be system-independent, it naturally leans towards Unix-like environments, mainly Linux-based systems. If the OS you use does not have these utilities, be glad you get the chance to make them yourself!

The `del` script is a prime example of this philosophy. It consolidates the functionality of `rm` and `rmdir` into a single command, adding safety features like moving files to the trash instead of permanent deletion and confirming actions when necessary. This customization is a testament to the power and flexibility of Bash scripting. By creating tools that fit our needs, we make our systems work for us, enhancing our productivity and satisfaction.


---

### Chapter 6: Don't Do Repetitive Tasks

In the world of programming, one of the core principles is to be lazy. This doesn't mean slacking off; rather, it's about working smart and automating repetitive tasks to save time and reduce errors. Let's take a look at a practical example that embodies this philosophy.

#### Automate Script Headers

When writing scripts, you often need to include a header with metadata like the name, description, and creation date. Instead of manually writing this header for every script, let's create a utility that generates it for us. 

Here's what our script should do:
1. Use the filename as the script name.
2. Take user input for the description.
3. Use the `date +%F` command for the creation date.
4. Optionally include a last edited date, which could be automated further with an alias for your text editor.

#### Example Script: Generate Header

```bash
#!/bin/bash

# Script to generate header for bash scripts

generate_header() {
    local filename="$1"
    local description="$2"
    local creation_date=$(date +%F)
    
    cat <<EOF
################################################################################
# Name:        ${filename}
# Date:        ${creation_date}
# Author:      Amosnimos
# Description: ${description}
################################################################################

EOF
}

# Check if script name is provided
if [[ -z "$1" ]]; then
    echo "Usage: $0 <script_name> [description]"
    exit 1
fi

filename="$1"
description="${2:-No description provided}"

# Generate header and append to the script
generate_header "$filename" "$description" > "$filename"
echo "Header generated and added to $filename"
```

This script generates a header based on the provided script name and description. It saves you the effort of manually typing the header every time.

#### Rule Number 3: What Can Be Automated, Should Be Automated

Automation is a cornerstone of effective programming. In the previous example, we automated the creation of script headers. Now, let's look at a more complex automation: handling command-line flags in scripts.

#### Example Script: Flag Handling

Let's take a script called `flag`, which simplifies handling command-line flags. This script not only parses flags but also generates a help message.

```bash
#!/bin/bash
################################################################################
# Name:        flag
# Date:        2024-04-21
# Author:      Amosnimos
# Description: The flag script parses command-line flags and sets variables accordingly.
################################################################################

# If already defined by the parent script, don't redefine the print_help function
if [[ ! "$(declare -f)" =~ "print_help" ]]; then
    # Function to print help message
    print_help() {
        local color_reset='\e[0m'
        local yellow_color='\e[33m'
        local green_color='\e[32m'

        echo "Usage: $0 [flags] [--help]"
        echo ""
        echo -e "${green_color}Description:${color_reset}"
        echo "The flag script parses command-line flags and sets variables accordingly."
        echo "All flags, regardless of capitalization, are treated as taking a value if one is not explicitly provided."
        echo "If a flag is provided without a value, it is set to 1 (true as boolean)."
        echo ""
        echo -e "${green_color}Options:${color_reset}"
        echo "  --help   Display this help message"
        echo ""
        echo -e "${green_color}Example:${color_reset}"
        echo "To use the 'flag' script, include it in your project and call it with the source command, like this:"
        echo ""
        echo -e "${yellow_color}source flag \"\$@\"${color_reset}"
        echo ""
        echo -e "${green_color}Warning:${color_reset}"
        echo -e "Make sure to source this script after the print_help function of your other script, to avoid overwriting them."

        exit 0
    }
fi

# Print help message if "--help" or "-h" flag is provided
if [[ ${1,,} == *"help" || ${1,,} == "-h" ]]; then
    print_help
fi

# Function to process flags
process_flags() {
    local flag=""
    local value=""

    while [[ $# -gt 0 ]]; do
        arg="$1"
        shift

        if [[ $arg =~ ^-- ]]; then
            flag="${arg#--}"  # Extract the flag name
        elif [[ $arg =~ ^-[A-Za-z]$ ]]; then
            flag="${arg#-}"  # Extract the flag letter
        else
            if [[ -n $flag ]]; then
                if [[ -z $value ]]; then
                    value="$arg"
                else
                    value+=" $arg"
                fi
            fi
        fi

        if [[ $flag && ( ! $1 || $1 =~ ^- ) ]]; then
            if [[ -z $value ]]; then
                value=1
            fi
            eval "flag_$flag=\"$value\""
            flag=""
            value=""
        fi
    done
}

process_flags "$@"
```

This script shows the core principle of my philosophy: "See a need, fill a need." Automating flag handling makes script development more efficient and less error-prone.

---


### The Programmer's Philosophy: Automate Repetitive Tasks

As programmers, we often find ourselves drawn to the idea of automation. The sentiment, "I would rather spend hours making a program to do a task than to do the task myself," might sound counterintuitive at first, but it embodies a fundamental aspect of our philosophy.

#### Why Do We Automate?

1. **Efficiency**: Although it might be quicker to do a task manually in the short term, automating it saves time in the long run, especially for repetitive tasks. By investing time upfront to create a solution, we free ourselves from having to repeat the task over and over.

2. **Consistency**: Automated tasks are less prone to human error. A program will perform the task the same way every time, ensuring consistent results.

3. **Scalability**: Automation allows us to handle tasks that would be impractical to manage manually at scale. Whether it's processing large datasets or managing complex workflows, automation scales effortlessly.

4. **Innovation**: Automation frees up our time, allowing us to focus on more creative and complex problems. Instead of getting bogged down by routine tasks, we can invest our energy in innovation.

#### A Lighthearted Joke

"How many programmers does it take to change a light bulb? None, they spend their life trying to make it change itself."

This joke captures the essence of a programmer's mindset. We don't think narrowly. Yes, in the moment, it might be quicker and more efficient to do something manually. But in the long term, we recognize the inefficiency of repetitive tasks. Repetitions call for automation, especially when the task is not compatible with our workflow.

### Conclusion

Automation is a key aspect of programming. It allows us to be more efficient, consistent, and innovative. By automating repetitive tasks, we free up our time to focus on more important and creative challenges. Remember, what can be automated, should be automated. This principle not only improves our workflow but also embodies the essence of a programmer's mindset.

---

Absolutely! Here’s the revised version of Chapter 7, incorporating your insights:

---

## Chapter 7: Build Tools to Build Tools

One of the core ideologies I live by is creating tools that help build other tools. This principle is crucial for efficient and effective problem-solving in programming.

### The Philosophy

1. **Build the Tools to Make Better Tools**:
    - Start by developing simple tools that enable you to create more complex tools. Just as you wouldn't build a house without a hammer, don’t start a complex project without first making the tools necessary to build it.

2. **Start with the Basics**:
    - Before diving into a big project, break down the task into its most fundamental components. Create tools for these basic tasks first. If you need to build a hammer, begin by making the mold to produce multiple hammers. You might even need simpler tools like a hammer to make the mold!

3. **Create Your Own Tools**:
    - Whenever possible, develop your own tools rather than relying on those you cannot fully understand, adapt, or improve. Custom tools can be tailored to fit your specific needs and preferences, giving you greater control and flexibility.

4. **Avoid One-Trick Ponies**:
    - Ensure that your tools are versatile and can handle a range of related tasks. Instead of crafting a script for a single purpose, design it to be applicable in various scenarios. This maximizes utility and extends the lifespan of your code.

### The Core Rules

Let's reinforce the main rules:

1. **What can be done in CLI, should be done in CLI** (and most things can).
2. **What can be coded without GUI, should be coded without GUI** (and most things can).
3. **What can be automated, should be automated** (and most things can); repetitions call for automation.
4. **Build the tools you need first; only then tackle the big project**. Focus on modular components and start with the basics to ensure you’re well-equipped for more complex tasks.

### Conclusion

In essence, this chapter underscores the importance of building tools that facilitate the creation of other tools. By focusing on modular components and starting with the basics, you can streamline your workflow, reduce repetitive tasks, and tackle larger projects with greater efficiency. Remember, the key is to break problems down to their most basic components and build from there.

---

For the next chapter, "Building Your Own Command-Line Tools," focusing on the core concepts without delving into full scripts, here’s a structured preview that aligns with your request:

---

## Chapter 8: Building Your Own Command-Line Tools

### Introduction

Once you’re comfortable with Bash scripting and text processing, the next step is to create your own command-line tools. This chapter will guide you through the essentials of building reusable and modular tools that can seamlessly integrate into your workflow. We’ll cover best practices for writing clean, maintainable code and explore how to package your tools for distribution.

In this chapter we will talk about an hypothetical menu selection utility.

### Core Concepts

1. **Designing Modular Tools**:
   - Start by identifying the core functionality you need. Design your tool to be modular so that it can be easily adapted or extended. For instance, if you need a menu utility, break it down into functions for handling user input, displaying options, and managing selections.

2. **Creating Reusable Functions**:
   - Functions are the building blocks of your tool. Ensure they are general enough to handle various inputs but specific enough to perform their intended tasks. For example, create a function to handle user input that can be reused across different tools.

3. **Handling User Input**:
   - Implement functions to capture and process user input. Use `read` for simple cases and handle special keys with appropriate escape sequences. Ensure your tool can interpret and react to different types of input effectively.

4. **Displaying Information**:
   - Use terminal control commands (like `tput`) to format and display information. Customize your tool's appearance with colors and borders to enhance usability. Ensure your tool’s output is clear and readable.

5. **Error Handling and Edge Cases**:
   - Implement robust error handling to manage unexpected situations. For instance, check if files exist before trying to read them and provide meaningful error messages if something goes wrong.

6. **Packaging and Distribution**:
   - Once your tool is ready, package it for distribution. Provide clear instructions on how to install and use it. Consider using scripts or installers to simplify the setup process for others.

### Example Concept: CLI Menu Utility

To illustrate these concepts, let’s consider a simple CLI menu selection utility. Here’s a high-level overview of its core components:

- **Initialization**: Set up the terminal environment and prepare data for display.
- **Input Handling**: Capture and process user input, including special keys for navigation.
- **Display Logic**: Render the menu with customizable borders and colors.
- **Main Loop**: Continuously update the display based on user interactions until an exit condition is met.

#### Key Functions

- **`initialize_environment`**: Sets up terminal settings and prepares the display.
- **`handle_input`**: Reads and processes user input, updating selections and navigating through options.
- **`display_menu`**: Renders the menu with options and highlights the selected choice.
- **`cleanup`**: Restores terminal settings and performs any necessary cleanup on exit.

By focusing on these core functions, you can build a versatile and reusable CLI tool that can be adapted for various purposes. 

### Best Practices

- **Write Clean Code**: Keep your code well-organized and comment where necessary. This makes maintenance and future enhancements easier.
- **Test Thoroughly**: Test your tool in different scenarios to ensure it behaves as expected.
- **Document Your Tool**: Provide clear documentation on how to use your tool and any configuration options it supports.

### Conclusion

Building your own command-line tools involves understanding core principles of modular design, input handling, and output formatting. By creating reusable functions and focusing on clean code practices, you can develop tools that enhance your workflow and provide valuable functionality.

---

### Chapter 9: Documenting Your Code

Effective documentation is crucial for understanding and maintaining code, but it can often be neglected. This chapter will explore best practices for documenting your projects, from using Git for version control to creating comprehensive README files and design documents.

#### Introduction

Programming can be challenging, and clear documentation is essential for both your future self and others who may work with your code. This chapter will guide you through various documentation strategies, highlighting the importance of version control with Git, the role of README files, and how to create detailed design documents.

#### 1. **Using Git for Version Control**

Programming often involves the challenge of improving or adding features to existing code, which can be daunting due to the fear of breaking something that was previously working. This chapter will guide you on how to document your code effectively while managing changes and mitigating risks.

**The Fear of Breaking Code**
When you need to make changes or add new features, it’s natural to worry about introducing bugs or breaking existing functionality. This fear is akin to a child hesitating to color a carefully made drawing for fear of ruining it.

**Backup Methods**
If you’re not using Git or need a quick backup, manually copying your code can be effective:
```bash
cp your_code.code old_version/your_code_v00x.code
```
This creates a snapshot of your code at a particular point, allowing you to restore it if needed.

**What is Git?**
Git is a distributed version control system that allows you to track changes to your codebase, collaborate with others, and manage different versions of your project. It is independent of GitHub, though GitHub provides a web-based interface for Git repositories.

**Git as a Safety Net**
Git provides a powerful way to manage these fears. By using Git, you can:
- **Track Changes**: See a history of changes and understand how your code has evolved.
- **Create Branches**: Experiment with new features in separate branches without affecting the main codebase.
- **Revert Changes**: If a change introduces issues, you can easily revert to a previous stable version.

**Why Use Git Locally?**
Even if you don’t use GitHub or other online platforms, Git is valuable for local version control. It helps you:
- Track changes and revert to previous states.
- Create branches for new features or bug fixes.
- Collaborate with others using a structured workflow.

**Commit Messages as Documentation**
Commit messages are a form of documentation that records the history of changes in your project. Good commit messages should:
- Be concise and descriptive.
- Explain why changes were made, not just what was changed.
- Use imperative mood (e.g., “Fix bug” instead of “Fixed bug”).

**Basic Git Workflow**
1. **Initialize a Repository**: `git init`
2. **Add Files**: `git add <file>`
3. **Commit Changes**: `git commit -m "Your message"`
4. **View History**: `git log`
5. **Branch Management**: `git branch <name>`, `git checkout <name>`

#### 2. **Creating a Good README.md File**

**Purpose of README.md**
A README.md file provides an introduction to your project. It should be clear, informative, and structured. Essential elements include:
- **Project Overview**: Describe the purpose and functionality of your project.
- **Installation Instructions**: How to set up and run your project.
- **Usage Examples**: Basic examples of how to use the tool or software.
- **Contributing Guidelines**: How others can contribute to the project.
- **Licenses**: Legal information about the use and distribution of your project.

**Example Structure**
```markdown
# Project Name

## Overview
A brief description of what your project does and its main features.

## Installation
Step-by-step instructions for setting up your project.

## Usage
Examples of common commands or use cases.

## Contributing
Guidelines for contributing to the project.

## License
Information about the licensing of the project.
```

#### 3. **Creating Design Documents**

**What is a Design Document?**
A design document provides a detailed explanation of the architecture and components of your project. It helps others understand how your code is structured and why specific design decisions were made.

**Components of a Design Document**
- **Overview**: High-level description of the project.
- **Architecture**: Diagram and explanation of the system architecture.
- **Components**: Description of each module or component and its responsibilities.
- **Data Structures**: Explanation of key data structures and their roles.
- **Algorithms**: Description of important algorithms used in the project.
- **Interface Design**: Details on the interfaces between components.

**Markdown for Design Documents**
Markdown is an excellent tool for creating design documents due to its simplicity and readability. Use headings, lists, and code blocks to structure your document effectively.

**Example Structure**
```markdown
# Design Document

## Overview

Describe the purpose and goals of the project.

## Architecture

Provide a diagram and explanation of the system architecture.

### Components

- **Component A**: Description and purpose.
- **Component B**: Description and purpose.

### Data Structures

1. **Data Structure 1**: Description and use case.
2. **Data Structure 2**: Description and use case.

---

## Interface Design

Describe the interfaces and interactions between components.
```

#### Conclusion

Effective documentation can transform how you and others interact with your code. By leveraging Git for version control, creating a clear README.md file, and developing detailed design documents, you enhance the usability and maintainability of your projects. Remember, good documentation not only helps in understanding the code but also tells the story of your project and its evolution.

---

Here are my basic rules for naming things


**No spaces or capital letter in file name** (use the underscore to replace spaces)

Honestly in the terminal capitalisation in general is a pain, if it where me, everything would be capitalised by default because I like the look of lowercase letter and this would solve the case sensitivity issue that unix like terminal have, only displaying fonts as all cap would not solve that case sensitivity issue, at least if both capitalised and none capitalised letter where treated as the same that be great but we don't live in that utopie so lowercase it is.

**Only use dot for extensions**
**Never use dot in directory names**
**Don't use extension for scripts that can be called globaly**
extensions are optional on unix system why force our self to type it frequantly.
**Always use shortest words synonym and only use acronyme when self explenatory like img for image is clear but snd for sound isin't vid for video is self explenatory but aud for audio not so much.**


Somethings never change and organisation is one of which, once you understand the core concepts of the root directory, we can start to organise your home, I am reffering to the $HOME directory.
I don't like the default Downloads Pictures and Desktop folder (look at those out of place capital letter awful), for once I use bspwm so no icon on my actual desktop thank god that could be part of my rules but don't "put anything on the desktop" does not sound all that important, the actual rule would rather be about organisation,
One fact to accept is that your home directory won't be empty and can't be, you have important files their that are essential to the good functioning of your system, I first taught that was a bit messy, but some mess you can't avoid, you should also keep the default directory for similar reasons some software might expect them and not work correctly if they are missing, but at the end of the day it's your choice if you want to keep them or not.

So where do you put your stuff if not in the Documents folder?

$HOME/file

other than the $HOME/bin and $HOME/user_bin 
This is where all your directorys and file should go, after all in unix directory are a sort of file type.
why? well when organising you always pick the most general related concepts and then you subdivide into branches that leads to the thing you are actually trying to store, you can have multiple nested directories it won't make your files harder to reach, this is where the path system comes in but where not their yet.
so for example, $HOME/file/code/python/games could be where you code game made in python, finding which concept is more generalised can be challanging, but having a good logical hierarchy just makes your stuff easier to find.
you could have for example a media directory in it you could have an sound video image, in vide you could have movies, series, recording, and in movie you could have genra in genra you could have years of movie. this might seem excesive ot store a single movie, but keep in mind this system is made for scalability, you don't have to follow it perfectly but as you accumulate more files into your system try to move them into this sort of hierachic order.
  
 
Let's settle a standard for tabulation:
4 spaces wide tabs converted to actual space

Yes, using two space wide tabs is more compact, but not only is it less human readable it's also easy to simply type space twice instead.
