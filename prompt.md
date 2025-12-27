We are building a quizzing platform. This is not the typical create a test with multiple choice questions and have a user take it but rather this is an entire platform for quiz building taking but also integrations.

## Game Concept (MVP)

A quiz creator clicks a Create Quiz button to create a quiz that they want their user-base to take.

Once they created a quiz they share that quiz with a unique shareable url + slug that the users click on to access and take. The user must be logged in in order to take the quiz.

The quiz creator (ie: brand account) should be able to also take the quiz in a preview mode.

Once the user finishes taking the quiz they are presented with their results along with which questions they got wrong or right along with a link to a page the question was sourced from so they can read more on it to review their knowledge for next time.

## Quiz Creation Flow

User is presented with a form to create a quiz:

1. Enters the quiz title: Islāmic Quiz.
2. Creates a new question.
3. Enters the question description: Which of the following are from the daily obligatory prayers?
4. If this is a question which can have a sequential order the user enables a Checkbox "Is Ordered".
5. We send a request to a backend route to get variations of this question based on a template like this:
```javascript
const QuestionTypes = {
    multi: { label: 'Multiple Choice', hint: 'Which of the following is a colour?' },
    boolean: { label: 'Boolean', hint: '{?} is a color.' },
    negation: { label: 'Negation', hint: 'Which of the following is NOT a colour?' },
    booleanNegation: { label: 'Boolean Negation', hint: '{?} is NOT a colour.' },
    count: { label: 'Count', hint: 'How many colours are there?' },
    input: { label: 'Input', hint: 'Enter at least {n} colours.' },
    booleanCount: { label: 'Boolean Count', hint: 'There are {n} colours.' },
    ordered: { label: 'Ordered', hint: 'Rearrange the colours from brightest to darkest.' },
    reversed: { label: 'Reversed', hint: 'Rearrange the colours from darkest to brightest.' },
    countAfter: { label: 'Count After', hint: 'Which colours are darker than {?}?' },
    countBefore: { label: 'Count Before', hint: 'Which colours are brighter than {?}?' },
    booleanCountBefore: { label: 'Boolean Count Before', hint: 'There are {n} colours brighter than {?}.' },
    booleanCountAfter: { label: 'Boolean Count After', hint: 'There are {n} colours darker than {?}.' },
    nextInput: { label: 'Next Input', hint: 'What are the colours that are darker than {?}?' },
    prevInput: { label: 'Prev Input', hint: 'What are the colours that are brighter than {?}?' },
    afterBoolean: { label: 'After Boolean', hint: '{?} is darker than {?}' },
    beforeBoolean: { label: 'Before Boolean', hint: '{?} is brighter than {?}' },
    booleanFirst: { label: 'Boolean First', hint: '{?} is the brightest colour.' },
    booleanLast: { label: 'Boolean Last', hint: '{?} is the darkest colour.' },
    first: { label: 'First', hint: 'Which is the brightest colour?' },
    last: { label: 'Last', hint: 'Which is the darkest colour?' },
};
```

Note that questions with the prefixes like "after..." "before..."  are only applicable for questions that have the is ordered checkbox enabled, thus we should not send those templates to the LLM if that box is not checked.

Thus the LLM here would send us back questions like this:
"{?} is one of the daily obligatory prayers?"
"Which of the following is NOT one of the daily obligatory prayers?"

The input fields which each of these question variations will now be populated to allow the user to customize them if they wish. Note that the placeholders {?} should not be editable and we should show an error if they try to remove it.

6. The user then proceeds to add the answers to the question (in order), if the ordered checkbox is enabled, these fields are draggable so the user can easily rearrange them:
[0] Fajr
[1] Dhuhr
[2] 'Asr
[3] Maghrib
[4] Isha

7. Now the user enters wrong answers. There is no order to these.
- Duha
- Eclipse Prayer
- Tarawih
- Witr
- Khawf

8. The user enters an optional URL and label this question was sourced from in markdown format:
[IslamWeb, The Virtues of the Daily Prayers](https://islamweb.net)

9. The user hits the Save button which saves this question to the quiz.

10. The user does steps 1-10 over and over until they are satisfied with the total number of questions in the quiz.

11. They hit Save on the quiz the quiz is saved via a backend route and we get a unique URL for users to take this quiz.

## Quiz Taking Flow

1. Users clicks the link and it asks them to put in their name, email address.
2. The app begins to collection analytics from the moment the user landed on the page. We start by collecting the time the user first loaded the quiz page.
3. The client makes a call to the backend route to get the quiz data, which is the title, the questions and its associated choices and answers.

For the choices, the server should choose at random a variation of the question that are available. So it may choose "How many obligatory prayers are there?" (count question type)

The answer to this would have been computed dynamically based on the .length of answers put in by the user. Since from Step 6 of the Quiz Creation Flow they put in exactly 5 answers, we know the answer to this question type is 5.

The user is then presented 

## Notes

- The brands will not always be schools and quiz takers will not always be traditional students of a school. Rather the brands will be any platform that wants to teach its audience by way of quizzes.

## Technical Requirements

- Use NextJS v15.5+ following all latest conventions including awaiting on params for async functional components and typed routes
- If a UI component library is needed, use Tailwind CSS v4 (latest version) + ShadCN components. Try to use the ShadCN versions of all components instead of using vanilla html implementations of them (ie: prefer <Button> from ShadCN instead of the plain html <button>), and only use the html one if that's the best option to use.
- Always look up the latest versions of docs for any dependency to ensure we are on the top of the stack
- Prefer arrow functions and optimize code so re-renders are minimized—only components that need updating should re-render, not the entire app
- Use ESNext and fully type out TS definitions; use "types" over "interfaces"
- Break out complex logic into smaller utility functions and larger complex UI components into smaller composable ones
- Do not add any comments in the code
- Revise your code 3 times before sending to ensure there are no TS errors, unused variables, or unused imports
- Ensure everything builds and compiles fine with no warnings
- Use bun (1.3.0+) for your package manager.
- Use Biome 2.2.6+ for linting.
- Add semantic versioning capabilities dependencies (@semantic-release/changelog, @semantic-release/git, semantic-release) with a release.config.mjs so we can easily add versions to the app.
- Set the package.json author to Ragaeeb Haq, and add "repository", "engines" (bun >= 1.3.0), homepage, license (MIT) and "bugs" fields to it.
- This needs to be deployable on a serverless platform like Vercel or Netlify and should not require a live running server.

## Gameplay Specifications

**Player Controls**: Arrow keys or WASD for movement in all 8 directions. Include an on-screen UI indicator showing which direction the duck is facing.

**Camera**: Follow the player character smoothly using a lerp or spring physics approach, keeping the character roughly centered on screen.

**Movement**: Implement smooth acceleration and deceleration for realistic movement, not instant velocity changes.

**Collision Detection**: Characters should not walk through buildings, obstacles, or the map boundaries.

**Enemy AI**: Dogs should patrol or wander until they detect the player within a certain radius, then chase the player. Implement a simple line-of-sight or distance-based detection system.

**Proximity Detection**: For multi-duckling levels, define a clear proximity radius for when ducklings return to the mother when nearby.

**Win Condition**: For single duckling levels, collision/proximity with the mother. For multi-duckling levels, all ducklings must be at the mother's location simultaneously for a set duration.

**Loss Condition**: Collision with an enemy results in immediate loss (or loss of a life).

**Map Design**: Each map should be distinct with different obstacles, building layouts, and enemy placements. Consider procedurally generating or hand-crafting 3-5 different maps.

**Duckling Behavior (Multi-Duckling Levels)**: Each duckling should have individual wander AI that occasionally tries to stray from the mother. They should have a maximum distance they'll wander before feeling "pulled back" to the mother.

**Visual Feedback**: Provide clear visual indicators for:
  - Enemies (distinct color/model from friendly characters)
  - The target character (mother or lost duckling)
  - Proximity zones for multi-duckling levels
  - Player health/lives remaining (if applicable)

## Visual Style & Aesthetics

**Art Direction**: Adopt a cartoon aesthetic with cute, charming characters. Characters should have:
  - Rounded, appealing proportions (not block-like or pixelated)
  - Expressive features (eyes, beaks) that convey emotion
  - Soft, smooth geometry without hard edges
  - Warm, inviting color palettes
  - A stylized, illustrative look rather than photorealistic

**Character Design**: Ducks should feel lovable and endearing with distinctive personalities. The mother duck can be slightly larger/more authoritative. Baby ducklings should be smaller and rounder. Dogs should still feel threatening but maintain the cartoon style (not realistic predators).

**Environment**: Maps should have a charming, storybook quality with simplified building shapes, parks, streets, and obstacles. Use warm lighting and cohesive color schemes per map. Avoid realistic urban textures; opt for painterly, stylized environments.

**Animation**: Smooth character animations (waddles, turns, idle animations) that reinforce the cute, lively personality. Enemies should have distinct movement patterns (trotting, sniffing).

**UI/UX**: Keep menus and HUD elements in the same cartoon style with rounded buttons, playful fonts, and friendly visual language.

## Optional Enhancements to Consider

- Sound effects for movement, enemy encounters, and level completion
- Score/time tracking per level
- Difficulty progression (more/faster enemies in later levels, larger maps)
- A simple UI menu for level selection or game over screens
- Particle effects when reuniting with family members
- Simple animation for character movement (duckling waddle, head turning)

## State Management

- Use React Context or a state management solution to track: current level, player position, NPC positions, enemy positions, game state (playing/paused/won/lost), and lives remaining
- Ensure game state updates are efficient and don't cause unnecessary full-app re-renders

## Verification Checklist

Before submitting the code, verify:

**Functionality**
- [ ] You can launch the game (bun run dev) and it works
- [ ] Player can move in all 8 directions with smooth acceleration/deceleration
- [ ] Camera follows player smoothly and stays centered
- [ ] Collision detection works for obstacles, boundaries, and enemies
- [ ] Single-duckling levels: reaching mother triggers win condition
- [ ] Multi-duckling levels: all ducklings must be together for win condition
- [ ] Losing a life or game-over triggers when hit by enemy
- [ ] Level progression advances after winning
- [ ] Enemy AI patrols and chases within detection radius
- [ ] Duckling wander AI works on multi-duckling levels
- [ ] Proximity detection returns wandering ducklings to mother

**Code Quality**
- [ ] No TypeScript errors or warnings
- [ ] No unused variables or imports
- [ ] All components are properly typed with "types" not "interfaces"
- [ ] Complex logic extracted into utility functions
- [ ] Large UI components broken into smaller composable pieces
- [ ] Arrow functions used throughout
- [ ] No comments in code
- [ ] Do bun update --latest to ensure we are on the latest versions
- [ ] Code builds and compiles successfully
- [ ] Remove all unused files and assets from the project (ie: if public/*.svg are not used get rid of them)

**NextJS & Framework**
- [ ] Using NextJS v15.5+ with latest conventions
- [ ] Async components properly await params
- [ ] Typed routes implemented
- [ ] ESNext syntax used throughout
- [ ] Re-renders optimized (no unnecessary full-app re-renders)

**Visual & Design**
- [ ] Characters have cartoon, cute aesthetic (rounded, not pixelated)
- [ ] Characters are expressive and charming, not overly simple
- [ ] Environment has storybook/stylized feel
- [ ] Colors and lighting are warm and inviting
- [ ] UI elements match the cartoon style
- [ ] Animations are smooth and enhance personality

**Game Content**
- [ ] At least 3-5 distinct maps are implemented or ready for population
- [ ] Multiple levels exist (at least 1 single-duckling, 1 multi-duckling)
- [ ] Enemies have visible, distinct appearance from friendly characters
- [ ] Target character (mother/lost duckling) is clearly identifiable
- [ ] Proximity zones are visually indicated if applicable
- [ ] Health/lives display is clear

**Polish**
- [ ] Game starts successfully from the NextJS dev server
- [ ] No console errors or warnings
- [ ] All interactive elements respond intuitively
- [ ] Game feels responsive and performs smoothly