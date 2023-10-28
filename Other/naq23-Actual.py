#wrong btw

# we are using the built-in input() function to read from standard input line by line.
# Here's a breakdown of how it's reading input:
#     The line n, k, c = map(int, input().split()) reads the first line of the input and splits it into three integers using the split() function. The map(int, ...) part is then converting these strings into integers.
#     After reading the first line, the code enters a loop: for _ in range(n):. This loop will iterate n times (where n is the number of teams given in the first line of input).
#     Within the loop, the line team_id, school_id = map(int, input().split()) reads the next line of input, splits it into two integers, and assigns them to the team_id and school_id variables. This way, we read the team's ID and the school's ID for each team, one by one.
# Thus, the code processes the input line by line, first reading the parameters n, k, c and then reading each team's information one at a time in a loop.

n, k, c = map(int, input().split())
schoolDict = {}
limitQueue = []
advancing = []

for _ in range(n):
    team_id, school_id = map(int, input().split())
    if school_id not in schoolDict:
        schoolDict[school_id] = 0

    if schoolDict[school_id] < c:
        advancing.append(team_id)
        schoolDict[school_id] += 1
    else:
        limitQueue.append(team_id)

while len(advancing) < k:
    advancing.append(limitQueue.pop(0))

for team_id in advancing:
    print(team_id)

