# Ryan's Plinko Game
Hi [Interviewer's Name],

Thank you for taking the time to review my attempt at the Plinko game assessment. Below I've outlined the tech stack, provided a getting started guide, shared notes on my approach and shared thoughts on potential issues and further development.

![Animation](https://github.com/RyanLangman/plinko_game/assets/110283613/ab0371d4-f5c4-42af-a265-3f7db8d6169c)

## Getting Started
To run the application, follow these steps:

1. Clone the repository to your machine.
2. Navigate to the project directory in your terminal.
3. Run ```npm install``` to install dependencies. This project was developed with Node v18 LTS, you may experience issues with an older version.
4. Run ```npm run start``` to start the application.
5. Open your browser and navigate to http://localhost:8080 (default webpack port).

## Tech Stack
The technology stack used in this project includes:

- Webpack: Module bundler for JavaScript applications.
- PixiJS: Rendering engine for 2D graphics with WebGL support.
- TypeScript: Statically typed superset of JavaScript.
- HowlerJS: JavaScript audio library for managing and playing sounds.
- TweenJS: Tweening library for creating smooth animations.
- TexturePacker: Desktop application for bundling images into a spritesheet.

## Assets
Assets are free and were downloaded from https://itch.io/ and https://opengameart.org/
- Music: https://tallbeard.itch.io/music-loop-bundle
- UI Sounds: https://ellr.itch.io/universal-ui-soundpack?download
- Textures: https://opengameart.org/content/free-ui-asset-pack-1

## Approach
My aim for this assessment was to be pragmatic and tackle as many of the requirements as possible while keeping in mind the time constraint. As someone who doesn't work in this space daily, I encountered several new concepts and technologies thus my approach focused on meeting the business requirements efficiently, rather than delving too deeply into any specific area.

### Path traversal calculations
To calculate the path which the ball will traverse and the slot it will eventually land in,
I built a 2D array of pegs and an array of slots that sit beneath and in-between a pair of pegs. The approach was to start from the slot that was pre-determined, then work the way up, iterating in reverse over the rows and randomly choose the top left or top right peg until reaching the final row (top most row of pegs), saving this to an array of coordinates for the ball to later traverse.

### Animations and TweenJS
Initially when dropping the ball, I would instantly move the ball from one point to another, above the next peg in the balls traversal path. To achieve this, I would call a "moveBall()" method every second in the gameLoop->logic() method.

While it worked, it wasn't a compelling experience to watch the ball "instant transmission" every second. Having little experience in PixiJS, I sought an easy way to animate the ball across its traversal path and found TweenJS, which made this work trivial.

Having already built up an array of coordinates for the ball's path, I implemented a tween "animation timeline" by chaining one tween after the previous until it reaches the slot. It took some time to tweak the easing method and durations but eventually ended up with something that's fun to watch and a bit more engaging.

### HowlerJS
This library made working with audio files trivial. A singleton SoundPlayer exists for any class to call and play a sound when needed. An improvement to this could be to instead calling "play" on the SoundPlayer, rather turn it into a "SoundManager" that would load the assets and return an instance of "Howl" for the caller to use as needed.

### Backend service, pre-determined slots
The first iteration of pre-determining the slots was based on a rudimentary random calculation and the logic for this existed in the Board class.

My assumption, based on my own experience in the web development space, is that this is a major security concern as this exposes the logic in the browser thus the player is capable of seeing and changing it. 

An improvement to this was to move it into a "backend service" class where an endpoint was mocked out. The idea is to call a backend service that would perform the calculation and inform the game what the result is and the game would simply play it out.

Further to the above, the randomizer was improved with weightings so that higher value slots would be chosen less frequently. The code for this was adapted from: https://dev.to/jacktt/understanding-the-weighted-random-algorithm-581p

### PixiJS Textures & TexturePacker
Not being accustomed to using sprite sheets I downloaded a UI asset pack and loaded these assets individually where needed. This became cumbersome and pressed me into looking at loading and referencing these images more efficiently.

After some searching I found TexturePacker which made very short work of this, allowing me to load all my images into a single sprite sheet, generate a project file for later changes and outputting the spritesheet & a json data file that references the positioning in the sheet.

This was trivial to load and utilize with PixiJS. That being said, not being experienced in using textures and positioning them correctly, I hit some challenges replacing the circles and slots with the relevant textures without affecting their positioning. These textures also weren't really ideal and didn't add much to the visual appeal of the game, however, I did spruce up the buttons and the scoreboard. 

### Implementing Physics and Considerations
#### Attempt
Due to time constraints and lack of experience building such things, I utilized ChatGPT to assist with getting things moving.
The code for this resides in an incomplete feature branch **feature/30-use-physics-on-ball**.
Some basic physics is applied to the ball when "DROP" is clicked, this will apply gravity on the ball, dropping down towards the pegs. Collision detection is implemented on the peg class
and for each frame when the logic method is called on the Game object, it will call the "applyPhysics()" method on the board, which will perform collision detection calculations across all
the pegs, waiting for the moment the ball collides with a peg. Once this occurs, a force is applied to the ball in the opposite direction bouncing it away.

Demonstration:

![Animation](https://github.com/RyanLangman/plinko_game/assets/110283613/d78a1555-ff3f-4c85-a731-fb2ff2781b19)

Further development on this would include:
- Walls on the sides of the board to prevent the ball from escaping.
- Collision detection of the ball into the slot, awarding the points and progressing the game to dropping the ball again (if balance permits).
- Tweaking the physics of the ball for more realistic motion.

#### Tunneling Issues
One consideration when implementing physics is the issue of tunneling. As something I've experience before building a boxing game in VR, there are certain conditions, such as the processor under heavy load or objects moving too quickly, the ball may pass through the peg instead of colliding with it. This can result in unpredictable/inconsistent behaviours.

Potential solution to this could be to increase the rate of physics calculations per frame, however this would come at greater computational cost and may end up making matters worse or introducing other issues with the higher workload.

#### Slot Prediction Challenges
Another challenge would be accurately guiding the ball towards the slot that was pre-determined. One could apply forces to guide the ball towards the slot but may not be reliable/seem realistic. Alternatively, creating a funnel of invisible walls to guide the ball towards a slot could introduce unrealistic movements if not done carefully.

Below are diagrams of what these approaches could look like:
#### Applying forces dynamically to guide towards slot
![Untitled Diagram-Page-2 drawio](https://github.com/RyanLangman/plinko_game/assets/110283613/7fb23783-aabe-4ee5-aab8-5fc5cd105111)

#### Invisible walls to funnel towards slot
![Untitled Diagram drawio](https://github.com/RyanLangman/plinko_game/assets/110283613/b781acb2-f2c7-40d4-a9e5-189c0ec25049)

