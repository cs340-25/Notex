### Title: Nuzz
#### Team Name: NUZZ LLC
#### Team Name for Github:
#### Team Members: Ashton Dy, Perry Shu, Porter Dosch, Colsen Murray, Adam Abdelrahman

#### Introduction:
We are planning on creating a feature rich note taking app that supports LaTeX, drawing, and other forms of note taking. 

We are first going to get a basic skeleton of the app that allows for basic navigation and functionality. This is so that everyone has a foundation to work on and to prevent conflicts at the root. We have created a Google document with all of the features and ranked each one based on importance. Everyone is pretty much going to be a feature engineer and will implement features based on the rankings. This way, should we run into issues with a feature, it won't slow the whole development process.

##### Motivation:
Place project in market context:
- Other products like OneNote and Notion exist, and have a drawing feature. However, our app will interface with a large language model in order to generate quizzes and content summaries for the user, in addition to creating templates for notes based on a course syllabus. 
Is it novel? what need does it fill:
- None of the features of this app will be novel. There are plenty of apps that will let you draw, or take notes in LateX. However, the novelty of our app comes from the centralization of all of the features along with the ease of use.
Team member backgrounds:
- Two of our team have development experience with frontend and backend development on similar projects.
- One of our team members has experience in computer vision related projects.
- The other two members have development experience with backend programming languages such as C and C++
Any additional information needed:



##### Customer Value:
Who is the primary customer? What do they want:
- Students, researchers, Business professionals, etc. We are targeting anyone who would take notes in their field with any variety of needs and goals in notetaking.

Underlying problem to solve or experience:
- Apps that offer this level of functionality are blocked off by a steep learning curve of how to even get started. 
Note apps that specialize in a certain context only offer features related to that context, not a uniform solution for different needs

##### Market context:
Proposed solution:
- We are looking to offer an all-in-one note taking app for all users no matter their field or expertise. Our app will provide easy to use tools and features to enhance productivity and usability. It will be built and deployed as a desktop application to begin with.
How will the customer benefit?
- The customer will have easy access to tools to streamline their notetaking experience. They will also be able to condense their learning curve by only learning one app for notes.
Have we tested the idea on anyone?
- We haven’t tested the idea on anyone yet, but as members of the group we are attempting to deliver a product to, we are creating features that ourselves or peers would use. We have direct input from one target demographic, which gives the same kind of input as testing.

##### Measures of Success
How will we know if customers got the benefits we want to provide?
- We would provide polling and user responses to gather data on this.
What are customer-centric measures of success?
- User retention of the app and general user satisfaction. If the app provides the necessary utilities with a degree of ease of use, users will tend to stay with the app after downloading it.

##### Technology:
Main components of system? What do they do?
- React frontend: GUI that interfaces with user
- Flask backend: Serves data to frontend 
- Electron Framework: Takes our webpage and turns it into a desktop app
High-level block diagram of system architecture?


Minimal system with some value to customer?
- A minimal system would include an app that would take files from a user or allow basic file creation with writing and save them either locally or in a database.
Possible enhancements that customers would value?
- Integration with LaTeX
- Expansion to mobile devices

Tools:
What will we use to build the system?
- 

Available tools we could leverage?
- 

##### Team Skills:
Has anyone built something like this before?
- Nobody on the team has developed a similar project. We have used a similar toolset, though.
Are the tools known or new to the team?
- The tools are generally known to the team, but some members will have to inform others on the tools’ specific uses
What are the team member roles?
- Mostly split by frontend and backend development.
- One team member should be responsible for the database connection, and more should focus on the frontend
Fixed or rotating?
- Fixed, but each member will have chances to learn other parts of the project, especially if they finish their portion quickly

##### Project Management
Schedule:

Is completion feasible?
- yes
When and how often will we meet? Face to face?
- Face to face twice per week
Tentative week-by-week schedule for tasks and deadlines
- 


Constraints:

Regulatory or legal Constraints
- App development standard practices
Ethical or social concerns
- Data privacy and leaking concerns. The database will need to be properly secured if we store data there instead of having it encrypted locally
Resources:
- The whole entire, undiluted internet
Will we have access to the data we need?
- The data we would need is for handwriting recognition, which there are datasets for on Kaggle.
What will happen if full functionality cannot be implemented
- We are planning on implementing the base functionality for notetaking before adding features incrementally. This will ensure that any additional features that cannot be built in time are unnecessary to demo the app, and can be added later.
