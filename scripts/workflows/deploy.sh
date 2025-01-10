#!/bin/bash

TARGET_REPO=${TARGET_REPO:-"owner/repo-name"}
NEW_BRANCH=${NEW_BRANCH:-"update-submodules"}
MAIN_BRANCH=${MAIN_BRANCH:-"master"}

if [ ! -d "target_repo" ]; then
    git clone https://github.com/$TARGET_REPO.git target_repo
fi

cd target_repo

git fetch origin

git checkout $MAIN_BRANCH
git pull origin $MAIN_BRANCH

git checkout $NEW_BRANCH
git pull origin $NEW_BRANCH

if git merge --no-ff $NEW_BRANCH -m "Merge $NEW_BRANCH into $MAIN_BRANCH"; then
    echo "Merge successful"
    
    if git push origin $MAIN_BRANCH; then
        echo "Changes pushed successfully"
        # Optionally, delete the new branch if you don't need it anymore
        # git push origin --delete $NEW_BRANCH
    else
        echo "Failed to push changes"
        exit 1
    fi
else
    echo "Merge failed. There might be conflicts."
    git merge --abort
    exit 1
fi
