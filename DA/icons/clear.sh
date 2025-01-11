for file in ability*.png; do
    num=$(echo "$file" | sed -E 's/ability([0-9]+)\.png/\1/')
    if [ "$num" -gt 299 ]; then
        rm "$file"
    fi
done
