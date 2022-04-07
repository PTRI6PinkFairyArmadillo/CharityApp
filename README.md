# CharityApp
: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: "[name].js",
    sourceMapFilename: "[name].js.map"
  }

"source-map"


STYLE RULES:
-single quotes
-2 spaces
-semicolons 
-MILOS SAYS: branch names start with capital letters!!!!
_______________________________
Git Feature Submission Process
_______________________________
Initial Setup
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
    -resolve conflicts as needed

Repeat Actions (Making new Feature, merging with Development)
5. Create new branches off dev to build new features
    - git checkout -b [your name/new feature]

6. Make updates and commit your branch 
    -git commit -m [comments] 
    -this won't affect Development branch yet
    -git checkout Development
    -git pull origin Development (pulls updates into Development that others may have made, do this BEFORE merging your feature)
    -git merge [new-feature]

7. Push updates to repo
    - git add .
    - git commit -m "something not in chinese"
    -git push origin Development

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




**API INFO**

GLOBAL GIVING (store of charitable orgs):
GLOBAL_GIVING_KEY=57c25a2c-f4d8-47b2-add7-cd2e316adb3e
Instructions for main GET request (Get all orgs): https://www.globalgiving.org/api/methods/get-all-organizations/


**COMMITTING TO POSTGRESQL**
psql -d <url from elephantSQL> -f starwars_postgres_create.sql

psql -d 'postgres://tuvajlhz:0B3hf6CGsyuCOLtTVBAdCiirBkXFYN2S@heffalump.db.elephantsql.com/tuvajlhz' -f charity_postgres_create.sql
