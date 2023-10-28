#Note: this reads a file

import sys

if len(sys.argv) < 2:
    print("Usage: naq23-1.py <filename>")
    sys.exit(1)

n = k = c = 0
schoolDict = {}
limitQueue = []
advancing = []
filename = sys.argv[1]
notPrinted = True

try:
    with open(filename, 'r') as file:
        print("in")
        for line in file:
            team = line.split(" ")
            if len(team) == 3:
                n = int(team[0])
                k = int(team[1])
                c = int(team[2])
            else:
                if team[1] in schoolDict:
                    if schoolDict[team[1]] >= c:
                        limitQueue.append(team)
                    else:
                        advancing.append(team)
                    schoolDict[team[1]] = schoolDict[team[1]] + 1
                else:
                    schoolDict[team[1]] = 1
                    advancing.append(team)
            if len(advancing) >= k:
                notPrinted = False
                while advancing:
                    print(advancing.pop(0)[0])
                break
except FileNotFoundError:
    print(f"Error: File '{filename}' not found.")

if len(advancing) < k and notPrinted:
    while len(advancing) < k and limitQueue:
        advancing.append(limitQueue.pop(0))
    advancing = sorted(advancing, key = lambda x: x[1])
    while advancing:
        print(advancing.pop(0)[0])