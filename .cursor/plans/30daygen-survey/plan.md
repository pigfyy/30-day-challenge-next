## Page 1: Introduction and Email Collection

**Header:**

"Thank you for volunteering to take this survey!"

**Introduction Paragraph:**

The 30day.me app aims to help you develop habits to reach your personal goals. Using this app, you can create a 30-day challenge, track your progress, … Small steps, big changes!

Please take a quick tour of the app and answer 10 survey questions. The survey will take you approximately 10–15 minutes.

**Email Collection:**

Below, display an email input field with the label "Email Address" and placeholder "Enter your email address". This field is required to proceed to the next page.

**Navigation Controls (Bottom of Page):**

- A **Next** button to proceed to Page 2, which remains disabled until a valid email is entered.
- The **Back** button is shown but disabled on Page 1.

---

## Page 2: AI Search System Demo

**Header:**

"AI Search System Demo"

**Instructions:**

We have created an AI search system aimed to help you generate challenges towards your goals. Please make at least 3 search queries using the embedded UI below to familiarize yourself with the system.

**Embedded UI:**

Display the functional 30DAYGEN search system UI. Use the already pre-made component present in `ChallengeSearchBasic.tsx`.

**Navigation Controls (Bottom of Page):**

- A **Back** button to return to Page 1.
- A **Next** button to proceed to Page 3.

---

## Page 3: Questions about GenAI Search System

**Header:**

"Questions about GenAI search system"

**Instructions:**

Based on your experience with the AI search system on the previous page, please answer all of the following questions.

1. **How many prompts did you ask the AI?** (Single choice)

   - `< 3`
   - `3–4`
   - `≥ 5`

2. **How satisfied are you in the challenge search?** (Likert scale)

   1. Very satisfied
   2. Somewhat satisfied
   3. Neither satisfied nor dissatisfied
   4. Somewhat dissatisfied
   5. Very dissatisfied

3. **Are the recommended challenges clear and understandable?** (Likert scale 1–5, same scale as Q2)

4. **Are the recommended challenges aligned with your goals?** (Likert scale 1–5)

5. **How helpful are the recommended challenges in achieving the searched goal?** (Likert scale 1–5)

6. **How likely are you to start making challenges from the search results?** (Single choice)

   - I will directly join the recommended challenges
   - I will start with the recommended challenges but tailor them for my own needs
   - I prefer to make my own challenges

**Table Layout for Questions 2–5:**

| Question Number | Question Text                                                              | Answer (1–5) |
| --------------- | -------------------------------------------------------------------------- | ------------ |
| 2               | How satisfied are you in the challenge search?                             | (Select 1–5) |
| 3               | Are the recommended challenges clear and understandable?                   | (Select 1–5) |
| 4               | Are the recommended challenges aligned with your goals?                    | (Select 1–5) |
| 5               | How helpful are the recommended challenges in achieving the searched goal? | (Select 1–5) |

**Navigation Controls (Bottom of Page):**

- A **Back** button to return to Page 2.
- A **Next** button to proceed to Page 4, which remains disabled until **all** questions 1–6 on this page are answered.

---

## Page 4: Questions about the App

**Header:**

"Questions about the app"

1. **Do you see yourself using this app?** (Yes/No radio buttons)

   - If **No**, display a conditional text field: "If no, why?"

2. **What would you track every day if you use 30 Day Me?** (Checkboxes, multiple selection)

   - Completion of daily challenges
   - Add detailed to‑do list
   - Take notes
   - Upload pictures to track progress

3. **What features will best help you engage?** (Checkboxes)

   - No more feature needed
   - Notifications
   - Leaderboard
   - Community
   - Personal coaches
   - Others (please specify) — show a conditional text field when selected

4. **If you have already used 30 Day Me, do you think it is changing your habits?** (Single choice)

   1. Yes. It has been helping me achieve my goals
   2. I have been seeing progress, but have not achieved my goals
   3. It is not obvious yet
   4. N/A

5. **Currently the app can be installed as a shortcut on your phone. If we publish the app to app stores, will it change your engagement?** (Single choice)

   1. I will only use it by downloading from app stores
   2. I'm more likely to use the app
   3. It will not change my engagement

6. **Additional Comments:** (Optional text area)

   - "Please share any additional comments (not required)."

**Navigation Controls (Bottom of Page):**

- A **Back** button to return to Page 3.
- A **Submit** button to finalize and submit the survey.
