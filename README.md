# CV Builder


##  Features
1. **Custom templates:** One to start with.
2. **Custom and pre-made cateogories:** Decide what category-types to create.
3. **Enter info to each cateogry:**: Input limitations for different categories?  
4. **Select what from each category that gets put in the resume:** Checkboxes -> Preview, if satsified with the result -> download.
4. **Preview:** The ability to preview your resume as you fill out your resume.
5. **User authentication:** Connect auto-service to the app, and save resume details to a backend.
6. **Backend/DB:** Handle user auth, manage db.


### Questions
1. ***How do I determine what a template should looke like?*** \
Do some research on the subject before creating it.

2. ***What categories should I have pre-made and what should each category's limitations be?***
    - **Contact Info:** \
    Limit to essential contact details: Full name, professional email address, phone number, and optionally, LinkedIn profile URL.

    - **Profile/Summary:**\
     Keep it concise, ideally within 3-5 sentences. The user can save multiple ones for different jobs, since this should be tailored to each position.

    - **Work Experience:**   \
    Include job title, company name, location, and dates of employment.
    Provide brief descriptions of responsibilities and achievements for each position. Bulletpoints or paragraph? Optional?

    - **Education:** \
    List degrees, majors, institutions, and graduation years.
    
   - **Certifications:**\
    Specify certification name, issuing organization, and date earned.
    
    - **Projects:**    \
    Include project title, description, your role, and any notable outcomes or results.
    
    - **Skills:** \
    Organize skills into categories (e.g., Technical Skills, Soft Skills) for clarity.
    
   - **Languages:** \
    Include languages spoken and proficiency level (e.g., fluent, proficient, basic).
    
    - **Other:** \
    Use this category for additional relevant information not covered elsewhere, such as professional memberships, volunteer work, or publications.
    Ensure the information provided is directly relevant to the job or industry.

3. ***How do I connect with db, e.g. firebase?*** \
Check it out, make a step-by-step guide to follow.

4. ***What should the db-schema look like?*** \
Write it out before you start with the project to avoid unnecessary issues.

5. ***How does user auth works with the selected database?***\
I have no idea atm.

6. ***What should each component look like?*** \
Make a compononent for each input type, after the project is connected to the backend. 
This is the edit mode, and not the finished product.

7. ***How should the preview feature be implemented?***
    - **Desktop:** Edit mode to the left side of the screean, preview on the right. Not sure about the breakpoint yet.
    - **Mobile:** Click-to-preview functionality, and click to close. The preview should fit the screen.
