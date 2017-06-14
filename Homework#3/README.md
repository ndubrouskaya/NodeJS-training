Simple server starts on localhost:8000 (command to run: node server)

Possible requests:
- / -> show all content of file test.txt
- /find?str=some_word -> find a word and show its coordinates
- /show?startLine=1&startColumn=0, /show?startLine=1&startColumn=0&endLine=11&endColumn=4 -> cut and show a piece of file
- /os -> show info about OS
