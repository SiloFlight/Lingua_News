# Project Description:
Lingua News is a way to combine language learning and staying up to date with current events.

By hosting translations of recent articles from The Guardian in multiple languages, language learners are able to read advanced works in another language.

Articles are gotten through TheGuardian's API which can be found here: https://open-platform.theguardian.com/documentation/.

Translations are done through Google Cloud's Translation API, Google Cloud can be found here: https://cloud.google.com/?hl=en.

The frontend is a react app, while the backend hosts an Articles route which returns a list of the 10 most recent articles, and another which returns a specific article based on its id.

# Deployed Link
https://lingua-news.onrender.com/

# Screenshots of Application:

![Home Page](/README_Images/Home_Page.png)
![Article Page](/README_Images/Article_Page.png)
![Article Page with Translation](/README_Images/Article_Page(With_Translation).png)

# Local Setup Instructions:
## .env File
The .env file is not included in the git repository, so any other user has to create their own.
It should be of the form.

GUARDIAN_API_KEY="YOUR_GUARDIAN_API_KEY"

DATABASE_URL="YOUR_MONGO_DB_DB_URL"

GOOGLE_CLOUD_PROJECT_ID="YOUR_PROJECT_ID"
GOOGLE_CLOUD_PROJECT_LOCATION="YOUR_PROJECT_LOCATION"

## The Guardian API

You can get a free Guardian API key through the instructions on https://open-platform.theguardian.com/access/.

## Mongo DB
In order to set up your mongo db database, create an account on https://www.mongodb.com/.

Then create a new project.

After that create a new cluster, the free tier should be fine for low volume.

Follow the instructions to create a database user and choose Drivers as your connection method.

After that, save the connection string as your DATABASE_URL.

After creating your cluster, go to network access and add your current ip address.

## Google Cloud Translation

To set up Google Cloud Translation, first create an account on https://cloud.google.com/?hl=en.
After that page, go to https://console.cloud.google.com/welcome/new and create a new project.
Navigate to that project's home page, then scroll down to "Explore and Enable APIs".
After clicking that link, click on "Enable APIS and Services".
Type "Cloud Translation API" into the search bar and then enable that API.
In order to use the API, you can then sign up for a free trial of the google API.

Follow the instructions on https://cloud.google.com/docs/authentication/gcloud to allow the API to run through the command line.

## Building Database

In order to add articles to your database, run 'node server/backendFunctionality/AddArticles.js'. This file runs the 10 most recent Guardian Articles that are not in the database.
In order to translate articles already in your database, run 'node server/backendFunctionality/TranslatrArticles.js'. Change targetLang to another ISO language code to change what language the text becomes.

## Starting Website

Within server, run 'node index.js' to start backend.
Within client, run 'npm start' to start frontend.

# Learning Journey:

## Inspiration
My goal in creating this project was creating an unintrusive way to maintain language proficiency. After spending years learning Spanish, I regret how much worse I am at it because I don't use the language. My hope was that by creating a way to combine news reading with language use, the time that we spend refreshing ourselves on the language feels even more productive.

## Potential Impact
I think this website could be benefiicial for people who have spent time learning a language, but are going to be in a space where they'll have less time to dedicate to specifically learning that language. For example, a student who has to take an off term in the middle of their language track would be able to use this website to keep the language fresh if they don't have the time to dedicate themselves to

## New Technologies
Technology wise, I learned React, Node, MongoDB, Express, React-Bootstrap, and Compromise during the project.

Prior to the project, my experience with HTML and CSS was exclusively creating static webpages, and my experience with JS was just creating basic web scrapers using Puppeteer.

## Why I chose the new technology
I don't have an especially specific reason for choosing each technology. I honestly followed a lot of the recommendations on the challenge page. More or less, as I went through the project, if I found that I had an idea that I didn't know how to solve, I just looked it up or asked GPT what solutions there might be. Compromise is the main example of this. After getting the plain text articles, I realized that sentence structure is much more complex than splitting based on ".","?", or "!". Instead of trying to learning Natural Lan

## Challenges and What I Learned
One of the largest challenges I faced in this project was choosing a project that I could actually do. As the first really large CS project I've done, I was not prepared for the level of brainstorming that I needed before I even started programming. My very first idea was creating a central social media management website. After spending some time researching what technologies I'd use, I finally began searching for the APIs that I'd use to write the project. It was only at that point that I realized that social media sites such as Instagram did not actually support an API to upload posts. After the work and planning I did before, I realized that I skipped the important step of evaluating whether my goal was possible in general as well as possible for me as an inexperienced developer.

Using this experience, before I truly started the frontend and backend work, I determined whether I could actually find the APIs that could bring my idea to viability. So instead of spending hours creating a home page and finding out it didn't work, I created a small program to simply test what my APIs were able to do.

Other than that, many of my struggles came from the fact that I haven't done full stack work before this project. Although I've created static websites before, this was the first time I was using React and Node. Overall, the process was super challenging but it honestly reformated my approach to learning new languages. Instead of trying to force myself to read pages of documentation for hours, I googled or asked ChatGPT very specific questions. Doing this, I wasn't overwhelmed with information but instead actually familiarized myself with what I learned. Although it means that my knowledge of the entire language is shallow, my understanding of the things I actually wrote is much stronger.

My final major struggle was how I still had to switch one of my APIs at the very end of the project. Before deciding to use Google Cloud, I hoped to use the free tier of NLPCloud to translate articles. When I finally began integrating my backend, I realized that the hourly API key limits simply weren't enough for my needs. It was honestly kind of terrifying that the project might've just become impossible but replacing it with Google Cloud Translate was simple enough. In the end, it taught me the importance of adaptability and earlier testing.