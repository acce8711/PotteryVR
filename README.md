# 🏺 PotteryVR – A Pottery-Destroying Experience

A pottery-destroying experience that explores emotional attachment to art, or simply lets you break some stuff.

## Overview

This project was created as part of a two-week solo assignment for a third-year design studio course, where our objective was to create a VR experience to get familiar with the [A-Frame](https://aframe.io/) framework. 

I was inspired by my own experience with pottery. Throughout my pottery journey, I’ve learned not to get too attached to my pieces, as they’re fragile and can easily break. I wanted to reflect that reality in an interactive WebVR experience where users intentionally destroy their pottery creations.

### Supported Devices

This experience supports both desktop and mobile devices.

### Technologies Used

- JavaScript  
- CSS  
- HTML  
- VS Code  
- Node.js  
- [A-Frame](https://aframe.io/)

## 🧾Desktop Setup Instructions

This project is not hosted online at the moment. In the meantime, you can run it locally by following the steps below:

1. Download and install [Git](https://git-scm.com/downloads)  
3. Download and install [Node.js](https://nodejs.org/en/download)  
4. Open your terminal and run the following commands to clone the repository and navigate to it:
   - `git clone https://github.com/acce8711/PotteryVR.git`
   - `cd PotteryVR`
5. Run the following commands in the same terminal to start the server:
   - `npm install`
   - `node app.js`
6. In your browser, go to the `http://localhost:8080` URL
7. You're all set! Click to start the experience and follow the instructions in the displayed guiding text

## 🧾Mobile Setup Instructions (Using Ngrok)
Running the project on your computer alone won’t let you open it on your phone. You need a tool called a tunnel to generate a link that you can open on your phone. Below are steps to set up an ngrok tunnel to do this:

1. Complete steps 1-6 from **Desktop Setup Instructions**
2. Create an [Ngrok](https://dashboard.ngrok.com/get-started/setup/windows) account
3. Open a new terminal and install ngrok by following the instructions on the Ngrok web dashboard under Getting started --> Setup & Installation
   
   ![image](https://github.com/user-attachments/assets/495bde99-8b49-44c5-8431-546d91d6d812)
   
    **Windows users**: Make sure to open a new terminal as administrator
5. Create an ngrok tunnel to share your local server on the internet by running these commands in the **same terminal window you opened in step 3**:
   - `./ngrok.exe config add-authtoken {your Authtoken}` (Your authoken should be visible on the Ngrok web dashboard under Getting started --> Setup & Installation)
   - `./ngrok.exe http http://localhost:8080`
6. Open the experience on your phone by clicking the link that the commands from step 4 generate. The link should end with `ngrok-free.app`
7. You're all set! Click to start the experience and follow the instructions in the displayed guiding text

## 🎨 Assets and Attributions

See the full list of assets used in this project in the [ASSETS.md](./ASSETS.md) file.

## 📚 Credits

This project was developed as part of a third-year design studio course (IMD3901B) in the [Interactive Multimedia and Design](https://bitdegree.ca/index.php?Program=IMD&Section=Home) program.
