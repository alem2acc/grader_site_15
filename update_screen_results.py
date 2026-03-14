import re

with open('src/pages/ReadingPractice.tsx', 'r') as f:
    orig = f.read()

# I will just write a script to replace the results block.
# Actually it's easier to just use `replace_string_in_file` locally or sed.
