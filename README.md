# Adam Cunard Portfolio Project

This has been my personal website since 2024 and has gone through many iterations.
It has evolved with my personal needs and is now my default testing enviroment.
The best way to experience my portfolio is just to check it out yourself and play around.
[Click me for website!](https://adamcanard.ca "Welcome to my world")

This website is a demostration of my abilities as a developer, but mainly showcases my skills with front end / design in react.

#### What am I looking at / Rules of engagment

If you are visiting this website on a screen larger than 1000px you are brought to te Desktop site which requires you to create an account providing only a username. I use this to keep track of your interactions with my website and for a small level of security. I use cookies on this website purely to facilitate functionality.
If you are visiting this website on a smaller device you will be shown my mobile site. This site has many of the same functionality but is lacking more of the _*Cool Factor*_

## Key Features

In this description, I will mainly be highlighting aspects of the Desktop site as the medium allows me to be more creative

### Style

The first thing you will notice is the recognizable style of my site, I have done my best to recreate the old windows feel in color and operation. I accomplish this with my own semantic react library that I use across my website for consistent styles and functionality

### Windows

Speaking of functionality, when you are using my website you will notice my use of "Windows".
These "Windows" are the main result of my semantic library, every react component I make can be wrapped in a "DesktopWindow". DesktopWindows come with builtin functionality for determining the state of the windows and lets you drag them around the screen, much like a desktop enviroment. No, sadly the windows are not resizeable yet (Sorry Jovie) but I am able to statically set the sizes of each window for each use case.
This has evolved my website from just a portfolio, to my testing enviroment. Any idea I have for a component can be slapped into a DesktopWindow and rendered on my site with a button on my taskbar. This also benifits me in re-rendering my component, because each component is contained within its own window, I don't need to refresh my site constantly when im developing, I can simply open and close the window

### Lister

The main function of my website outside of being my portfolio is to store my data. As many of you know I am a famous local beerfluencer in the beautiful Calgary, AB, and my lister was born out of my need for storing my beerpinions. The list function is more complicate than it appears, all of the data displayed in the lists are dynamically renders based on the database collections and when an admin is using the site, the lists facilitate full CRUD capabilities. Each list also has a work in progress grouping function that lets you group elements of the list by shared values, the best example of this is on the beers list when you click on "Rating"

### Games

This is a more personal feature of my website, I have been programming games into my portfolio because it forces me to create unique solutions.
React was made to make websites better, and by doing so has seperated itself from many standard languages with its React lifecycle, this presents many interesting challenges which I practice overcoming and problem solving by recreating old games.

#### Currently featured

- Blackjack
- Minesweeper

## Stack

I have kept my stack small using only NextJs and Pocketbase, my greatest accomplishment with this site is my node_modules size. While it is still giant, I have implemented all functionality myself, I've done this to become a better and more diverse developer and so I can brag to my friends that I did it all by myself, but mostly the ladder
