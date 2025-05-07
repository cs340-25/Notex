Final Report

### Title: NoTeX
#### Team Name: NoTeX LLC
#### Team Name for Github: NoTeX
#### Team Members: Ashton Dy, Perry Shu, Porter Dosch, Colsen Murray, Adam Abdelrahman

#### Introduction:
We created a feature-rich note-taking app that supports LaTeX, drawing, and other forms of note taking. We began this project intending to modify existing note-taking apps to better match how we think: structured concepts with many tangents and other ideas that are difficult to reflect in typical note-taking apps. By implementing a markdown editor, we created a vehicle to represent structured, linear notes. Supplementing this with a node-based “infinite” canvas allowed us to pair this organization with spaces for those tangential thoughts. 

Current support allows for the canvas to hold text and image items, but there is a lot of space to grow. NoTeX has been designed to adapt to proven note-taking strategies that emphasize active recall and illustrative strategies. With this in mind, our project can easily grow to match students' needs.

##### Motivation
Place project in market context:
Other products like OneNote and Notion exist, and have a drawing feature. However, our app allows simple note creation and management with an easy-to-understand file management system. It also includes an active canvas which allows figures and notes to be added in a”Post-It” style. 
Is it novel? what need does it fill:
None of the features of this app are novel. There are plenty of apps that will let you draw, or take notes in LateX. However, the novelty of our app comes from the centralization of all of the features along with the ease of use.
Team member backgrounds:
Two of our team have development experience with frontend and backend development on similar projects.
One of our team members has experience in computer vision related projects.
The other two members have development experience with backend programming languages such as C and C++

##### Approach
We began this project with student note taking in mind. This meant reflecting the various techniques we use in a coalesced app.
With that context, we ideated on how this could be implemented and determined a structured markdown editor and a freeform canvas space would make the perfect combination to achieve this.
We decided that making this a web-based cross-operating system desktop app would be beneficial and challenging for us, so we developed NoTeX using React and Electron.

##### Changes during development
During development, we quickly realized that implementing all of our intended features would be difficult in the limited timeframe. As a result, we built a baseline application with simple features such as markdown rendering and a canvas, integrated with a backend database hosted on Railway for scalability. This way, additional features could be added later on top of the already existing and functional app.

##### Summarize results and conclusions
We were able to create the backbone of our original concept with support for a markdown editor, Canvas with image and text note support, user profile, color customization, and a Railway-hosted PostgreSQL database with custom file structure. 
In more detail, ours begins with a home page featuring recent Files and Folders, a Favorites page for user-identified favorite Files and Folders, a search page, a note editor page, a settings page, and a profile/login page. 
As we will speak more about, we were not able to implement all of our (ambitious) intended features (which originally included querying an LLM to generate quizzes over selected content and link canvas items to specific lines in the notes editor). However, we were able to integrate the required features of a note-taking app while creating the infrastructure for further improvement.



##### Customer Value (no changes):
Who is the primary customer? What do they want:
Students, researchers, Business professionals, etc. We are targeting anyone who would take notes in their field with any variety of needs and goals in note taking.

Underlying problem to solve or experience:
Apps that offer this level of functionality are blocked off by a steep learning curve of how to even get started. 
Note apps that specialize in a certain context only offer features related to that context, not a uniform solution for different needs

##### Market context:
Proposed solution:
We are looking to offer an all-in-one note taking app for all users no matter their field or expertise. Our app provides easy to use tools and features to enhance productivity and usability. It will be built and deployed as a desktop application to begin with.
How will the customer benefit?
The customer will have easy access to tools to streamline their notetaking experience. They will also be able to condense their learning curve by only learning one app for notes.
Have we tested the idea on anyone?
We haven’t tested the idea on anyone yet, but as members of the group we are attempting to deliver a product to, we are creating features that ourselves or peers would use. We have asked our peers who are students about the app to some degree, but there was no formal testing. We have direct input from one target demographic, which gives the same kind of input as testing.

##### Measures of Success
How will we know if customers got the benefits we want to provide?
We would provide polling and user responses to gather data on this.
What are customer-centric measures of success?
User retention of the app and general user satisfaction. If the app provides the necessary utilities with a degree of ease of use, users will tend to stay with the app after downloading it.

##### Technology:
Main components of system? What do they do?
React frontend: The user will interface with the front end to take notes and utilize the apps features. Retrieves data from backend corresponding to the user that is signed in. Flask backend: Serves data to frontend and stores data in database using http calls
Database: PostgreSQL database hosted on Railway
Electron Framework: Takes our webpage and turns it into a desktop app
High-level block diagram of system architecture?
(AI Generated with GitDiagram: https://gitdiagram.com/cs340-25/notex)
Minimal system with some value to customer?
A minimal system would include an app that would take files from a user or allow basic file creation with writing and save them either locally or in a database.
Possible enhancements that customers would value?
Integration with LaTeX
Expansion to mobile devices
Changes to the system architecture
Throughout the project, our serviceable goals changed, changing the technology we used to build the project. In the beginning, we had simply planned to use a PostgreSQL database on the backend. We ended up employing the psychopg Python system to connect with our Flask framework. As we removed potential features, such as the AI-related portions, we removed their attendant technological requirements. In particular, this meant simplifying our python backend, which was no longer required to interface with an LLM.

Tools:
What did we use to build the system?
React for the frontend, Flask for the backend, Electron to create the desktop app, and PostgreSQL for the database. Other features would be at the discretion of whichever team member decides to implement it, taking into consideration ease of development and integration with the overall system.

##### Changes from status reports (what works, and what doesn’t?)
Most of the project works. We have a working note taking section with active http requesting and posting for the database. This means the notes are being saved over time, and they are persistent between logins. This represents potentially the largest portion of the project because it demonstrates a working full-stack project with database connectivity. That was always going to require substantial work, so it was important to get it done. 



One of the biggest parts of the project that is not working is a persistent canvas. Currently, the canvas resets itself when we change pages, so that is an area for improvement on the final project. However, being able to complete a working canvas in the first place was a major benchmark for our project goals. 

##### What tests have we run?
While we did not run any formal tests, we gathered informal format from other fellow students to see what they thought. Their insights helped us identify user interface issues and improve on layout, default theme visibility, and responsiveness. Among the most important of these changes were the dark mode and visibility settings shown below. 



##### What were the results from tests?
We had a variety of responses, but that was to be expected as each student uses things differently. We were often compared to common note taking apps like notion, or obsidian. We were able to change the UI to be a little more streamlined and understandable, as well as overhauling our color themes for light and dark mode. 

##### Team Skills:
What role did team members have throughout the project?
Adam: Designed and implemented Canvas and CanvasItem modules. Utilized React-RND module to allow for movable divs and created handlers to solve parent-child div architecture issues with custom scroll and zoom functions.
Ashton: Architect the general structure of the app and designed how the app will look. Setup many of the foundational pieces such as the interactive sidebar, folder bar, workspace, search page, and favorites page. Created the toolbar at the top for minimizing, windowing, and closing the app. Tested and connected the end points of the frontend and backend using axios in the front end to streamline the api. Handled formatting the incoming raw data so that it could be used throughout the app. Implemented create, read, update, and delete for the markdown editor that allows the notes to persist when navigating the app and when closing it out entirely. Implemented the right clicking option to add and delete the folder/note. Ensured responsiveness throughout the app so that the window could be resized without losing its structure.
Colsen: Developed the Flask backend to connect the react frontend to the database. The routing involves separate routes for data-related and user-related requests, which were all implemented with a standard http request system. The routing also handled error checking for several types of invalid requests from the frontend, mitigating bugs in the http request process. 
Perry: Designed and implemented the Markdown Editor component using React and React-Markdown to support markdown syntax support and previewing. Developed the home and login/profile pages to provide simple and clear user navigation and a responsive UI. Created custom theme support that would remain persistent past login using local storage. 
Porter: Designed and implemented database schema in PostgreSQL and deployed it using a database hosting service. Created backend functions in Python, leveraging the psycopg2 library to create an API for easy CRUD operations on database
Did all members contribute equally? 
Yes
Did team member roles change or were they mostly static
Team member roles were mostly static, the original components we assigned at the beginning of the project was the area all group members worked with. 
		

##### Project Management
Did you complete all your goals for the product on schedule? If not, what were the main reasons you did not meet your goals?
We were not able to integrate all of our intended features. We discovered that our feature objectives were quite far-stretching when it came to the technologies we would be using (mainly integrating LLM API calls or adding content-bound CanvasItems). This would mean we would not be able to build off of our previous work, causing us to spend more time than necessary in the development process. We settled on planning our core features that we could build off of (designing and implementing the backend and database to route our login and profile pages/store note content) to get us closer to a standalone application. While we were disappointed not to reach the goals we set in February, we are happy with the current product. Our fallback goal was to get a working notes app with less features, and we were able to fulfill that objective. 


##### Reflection
For this iteration and throughout the project
What went well?
We collaborated effectively as a team between roles with clear division of labor. We stayed well-organized throughout the entire project, and, even after working in separate spaces (frontend vs backend), we were able to communicate well enough to ensure smooth integration when the time came. 
What did not go well?
As a whole, we overestimated how much we were able to do within the scope of the course. Unfortunately, a lot of the features we wanted to add were not able to be implemented in the time we had. However, there were minimal issues with integration since we separated each part into different components ensuring we would be able to develop and test things individually without causing merge conflicts. 
Discuss aspects such as: planning, development, testing, and team management
The planning section of our project could have used some improvement. From the beginning, we planned which portions of the project we would do and what we wanted to implement. However, our specific planning of the technologies was less than it could have been. In the end, much of the research and planning was done while we were actively developing, leading to some disconnect in our ideas for project development. In the end, much of the development was done in chunks. Especially the backend was segmented by who developed each part. While the same was true for the front end, it was less so. We had two members who primarily jumped from place to place on the frontend, implementing the features we wanted to include.
From a testing perspective, much of our tests were technological and anecdotal. We did lots of testing to ensure that the app worked as we intended. We also built the app to how we thought users would like to use it. When it proved less useful in testing, we changed design features as needed. The team management on this project was generally successful with each team member being able to fulfil their parts of the project. Even though our work was largely disparate, we were able to work together to integrate each part, and we met our deadlines as required. So, team management was an overall success. 
Do you consider the final project a success? Why or why not? 
Yes, we consider the final project to be an overall success. While it would require further refinement and development to be a saleable product, that was not our goal for this portion of the project. Our primary goal was to build a working, database-connected note taking app. In that regard, the project was a resounding success. While it was not as feature-rich as we originally planned, Notex fulfilled more than our original minimal goals. The place we are at in development represents a good launchboard for a full scale product should we continue development, which, generally speaking, is a success.
