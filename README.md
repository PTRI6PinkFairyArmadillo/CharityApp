# CharityApp




STYLE RULES:
-single quotes
-2 spaces
-semicolons 
-MILOS SAYS: branch names start with capital letters!!!!
_______________________________
Git Feature Submission Process
_______________________________
1. Create Organization and Repository (DONE)
2. Initialize Master & Dev Branches (DONE)
    -Master is ONLY for production!
    -use dev branch for development
3. Clone repo into your machine and move into Development branch
    - git checkout Development (it already exists, so no '-b', just moving to it)

4. As development changes, merge new updates
    -git checkout Development
    -git pull origin Development (pulls updates in Development that others may have made, do this BEFORE merging your feature)
    -git checkout [your-name/new-feature]
    -git merge Development
    -resolve conflicts as needed

5. Make updates and commit your branch 
    -git commit -m [comments] 
    -this won't affect Development branch yet

6. Create new branches off dev to build new features
    - git checkout -b [your name/new feature]

7. Push updates to repo
    -git push origin [your-name/new-feature]

8. Submit pull request (feature --> Development)
    -navigate to your feature branch
    -click "pull request" button

9. Review Pull Request
    -REVIEW WITH TEAM FIRST!!
    -click 'merge' button to approve

10. When feature is fully approved/ready, publish to master
    -repeat step 7 but to main (Development --> main)




Useful Git Commands
Create a new branch: git branch <feature>
Create a new branch & check it out: git checkout -b <feature>
checkout branch: git checkout <feature>
while on the feature branch for setting upstreaming and committing: git push --set-upstream origin <feature>

git clone --branch <branchname> https://github.com/PTRI6PinkFairyArmadillo/CharityApp.git