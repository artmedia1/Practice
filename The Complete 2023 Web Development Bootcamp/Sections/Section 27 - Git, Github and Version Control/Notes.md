## .gitignore
This is GitHub’s collection of .gitignore 
```
https://github.com/github/gitignore
```

## Initialize git in a folder
call git init inside a folder
```
git init
```

## Git Command: git remote add
The git remote add command is used to create a new connection record to a remote repository. After adding a remote, you can use the remote's name (by convention, the remote name should be origin) in other Git commands to reference the remote repository.
Syntax:
```
git remote add [remote-name] [url]
```
Example:
To add a remote repository named "origin" with the URL https://github.com/user/repo.git, you would use:
```
git remote add origin https://github.com/user/repo.git
```
Once the remote is added, you can fetch, pull, or push changes to that repository using its name.


## Display the tracking state of files in the folder
The git status command displays the state of the working directory and the staging area
```
git status
```

## Clone a repository
To copy a git repository from a remote source, use git clone.
```
git clone <repository-url>
```

## Add files to staging area
To track new files or stage modifications to existing files, use git add.
```
git add <file-or-directory-name>
```
Or, to add all changes in the directory:
```
git add .
```

## Rollback changes to the last version committed
To revert your changes to the local repository that have not been committed.
```
git checkout <file Name>
```

## Commit changes
To save your changes to the local repository, use git commit.
```
git commit -m "Your commit message here"
```

## Pull latest changes from remote
To fetch and merge changes from a remote repository, use git pull.
```
git pull <remote-name> <branch-name>
```
Usually, for the default remote and branch, it's:
```
git pull origin master
```

## Push changes to remote
To send your committed changes to a remote repository, use git push.
```
git push <remote-name> <branch-name>
```
For the default remote and branch, it's typically:
```
git push origin master
```

## View commit history
To see the commit history of the current branch, use git log.
```
git log
```
## Create a new branch
To create a new branch, use git branch.
```
git branch <new-branch-name>
```

## Switch to another branch
To switch from one branch to another, use git checkout.
```
git checkout <branch-name>
```
In newer versions of git, you can also use:
```
git switch <branch-name>
```

## Merge one branch into another
To merge changes from one branch into another, switch to the destination branch and use git merge.
```
git merge <source-branch-name>
```

## Resolve merge conflicts
If there are conflicts during a merge, after resolving the conflicts in your files, mark them as resolved with:
```
git add <resolved-file-name>
```
Then continue with the commit:
```
git commit
```

## Delete a branch
To delete a branch, use git branch with the -d (safe delete) or -D (force delete) option.
```
git branch -d <branch-name>
```